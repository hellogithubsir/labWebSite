import { expect, test } from "@playwright/test";

const screens = ["home", "research", "projects", "advantages", "partners", "team", "contact"];
const internalCopy = /\b[ACPRNTH]-\d{2}(?:-\d{2})?\b|preview\.html|\.mp4|frame extracted|第\s*\d+\s*秒提取|Fixed references|对应 A-|project IDs|项目编号|image rhythm|图片节奏|logo wall|标识墙|supplied partner directory|合作伙伴名录中的机构|one-sentence bio|一句话简介|fixed .*order|固定顺序|content package|内容资料尚未提供/i;
for (const chinese of [false, true]) for (const screen of screens) {
  test(`visitor copy ${screen} ${chinese ? "Chinese" : "English"}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");
    if (chinese) await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    await page.locator(`[data-od-id="nav-${screen}"]`).click();
    await expect(page.locator("main")).toHaveAttribute("data-screen", screen);
    await expect(page.locator("[data-page-transition]")).toHaveAttribute("data-page-transition", "idle");
    await expect(page.locator(`[data-od-id="${screen}-hero"]`)).toBeVisible();
    for (const reveal of await page.locator("main [data-reveal]").all()) {
      await reveal.evaluate(node => node.scrollIntoView({ block: "center", behavior: "instant" }));
      await expect(reveal).toHaveAttribute("data-reveal", "visible");
    }
    for (const img of await page.locator("main img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty("complete", true);
      expect(await img.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
    }
    await page.evaluate(() => document.fonts.ready);
    expect(await page.locator("main").innerText()).not.toMatch(internalCopy);
    if (screen === "research") await expect(page.locator("main")).toContainText("LLM");
    if (screen === "team") await expect(page.locator("main")).toContainText("50");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.mouse.move(0, 0);
    await page.screenshot({ path: testInfo.outputPath(`${screen}-${chinese ? "zh-CN" : "en"}.png`), fullPage: true });
  });
}
