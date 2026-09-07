import { expect, test } from "@playwright/test";

test("home full page lower sections are present in design order", async ({ page }) => {
  await page.goto("/");
  const ids = ["home-projects", "home-partners", "home-lab", "home-team", "home-footer"];
  for (const id of ids) await expect(page.locator(`[data-od-id="${id}"]`)).toHaveCount(1);
  expect(await page.locator(ids.map(id => `[data-od-id="${id}"]`).join(",")).evaluateAll(nodes => nodes.map(node => node.getAttribute("data-od-id")))).toEqual(ids);
});

test("home upper primary CTA preserves URL and locale", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explore Research", exact: true }).click();
  await expect(page.getByRole("main")).toHaveAttribute("data-screen", "research");
  await expect(page).toHaveURL("http://127.0.0.1:3000/");
  await page.getByRole("navigation").getByRole("button", { name: "Home", exact: true }).click();
  await expect(page.getByRole("main")).toHaveAttribute("data-screen", "home");
  await page.getByRole("button", { name: "切换为中文", exact: true }).click();
  await page.getByRole("main").getByRole("button", { name: "联系合作", exact: true }).click();
  await expect(page.getByRole("main")).toHaveAttribute("data-screen", "contact");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page).toHaveURL("http://127.0.0.1:3000/");
});

for (const width of [1920, 390, 320]) {
  for (const locale of ["en", "zh-CN"]) {
    test(`home upper ${locale} ${width} content and responsive layout`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 1080 });
      await page.goto("/");
      if (locale === "zh-CN") {
        if (width < 981) await page.getByRole("button", { name: "Menu", exact: true }).click();
        await page.getByRole("button", { name: "切换为中文", exact: true }).click();
        if (width < 981) {
          await page.keyboard.press("Escape");
          await expect(page.locator("#screen-navigation")).toHaveCSS("visibility", "hidden");
        }
      }
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.locator('[data-od-id^="home-direction-"]')).toHaveCount(3);
      await expect(page.locator('[data-od-id^="home-capability-"]')).toHaveCount(3);
      for (const region of await page.locator('[data-od-id^="home-direction-"], [data-od-id^="home-capability-"]').all()) {
        await region.scrollIntoViewIfNeeded();
        await expect(region).toBeVisible();
        await expect(region.locator("..")).toHaveAttribute("data-reveal", "visible");
      }
      await expect(page.getByRole("heading", { name: locale === "en" ? "Predictive Analytics & Knowledge Distillation" : "预测分析与知识蒸馏", exact: true })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      for (const image of await page.locator("main img").all()) { await image.scrollIntoViewIfNeeded(); await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0)).toBe(true); }
      expect(await page.locator("main img").evaluateAll((images) => images.every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(650);
      await page.screenshot({ path: testInfo.outputPath(`home-${locale}-${width}.png`), fullPage: true });
    });
  }
}

for (const width of [1920, 390, 320]) {
  for (const locale of ["en", "zh-CN"]) {
    test(`home full page ${locale} ${width} media layout and navigation`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 1080 });
      await page.goto("/");
      if (locale === "zh-CN") {
        if (width < 981) await page.getByRole("button", { name: "Menu", exact: true }).click();
        await page.getByRole("button", { name: "切换为中文", exact: true }).click();
        if (width < 981) { await page.keyboard.press("Escape"); await expect(page.locator("#screen-navigation")).toHaveCSS("visibility", "hidden"); }
      }
      await expect(page.locator('[data-od-id="home-projects"] article')).toHaveCount(3);
      await expect(page.locator('[data-od-id="home-partners"] li')).toHaveCount(6);
      await expect(page.locator('[data-od-id="home-lab"] figure')).toHaveCount(4);
      await expect(page.locator('[data-od-id="home-team"] li')).toHaveCount(4);
      for (const node of await page.locator("[data-reveal]").all()) {
        await node.scrollIntoViewIfNeeded();
        await expect(node).toHaveAttribute("data-reveal", "visible");
      }
      await expect(page.locator('[data-od-id="home-footer"] a')).toHaveAttribute("href", "mailto:chawjk@ukm.edu.my");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(await page.locator("main img").evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(650);
      await page.screenshot({ path: testInfo.outputPath(`home-full-${locale}-${width}.png`), fullPage: true });
      for (const [region, screen] of [["home-projects", "projects"], ["home-partners", "partners"], ["home-team", "team"], ["home-footer", "contact"]]) {
        await page.locator(`[data-od-id="${region}"] h2 button`).click();
        await expect(page.getByRole("main")).toHaveAttribute("data-screen", screen);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page).toHaveURL("http://127.0.0.1:3000/");
        if (width < 981) await page.getByRole("button", { name: locale === "en" ? "Menu" : "菜单", exact: true }).click();
        await page.getByRole("navigation").getByRole("button", { name: locale === "en" ? "Home" : "首页", exact: true }).click();
        await expect(page.getByRole("main")).toHaveAttribute("data-screen", "home");
      }
    });
  }
}
