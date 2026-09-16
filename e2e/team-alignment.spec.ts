import { expect, test } from "@playwright/test";

for (const chinese of [false, true]) {
  test(`researcher status without labels ${chinese ? "zh" : "en"}`, async ({ page }) => {
    await page.goto("/");
    if (chinese) await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    await page.getByRole("navigation").getByRole("button", { name: chinese ? "团队" : "Team", exact: true }).click();
    const cards = page.locator('[data-od-id="team-members"] article');
    await expect(cards).toHaveCount(9);
    await expect(cards.locator("dt, dd, dl")).toHaveCount(0);
    await expect(cards.getByText(chinese ? "身份" : "Status", { exact: true })).toHaveCount(0);
    await expect(cards.nth(3).locator("p").first()).toHaveText(chinese ? "博士毕业生" : "PhD Graduate");
    await expect(page.locator('[data-od-id="team-composition"] dt')).toHaveCount(4);
    await expect(page.locator('[data-od-id="team-pi"] dt')).toHaveCount(2);
  });
}

for (const chinese of [false, true]) {
  test(`Jeff leadership details ${chinese ? "zh" : "en"}`, async ({ page }) => {
    await page.goto("/");
    if (chinese) await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    await page.getByRole("navigation").getByRole("button", { name: chinese ? "团队" : "Team", exact: true }).click();
    const jeff = page.locator('[data-od-id="team-leader-2"]');
    await expect(jeff.locator("h3")).toHaveText(chinese ? "王泓清博士（Jeff Wang）" : "Dr. Jeff Wang");
    await expect(jeff.locator("strong")).toHaveText(chinese ? "首席技术官" : "Chief Technology Officer");
    await expect(jeff.locator("p").nth(0)).toHaveText(chinese ? "计算机视觉 / 轻量化目标检测" : "Computer Vision / Lightweight Object Detection");
    await expect(jeff.locator("p").nth(1)).toHaveText(chinese ? "开发适用于复杂交通场景的轻量化目标检测模型。" : "Develops lightweight object detection models for complex traffic scenes.");
    const email = jeff.getByRole("link", { name: "hongqing.wang812@gmail.com", exact: true });
    await expect(email).toHaveAttribute("href", "mailto:hongqing.wang812@gmail.com");
    await email.evaluate(node => node.addEventListener("click", event => { event.preventDefault(); node.setAttribute("data-activated", "true"); }, { once: true }));
    await email.focus(); await page.keyboard.press("Enter");
    await expect(email).toHaveAttribute("data-activated", "true");
    await expect(page.locator('[data-od-id="team-leader-3"] a')).toHaveCount(0);
  });
}

for (const chinese of [false, true]) {
  test(`home leadership matches team ${chinese ? "zh" : "en"}`, async ({ page }) => {
    await page.goto("/");
    if (chinese) await page.getByRole("button", { name: "切换为中文", exact: true }).click();
    const entries = page.locator('[data-od-id="home-team"] li');
    const expectedNames = chinese ? ["周俊杰博士（Chaw Jun Kit）", "王泓清博士（Jeff Wang）", "Wendy Leong Pooi Yan"] : ["Dr. Chaw Jun Kit", "Dr. Jeff Wang", "Wendy Leong Pooi Yan"];
    const expectedRoles = chinese ? ["课题负责人 / 高级讲师兼研究员", "首席技术官", "Mobiva 首席执行官 / 博士研究生"] : ["Principal Investigator / Senior Lecturer & Research Fellow", "Chief Technology Officer", "CEO of Mobiva / PhD Candidate"];
    await expect(entries.locator("strong")).toHaveText(expectedNames);
    await expect(entries.locator("span")).toHaveText(expectedRoles);
    await page.getByRole("navigation").getByRole("button", { name: chinese ? "团队" : "Team", exact: true }).click();
    await expect(page.locator("#team-pi-name")).toHaveText(expectedNames[0]);
    expect((await page.locator('[data-od-id="team-pi"] h3 span').allTextContents()).join(" / ")).toBe(expectedRoles[0]);
    for (let index = 1; index < 3; index++) {
      const profile = page.locator(`[data-od-id="team-leader-${index + 1}"]`);
      await expect(profile.locator("h3")).toHaveText(expectedNames[index]);
      await expect(profile.locator("strong")).toHaveText(expectedRoles[index]);
    }
    await expect(page.locator('[data-od-id="team-members"] article h3').filter({ hasText: /^(Zhao Yanfeng|Cheng Xiang|Liu Jianbang)$/ })).toHaveText(["Zhao Yanfeng", "Cheng Xiang", "Liu Jianbang"]);
  });
}
