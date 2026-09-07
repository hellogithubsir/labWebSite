import { expect, test } from "@playwright/test";

test("page transition fades forward and backward in 250ms without sliding and locks repeated input", async ({ page }) => {
  await page.goto("/");
  for (const [target, ignored] of [["research", "contact"], ["home", "team"]]) {
    const result = await page.evaluate(async ({ target, ignored }) => {
      const layer = document.querySelector<HTMLElement>("[data-page-transition]");
      if (!layer) return null;
      const events: { duration: number; easing: string; transform: string }[] = [];
      const record = () => { const css = getComputedStyle(layer); events.push({ duration: parseFloat(css.animationDuration) * 1000, easing: css.animationTimingFunction, transform: css.transform }); };
      layer.addEventListener("animationstart", record);
      document.querySelector<HTMLButtonElement>(`[data-od-id="nav-${target}"]`)!.click();
      document.querySelector<HTMLButtonElement>(`[data-od-id="nav-${ignored}"]`)!.click();
      await new Promise<void>((resolve) => {
        const observer = new MutationObserver(() => {
          if (layer.dataset.pageTransition === "idle") { observer.disconnect(); resolve(); }
        });
        observer.observe(layer, { attributes: true });
      });
      layer.removeEventListener("animationstart", record);
      return { events, screen: document.querySelector("main")?.getAttribute("data-screen"), count: document.querySelectorAll("main").length };
    }, { target, ignored });
    expect(result).not.toBeNull();
    expect(result?.screen).toBe(target);
    expect(result?.count).toBe(1);
    expect(result?.events.reduce((sum, event) => sum + event.duration, 0)).toBe(250);
    expect(result?.events.every((event) => event.easing === "ease-out" && event.transform === "none")).toBe(true);
    await expect(page.getByRole("main")).toHaveAttribute("data-screen", target);
  }
});

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
      animation: getComputedStyle(layer).animationName, transform: getComputedStyle(layer).transform };
  });
  expect(observation.elapsed).toBeLessThanOrEqual(100);
  expect(observation.phase).toBe("idle");
  expect(observation.animation).toBe("none");
  expect(observation.transform).toBe("none");
  await expect(page.getByRole("main")).toHaveAttribute("data-screen", "contact");
});
