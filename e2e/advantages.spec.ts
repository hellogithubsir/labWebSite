import { expect, test } from "@playwright/test";

for (const width of [1920, 390, 320]) for (const chinese of [false, true]) {
  test(`advantages screen ${width} ${chinese ? "Chinese" : "English"} content and independent disclosure`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1080 });
    await page.goto("/");
    if (chinese) await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    if (width < 981) await page.getByRole("button", { name: chinese ? "菜单" : "Menu", exact: true }).click();
    await page.getByRole("navigation").getByRole("button", { name: chinese ? "技术优势" : "Technology Advantages", exact: true }).click();
    if (width < 981) await expect(page.locator("#screen-navigation")).toHaveCSS("visibility", "hidden");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(chinese ? "技术优势" : "Technology Advantages");
    await expect(page.locator("main h3")).toHaveText(chinese ? ["预测分析与知识蒸馏", "大语言模型与多模态情绪编排", "面向硬件优化的边缘视觉检测", "跨模型技能编译与运行治理+", "用户可控的分层人工智能记忆+", "效用—多样性训练数据选择+", "设备端智能体与硬件协同+", "可验证反馈驱动的持续学习+"] : ["Predictive Analytics & Knowledge Distillation", "LLM & Multi-modal Emotional Orchestration", "Hardware-Optimized Edge Vision Detection", "Cross-Model Skill Compilation & Runtime Governance+", "User-Controlled Layered AI Memory+", "Utility-Diversity Training Data Selection+", "On-Device Agents & Hardware Co-Design+", "Verifiable Feedback-Driven Continual Learning+"]);
    for (const reveal of await page.locator("main [data-reveal]").all()) { await reveal.scrollIntoViewIfNeeded(); await expect(reveal).toHaveAttribute("data-reveal", "visible"); }
    for (const img of await page.locator("main img").all()) { await img.scrollIntoViewIfNeeded(); await expect(img).toHaveJSProperty("complete", true); expect(await img.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0); }
    const buttons = page.locator("main button[aria-expanded]");
    await expect(buttons).toHaveCount(5);
    for (const button of await buttons.all()) await expect(button).toHaveAttribute("aria-expanded", "false");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.mouse.move(0, 0);
    await page.screenshot({ path: testInfo.outputPath(`advantages-${chinese ? "zh-CN" : "en"}-${width}.png`), fullPage: true });
    for (let i = 0; i < 5; i++) {
      const button = buttons.nth(i), panel = page.locator(`#advantage-panel-${i + 4}`);
      await expect(panel).toHaveAttribute("aria-hidden", "true");
      await expect(page.getByRole("region", { name: await button.locator("strong").innerText() })).toHaveCount(0);
      await expect(panel).toHaveCSS("transition-duration", "0.3s");
      await button.click();
      await expect(button).toHaveAttribute("aria-expanded", "true");
      await expect(panel).toHaveAttribute("aria-hidden", "false");
      await expect(page.getByRole("region", { name: await button.locator("strong").innerText() })).toHaveCount(1);
      await expect(panel).toHaveCSS("visibility", "visible");
      await expect(panel).toHaveCSS("grid-template-rows", /[1-9]/);
      if (i === 0 && width === 1920) { await expect.poll(() => panel.evaluate(node => node.getAnimations().length)).toBe(0); await page.evaluate(() => window.scrollTo(0, 0)); await page.mouse.move(0, 0); await page.screenshot({ path: testInfo.outputPath(`advantages-${chinese ? "zh-CN" : "en"}-1920-A04.png`), fullPage: true }); }
      await button.focus(); await page.keyboard.press("Enter");
      await expect(button).toHaveAttribute("aria-expanded", "false");
      await expect(panel).toHaveAttribute("aria-hidden", "true");
      await expect(page.getByRole("region", { name: await button.locator("strong").innerText() })).toHaveCount(0);
      await expect(panel).toHaveCSS("visibility", "hidden");
      await page.keyboard.press("Space");
      await expect(button).toHaveAttribute("aria-expanded", "true");
      await expect(button).toBeFocused();
    }
    for (const button of await buttons.all()) await expect(button).toHaveAttribute("aria-expanded", "true");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await buttons.first().click(); await buttons.first().click();
    await expect(page.locator("#advantage-panel-4")).toHaveCSS("transition-duration", "0s");
    await expect(page.locator("#advantage-panel-4")).toHaveAttribute("aria-hidden", "false");
    await expect(page).toHaveURL("http://127.0.0.1:3000/");
  });
}
