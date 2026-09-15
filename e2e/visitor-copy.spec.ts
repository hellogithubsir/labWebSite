import { expect, test } from "@playwright/test";

const screens = ["home", "research", "projects", "advantages", "partners", "team", "contact"];
const internalCopy = /\b[ACPRNTH]-\d{2}(?:-\d{2})?\b|preview\.html|\.mp4|frame extracted|第\s*\d+\s*秒提取|Fixed references|对应 A-|project IDs|项目编号|image rhythm|图片节奏|logo wall|标识墙|supplied partner directory|合作伙伴名录中的机构|one-sentence bio|一句话简介|fixed .*order|固定顺序|content package|内容资料尚未提供|guided horizontal story|引导式横向故事|55-second operational demonstration|55\s*秒操作演示/i;
for (const width of [1920, 390, 320]) for (const chinese of [false, true]) for (const screen of screens) {
  test(`visitor copy ${screen} ${chinese ? "Chinese" : "English"} ${width}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: width === 1920 ? 1080 : 844 });
    await page.goto("/");
    if (chinese) await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    if (width < 981) await page.locator('[data-od-id="menu-toggle"]').click();
    await page.locator(`[data-od-id="nav-${screen}"]`).click();
    if (width < 981) await expect(page.locator("#screen-navigation")).toBeHidden();
    await expect(page.locator("main")).toHaveAttribute("data-screen", screen);
    await expect(page.locator("[data-page-transition]")).toHaveAttribute("data-page-transition", "idle");
    await expect(page.locator(`[data-od-id="${screen}-hero"]`)).toBeVisible();
    for (const reveal of await page.locator("main [data-reveal]").all()) {
      await reveal.evaluate(node => node.scrollIntoView({ block: "center", behavior: "instant" }));
      await expect(reveal).toHaveAttribute("data-reveal", "visible");
    }
    // 只检查当前可访问的图片文件，避免滚动隐藏轮播；示意图由专项测试验证。
    for (const img of await page.locator("main").getByRole("img").and(page.locator("img")).all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty("complete", true);
      expect(await img.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
    }
    if (screen === "projects") {
      const carousels = page.locator('main [data-od-id^="project-carousel-"]');
      for (const [index, carousel] of (await carousels.all()).entries()) {
        await expect(carousel.getByRole("status")).toHaveText(index === 0 ? "1 / 4" : "2 / 4");
        const viewport = carousel.getByRole("group");
        await expect.poll(() => viewport.evaluate(node => node.scrollLeft)).toBe(0);
        await expect.poll(async () => {
          const active = await carousel.locator('article[aria-hidden="false"]').boundingBox();
          const frame = await viewport.boundingBox();
          return active && frame ? Math.round(active.x - frame.x) : null;
        }).toBe(0);
      }
    }
    await page.evaluate(() => document.fonts.ready);
    expect(await page.locator("main").innerText()).not.toMatch(internalCopy);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await expect(page.locator("html")).toHaveAttribute("lang", chinese ? "zh-CN" : "en");
    if (screen === "research") await expect(page.locator("main")).toContainText("LLM");
    if (screen === "team") await expect(page.locator("main")).toContainText("50");
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.locator("main").getByRole("img").and(page.locator("img")).first().evaluate(async (node: HTMLImageElement) => {
      await node.decode();
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    });
    await page.mouse.move(0, 0);
    await page.screenshot({ path: testInfo.outputPath(`${screen}-${chinese ? "zh-CN" : "en"}.png`), fullPage: true, animations: "disabled" });
  });
}
