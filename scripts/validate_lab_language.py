#!/usr/bin/env python3
"""Deterministic gates for the language-aligned laboratory artifacts.

The validator checks only failures that change the requested outcome: missing
stable sections/entities, wrong project mappings, visible CJK in English output,
or ordinary bilingual UI in the Chinese HTML. It does not hash files or infer
translations.
"""

from __future__ import annotations

import re
import sys
from zipfile import ZipFile
from pathlib import Path

from docx import Document
from lxml import html

sys.path.insert(0, str(Path(__file__).resolve().parent))
import align_lab_language as align  # noqa: E402


EXPECTED_SECTIONS = [
    "H-01", "H-02", "H-03", "H-04", "H-05", "H-06", "H-07",
    "R-01", "R-02", "R-03", "R-04", "R-05", "R-06",
    "P-01", "P-02", "P-07", "P-08",
    "A-01", "A-02", "A-03", "A-04", "A-05", "A-06", "A-07", "A-08",
    "N-01", "N-02", "T-01", "T-02", "T-03", "T-04",
    "C-01", "C-02", "C-03", "C-04", "C-05", "C-06",
]
EXPECTED_HTML_CODES = EXPECTED_SECTIONS + ["P-02-01"]  # replaced below by parsed set
PATH_EXCEPTION = "docs/项目与优势.md"
PROJECT_SETS = {
    "R-02": "P-07-01, P-07-02, P-07-06",
    "R-03": "P-05, P-07-03, P-07-08, P-07-09",
    "R-04": "P-03, P-04, P-07-04, P-07-05, P-07-10",
}
R06_IDS = {
    "P-07-01", "P-07-02", "P-07-06", "P-05", "P-07-03", "P-07-08", "P-07-09",
    "P-03", "P-04", "P-07-04", "P-07-05", "P-07-10", "P-07-07", "P-07-11",
    "P-07-12", "P-07-13", "P-07-14", "P-07-15", "P-07-16", "P-07-17",
}

# These are high-impact factual values whose representation is intentionally
# translated (Chinese yuan wording -> English RM wording, or Chinese numerals
# -> English words).  They are checked as source/target pairs rather than by a
# broad number regex, which would confuse page IDs and ordinary prose counts.
NUMERIC_CROSSWALK = [
    ("每项 5 万令吉以上", "RM 50k+ each"),
    ("6 万令吉", "RM 60,000"),
    ("29,100 令吉", "RM 29,100"),
    ("128,600 令吉", "RM 128,600"),
    ("52.12%、满意度提升 25.34%、活跃用户增长 35.46%、新用户注册增长 40%", "52.12%, satisfaction by 25.34%, active users by 35.46%, and new registrations by 40%"),
    ("周均下单频次由 2 次增至 3 次，好评率达到 90%", "average weekly orders rose from two to three, and the positive-review rate reached 90%"),
    ("超过 120 万令吉", "over RM 1.2M"),
    ("2025", "2025"),
    ("2026—2027", "2026-2027"),
    ("77508A", "77508A"),
]
EXTERNAL_LINK_RE = re.compile(r"(?:https?|mailto):[^\s\"'<>]+")
ASSET_PATH_RE = re.compile(r"(?:\.\./)?docs/assets/[A-Za-z0-9_./-]+")
CHINESE_UI_FORBIDDEN = (
    "Home", "Research Directions", "Projects", "Technology Advantages", "Partners", "Team",
    "View Research Directions", "View Projects", "View Technology Advantages", "View Partners",
    "View Team Details", "View Collaboration Options", "Field", "Entry", "Instructions",
    "Suggested Length", "Page Title", "Homepage Summary", "Inner-Page Introduction",
    "One-Sentence Definition", "Key Questions", "Main Research Content", "Application Scenarios",
    "Representative Projects", "Additional Notes", "Connection Method", "Project Name",
    "Project Image", "Source / Evidence Metadata", "Fixed Mapping", "Card Rule", "Display Rule",
    "Target", "Name", "Title", "Description", "Button", "Affiliation", "Research Interests",
    "Short Bio", "Research Areas", "Representative Projects / Outputs", "Personal Link", "Photo",
    "Collaboration Target", "Collaboration Format", "Suitable Target / Scenario",
    "Investment, Process & Notes", "Recruitment Target", "Direction", "Application Method",
    "Current Status", "Contact Person", "Email", "Location", "Social / Booking",
    "What to Provide When Contacting", "Matters We Respond To", "Expected Response", "Scope & Notes",
    "Scope & Prerequisites", "Logo File or Location", "Logo Public-Use Permission", "Not provided",
    "To be provided", "To be confirmed", "AI Solutions", "Edge Intelligence", "Custom Digital Products",
    "Digital Transformation",
)
CHINESE_STABLE_TARGET_EXCEPTION = "固定合作邀请｜按钮目标 Contact"


def fail(message: str) -> None:
    raise AssertionError(message)


def docx_text(doc: Document):
    for paragraph in doc.paragraphs:
        yield paragraph.text
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                yield cell.text


def joined_docx_text(path: Path) -> str:
    return "\n".join(docx_text(Document(path)))


def html_root(path: Path):
    return html.fromstring(path.read_text(encoding="utf-8"))


def machine_tokens_from_text(value: str) -> set[str]:
    tokens = set()
    for token in EXTERNAL_LINK_RE.findall(value):
        tokens.add(token.rstrip(".,;:)]"))
    for token in ASSET_PATH_RE.findall(value):
        tokens.add(token.rstrip(".,;:)]"))
    if PATH_EXCEPTION in value:
        tokens.add(PATH_EXCEPTION)
    return tokens


def docx_machine_tokens(path: Path) -> set[str]:
    tokens = machine_tokens_from_text(joined_docx_text(path))
    # Hyperlink targets are stored in the package relationship part rather
    # than in visible cell text.  Read only external targets; theme/style
    # relationships are implementation details, not content links.
    with ZipFile(path) as package:
        rels = package.read("word/_rels/document.xml.rels").decode("utf-8")
    for target in re.findall(r'Target="([^"]+)"', rels):
        if target.startswith(("http://", "https://", "mailto:")):
            tokens.add(target)
    return tokens


def html_machine_tokens(path: Path) -> set[str]:
    root = html_root(path)
    tokens = machine_tokens_from_text("\n".join(root.xpath("//text()")))
    for element in root.iter():
        for key in ("href", "src"):
            value = element.get(key)
            if value and not value.startswith("data:"):
                tokens.update(machine_tokens_from_text(value))
    return tokens


def assert_numeric_and_evidence() -> None:
    """M3 gate: preserve high-impact values and source-evidence qualifiers."""
    source_docx = joined_docx_text(align.ZH_DOCX)
    english_docx = joined_docx_text(align.OUT_EN_DOCX)
    source_html = "\n".join(html_root(align.ZH_HTML).xpath("//text()"))
    english_html = "\n".join(html_root(align.OUT_EN_HTML).xpath("//text()"))
    for source_value, target_value in NUMERIC_CROSSWALK:
        if source_value not in source_docx and source_value not in source_html:
            fail(f"M3 source numeric fact is absent from Chinese authority: {source_value}")
        for label, target in (("DOCX", english_docx), ("HTML", english_html)):
            if target_value not in target:
                fail(f"M3 {label} numeric fact changed or disappeared: {target_value}")

    # Existing project evidence qualifiers must not be silently shortened.
    source_en_docx = joined_docx_text(align.EN_DOCX)
    target_en_docx = english_docx
    source_en_html = "\n".join(html_root(align.EN_HTML).xpath("//text()"))
    target_en_html = english_html
    for phrase in (
        "According to the original website materials",
        "not evidence of individual sole authorship",
        "measurement methodology remains to be verified",
    ):
        for label, source, target in (
            ("DOCX", source_en_docx, target_en_docx),
            ("HTML", source_en_html, target_en_html),
        ):
            if target.count(phrase) != source.count(phrase):
                fail(
                    f"M3 {label} evidence qualifier count changed for {phrase!r}: "
                    f"source={source.count(phrase)}, target={target.count(phrase)}"
                )
    p01_phrase = "not evidence of individually owned contributions"
    if p01_phrase not in target_en_docx or p01_phrase not in target_en_html:
        fail("M3 P-01 evidence limitation is missing from an English output")


def assert_machine_links() -> None:
    """M3 gate: preserve links/asset paths and resolve in-document targets."""
    pairs = (
        (align.ZH_DOCX, align.OUT_ZH_DOCX, docx_machine_tokens),
        (align.EN_DOCX, align.OUT_EN_DOCX, docx_machine_tokens),
        (align.ZH_HTML, align.OUT_ZH_HTML, html_machine_tokens),
        (align.EN_HTML, align.OUT_EN_HTML, html_machine_tokens),
    )
    for source, target, extractor in pairs:
        missing = extractor(source) - extractor(target)
        if missing:
            fail(f"M3 machine links/asset paths lost from {target.name}: {sorted(missing)}")


def assert_docx_structure() -> None:
    """M3 gate: compare stable section table shapes, never top-level order."""
    authority = align.section_table_map(Document(align.ZH_DOCX))
    for path in (align.OUT_ZH_DOCX, align.OUT_EN_DOCX):
        candidate = align.section_table_map(Document(path))
        if list(candidate) != EXPECTED_SECTIONS:
            fail(f"M3 {path.name} has unexpected stable section keys: {list(candidate)}")
        authority_shape = {
            key: [(len(table.rows), len(table.columns)) for table in tables]
            for key, tables in authority.items()
        }
        candidate_shape = {
            key: [(len(table.rows), len(table.columns)) for table in tables]
            for key, tables in candidate.items()
        }
        if candidate_shape != authority_shape:
            fail(f"M3 {path.name} table shape differs from Chinese authority")


def assert_html_structure() -> None:
    """M3 gate: preserve the seven-page shell and all ordinary/logo slots."""
    for path in (align.OUT_ZH_HTML, align.OUT_EN_HTML):
        root = html_root(path)
        slots = root.xpath(
            '//*[contains(concat(" ", normalize-space(@class), " "), " slot ")]'
        )
        logos = root.xpath(
            '//*[contains(concat(" ", normalize-space(@class), " "), " logo ")]'
        )
        if len(slots) != 63 or len(logos) != 12:
            fail(f"M3 {path.name} slot count mismatch: ordinary={len(slots)}, logo={len(logos)}")
        panel_ids = set(root.xpath('//section[contains(concat(" ", normalize-space(@class), " "), " panel ")]/@id'))
        tab_ids = set(root.xpath('//nav[@role="tablist"]/*[@role="tab"]/@id'))
        if len(panel_ids) != 7 or len(tab_ids) != 7:
            fail(f"M3 {path.name} page shell is not seven tabs/panels")
        controls = set(root.xpath('//*[@role="tab"]/@aria-controls'))
        if controls != panel_ids:
            fail(f"M3 {path.name} tab controls do not resolve to panels")
        target_ids = set(root.xpath('//*[@data-target]/@data-target'))
        if not target_ids.issubset(tab_ids):
            fail(f"M3 {path.name} button targets are unresolved: {sorted(target_ids - tab_ids)}")
        ids = root.xpath('//*[@id]/@id')
        if len(ids) != len(set(ids)):
            fail(f"M3 {path.name} contains duplicate HTML ids")


def assert_language_boundaries() -> None:
    """M4 gate: enforce single-language visible text with explicit exceptions."""
    english_docx_leaks = []
    for value in docx_text(Document(align.OUT_EN_DOCX)):
        remaining = value.replace(PATH_EXCEPTION, "")
        if align.HAN.search(remaining):
            english_docx_leaks.append(value)
    if english_docx_leaks:
        fail(f"M4 English DOCX visible CJK remains outside the machine-path exception: {english_docx_leaks[:3]}")

    english_html_leaks = []
    for value in visible_html_text(html_root(align.OUT_EN_HTML)):
        remaining = value.replace(PATH_EXCEPTION, "")
        if align.HAN.search(remaining):
            english_html_leaks.append(value.strip())
    if english_html_leaks:
        fail(f"M4 English HTML visible CJK remains outside the machine-path exception: {english_html_leaks[:3]}")

    chinese_docx_values = list(docx_text(Document(align.OUT_ZH_DOCX)))
    chinese_html_values = list(visible_html_text(html_root(align.OUT_ZH_HTML)))
    for label, values in (("Chinese DOCX", chinese_docx_values), ("Chinese HTML", chinese_html_values)):
        for value in values:
            stripped = value.strip()
            for phrase in CHINESE_UI_FORBIDDEN:
                if phrase in value:
                    fail(f"M4 {label} retains ordinary English UI text {phrase!r}: {stripped[:240]}")
            # Contact is a stable button-target identifier in the Chinese
            # P-08 contract, not an untranslated user-facing label.
            if "Contact" in value and stripped != CHINESE_STABLE_TARGET_EXCEPTION:
                fail(f"M4 {label} retains unapproved English Contact text: {stripped[:240]}")

    for path, expected in ((align.OUT_ZH_HTML, "zh-CN"), (align.OUT_EN_HTML, "en")):
        root = html_root(path)
        if root.get("lang") != expected:
            fail(f"M4 {path.name} language attribute is {root.get('lang')!r}, expected {expected!r}")

    # These four labels were specifically found as bilingual category residue
    # in the Chinese source; their complete removal is a hard language gate.
    for path, values in (
        (align.OUT_ZH_DOCX, chinese_docx_values),
        (align.OUT_ZH_HTML, chinese_html_values),
    ):
        for marker in ("AI Solutions", "Edge Intelligence", "Custom Digital Products", "Digital Transformation"):
            if any(marker in value for value in values):
                fail(f"M4 {path.name} retains bilingual category residue: {marker}")


def assert_english_docx() -> list[str]:
    doc = Document(align.OUT_EN_DOCX)
    section_map = align.section_table_map(doc)
    if list(section_map) != EXPECTED_SECTIONS:
        fail(f"English DOCX section order mismatch: {list(section_map)}")
    if len(doc.tables) != 65:
        fail(f"English DOCX table count is {len(doc.tables)}, expected 65")
    leaked = []
    for value in docx_text(doc):
        remaining = value.replace(PATH_EXCEPTION, "")
        if align.HAN.search(remaining):
            leaked.append(value)
    if leaked:
        fail(f"English DOCX visible CJK outside machine-path exception: {leaked[:3]}")
    for section, expected in PROJECT_SETS.items():
        found = []
        for table in section_map[section]:
            for row in table.rows:
                if row.cells and align.norm(row.cells[0].text) == "Representative Projects":
                    found.append(row.cells[2].text)
        if found != [expected]:
            fail(f"{section} representative-project mapping mismatch: {found}")
    h04 = {}
    for table in section_map["H-04"]:
        for row in table.rows:
            if len(row.cells) >= 3 and row.cells[0].text.strip() in {"H-04-01", "H-04-02", "H-04-03"}:
                h04[row.cells[0].text.strip()] = row.cells[2].text.strip()
    expected_h04 = {"H-04-01": "P-07-06", "H-04-02": "P-07-08", "H-04-03": "P-07-05"}
    if h04 != expected_h04:
        fail(f"English DOCX H-04 project mapping mismatch: {h04}")
    r06_text = " ".join(
        row.cells[2].text
        for table in section_map["R-06"]
        for row in table.rows[1:]
        if len(row.cells) >= 3
    )
    r06_found = set(re.findall(r"P-\d{2}(?:-\d{2})?", r06_text))
    if len(r06_found) != 20 or r06_found != R06_IDS:
        fail(f"English DOCX R-06 project IDs mismatch ({len(r06_found)}): {sorted(r06_found)}")
    p01 = ""
    for table in section_map["P-01"]:
        for row in table.rows:
            if row.cells and align.norm(row.cells[0].text) == "Inner-Page Introduction":
                p01 = row.cells[2].text
    required = "13 company/team industry cases presented on the original KOALA SYNC TECH website"
    if required not in p01 or "not evidence of individually owned contributions" not in p01:
        fail("English DOCX P-01 evidence limitation is incomplete")
    a_order = [section for section in section_map if section.startswith("A-")]
    if a_order != ["A-01", "A-02", "A-03", "A-04", "A-05", "A-06", "A-07", "A-08"]:
        fail(f"English DOCX A-section order mismatch: {a_order}")
    return list(dict.fromkeys(leaked))


def visible_html_text(root):
    for element in root.iter():
        if element.tag in {"script", "style"}:
            continue
        if element.text:
            yield element.text
        if element.tail:
            yield element.tail
        for key, value in element.attrib.items():
            if key not in {"id", "class", "data-code", "href", "src", "data-target", "lang"}:
                yield value


def html_codes(path: Path):
    root = html.fromstring(path.read_text(encoding="utf-8"))
    codes = [node.get("data-code") for node in root.xpath('//*[@data-code]')]
    if len(codes) != 38 or len(set(codes)) != 38:
        fail(f"{path.name} data-code count/uniqueness mismatch: {len(codes)}")
    return root, codes


def assert_english_html(chinese_codes: list[str]) -> None:
    root, codes = html_codes(align.OUT_EN_HTML)
    if root.get("lang") != "en":
        fail(f"English HTML lang is {root.get('lang')!r}")
    if codes != chinese_codes:
        fail("English/Chinese HTML data-code order differs")
    leaked = []
    for value in visible_html_text(root):
        remaining = value.replace(PATH_EXCEPTION, "")
        if align.HAN.search(remaining):
            leaked.append(value.strip())
    if leaked:
        fail(f"English HTML visible CJK outside machine-path exception: {leaked[:3]}")
    profile_ids = sorted(root.xpath('//*[starts-with(@id,"profile-")]/@id'))
    if profile_ids != ["profile-chaw", "profile-jeff", "profile-wendy"]:
        fail(f"English HTML profile keys mismatch: {profile_ids}")
    r06_text = " ".join(root.xpath('//*[@data-code="R-06"]//text()'))
    found_ids = set(re.findall(r"P-\d{2}(?:-\d{2})?", r06_text))
    if not R06_IDS.issubset(found_ids):
        fail(f"English HTML R-06 missing project IDs: {sorted(R06_IDS - found_ids)}")
    if "P-07-01, P-07-02, P-07-06" not in " ".join(root.xpath('//*[@data-code="R-02"]//text()')):
        fail("English HTML R-02 project set mismatch")
    if "P-05, P-07-03, P-07-08, P-07-09" not in " ".join(root.xpath('//*[@data-code="R-03"]//text()')):
        fail("English HTML R-03 project set mismatch")
    if "P-03, P-04, P-07-04, P-07-05, P-07-10" not in " ".join(root.xpath('//*[@data-code="R-04"]//text()')):
        fail("English HTML R-04 project set mismatch")
    p01_text = " ".join(root.xpath('//*[@data-code="P-01"]//text()'))
    if "13 company/team industry cases presented on the original KOALA SYNC TECH website" not in p01_text:
        fail("English HTML P-01 evidence limitation is incomplete")


def assert_chinese_html() -> None:
    root, _ = html_codes(align.OUT_ZH_HTML)
    if root.get("lang") != "zh-CN":
        fail(f"Chinese HTML lang is {root.get('lang')!r}")
    profile_ids = sorted(root.xpath('//*[starts-with(@id,"profile-")]/@id'))
    if profile_ids != ["profile-chaw", "profile-jeff", "profile-wendy"]:
        fail(f"Chinese HTML profile keys mismatch: {profile_ids}")
    raw = align.OUT_ZH_HTML.read_text(encoding="utf-8")
    for marker in ("AI Solutions｜", "Edge Intelligence｜", "Custom Digital Products｜", "Digital Transformation｜"):
        if marker in raw:
            fail(f"Chinese HTML retains ordinary bilingual category marker: {marker}")


def assert_terminology_lock() -> None:
    """M2 gate: canonical technical names and public field vocabulary."""
    doc = Document(align.OUT_EN_DOCX)
    all_text = "\n".join(docx_text(doc))
    forbidden = [
        "Completion note", "Home-page summary", "Inner-page introduction",
        "One-sentence definition", "Questions addressed", "Main research content",
        "Application scenarios", "Representative projects", "Additional notes",
        "Connection model", "Source attributes", "Fixed mapping", "Page title",
        "Scenario-to-Project Mapping", "On-device Vision", "technology-advantage",
        "concrete advantage and its boundary",
    ]
    for variant in forbidden:
        if variant in all_text:
            fail(f"English DOCX terminology variant remains: {variant}")
    required = [
        "HEALTH (Digital Health & Medical Image Analytics)",
        "EDGE-AI (Edge Intelligence & On-Device Vision)",
        "AGENT (Multi-Agent Systems & NLP)",
        "R-06 Scenarios & Project Mapping",
        "Additional Industry Applications",
        "Enter the technology advantage name.",
        "Describe the specific advantage and applicability boundaries.",
        "Affiliation",
        "Collaboration Direction & Related IDs",
        "Scope & Notes",
    ]
    for term in required:
        if term not in all_text:
            fail(f"English DOCX canonical term missing: {term}")
    for name in ["Dr. Chaw Jun Kit", "Dr. Jeff Wang", "Wendy Leong Pooi Yan"]:
        if name not in all_text:
            fail(f"English DOCX confirmed name missing: {name}")

    raw = align.OUT_EN_HTML.read_text(encoding="utf-8")
    for variant in forbidden:
        if variant in raw:
            fail(f"English HTML terminology variant remains: {variant}")
    for term in [
        "Edge Intelligence &amp; On-Device Vision",
        "Scenarios &amp; Project Mapping",
        "Additional Industry Applications",
        "One-Sentence Definition",
        "Key Questions",
        "Main Research Content",
        "Application Scenarios",
        "Representative Projects",
        "Additional Notes",
        "Scope & Prerequisites",
    ]:
        if term not in raw:
            fail(f"English HTML canonical term missing: {term}")


def main() -> None:
    assert_english_docx()
    zh_root, zh_codes = html_codes(align.OUT_ZH_HTML)
    del zh_root
    assert_english_html(zh_codes)
    assert_chinese_html()
    assert_terminology_lock()
    assert_numeric_and_evidence()
    assert_machine_links()
    assert_docx_structure()
    assert_html_structure()
    assert_language_boundaries()
    print("PASS: stable sections, entity mappings, language boundaries, M2 terminology, M3 integrity, and M4 language scan")


if __name__ == "__main__":
    main()
