import { expect, test } from "@playwright/test";

const groups = [
  { id: "ai", count: 9, ids: ["P-03", "P-06", "P-07-01", "P-07-02", "P-07-04", "P-07-05", "P-07-06", "P-07-07", "P-07-10"] },
  { id: "edge", count: 4, ids: ["P-05", "P-07-03", "P-07-08", "P-07-09"] },
  { id: "products", count: 5, ids: ["P-07-11", "P-07-12", "P-07-13", "P-07-14", "P-07-15"] },
  { id: "digital", count: 3, ids: ["P-04", "P-07-16", "P-07-17"] },
];

test("project gallery follows a vertical reading order", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-od-id="nav-projects"]').click();
  const section = page.locator('[data-od-id="catalog-products"]');
  await expect(section).toBeVisible();
  const copy = (await section.locator('[data-project-copy]').boundingBox())!;
  const image = (await section.locator('[data-project-media]').boundingBox())!;
  expect(image.y).toBeGreaterThanOrEqual(copy.y + copy.height);
});

test("project panels have no supplemental controls or image captions", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-od-id="nav-projects"]').click();
  const panel = page.locator('[data-od-id="catalog-ai"]').getByRole("tabpanel");
  await expect(panel).toBeVisible();
  await expect(panel.getByRole("button", { name: "Additional information", exact: true })).toHaveCount(0);
  await expect(panel.locator("figcaption")).toHaveCount(0);
});

test("project core narrative is visible without opening details", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-od-id="nav-projects"]').click();
  const panel = page.locator('[data-od-id="catalog-ai"]').getByRole("tabpanel");
  await expect(panel.locator('[data-project-purpose]')).toBeVisible();
  await expect(panel.locator('[data-project-narrative] p')).toHaveCount(2);
  await expect(panel.getByRole("button", { name: "View project details", exact: true })).toHaveCount(0);
});

test("directory exposes four complete categories", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-od-id="nav-projects"]').click();
  for (const group of groups) {
    const section = page.locator(`[data-od-id="catalog-${group.id}"]`);
    await expect(section).toBeVisible();
    await expect(section.getByRole("tab")).toHaveCount(group.count);
    await expect(section.getByRole("status")).toHaveText(`1 / ${group.count}`);
  }
});

for (const width of [1920, 1440, 1024, 390, 320]) for (const chinese of [false, true]) {
  test(`directory all projects and accessible details ${width} ${chinese ? "zh" : "en"}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    if (chinese) await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    if (width < 981) await page.locator('[data-od-id="menu-toggle"]').click();
    await page.locator('[data-od-id="nav-projects"]').click();
    const seen: string[] = [];
    for (const group of groups) {
      await page.locator(`[data-od-id="capability-${group.id}"]`).getByRole("button").click();
      await expect(page.locator(`#catalog-${group.id}-title`)).toBeFocused();
      await expect(page).toHaveURL("http://127.0.0.1:3000/");
      const section = page.locator(`[data-od-id="catalog-${group.id}"]`);
      await expect(section.getByRole("tab")).toHaveCount(group.count);
      for (const [index, id] of group.ids.entries()) {
        const tab = section.getByRole("tab").nth(index);
        await tab.click();
        await expect(tab).toHaveAttribute("aria-selected", "true");
        const panel = section.getByRole("tabpanel");
        await expect(panel).toHaveAttribute("data-project-id", id);
        seen.push(id);
        await expect(tab).toHaveAttribute("data-project-option", id);
        expect((await panel.getByRole("heading").innerText()).length).toBeGreaterThan(8);
        await expect(section.getByRole("status")).toHaveText(`${index + 1} / ${group.count}`);
        await expect(panel.locator('[data-project-purpose]')).toBeVisible();
        const paragraphs = panel.locator('[data-project-narrative] p');
        await expect(paragraphs).toHaveCount(2);
        for (const paragraph of await paragraphs.all()) {
          await expect(paragraph).toBeVisible();
          expect((await paragraph.innerText()).length).toBeGreaterThan(20);
          expect(await paragraph.evaluate(node => node.scrollHeight <= node.clientHeight + 1)).toBe(true);
        }
        expect(await panel.locator('[data-project-narrative] strong').count()).toBeGreaterThanOrEqual(2);
        expect(await panel.locator('[data-project-narrative] strong').count()).toBeLessThanOrEqual(3);
        expect(await panel.innerText()).not.toMatch(/\d+(?:\.\d+)?\s*%/);
        await expect(panel.locator("dl")).toHaveCount(0);
        await expect(panel.getByRole("button", { name: chinese ? "查看项目详情" : "View project details", exact: true })).toHaveCount(0);
        await expect(panel.getByRole("button", { name: /补充信息|additional information/i })).toHaveCount(0);
        await expect(panel.locator('[data-project-supplementary], figcaption')).toHaveCount(0);
        expect(await panel.innerText()).not.toMatch(/应用场景示意|Illustrative application scenario/i);
        const img = panel.getByRole("img");
        await img.scrollIntoViewIfNeeded();
        await expect(img).toHaveJSProperty("complete", true);
        expect(await img.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
        expect(await img.getAttribute("alt")).toBeTruthy();
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      }
      const last = section.getByRole("tab").last();
      await last.press("Home");
      await expect(section.getByRole("tab").first()).toBeFocused();
      await expect(section.getByRole("status")).toHaveText(`1 / ${group.count}`);
      await expect(section.getByRole("button", { name: /补充信息|additional information/i })).toHaveCount(0);
      await section.getByRole("tab").first().press("ArrowRight");
      await expect(section.getByRole("tab").nth(1)).toBeFocused();
      await expect(section.getByRole("status")).toHaveText(`2 / ${group.count}`);
      await section.getByRole("tab").nth(1).press("Home");
      const copy = (await section.locator('[data-project-copy]').boundingBox())!;
      const media = (await section.locator('[data-project-media]').boundingBox())!;
      const controls = (await section.locator('[data-project-controls]').boundingBox())!;
      const selector = (await section.getByRole("tablist").boundingBox())!;
      const narrative = (await section.locator('[data-project-narrative]').boundingBox())!;
      expect(selector.y + selector.height).toBeLessThanOrEqual(copy.y + 1);
      expect(copy.y + copy.height).toBeLessThanOrEqual(media.y + 1);
      expect(controls.y).toBeGreaterThanOrEqual(media.y + media.height - 1);
      expect(narrative.y).toBeGreaterThanOrEqual(controls.y + controls.height - 1);
      expect(narrative.width).toBeLessThanOrEqual(680);
      expect(media.width).toBeLessThanOrEqual(1000);
      expect(media.height).toBeLessThanOrEqual(560);
      if (group.id === "digital") {
        const features = section.locator('[data-project-features]');
        expect(await features.getByRole("listitem").count()).toBeGreaterThanOrEqual(3);
        expect(await features.getByRole("listitem").count()).toBeLessThanOrEqual(4);
        const featureBox = (await features.boundingBox())!;
        expect(featureBox.y).toBeGreaterThanOrEqual(controls.y + controls.height - 1);
        expect(featureBox.y + featureBox.height).toBeLessThanOrEqual(narrative.y + 1);
      }
      if (width <= 600) {
        const first = (await section.getByRole("tab").first().boundingBox())!;
        expect(first.x).toBeGreaterThanOrEqual(selector.x - 1);
        expect(first.x + first.width).toBeLessThanOrEqual(selector.x + selector.width + 1);
      }
      await section.scrollIntoViewIfNeeded();
      await section.screenshot({ path: testInfo.outputPath(`${group.id}-${chinese ? "zh" : "en"}-${width}.png`) });
    }
    expect(new Set(seen).size).toBe(21);
    for (const reveal of await page.locator("main [data-reveal]").all()) await reveal.scrollIntoViewIfNeeded();
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.screenshot({ path: testInfo.outputPath(`full-${chinese ? "zh" : "en"}-${width}.png`), fullPage: true });
  });
}

test("directory locale retains selection without supplemental content, navigation resets selection", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator('[data-od-id="nav-projects"]').click();
  const ai = page.locator('[data-od-id="catalog-ai"]');
  await ai.getByRole("tab").nth(5).click();
  await page.getByRole("button", { name: "切换为中文", exact: true }).click();
  await expect(ai.getByRole("tabpanel")).toHaveAttribute("data-project-id", "P-07-05");
  await expect(ai.getByRole("button", { name: /补充信息|additional information/i })).toHaveCount(0);
  await expect(ai).not.toContainText("30.33%");
  await expect(ai).not.toContainText("统计口径待核验");
  await expect(ai).not.toContainText("据原官网材料");
  const edge = page.locator('[data-od-id="catalog-edge"]');
  await edge.getByRole("tab").last().click();
  await expect(ai.getByRole("status")).toHaveText("6 / 9");
  await page.getByRole("button", { name: "让智能投入实际运营的项目。", exact: true }).click();
  await expect(page.locator("main")).toHaveAttribute("data-screen", "contact");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await page.locator('[data-od-id="nav-projects"]').click();
  await expect(ai.getByRole("status")).toHaveText("1 / 9");
  await expect(edge.getByRole("status")).toHaveText("1 / 4");
  await expect(ai.getByRole("button", { name: /补充信息|additional information/i })).toHaveCount(0);
});

test("all galleries track drag and settle with independent boundaries", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator('[data-od-id="nav-projects"]').click();
  for (const {id, count} of groups) {
    const section = page.locator(`[data-od-id="catalog-${id}"]`);
    const previous = section.getByRole("button", { name: "Previous project", exact: true });
    const next = section.getByRole("button", { name: "Next project", exact: true });
    await expect(previous).toBeDisabled();
    const media = section.locator('[data-project-gallery]');
    await expect(media).toHaveCSS("scroll-snap-type", "x mandatory");
    await media.scrollIntoViewIfNeeded();
    const box = (await media.boundingBox())!;
    const x = box.x + box.width * 0.85, y = Math.max(100, box.y + box.height / 2);
    await page.mouse.move(x, y); await page.mouse.down();
    await page.mouse.move(x - box.width * 0.65, y, { steps: 12 });
    expect(await media.evaluate(node => node.scrollLeft)).toBeGreaterThan(box.width * 0.5);
    await page.mouse.up();
    await expect(section.getByRole("status")).toHaveText(`2 / ${count}`);
    await expect.poll(() => media.evaluate(node => Math.abs(node.scrollLeft - node.clientWidth))).toBeLessThan(2);
    await media.scrollIntoViewIfNeeded();
    const touchBox = (await media.boundingBox())!;
    const tx = touchBox.x + touchBox.width * 0.85, ty = Math.max(100,touchBox.y + touchBox.height / 2);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: tx, y: ty }] });
    for(let step=1;step<=12;step++) await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: tx-touchBox.width*0.65*step/12, y: ty }] });
    expect(await media.evaluate(node => node.scrollLeft)).toBeGreaterThan(touchBox.width * 1.3);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => media.evaluate(node => Math.abs(node.scrollLeft/node.clientWidth-Math.round(node.scrollLeft/node.clientWidth)))).toBeLessThan(0.01);
    const landed = await media.evaluate(node => Math.round(node.scrollLeft/node.clientWidth));
    expect(landed).toBeGreaterThanOrEqual(2);
    await expect(section.getByRole("status")).toHaveText(`${landed+1} / ${count}`);
    await cdp.detach();
    await section.getByRole("tab").last().click();
    await expect(section.getByRole("status")).toHaveText(`${count} / ${count}`);
    await expect(next).toBeDisabled();
    await previous.click();
    await expect(section.getByRole("status")).toHaveText(`${count - 1} / ${count}`);
    await next.press("Enter");
    await expect(section.getByRole("status")).toHaveText(`${count} / ${count}`);
    await section.getByRole("tab").first().click();
    await expect(section.getByRole("status")).toHaveText(`1 / ${count}`);
  }
});

test("gallery continuous selection, reverse input and resize stay aligned", async ({ page }) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/");
  await page.locator('[data-od-id="nav-projects"]').click();
  const section=page.locator('[data-od-id="catalog-ai"]');
  const gallery=section.locator('[data-project-gallery]');
  const next=section.getByRole("button",{name:"Next project",exact:true});
  const previous=section.getByRole("button",{name:"Previous project",exact:true});
  await next.click(); await next.click(); await next.click();
  await expect(section.getByRole("status")).toHaveText("4 / 9");
  await section.getByRole("tab").last().click();
  await previous.click(); await previous.click();
  await expect(section.getByRole("status")).toHaveText("7 / 9");
  await expect.poll(()=>gallery.evaluate(node=>Math.abs(node.scrollLeft-6*node.clientWidth))).toBeLessThan(2);
  await page.setViewportSize({width:390,height:844});
  await expect(section.getByRole("status")).toHaveText("7 / 9");
  await expect.poll(()=>gallery.evaluate(node=>Math.abs(node.scrollLeft-6*node.clientWidth))).toBeLessThan(2);
  await section.getByRole("tab").last().click();
  await expect(section.getByRole("status")).toHaveText("9 / 9");
  const selected=(await section.getByRole("tab").last().boundingBox())!;
  const list=(await section.getByRole("tablist").boundingBox())!;
  expect(selected.x).toBeGreaterThanOrEqual(list.x-1);
  expect(selected.x+selected.width).toBeLessThanOrEqual(list.x+list.width+1);
});
