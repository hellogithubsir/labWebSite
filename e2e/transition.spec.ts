import { expect, test } from "@playwright/test";

for (const width of [1440, 1100, 390]) {
test(`page transition samples reference timing, rail geometry and footer forward backward and distant ${width}`, async ({ page }, testInfo) => {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("/");
  for (const [target, ignored] of [["research", "contact"], ["home", "team"], ["contact", "projects"]]) {
    const result = await page.evaluate(async ({ target, ignored }) => {
      const layer = document.querySelector<HTMLElement>("[data-page-transition]")!;
      const start = performance.now();
      const samples: { t: number; phase: string; screen: string; opacity: number; x: number; footerY: number; hidden: boolean }[] = [];
      const rail = document.querySelector<HTMLElement>('[data-od-id="nav-research"]')!;
      document.querySelector<HTMLButtonElement>(`[data-od-id="nav-${target}"]`)!.click();
      document.querySelector<HTMLButtonElement>(`[data-od-id="nav-${ignored}"]`)!.click();
      await new Promise<void>((resolve) => {
        function sample() {
          const footer = document.querySelector("footer")!;
          samples.push({ t: performance.now() - start, phase: layer.dataset.pageTransition!,
            screen: document.querySelector("main")!.getAttribute("data-screen")!,
            opacity: Number(getComputedStyle(layer).opacity), x: rail.getBoundingClientRect().x,
            footerY: new DOMMatrixReadOnly(getComputedStyle(footer).transform).m42,
            hidden: layer.inert && layer.getAttribute("aria-hidden") === "true" });
          if (performance.now() - start < 1650) requestAnimationFrame(sample); else resolve();
        }
        requestAnimationFrame(sample);
      });
      return samples;
    }, { target, ignored });
    await testInfo.attach(`timeline-${target}.json`, { body: JSON.stringify(result, null, 2), contentType: "application/json" });
    const at = (t: number) => result.reduce((a, b) => Math.abs(a.t - t) < Math.abs(b.t - t) ? a : b);
    const committed = result.find((s) => s.screen === target)!;
    const completed = result.find((s) => s.phase === "idle")!;
    expect(committed.t).toBeGreaterThanOrEqual(680);
    expect(committed.t).toBeLessThan(800);
    expect(completed.t).toBeGreaterThanOrEqual(1480);
    expect(completed.t).toBeLessThan(1650);
    expect(at(450).opacity).toBe(1);
    expect(at(630).opacity).toBeGreaterThan(0);
    expect(at(630).opacity).toBeLessThan(.9);
    expect(at(350).footerY).toBeCloseTo(900, 0);
    expect(at(600).x).toBeCloseTo(at(50).x, 1);
    if (width > 980) {
      expect(at(850).x).not.toBeCloseTo(at(600).x, 0);
      expect(at(850).x).not.toBeCloseTo(at(1100).x, 0);
    }
    expect(at(1100).opacity).toBe(0);
    expect(at(1350).opacity).toBeGreaterThan(0);
    expect(at(1350).opacity).toBeLessThan(1);
    expect(at(1600).opacity).toBe(1);
    expect(at(1600).footerY).toBe(0);
    expect(result.filter((s) => s.phase !== "idle").every((s) => s.hidden)).toBe(true);
    await expect(page.getByRole("main")).toHaveAttribute("data-screen", target);
    await expect(page.locator(width > 980 ? `[data-od-id="nav-${target}"]` : '[data-od-id="menu-toggle"]')).toBeFocused();
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page).toHaveURL("http://127.0.0.1:3000/");
  }
});

}

test("page transition keeps the first keyboard target and final focus together", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-od-id="nav-home"]').focus();
  await page.evaluate(() => {
    for (let i = 0; i < 3; i++) document.activeElement?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
  });
  await expect(page.getByRole("main")).toHaveAttribute("data-screen", "research");
  await expect(page.locator('[data-od-id="nav-research"]')).toBeFocused();
  await expect(page.locator("main")).toHaveCount(1);
});

test("page transition current-screen activation preserves scroll and focus without animation", async ({ page }) => {
  await page.setViewportSize({ width: 1100, height: 300 });
  await page.goto("/");
  await page.getByRole("main").focus();
  await page.evaluate(() => window.scrollTo(0, 100));
  const before = await page.evaluate(() => ({ y: window.scrollY, focus: document.activeElement?.id }));
  expect(before.y).toBeGreaterThan(0);
  await page.evaluate(() => document.querySelector<HTMLButtonElement>('[data-od-id="nav-home"]')!.click());
  expect(await page.evaluate(() => ({ y: window.scrollY, focus: document.activeElement?.id }))).toEqual(before);
  await expect(page.locator("[data-page-transition]")).toHaveAttribute("data-page-transition", "idle");
});

test("page transition reduced motion displays the target within 100ms without an animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const observation = await page.evaluate(async () => {
    const start = performance.now();
    document.querySelector<HTMLButtonElement>('[data-od-id="nav-contact"]')!.click();
    await new Promise<void>((resolve) => {
      const observe = () => document.querySelector("main")?.getAttribute("data-screen") === "contact"
        ? resolve() : requestAnimationFrame(observe);
      observe();
    });
    const layer = document.querySelector<HTMLElement>("[data-page-transition]")!;
    return { elapsed: performance.now() - start, phase: layer.dataset.pageTransition,
      animation: getComputedStyle(layer).animationName, transform: getComputedStyle(layer).transform,
      opacity: getComputedStyle(layer).opacity, hidden: layer.inert || layer.hasAttribute("aria-hidden"),
      focus: document.activeElement?.getAttribute("data-od-id"),
      railTransition: getComputedStyle(document.querySelector('[data-od-id="nav-contact"]')!.parentElement!).transitionDuration,
      footerTransform: getComputedStyle(document.querySelector("footer")!).transform };
  });
  expect(observation.elapsed).toBeLessThanOrEqual(100);
  expect(observation.phase).toBe("idle");
  expect(observation.animation).toBe("none");
  expect(observation.transform).toBe("none");
  expect(observation.opacity).toBe("1");
  expect(observation.hidden).toBe(false);
  expect(observation.focus).toBe("nav-contact");
  expect(observation.railTransition).toBe("0s");
  expect(observation.footerTransform).toBe("none");
  await expect(page.getByRole("main")).toHaveAttribute("data-screen", "contact");
});


test("page transition preserves strip widths breakpoints and flex easing", async ({ page }) => {
  await page.goto("/");
  for (const [width, regular, active] of [[1920, 44, 58], [1281, 44, 58], [1280, 38, 50], [981, 38, 50]]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator('[data-od-id="nav-home"]')).toHaveCSS("width", `${active}px`);
    await expect(page.locator('[data-od-id="nav-research"]')).toHaveCSS("width", `${regular}px`);
    const css = await page.locator('[data-od-id="nav-home"]').evaluate((rail) => {
      const slot = getComputedStyle(rail.parentElement!);
      return { property: slot.transitionProperty, duration: slot.transitionDuration, easing: slot.transitionTimingFunction };
    });
    expect(css).toEqual({ property: "flex", duration: "0.3s", easing: "cubic-bezier(0.4, 0.14, 0.3, 1)" });
  }
  for (const width of [980, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await expect(page.locator("#screen-navigation")).toBeHidden();
    await expect(page.locator('[data-od-id="menu-toggle"]')).toBeVisible();
    await expect(page.locator("#screen-navigation")).toHaveCSS("transition-duration", "0.25s, 0.25s, 0s");
  }
});

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`page transition CTA and mobile focus retain locale and unlock ${reducedMotion}`, async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/?motion=focus#kept");
    await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    const cta = page.locator("main").getByRole("button").first();
    await cta.click();
    await expect(page.locator("[data-page-transition]")).toHaveAttribute("data-page-transition", "idle");
    await expect(page.getByRole("main")).toHaveAttribute("data-screen", "research");
    await expect(page.getByRole("main")).toBeFocused();
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    const menu = page.locator('[data-od-id="menu-toggle"]');
    await menu.click();
    await page.locator('[data-od-id="nav-contact"]').click();
    await expect(page.locator("[data-page-transition]")).toHaveAttribute("data-page-transition", "idle");
    await expect(page.getByRole("main")).toHaveAttribute("data-screen", "contact");
    await expect(menu).toBeFocused();
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page).toHaveURL("http://127.0.0.1:3000/?motion=focus#kept");
    await page.screenshot({ path: testInfo.outputPath("mobile-completed.png") });
  });
}
