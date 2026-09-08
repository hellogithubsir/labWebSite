import { expect, test } from "@playwright/test";

test("site navigation initially exposes English Home and seven controls", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("button")).toHaveCount(7);
  await expect(page.locator('[aria-current="page"]')).toHaveText("01Home");
  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Bridging Human Perception and Machine Intelligence at the Edge.");
});

const screens = [
  ["home", "Home"], ["research", "Research Directions"], ["projects", "Projects"],
  ["advantages", "Technology Advantages"], ["partners", "Partners"], ["team", "Team"], ["contact", "Contact"],
] as const;

test("mobile keyboard 390 en no-preference closes after ArrowRight", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?navigation=keyboard#content");
  const menu = page.locator('[data-od-id="menu-toggle"]');
  await menu.click();
  await page.getByRole("navigation").getByRole("button", { name: "Home", exact: true }).press("ArrowRight");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await expect(page.getByRole("main")).toHaveAttribute("data-screen", "research");
});

for (const width of [390, 320, 1280]) {
  for (const locale of ["en", "zh-CN"] as const) {
    for (const reducedMotion of ["no-preference", "reduce"] as const) {
      test(`navigation four keys ${width} ${locale} ${reducedMotion} preserve screen focus and URL`, async ({ page }) => {
        await page.setViewportSize({ width, height: 844 });
        await page.emulateMedia({ reducedMotion });
        await page.goto("/?navigation=keyboard#content");
        if (locale === "zh-CN") await page.getByRole("button", { name: "切换为中文", exact: true }).click();
        const menu = page.locator('[data-od-id="menu-toggle"]');
        const navigation = page.locator("#screen-navigation");
        const mobile = width < 981;

        if (mobile) {
          await menu.click();
          await expect(page.locator("main").locator("xpath=ancestor-or-self::*[@inert]")).toHaveCount(1);
          await page.locator("main").focus();
          await expect(menu).toBeFocused();
          await navigation.locator('[data-od-id="nav-contact"]').focus();
          await page.keyboard.press("Tab");
          await expect(menu).toBeFocused();
          await page.keyboard.press("Shift+Tab");
          await expect(navigation.locator('[data-od-id="nav-contact"]')).toBeFocused();
          await page.keyboard.press("Escape");
          await expect(menu).toHaveAttribute("aria-expanded", "false");
          await expect(menu).toBeFocused();
          await expect(navigation).toBeHidden();
        }

        for (const [key, from, target] of [
          ["ArrowRight", "home", "research"],
          ["End", "research", "contact"],
          ["ArrowLeft", "contact", "team"],
          ["Home", "team", "home"],
        ] as const) {
          await test.step(`${key}: ${from} → ${target}`, async () => {
            if (mobile) {
              await menu.click();
              await expect(menu).toHaveAttribute("aria-expanded", "true");
              await expect(page.locator("main").locator("xpath=ancestor-or-self::*[@inert]")).toHaveCount(1);
              await page.locator("main").focus();
              await expect(menu).toBeFocused();
            }
            await expect(page.getByRole("navigation").getByRole("button")).toHaveCount(7);
            await navigation.locator(`[data-od-id="nav-${from}"]`).press(key);
            if (mobile) {
              await expect(menu).toHaveAttribute("aria-expanded", "false");
              await expect(menu).toBeFocused();
              await expect(navigation).toHaveAttribute("inert", "");
              await expect(navigation).toHaveAttribute("aria-hidden", "true");
              await expect(navigation).toBeHidden();
              await expect(navigation.locator(":focus")).toHaveCount(0);
            } else {
              await expect(navigation.locator(`[data-od-id="nav-${target}"]`)).toBeFocused();
            }
            await expect(page.locator("[data-page-transition]")).toHaveAttribute("data-page-transition", "idle");
            await expect(page.getByRole("main")).toHaveCount(1);
            await expect(page.locator("main")).toHaveCount(1);
            await expect(page.getByRole("main")).toHaveAttribute("data-screen", target);
            await expect(page.locator("main").locator("xpath=ancestor-or-self::*[@inert]")).toHaveCount(0);
            await expect(page.locator('[aria-current="page"]')).toHaveCount(1);
            await expect(navigation.locator(`[data-od-id="nav-${target}"]`)).toHaveAttribute("aria-current", "page");
            await expect(page.locator("html")).toHaveAttribute("lang", locale);
            await expect(page).toHaveURL("http://127.0.0.1:3000/?navigation=keyboard#content");
            if (mobile) {
              await expect(menu).toBeFocused();
              await page.keyboard.press("Tab");
              await page.keyboard.press("Tab");
              await expect(navigation.locator(":focus")).toHaveCount(0);
            }
          });
        }
      });
    }
  }
}

test("site navigation switches all screens without changing URL and keeps keyboard focus in sync", async ({ page }) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  for (const [id, label] of screens) {
    await navigation.getByRole("button", { name: label, exact: true }).click();
    await expect(page.getByRole("main")).toHaveAttribute("data-screen", id);
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.locator('[aria-current="page"]')).toHaveCount(1);
    await expect(navigation.getByRole("button", { name: label, exact: true })).toHaveAttribute("aria-current", "page");
    await expect(page).toHaveURL("http://127.0.0.1:3000/");
  }
  const contact = navigation.getByRole("button", { name: "Contact", exact: true });
  await contact.press("Home");
  await expect(navigation.getByRole("button", { name: "Home", exact: true })).toBeFocused();
  await expect(page.getByRole("main")).toHaveAttribute("data-screen", "home");
  await page.keyboard.press("ArrowRight");
  await expect(navigation.getByRole("button", { name: "Research Directions", exact: true })).toBeFocused();
  await expect(page.getByRole("main")).toHaveAttribute("data-screen", "research");
  await page.keyboard.press("End");
  await expect(contact).toBeFocused();
  await expect(page.getByRole("main")).toHaveAttribute("data-screen", "contact");
  await page.keyboard.press("ArrowLeft");
  await expect(navigation.getByRole("button", { name: "Team", exact: true })).toBeFocused();
  await expect(page.getByRole("main")).toHaveAttribute("data-screen", "team");
  await expect(page).toHaveURL("http://127.0.0.1:3000/");
});

for (const width of [390, 320]) {
  test(`site navigation mobile ${width} closes with Escape or selection and hides focus targets`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    const menu = page.getByRole("button", { name: "Menu", exact: true });
    const navigation = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(navigation).not.toBeVisible();
    await menu.click();
    await expect(navigation.getByRole("button")).toHaveCount(7);
    await navigation.getByRole("button", { name: "Home", exact: true }).focus();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await expect(navigation).not.toBeVisible();
    await page.keyboard.press("Tab");
    await expect(navigation.locator(":focus")).toHaveCount(0);
    for (const [id, label] of screens) {
      await menu.click();
      await navigation.getByRole("button", { name: label, exact: true }).click();
      await expect(menu).toHaveAttribute("aria-expanded", "false");
      await expect(menu).toBeFocused();
      await expect(navigation).not.toBeVisible();
      await expect(page.getByRole("main")).toHaveAttribute("data-screen", id);
      await expect(page).toHaveURL("http://127.0.0.1:3000/");
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
