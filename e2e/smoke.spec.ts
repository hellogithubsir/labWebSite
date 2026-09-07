import { expect, test } from "@playwright/test";

test("root page responds and shows its primary heading", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Bridging human perception and machine intelligence at the edge.",
    }),
  ).toBeVisible();
});
