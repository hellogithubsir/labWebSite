import { expect, test } from "@playwright/test";

for (const width of [1920, 390, 320]) for (const chinese of [false, true]) {
  test(`research screen ${width} ${chinese ? "Chinese" : "English"} content and pillar action`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1080 });
    await page.goto("/");
    if (chinese) await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    if (width < 981) await page.getByRole("button", { name: chinese ? "菜单" : "Menu", exact: true }).click();
    await page.getByRole("navigation").getByRole("button", { name: chinese ? "研究方向" : "Research Directions", exact: true }).click();
    if (width < 981) await expect(page.locator("#screen-navigation")).toHaveCSS("visibility", "hidden");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(chinese ? "核心研究支柱" : "Core Research Pillars");
    const explore = page.getByRole("button", { name: chinese ? "探索研究支柱" : "Explore the Pillars", exact: true });
    await explore.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#research-pillars")).toBeFocused();
    await expect(page.getByRole("main")).toHaveAttribute("data-screen", "research");
    await expect(page).toHaveURL("http://127.0.0.1:3000/");
    for (const heading of chinese ? ["HEALTH（数字健康与医学影像分析）", "EDGE-AI（边缘智能与端侧视觉）", "AGENT（多智能体系统与自然语言处理）", "三大研究方向的协同关系", "从研究问题走向真实场景"] : ["HEALTH (Digital Health & Medical Image Analytics)", "EDGE-AI (Edge Intelligence & On-Device Vision)", "AGENT (Multi-Agent Systems & NLP)", "Relationship Among the Three Directions", "From research questions to real scenarios"]) {
      const item = page.getByRole("heading", { name: heading, exact: true });
      await item.scrollIntoViewIfNeeded();
      await expect(item).toBeVisible();
    }
    const mapping = page.locator('[data-od-id="research-mapping"]');
    for (const id of ["P-07-01", "P-07-02", "P-07-06", "P-05", "P-07-03", "P-07-08", "P-07-09", "P-03", "P-04", "P-07-04", "P-07-05", "P-07-10"]) await expect(mapping).toContainText(id);
    await expect(page.locator('[data-od-id="research-relationships"] article')).toHaveCount(3);
    for (const img of await page.locator("main img").all()) { await img.scrollIntoViewIfNeeded(); await expect(img).toHaveJSProperty("complete", true); expect(await img.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0); }
    for (const reveal of await page.locator("main [data-reveal]").all()) { await reveal.scrollIntoViewIfNeeded(); await expect(reveal).toHaveAttribute("data-reveal", "visible"); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await explore.click();
    await expect(page.locator("#research-pillars")).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`research-${chinese ? "zh-CN" : "en"}-${width}.png`), fullPage: true });
  });
}
