import { expect, test, type Page } from "@playwright/test";

async function navigate(page: Page, screen: string) {
  const menu = page.locator('[data-od-id="menu-toggle"]');
  if (await menu.isVisible()) await menu.click();
  await page.locator(`[data-od-id="nav-${screen}"]`).click();
  await expect(page.locator("main")).toHaveAttribute("data-screen", screen);
  await expect(page.locator("[data-page-transition]")).toHaveAttribute("data-page-transition", "idle");
}

async function prepareScreenshot(page: Page) {
  for (const item of await page.locator("main [data-reveal]").all()) await item.scrollIntoViewIfNeeded();
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    expect(await image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.evaluate(() => window.scrollTo(0, 0));
}

function imagePath(src: string) {
  const url = new URL(src, "http://127.0.0.1:3000");
  return url.searchParams.get("url") ?? url.pathname;
}

for (const width of [1920, 1440, 390, 320]) for (const chinese of [false, true]) {
  test(`cross-page consistency ${width} ${chinese ? "zh" : "en"}`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 1080 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    if (chinese) await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    const cards = page.locator('[data-od-id="home-projects"] article');
    await expect(cards).toHaveCount(2);
    await expect(cards.locator("h3")).toHaveText(chinese ? ["E-Linus 智慧养老照护", "PDM Robot 资产剩余寿命监测"] : ["E-Linus Smart Elderly Care", "PDM Robot Asset RUL Monitor"]);
    await prepareScreenshot(page);
    const featured = await cards.evaluateAll(nodes => nodes.map(node => {
      const img = node.querySelector("img")!;
      const rect = img.getBoundingClientRect(), card = node.getBoundingClientRect(), paragraph = node.querySelector("p")!.getBoundingClientRect();
      return { title: node.querySelector("h3")!.textContent, description: node.querySelector("p")!.textContent, src: img.getAttribute("src")!, alt: img.alt, ratio: rect.width / rect.height, naturalRatio: img.naturalWidth / img.naturalHeight, fit: getComputedStyle(img).objectFit, cardX: card.x, cardY: card.y, cardWidth: card.width, cardBottom: card.bottom, imageY: rect.y, imageBottom: rect.bottom, textBottom: paragraph.bottom };
    }));
    for (const item of featured) {
      expect(item.ratio).toBeCloseTo(item.naturalRatio, 2);
      expect(item.fit).toBe("contain");
      expect(item.imageY).toBeGreaterThanOrEqual(item.textBottom);
      expect(item.imageBottom).toBeLessThanOrEqual(item.cardBottom);
    }
    if (width > 980) {
      expect(featured[0].cardWidth).toBeCloseTo(featured[1].cardWidth, 0);
      expect(featured[0].cardY).toBeCloseTo(featured[1].cardY, 0);
      expect(featured[1].cardX).toBeGreaterThan(featured[0].cardX);
    } else expect(featured[1].cardY).toBeGreaterThanOrEqual(featured[0].cardBottom);
    expect(featured.map(item => imagePath(item.src))).toEqual(["/images/hil-site/projects/elinus-overview.png", "/images/hil-site/projects/frame-05.png"]);
    const capabilities = await page.locator('[data-od-id^="home-capability-"]').evaluateAll(nodes => nodes.map(node => ({ title: node.querySelector("h3")!.textContent, description: node.querySelector("p")!.textContent })));
    const partners = await page.locator('[data-od-id="home-partners"] li').allTextContents();
    await expect(page.locator('[data-od-id="home-projects"]')).toContainText(chinese ? "120 万令吉" : "RM 1.2M");
    expect(await page.locator('[data-od-id="home-capabilities"]').innerText()).not.toMatch(/极高|深层的情境感知和同理心|毫秒|exceptionally high|profound.*empathy|millisecond/i);
    await page.screenshot({ path: testInfo.outputPath(`home-${chinese ? "zh" : "en"}-${width}.png`), fullPage: true, animations: "disabled" });
    await page.locator('[data-od-id="home-projects"] h2 button').press("Enter");
    await expect(page.locator("main")).toHaveAttribute("data-screen", "projects");
    for (const [index, id] of ["elinus", "pdm"].entries()) {
      const section = page.locator(`[data-od-id="projects-${id}"]`);
      await expect(section.locator(`#${id}-title`)).toHaveText(featured[index].title!);
      await expect(section.locator(`#${id}-title`).locator("..").locator("p").last()).toHaveText(featured[index].description!);
      const image = section.getByRole("img");
      await expect(image).toHaveAttribute("alt", featured[index].alt);
      expect(imagePath((await image.getAttribute("src"))!)).toBe(imagePath(featured[index].src));
    }
    await navigate(page, "advantages");
    for (const [index, id] of ["a01", "a02", "a03"].entries()) {
      const item = page.locator(`[data-od-id="advantage-${id}"]`);
      await expect(item.locator("h3")).toHaveText(capabilities[index].title!);
      await expect(item.locator("[data-advantage-description]")).toHaveText(capabilities[index].description!);
    }
    await navigate(page, "partners");
    for (const [index, id] of ["advantech", "hilti", "tokio-dynafront", "xmum", "leeds-beckett", "three-opp"].entries()) {
      await expect(page.locator(`[data-od-id="partner-${id}"] h3`)).toHaveText(partners[index]);
    }
    await navigate(page, "team");
    const jeff = page.locator('[data-od-id="team-t-04-04"]');
    await expect(jeff.locator("h3")).toHaveText(chinese ? "王泓清博士（Jeff Wang）" : "Dr. Jeff Wang");
    await expect(jeff).toHaveAttribute("data-member-type", "graduate");
    await expect(jeff.locator("p").first()).toHaveText(chinese ? "博士毕业生" : "PhD Graduate");
    await expect(jeff).toContainText("Wang Hongqing");
    await expect(page.locator('[data-od-id="team-composition"] dd:nth-child(1)')).toHaveText(["04", "06", "03", "02"]);
    await expect(page.locator('[data-od-id="team-composition"]')).toContainText(chinese ? "作为主要导师已培养 2 名毕业生" : "2 completed as Main Supervisor");
    await expect(page.locator('[data-od-id="team-members-note"]')).toContainText(chinese ? "以下展示部分研究人员" : "selected researchers");
    await expect(page.getByRole("button", { name: chinese ? "全部展示成员" : "All listed members", exact: true })).toHaveAttribute("aria-pressed", "true");
    await prepareScreenshot(page);
    await page.screenshot({ path: testInfo.outputPath(`team-${chinese ? "zh" : "en"}-${width}.png`), fullPage: true, animations: "disabled" });
    for (const [name, count, includesJeff] of [[chinese ? "毕业生" : "Graduates", 7, true], [chinese ? "在读研究生" : "Candidates", 2, false]] as const) {
      await page.getByRole("button", { name, exact: true }).press("Enter");
      await expect(page.locator('[data-od-id="team-members"] article')).toHaveCount(count);
      await expect(jeff).toHaveCount(includesJeff ? 1 : 0);
    }
    await expect(page.locator("html")).toHaveAttribute("lang", chinese ? "zh-CN" : "en");
    await expect(page).toHaveURL("http://127.0.0.1:3000/");
    expect(errors).toEqual([]);
  });
}
