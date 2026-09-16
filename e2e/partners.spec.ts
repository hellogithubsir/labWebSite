import { expect, test } from "@playwright/test";

const names = {
  en: ["Advantech", "HILTI Asia IT Services", "Tokio Marine & Dynafront", "Xiamen University Malaysia", "Leeds Beckett University", "Three-Opp (M) Sdn. Bhd.", "Universiti Tenaga Nasional (UNITEN)", "Asia Roofing Industry", "Mobiva"],
  zh: ["Advantech（研华科技）", "HILTI 亚洲 IT 服务", "Tokio Marine & Dynafront", "厦门大学马来西亚分校", "利兹贝克特大学", "Three-Opp (M) Sdn. Bhd.", "马来西亚国能大学（UNITEN）", "Asia Roofing Industry（亚洲屋面工业）", "Mobiva"],
};
for (const width of [1920, 390, 320]) for (const chinese of [false, true]) {
  test(`partners screen ${width} ${chinese ? "Chinese" : "English"} directory and contact`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1080 });
    await page.goto("/");
    if (chinese) await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    if (width < 981) await page.getByRole("button", { name: chinese ? "菜单" : "Menu", exact: true }).click();
    await page.getByRole("navigation").getByRole("button", { name: chinese ? "合作伙伴" : "Partners", exact: true }).click();
    if (width < 981) await expect(page.locator("#screen-navigation")).toHaveCSS("visibility", "hidden");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(chinese ? "合作伙伴" : "Partners");
    await expect(page.locator("main h3")).toHaveText(chinese ? names.zh : names.en);
    await expect(page.locator('[data-od-id="partners-hero"]')).toContainText(chinese ? "怡合智能与全球科技领军企业和一流学术机构保持紧密、活跃的合作，共同推动边缘计算与医学人工智能的研发和部署。" : "The HI Lab maintains close, active collaborations with global tech leaders and top-tier academic institutions to drive the R&D and deployment of Edge Computing and Medical AI.");
    await expect(page.locator('[data-od-id="partners-introduction"]')).toContainText(chinese ? "产业伙伴提供部署约束与现场数据。学术伙伴提供共享方法、评估与发表渠道。实验室通过边缘计算与医学人工智能连接双方。" : "Industry partners contribute deployment constraints and field data. Academic partners contribute shared methods, evaluation and publication pathways. The lab connects both through Edge Computing and Medical AI.");
    await expect(page.locator('[data-od-id="partners-directory"] img')).toHaveCount(10);
    const logo = page.locator('[data-od-id="partners-hero"] img');
    await expect(logo).toHaveAttribute("alt", chinese ? "怡合智能" : "Harmonizing Intelligence Lab");
    await expect(logo).toHaveJSProperty("complete", true);
    expect(await logo.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
    for (const reveal of await page.locator("main [data-reveal]").all()) { await reveal.scrollIntoViewIfNeeded(); await expect(reveal).toHaveAttribute("data-reveal", "visible"); }
    for (const title of await page.locator("main h3").all()) {
      expect(await title.evaluate(node => node.scrollWidth <= node.clientWidth && node.scrollHeight <= node.clientHeight)).toBe(true);
    }
    await expect.poll(() => page.locator("main").evaluate(node => node.getAnimations({ subtree: true }).filter(animation => animation.playState === "running").length)).toBe(0);
    const cards = page.locator('[data-od-id="partners-directory"] article');
    await expect(cards).toHaveCount(9);
    await expect(cards.nth(2).getByRole("img")).toHaveCount(2);
    const expectedMarks = ["Advantech", "HILTI", "Tokio Marine Group", "Dynafront", "Xiamen University Malaysia", "Leeds Beckett University", "Three-Opp", "UNITEN", "AJIYA", "Mobiva"];
    expect(await cards.locator("img").evaluateAll(nodes => nodes.map(node => node.getAttribute("alt")))).toEqual(expectedMarks);
    for (const mark of await cards.locator("img").all()) {
      await mark.scrollIntoViewIfNeeded();
      await expect(mark).toHaveJSProperty("complete", true);
      await expect(mark).toHaveAttribute("src", /^\/images\/hil-site\/partners\//);
      expect(await mark.evaluate((node: HTMLImageElement) => node.naturalWidth > 0)).toBe(true);
      expect(await mark.evaluate((node: HTMLImageElement) => Math.abs(node.getBoundingClientRect().width / node.getBoundingClientRect().height - node.naturalWidth / node.naturalHeight))).toBeLessThan(0.04);
    }
    const first = await cards.nth(0).boundingBox(), second = await cards.nth(1).boundingBox();
    expect(first && second).toBeTruthy();
    if (width === 1920) {
      expect(first!.y).toBe(second!.y);
      expect((await cards.nth(2).boundingBox())!.y).toBe(first!.y);
      expect((await cards.nth(3).boundingBox())!.y).toBeGreaterThan(first!.y);
    } else expect(second!.y).toBeGreaterThan(first!.y);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.getByRole("link", { name: "chawjk@ukm.edu.my" })).toHaveAttribute("href", "mailto:chawjk@ukm.edu.my");
    await page.evaluate(() => window.scrollTo(0, 0)); await page.mouse.move(0, 0);
    await expect.poll(() => page.locator("main").evaluate(node => node.getAnimations({ subtree: true }).filter(animation => animation.playState === "running").length)).toBe(0);
    await page.screenshot({ path: testInfo.outputPath(`partners-${chinese ? "zh-CN" : "en"}-${width}.png`), fullPage: true });
    await page.getByRole("button", { name: chinese ? "更好的智能，源于共同构建。" : "Better intelligence is built together.", exact: true }).click();
    await expect(page.locator("main")).toHaveAttribute("data-screen", "contact");
    await expect(page).toHaveURL("http://127.0.0.1:3000/");
  });
}
