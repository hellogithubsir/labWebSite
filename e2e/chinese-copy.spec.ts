import { expect, test } from "@playwright/test";

test("Chinese copy uses corrected names and natural labels across seven screens", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/");
  await page.getByRole("button", { name: "切换为中文", exact: true }).click();
  const checks = [
    ["home", ["数字健康", "边缘智能", "智能体", "企业应用价值", "基于检索增强生成（RAG）的实时虚拟形象一体化数字礼宾", "怡和实验室与", "王泓清博士（Jeff Wang）", "周俊杰博士（Chaw Jun Kit）"]],
    ["research", ["数字健康与医学影像分析", "边缘智能与端侧视觉", "多智能体系统与自然语言处理", "通过检索增强生成（RAG）技术", "基于检索增强生成（RAG）的数字礼宾"]],
    ["projects", ["PDM Robot"]],
    ["advantages", ["跨模型技能编译与运行治理", "用户可控的分层人工智能记忆", "设备端智能体与硬件协同", "前沿技术储备"]],
    ["partners", ["Mobiva"]],
    ["team", ["王泓清博士（Jeff Wang）", "王泓清（Wang Hongqing）", "周俊杰博士（Chaw Jun Kit）", "数字健康 / 边缘智能 / 智能体", "hongqing.wang812@gmail.com", "Wendy Leong Pooi Yan"]],
    ["contact", ["企业合作基金", "检索增强生成（RAG）智能体与数字礼宾", "一区期刊论文", "马来西亚国民大学校历", "访问学术主页"]],
  ] as const;
  for (const [screen, phrases] of checks) {
    await page.locator(`[data-od-id="nav-${screen}"]`).click();
    await expect(page.locator("main")).toHaveAttribute("data-screen", screen);
    await expect(page.locator("[data-page-transition]")).toHaveAttribute("data-page-transition", "idle");
    for (const reveal of await page.locator("main [data-reveal]").all()) {
      await reveal.evaluate(node => node.scrollIntoView({ block: "center", behavior: "instant" }));
      await expect(reveal).toHaveAttribute("data-reveal", "visible");
    }
    const text = (await page.locator("main").innerText()).toLowerCase();
    for (const phrase of phrases) expect.soft(text, `${screen}: ${phrase}`).toContain(phrase.toLowerCase());
    expect.soft(text, screen).not.toMatch(/王鸿清|HEALTH|EDGE-AI|AGENT|AI-RAG|B2B|\bSkill\b|设备端 Agent|分层 AI 记忆|Q1 论文|UKM 校历|UKMsarjana 主页|（PI）|（CTO）/i);
    await expect(page.getByRole("button", { name: "Switch to English", exact: true })).toBeVisible();
  }
});
