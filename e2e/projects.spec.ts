import { expect, test } from "@playwright/test";

test("project carousel buttons synchronize evidence and boundaries", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation").getByRole("button", { name: "Projects", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Applied Research Projects");
  const carousel = page.getByRole("region", { name: "E-Linus Smart Elderly Care", exact: true });
  const previous = carousel.getByRole("button", { name: "Previous E-Linus screen" });
  const next = carousel.getByRole("button", { name: "Next E-Linus screen" });
  await expect(previous).toBeDisabled();
  for (const [i, title] of ["A care team sees risk before it becomes a crisis.", "Daily routines become a personal baseline.", "Every alert shows the reasons behind the risk.", "Model performance stays connected to care value."].entries()) {
    if (i) await next.click();
    await expect(carousel.getByRole("heading", { level: 3 })).toHaveText(title);
    await expect(carousel.getByRole("status")).toHaveText(`${i + 1} / 4`);
    await expect(carousel.getByRole("img")).toHaveCount(1);
  }
  await expect(next).toBeDisabled();
  await previous.click();
  await expect(carousel.getByRole("status")).toHaveText("3 / 4");
});

for (const width of [1920, 390, 320]) for (const chinese of [false, true]) {
  test(`project catalog and project carousel ${width} ${chinese ? "Chinese" : "English"} keyboard drag and layout`, async ({ browser }, testInfo) => {
    const context = await browser.newContext({ viewport: { width, height: 1080 }, hasTouch: true });
    const page = await context.newPage();
    await page.goto("/");
    if (chinese) await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    if (width < 981) await page.getByRole("button", { name: chinese ? "菜单" : "Menu", exact: true }).click();
    await page.getByRole("navigation").getByRole("button", { name: chinese ? "项目展示" : "Projects", exact: true }).click();
    if (width < 981) await expect(page.locator("#screen-navigation")).toHaveCSS("visibility", "hidden");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(chinese ? "应用研究项目" : "Applied Research Projects");
    for (const title of chinese ? ["两个系统，两条部署路径", "照护智能", "工业人工智能"] : ["Two systems, two routes to deployment", "Care Intelligence", "Industrial AI"]) await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
    const carousel = page.getByRole("region", { name: chinese ? "E-Linus 智慧养老照护" : "E-Linus Smart Elderly Care", exact: true });
    const drag = carousel.getByRole("group");
    const status = carousel.getByRole("status");
    const categories = chinese ? ["系统概览", "感知与画像", "告警与可解释性", "验证"] : ["System overview", "Sensing and profile", "Alerts and explainability", "Validation"];
    const proofs = chinese ? ["实时监测 128 位住户", "24 小时活动模型", "风险评分与置信度", "跨数据集证据"] : ["128 residents monitored in real time", "24-hour activity model", "Risk score and confidence", "Cross-dataset evidence"];
    await expect(drag.locator(":scope > div")).toHaveCSS("transition-duration", "0.4s");
    await drag.focus();
    for (let i = 0; i < 4; i++) {
      if (i) await page.keyboard.press("ArrowRight");
      await expect(status).toHaveText(`${i + 1} / 4`);
      const active = carousel.locator("article:not([aria-hidden=true])");
      await expect(active).toContainText(categories[i]);
      await expect(active).toContainText(proofs[i]);
      await expect(carousel.locator("li[aria-current=step]")).toHaveText(new RegExp(`0${i + 1}`));
      const img = carousel.getByRole("img");
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty("complete", true);
      expect(await img.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
    }
    await drag.press("ArrowRight"); await expect(status).toHaveText("4 / 4");
    await drag.press("ArrowLeft"); await expect(status).toHaveText("3 / 4");
    await drag.scrollIntoViewIfNeeded();
    const box = (await drag.boundingBox())!;
    const x = box.x + box.width / 2, y = Math.max(100, box.y + 40);
    await page.mouse.move(x - 60, y); await page.mouse.down(); await page.mouse.move(x + 60, y, { steps: 8 }); await page.mouse.up();
    await expect(status).toHaveText("2 / 4");
    const cdp = await context.newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: x + 60, y }] });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x - 60, y }] });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect(status).toHaveText("3 / 4");
    await drag.press("ArrowLeft"); await drag.press("ArrowLeft"); await expect(status).toHaveText("1 / 4");
    const next = carousel.getByRole("button", { name: chinese ? "下一张 E-Linus 界面" : "Next E-Linus screen", exact: true });
    const previous = carousel.getByRole("button", { name: chinese ? "上一张 E-Linus 界面" : "Previous E-Linus screen", exact: true });
    await next.click(); await expect(status).toHaveText("2 / 4");
    await previous.press("Enter"); await expect(status).toHaveText("1 / 4");
    for (const button of [previous, next]) { const bounds = (await button.boundingBox())!; expect(bounds.width).toBeGreaterThanOrEqual(44); expect(bounds.height).toBeGreaterThanOrEqual(44); }
    const pdm = page.getByRole("region", { name: chinese ? "PDM Robot 资产剩余寿命监测" : "PDM Robot Asset RUL Monitor", exact: true });
    const pdmDrag = pdm.getByRole("group"), pdmStatus = pdm.getByRole("status");
    const pdmNext = pdm.getByRole("button", { name: chinese ? "下一张 PDM Robot 界面" : "Next PDM Robot screen", exact: true });
    const pdmPrevious = pdm.getByRole("button", { name: chinese ? "上一张 PDM Robot 界面" : "Previous PDM Robot screen", exact: true });
    await expect(pdmStatus).toHaveText("2 / 4");
    await expect(pdmDrag.locator(":scope > div")).toHaveCSS("transition-duration", "0.4s");
    await pdmPrevious.click();
    await expect(pdmPrevious).toBeDisabled();
    const pdmTitles = chinese ? ["维护团队掌握整个资产群的状态。", "让剩余使用寿命的变化清晰可见。", "系统从预警进一步追溯证据。", "让指导与运营情境保持关联。"] : ["A maintenance team sees the whole asset fleet.", "Remaining useful life becomes visible as it changes.", "The system moves from warning to evidence.", "Guidance stays beside the operational context."];
    const pdmProofs = chinese ? ["虚拟资产状态", "55 秒操作演示", "传感器证据", "工单处理路径"] : ["Virtual asset status", "55-second operational demonstration", "Sensor evidence", "Work order pathway"];
    for (let i = 0; i < 4; i++) {
      if (i) await pdmNext.click();
      await expect(pdmStatus).toHaveText(`${i + 1} / 4`);
      await expect(pdm.getByRole("heading", { level: 3 })).toHaveText(pdmTitles[i]);
      await expect(pdm.locator("article:not([aria-hidden=true])")).toContainText(pdmProofs[i]);
      await expect(pdm.locator("li[aria-current=step]")).toHaveText(new RegExp(`0${i + 1}`));
      await expect(pdm.getByRole("img")).toHaveCount(1);
      const img = pdm.getByRole("img");
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty("complete", true);
      expect(await img.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
      const bounds = (await img.boundingBox())!;
      expect(bounds.width / bounds.height).toBeCloseTo(1.5, 1);
      await expect(status).toHaveText("1 / 4");
    }
    await expect(pdmNext).toBeDisabled();
    await pdmDrag.press("ArrowRight"); await expect(pdmStatus).toHaveText("4 / 4");
    await pdmDrag.press("ArrowLeft"); await expect(pdmStatus).toHaveText("3 / 4");
    await pdmDrag.scrollIntoViewIfNeeded();
    const pdmBox = (await pdmDrag.boundingBox())!;
    const px = pdmBox.x + pdmBox.width / 2, py = Math.max(100, pdmBox.y + 40);
    await page.mouse.move(px - 60, py); await page.mouse.down(); await page.mouse.move(px + 60, py, { steps: 8 }); await page.mouse.up();
    await expect(pdmStatus).toHaveText("2 / 4");
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: px + 60, y: py }] });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: px - 60, y: py }] });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect(pdmStatus).toHaveText("3 / 4");
    await pdmDrag.press("ArrowLeft"); await pdmDrag.press("ArrowLeft"); await pdmDrag.press("ArrowLeft");
    await expect(pdmStatus).toHaveText("1 / 4"); await expect(pdmPrevious).toBeDisabled();
    await pdmNext.press("Enter"); await expect(pdmStatus).toHaveText("2 / 4");
    await next.click(); await expect(status).toHaveText("2 / 4"); await expect(pdmStatus).toHaveText("2 / 4");
    await previous.click();
    for (const button of [pdmPrevious, pdmNext]) { const bounds = (await button.boundingBox())!; expect(bounds.width).toBeGreaterThanOrEqual(44); expect(bounds.height).toBeGreaterThanOrEqual(44); }
    for (const reveal of await page.locator("main [data-reveal]").all()) { await reveal.scrollIntoViewIfNeeded(); await expect(reveal).toHaveAttribute("data-reveal", "visible"); }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page).toHaveURL("http://127.0.0.1:3000/");
    await expect.poll(() => drag.locator(":scope > div").evaluate(node => new DOMMatrix(getComputedStyle(node).transform).m41)).toBe(0);
    await expect.poll(() => pdmDrag.locator(":scope > div").evaluate(node => Math.round(new DOMMatrix(getComputedStyle(node).transform).m41 + node.getBoundingClientRect().width))).toBe(0);
    await page.evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`projects-${chinese ? "zh-CN" : "en"}-${width}.png`), fullPage: true });
    await page.getByRole("button", { name: chinese ? "让智能投入实际运营的项目。" : "Projects that make intelligence operational.", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(chinese ? "联系合作" : "Contact");
    await expect(page.locator("html")).toHaveAttribute("lang", chinese ? "zh-CN" : "en");
    await expect(page).toHaveURL("http://127.0.0.1:3000/");
    await context.close();
  });
}

test("project catalog and project carousel reduced motion changes immediately", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.goto("/");
  await page.getByRole("navigation").getByRole("button", { name: "Projects", exact: true }).click();
  const drag = page.getByRole("group", { name: "E-Linus project screenshots. Drag or use arrow keys." });
  await expect(drag.locator(":scope > div")).toHaveCSS("transition-duration", "0s");
  await drag.press("ArrowRight");
  await expect(page.getByRole("region", { name: "E-Linus Smart Elderly Care", exact: true }).getByRole("status")).toHaveText("2 / 4");
  const pdm = page.getByRole("region", { name: "PDM Robot Asset RUL Monitor", exact: true });
  const pdmDrag = pdm.getByRole("group");
  await expect(pdmDrag.locator(":scope > div")).toHaveCSS("transition-duration", "0s");
  await pdmDrag.press("ArrowRight");
  await expect(pdm.getByRole("status")).toHaveText("3 / 4");
  await expect.poll(() => pdmDrag.locator(":scope > div").evaluate(node => Math.round(new DOMMatrix(getComputedStyle(node).transform).m41 + 2 * node.getBoundingClientRect().width))).toBe(0);
  await expect(page.getByRole("region", { name: "E-Linus Smart Elderly Care", exact: true }).getByRole("status")).toHaveText("2 / 4");
});

test("project catalog includes both delivered systems", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation").getByRole("button", { name: "Projects", exact: true }).click();
  await expect(page.getByRole("region", { name: "E-Linus Smart Elderly Care", exact: true })).toBeVisible();
  const pdm = page.getByRole("region", { name: "PDM Robot Asset RUL Monitor", exact: true });
  await expect(pdm).toBeVisible();
  await expect(pdm.getByRole("status")).toHaveText("2 / 4");
  await expect(pdm.getByRole("heading", { level: 3 })).toHaveText("Remaining useful life becomes visible as it changes.");
});
