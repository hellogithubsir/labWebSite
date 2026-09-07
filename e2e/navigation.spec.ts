import { expect, test } from "@playwright/test";

test("site navigation initially exposes English Home and seven controls", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("button")).toHaveCount(7);
  await expect(page.locator('[aria-current="page"]')).toHaveText("01Home");
  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Bridging human perception and machine intelligence at the edge.");
});

const screens = [
  ["home", "Home"], ["research", "Research Directions"], ["projects", "Projects"],
  ["advantages", "Technology Advantages"], ["partners", "Partners"], ["team", "Team"], ["contact", "Contact"],
] as const;

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
