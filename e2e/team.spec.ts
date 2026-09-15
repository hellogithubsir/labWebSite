import { expect, test } from "@playwright/test";

test("team screen member directory and filtering", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation").getByRole("button", { name: "Team", exact: true }).click();
  const cards = page.locator('[data-od-id="team-members"] article:visible');
  await expect(cards.locator("h3")).toHaveText(["Zhao Yanfeng", "Cheng Xiang", "Liu Jianbang", "Wang Hongqing", "Muhammad Aiman Md Zuki", "Leong Pooi Yan", "Zheng Kun", "Ooi Tze Yaang", "Teo Shi Han"]);
  await page.getByRole("button", { name: "Graduates", exact: true }).click();
  await expect(cards.locator("h3")).toHaveText(["Zhao Yanfeng", "Cheng Xiang", "Liu Jianbang", "Zheng Kun", "Ooi Tze Yaang", "Teo Shi Han"]);
  await expect(page.getByRole("button", { name: "Graduates", exact: true })).toHaveAttribute("aria-pressed", "true");
});

const names = ["Zhao Yanfeng", "Cheng Xiang", "Liu Jianbang", "Wang Hongqing", "Muhammad Aiman Md Zuki", "Leong Pooi Yan", "Zheng Kun", "Ooi Tze Yaang", "Teo Shi Han"];
const bios = {
 en: ["Safe-enhanced fully closed-loop artificial pancreas control based on Deep Reinforcement Learning.", "Adaptive dual distillation for efficient remaining useful life and predictive maintenance.", "Multimodal conversational emotion reasoning and immersive technology behavioral analysis.", "Hybrid-YOLO architectures for complex traffic detection and medical image segmentation.", "Multimodal sentiment and emotion analysis for personalized, persuasive health coaching.", "AI synergy in future pandemic prediction and automated crisis management tools.", "Generalized Gaussian distribution improvements and underwater sonar small-target detection.", "Dynamic sequence augmentation for the early prediction of non-communicable diseases.", "Edge AI applications for real-time fresh produce identification in retail weighing systems."],
 zh: ["专注于基于深度强化学习的安全增强型全闭环人工胰腺控制器。", "专注用于高效剩余使用寿命预测与预测性维护的自适应双蒸馏框架。", "研究多模态对话情绪推理与沉浸式技术行为分析。", "Hybrid-YOLO 架构开发者，专注复杂交通检测与医学影像分割。", "研究面向个性化、说服式健康指导的多模态情感与情绪分析框架。", "探索人工智能在未来疫情预测与自动化危机管理工具中的协同作用。", "广义高斯分布改进与水下声呐小目标检测的主要研究人员。", "开发具有序列结构的动态数据增强方法，用于非传染性疾病早期预测。", "开发用于零售称重系统实时生鲜识别的边缘人工智能应用。"],
};
for (const width of [1920, 390, 320]) for (const chinese of [false, true]) {
 test(`team screen ${width} ${chinese ? "Chinese" : "English"} content media filters`, async ({ page }, testInfo) => {
  const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  await page.setViewportSize({width, height: 1080}); await page.goto("/");
  if (chinese) await page.getByRole("button", {name:"切换为中文", exact:true}).click();
  if (width < 981) await page.getByRole("button", {name: chinese ? "菜单" : "Menu", exact:true}).click();
  await page.getByRole("navigation").getByRole("button", {name: chinese ? "团队" : "Team", exact:true}).click();
  if (width < 981) await expect(page.locator("#screen-navigation")).toHaveCSS("visibility","hidden");
  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page.getByRole("heading", {level:1})).toHaveText(chinese ? "团队" : "Team");
  const cards = page.locator('[data-od-id="team-members"] article');
  await expect(cards.locator("h3")).toHaveText(names);
  const roles = chinese ? ["博士毕业生 / 核心成员","博士研究生","硕士毕业生"] : ["PhD Graduate / Core Member","PhD Candidate","MSc Graduate"];
  for (let index=0; index<9; index++) {
    await expect(cards.nth(index).locator("dd").nth(0)).toHaveText(roles[Math.floor(index/3)]);
    await expect(cards.nth(index).locator("p")).toHaveText((chinese ? bios.zh : bios.en)[index]);
  }
  await expect(page.locator('[data-od-id="team-composition"] dd:nth-child(1)')).toHaveText(["03","07","03","02"]);
  await expect(page.locator('[data-od-id="team-composition"] dt')).toHaveText(chinese ? ["博士毕业生","博士研究生","硕士毕业生","硕士研究生"] : ["PhD graduates","PhD candidates","MSc graduates","MSc candidates"]);
  const pi = page.locator('[data-od-id="team-pi"]');
  await expect(pi).toContainText(chinese ? "周俊杰 Dr. Chaw Jun Kit" : "Dr. Chaw Jun Kit");
  await expect(pi).toContainText(chinese ? "马来西亚国民大学（UKM）视觉信息学研究所（IVI）" : "Institute of Visual Informatics / Universiti Kebangsaan Malaysia");
  await expect(pi).toContainText("HEALTH / EDGE-AI / AGENT");
  await expect(pi).toContainText(chinese ? "SCIE 及 Scopus 论文 50 余篇" : "50+ SCIE and Scopus papers");
  await expect(page.locator('[data-od-id="team-leader-2"] p')).toHaveCount(0);
  await expect(page.locator('[data-od-id="team-leader-3"]')).toContainText("Wendy Leong Pooi Yan");
  await expect(page.locator("main img")).toHaveCount(2);
  await expect(pi.locator("img")).toHaveAttribute("alt",chinese ? "课题负责人周俊杰博士的肖像" : "Portrait of Dr. Chaw Jun Kit, Principal Investigator");
  for (const img of await page.locator("main img").all()) {
   await img.scrollIntoViewIfNeeded(); await expect(img).toHaveJSProperty("complete",true);
   expect(await img.evaluate((node:HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
  }
  for (const reveal of await page.locator("main [data-reveal]").all()) { await reveal.scrollIntoViewIfNeeded(); await expect(reveal).toHaveAttribute("data-reveal","visible"); }
  if (width < 981) {
   const photo = await pi.locator("img").boundingBox(), text = await pi.locator("h3").boundingBox();
   expect(photo!.y).toBeGreaterThan(text!.y);
   expect(photo!.width/photo!.height).toBeCloseTo(427/590,2);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.evaluate(() => window.scrollTo(0,0)); await page.mouse.move(0,0);
  await expect.poll(() => page.locator("main").evaluate(node => node.getAnimations({subtree:true}).filter(a=>a.playState==="running").length)).toBe(0);
  await page.screenshot({path:testInfo.outputPath(`team-${chinese?"zh-CN":"en"}-${width}.png`),fullPage:true});
  const buttons = page.getByRole("group",{name:chinese?"筛选团队成员":"Filter team members"}).getByRole("button");
  for (const [filterIndex, expected] of [[1,["Zhao Yanfeng","Cheng Xiang","Liu Jianbang","Zheng Kun","Ooi Tze Yaang","Teo Shi Han"]],[2,["Wang Hongqing","Muhammad Aiman Md Zuki","Leong Pooi Yan"]],[0,names]] as const) {
   await buttons.nth(filterIndex).scrollIntoViewIfNeeded(); await buttons.nth(filterIndex).focus(); await page.keyboard.press("Enter");
   await expect(cards.locator("h3")).toHaveText([...expected]);
   for(let i=0;i<3;i++) await expect(buttons.nth(i)).toHaveAttribute("aria-pressed",String(i===filterIndex));
   await expect(cards.first().locator("..")).toHaveCSS("animation-duration","0.18s");
   await expect(buttons.nth(filterIndex)).toBeFocused();
   await expect.poll(() => page.locator("main").evaluate(node => node.getAnimations({subtree:true}).filter(a=>a.playState==="running").length)).toBe(0);
   await page.locator('[data-od-id="team-members"]').screenshot({path:testInfo.outputPath(`filter-${filterIndex}.png`)});
  }
  await page.emulateMedia({reducedMotion:"reduce"});
  await buttons.nth(2).click();
  await expect(cards.locator("h3")).toHaveText(["Wang Hongqing","Muhammad Aiman Md Zuki","Leong Pooi Yan"]);
  await expect(cards.first().locator("..")).toHaveCSS("animation-name","none");
  await expect(buttons.nth(2)).toHaveCSS("transition-duration","0s");
  await expect(page.getByRole("link",{name:"chawjk@ukm.edu.my"})).toHaveAttribute("href","mailto:chawjk@ukm.edu.my");
  expect(errors).toEqual([]);
 });
}
