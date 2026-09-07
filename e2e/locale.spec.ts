import { expect, test } from "@playwright/test";

test("locale pointer switch updates the current screen and document language", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "切换为中文", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("在边缘端连接人类感知与机器智能。");
  await expect(page.getByRole("navigation", { name: "主导航" }).getByRole("button")).toHaveCount(7);
  await expect(page.getByRole("button", { name: "跳至正文" })).toHaveCount(1);
  await expect(page.getByRole("img", { name: "怡和实验室", exact: true })).toHaveCount(1);
});

const screens = [
  ["home", "Home", "首页"], ["research", "Research Directions", "研究方向"],
  ["projects", "Projects", "项目展示"], ["advantages", "Technology Advantages", "技术优势"],
  ["partners", "Partners", "合作伙伴"], ["team", "Team", "团队"], ["contact", "Contact", "联系合作"],
] as const;

for (const width of [1920, 390, 320]) {
  test(`locale ${width} keyboard control and seven shell screens preserve language until refresh`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1080 });
    await page.goto("/");
    const mobile = width < 981;
    if (mobile) {
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await page.keyboard.press("Tab");
    } else {
      await page.getByRole("button", { name: "切换为中文", exact: true }).focus();
    }
    await expect(page.getByRole("button", { name: "切换为中文", exact: true })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("button", { name: "Switch to English", exact: true })).toBeFocused();
    if (mobile) {
      await expect(page.getByRole("button", { name: "关闭菜单", exact: true })).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Escape");
      await expect(page.getByRole("button", { name: "菜单", exact: true })).toBeFocused();
    }
    for (const locale of ["zh-CN", "en"] as const) {
      if (locale === "en") {
        await page.getByRole("button", { name: "Switch to English", exact: true }).press("Space");
      }
      const chinese = locale === "zh-CN";
      for (const [id, english, chineseLabel] of screens) {
        if (mobile) await page.getByRole("button", { name: chinese ? "菜单" : "Menu", exact: true }).click();
        const navigation = page.getByRole("navigation", { name: chinese ? "主导航" : "Primary navigation" });
        await expect(navigation.getByRole("button")).toHaveText(screens.map(([, en, zh], i) => `${String(i + 1).padStart(2, "0")}${chinese ? zh : en}`));
        await navigation.getByRole("button", { name: chinese ? chineseLabel : english, exact: true }).click();
        if (mobile) await expect(page.locator("#screen-navigation")).toHaveCSS("visibility", "hidden");
        await expect(page.getByRole("main")).toHaveAttribute("data-screen", id);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(id === "home"
          ? chinese ? "在边缘端连接人类感知与机器智能。" : "Bridging Human Perception and Machine Intelligence at the Edge."
          : chinese ? chineseLabel : english);
        await expect(page.getByRole("img")).toHaveAttribute("alt", chinese ? "怡和实验室" : "Harmonizing Intelligence Lab");
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        await expect(page).toHaveURL("http://127.0.0.1:3000/");
        await page.screenshot({ path: testInfo.outputPath(`shell-${id}-${locale}-${width}.png`), fullPage: true });
      }
    }
    await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    await expect(page.getByRole("main")).toHaveAttribute("data-screen", "contact");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("main")).toHaveAttribute("data-screen", "home");
    expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  });
}
