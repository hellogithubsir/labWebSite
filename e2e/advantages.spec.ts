import { expect, test, type Page } from "@playwright/test";

const titles = {
  "zh-CN": ["预测分析与知识蒸馏", "大语言模型与多模态情绪编排", "面向硬件优化的边缘视觉检测", "跨模型技能编译与运行治理", "用户可控的分层人工智能记忆", "效用—多样性训练数据选择", "设备端智能体与硬件协同", "可验证反馈驱动的持续学习"],
  en: ["Predictive Analytics & Knowledge Distillation", "LLM & Multimodal Emotional Orchestration", "Hardware-Optimized Edge Vision Detection", "Cross-Model Skill Compilation & Runtime Governance", "User-Controlled Layered AI Memory", "Utility–Diversity Training Data Selection", "On-Device Agents & Hardware Co-Design", "Verifiable Feedback-Driven Continual Learning"],
};
const diagramLabels = {
  "zh-CN": ["知识迁移", "情境理解", "压缩部署", "运行反馈", "长期记忆", "效用与多样性", "本地记忆", "版本记录"],
  en: ["Knowledge transfer", "Context", "Compression", "Runtime feedback", "Long-term memory", "Utility & diversity", "Local memory", "Version records"],
};

async function navigate(page: Page, screen: string) {
  const menu = page.locator('[data-od-id="menu-toggle"]');
  if (await menu.isVisible()) await menu.click();
  await page.locator(`[data-od-id="nav-${screen}"]`).click();
  await expect(page.locator("main")).toHaveAttribute("data-screen", screen);
  await expect(page.locator("[data-page-transition]")).toHaveAttribute("data-page-transition", "idle");
}

for (const width of [1920, 1440, 1024, 390, 320]) for (const locale of ["en", "zh-CN"] as const) {
  test(`advantages ${width} ${locale}: eight visible illustrated capabilities`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.setViewportSize({ width, height: 1080 });
    await page.goto("/");
    if (locale === "zh-CN") await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    await navigate(page, "advantages");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(locale === "zh-CN" ? "技术优势" : "Technology Advantages");
    await expect(page.getByRole("heading", { level: 2 }).first()).toHaveText(locale === "zh-CN" ? "核心技术" : "Core technologies");
    await expect(page.getByRole("heading", { name: locale === "zh-CN" ? "前沿技术储备" : "Frontier research", exact: true })).toBeVisible();
    const items = page.locator('main article[data-od-id^="advantage-a0"]');
    await expect(items).toHaveCount(8);
    await expect(items.getByRole("heading", { level: 3 })).toHaveText(titles[locale]);
    await expect(page.locator("main button[aria-expanded]")).toHaveCount(0);
    await expect(page.locator("main [data-diagram]")).toHaveCount(9);
    if (width > 980) {
      const logo = page.getByRole("img", { name: locale === "zh-CN" ? "怡合智能" : "Harmonizing Intelligence Lab", exact: true });
      await expect(logo).toHaveJSProperty("complete", true);
      expect(await logo.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
    }
    for (let index = 0; index < 8; index++) {
      const item = items.nth(index), diagram = item.locator("[data-diagram]");
      await item.scrollIntoViewIfNeeded();
      await expect(item.locator("[data-reveal]")).toHaveAttribute("data-reveal", "visible");
      await expect(item.locator("[data-advantage-description]")).toBeVisible();
      await expect(item.locator("[data-advantage-value]")).toBeVisible();
      await expect(diagram).toBeVisible();
      await expect(diagram).toHaveAccessibleName(new RegExp(diagramLabels[locale][index]));
      await expect(diagram).toContainText(diagramLabels[locale][index]);
      const bounds = await item.evaluate(node => {
        const title = node.querySelector("h3")!.getBoundingClientRect();
        const description = node.querySelector("[data-advantage-description]")!.getBoundingClientRect();
        const diagram = node.querySelector("[data-diagram]")!.getBoundingClientRect();
        const labels = [...node.querySelectorAll("[data-diagram] span")].map(label => {
          const rect = label.getBoundingClientRect();
          return { x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom, font: parseFloat(getComputedStyle(label).fontSize) };
        });
        const luminance = (color: string) => {
          const rgb = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(value => {
            const channel = value / 255;
            return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
          });
          return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
        };
        const contrast = [...node.querySelectorAll("h3, p, span")].filter(element => element.children.length === 0).map(element => {
          let ancestor: Element | null = element;
          while (ancestor && getComputedStyle(ancestor).backgroundColor === "rgba(0, 0, 0, 0)") ancestor = ancestor.parentElement;
          const foreground = luminance(getComputedStyle(element).color);
          const background = luminance(ancestor ? getComputedStyle(ancestor).backgroundColor : "rgb(255,255,255)");
          return (Math.max(foreground, background) + .05) / (Math.min(foreground, background) + .05);
        });
        return { contrast, title: { x: title.x, right: title.right }, description: { bottom: description.bottom }, diagram: { x: diagram.x, y: diagram.y, right: diagram.right, bottom: diagram.bottom }, labels };
      });
      for (const ratio of bounds.contrast) expect(ratio).toBeGreaterThanOrEqual(4.5);
      if (width > 980) expect(bounds.title.right).toBeLessThanOrEqual(bounds.diagram.x);
      else expect(bounds.description.bottom).toBeLessThanOrEqual(bounds.diagram.y);
      for (const label of bounds.labels) {
        expect(label.font).toBeGreaterThanOrEqual(14);
        expect(label.x).toBeGreaterThanOrEqual(bounds.diagram.x - 1);
        expect(label.right).toBeLessThanOrEqual(bounds.diagram.right + 1);
        expect(label.bottom).toBeLessThanOrEqual(bounds.diagram.bottom + 1);
      }
      for (let a = 0; a < bounds.labels.length; a++) for (let b = a + 1; b < bounds.labels.length; b++) {
        const first = bounds.labels[a], second = bounds.labels[b];
        const overlap = Math.min(first.right, second.right) - Math.max(first.x, second.x) > 1 && Math.min(first.bottom, second.bottom) - Math.max(first.y, second.y) > 1;
        expect(overlap, `${index + 1}: labels ${a}/${b} overlap`).toBe(false);
      }
      await expect(item).toHaveCSS("background-color", [1, 5].includes(index) ? "rgb(8, 41, 86)" : [3, 7].includes(index) ? "rgb(243, 249, 249)" : "rgb(254, 254, 254)");
      await item.screenshot({ path: testInfo.outputPath(`item-${index + 1}.png`), animations: "disabled" });
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`advantages-${locale}-${width}.png`), fullPage: true, animations: "disabled" });
    expect(errors).toEqual([]);
    await expect(page).toHaveURL("http://127.0.0.1:3000/");
  });
}

for (const width of [1440, 320]) test(`advantages ${width}: language, reduced motion and both CTAs`, async ({ page }) => {
  await page.setViewportSize({ width, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await navigate(page, "advantages");
  for (const locale of ["zh-CN", "en"] as const) {
    await page.getByRole("button", { name: locale === "zh-CN" ? "切换为中文" : "Switch to English", exact: true }).press("Enter");
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("main h3")).toHaveText(titles[locale]);
    const diagrams = page.locator('main article [data-diagram]');
    for (let index = 0; index < 8; index++) await expect(diagrams.nth(index)).toHaveAccessibleName(new RegExp(diagramLabels[locale][index]));
    for (const reveal of await page.locator("main [data-reveal]").all()) {
      await expect(reveal).toHaveCSS("opacity", "1");
      await expect(reveal).toHaveCSS("transition-duration", "0s");
    }
    await page.getByRole("button", { name: locale === "zh-CN" ? "查看项目" : "View projects", exact: true }).press("Enter");
    await expect(page.locator("main")).toHaveAttribute("data-screen", "projects");
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await navigate(page, "advantages");
    await page.getByRole("button", { name: locale === "zh-CN" ? "联系合作" : "Collaborate", exact: true }).last().press("Space");
    await expect(page.locator("main")).toHaveAttribute("data-screen", "contact");
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page).toHaveURL("http://127.0.0.1:3000/");
    await navigate(page, "advantages");
  }
});
