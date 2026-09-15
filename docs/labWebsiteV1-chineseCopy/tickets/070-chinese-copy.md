## Issue: 070 — 中文文案与王泓清姓名修正
Description: 落实用户中文化清单保留英文版与专业专名并记录验证证据
Type: AFK
Milestone: chinese-copy
Touches: src/**, e2e/**, README.md, docs/design-references/hil-site/chinese-copy/**
Blocked by: None
### What to build
实现spec全部八项要求。修正中文负责人及研究卡姓名，中文分类导航标题正文职位去非必要英文，保留专业专名与英文版。首页仍只复用三负责人数据。目标测试先在旧产品red再新产品green，验证中文替换精确值，英文七页与基线不变。七中文页1920/390/320完整21截图，make check-release日志退出码trace。README与来源记录用户纠名依据，动态验收链接不预报通过。证据外部或ignored、脚本.txt，保护PIC、原素材、用户删除未跟踪状态。文本diff尽量400行内。
### Acceptance criteria
- [ ] 五断言实现及原始证据完整；确认清单逐项映射，保留清单不误删。
- [ ] 21截图完整并人工查看布局；目标redgreen及完整发布检查通过。
- [ ] 英文内容基线对比无变化且关键行为通过，来源依据与README准确。
### Validation
Fulfills: VAL-301, VAL-302, VAL-303, VAL-304, VAL-305
- Verification: make check-release (exit zero)
- Command / scenario: 中文七页文案清单核对及双语姓名断言，英文基线对比，三宽度截图与完整E2E。
- Evidence expected: 原始日志退出码trace21截图与映射记录。
