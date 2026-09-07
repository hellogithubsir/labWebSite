import { expect, test } from "@playwright/test";

for (const width of [1920, 390, 320]) for (const chinese of [false, true]) {
  test(`contact screen ${width} ${chinese ? "Chinese" : "English"} content and actions`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1080 });
    await page.goto("/");
    if (chinese) await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    if (width < 981) await page.getByRole("button", { name: chinese ? "菜单" : "Menu", exact: true }).click();
    await page.getByRole("navigation").getByRole("button", { name: chinese ? "联系合作" : "Contact", exact: true }).click();
    if (width < 981) await expect(page.locator("#screen-navigation")).toHaveCSS("visibility", "hidden");
    await expect(page.locator('[data-od-id="contact-targets"] article')).toHaveCount(4);
    await expect(page.locator('[data-od-id="contact-formats"] article')).toHaveCount(3);
    await expect(page.locator('[data-od-id="contact-applications"]')).toContainText(chinese ? "成绩单" : "academic transcripts");
    await expect(page.locator('[data-od-id="contact-preparation"]')).toContainText(chinese ? "两周" : "two weeks");
    await expect(page.locator('[data-od-id="contact-targets"] h3')).toHaveText(chinese ? ["科技 / 制造企业", "医院与公共卫生机构", "政府与民生服务机构", "意向学生（博士 / 硕士）"] : ["Tech & Manufacturing Enterprises", "Hospitals & Public Health Agencies", "Government & Civic Agencies", "Prospective Students (PhD/MSc)"]);
    await expect(page.locator('[data-od-id="contact-formats"]')).toContainText(chinese ? "保密协议" : "NDA");
    await expect(page.locator('[data-od-id="contact-targets"]')).toContainText(chinese ? "不直接提供临床建议" : "not clinical advice");
    await expect(page.locator('[data-od-id="contact-preparation"]')).toContainText(chinese ? "缺乏数据支撑" : "without data");
    await expect(page.locator('[data-od-id="contact-details"]')).toContainText("43600");
    await expect(page.locator("main img")).toHaveCount(3);
    for (const reveal of await page.locator("main [data-reveal]").all()) { await reveal.evaluate(node => node.scrollIntoView({ block: "center", behavior: "instant" })); await expect(reveal).toHaveAttribute("data-reveal", "visible"); }
    for (const img of await page.locator("main img").all()) { await expect(img).toHaveJSProperty("complete", true); expect(await img.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0); }
    await expect.poll(() => page.locator("main").evaluate(node => node.getAnimations({ subtree: true }).filter(animation => animation.playState === "running").length)).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => window.scrollTo(0, 0)); await page.mouse.move(0, 0);
    await page.screenshot({ path: testInfo.outputPath(`contact-${chinese ? "zh-CN" : "en"}-${width}.png`), fullPage: true });
    const email = page.locator('[data-od-id="contact-email"]'), profile = page.locator('[data-od-id="contact-profile"]');
    await page.locator("main").focus(); await page.keyboard.press("Tab"); await expect(email).toBeFocused();
    await expect(email).toHaveAttribute("href", "mailto:chawjk@ukm.edu.my");
    await expect(email).toHaveCSS("outline-style", "solid"); await expect(email).toHaveCSS("outline-width", "3px");
    await expect(email).toBeInViewport();
    await email.evaluate(node => node.addEventListener("click", event => { event.preventDefault(); node.setAttribute("data-activation", node.getAttribute("href") ?? ""); }, { once: true }));
    await page.keyboard.press("Enter"); await expect(email).toHaveAttribute("data-activation", "mailto:chawjk@ukm.edu.my");
    await page.keyboard.press("Tab"); await expect(profile).toBeFocused(); await expect(profile).toBeInViewport();
    await expect(profile).toHaveCSS("outline-width", "3px");
    const url = "https://ukmsarjana.ukm.my/main/lihat_profil/SzAyNDQ3OA==";
    await expect(profile).toHaveAttribute("href", url);
    await page.context().route(url, route => route.fulfill({ status: 200, body: "" }));
    const popupPromise = page.waitForEvent("popup"); await page.keyboard.press("Enter");
    const popup = await popupPromise; await expect(popup).toHaveURL(url); await popup.close();
    await page.locator("footer button").focus(); await page.keyboard.press("Enter"); await expect(email).toBeFocused(); await expect(email).toBeInViewport();
    await expect(page).toHaveURL("http://127.0.0.1:3000/");
  });
}
