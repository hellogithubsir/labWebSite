# Harmonizing Intelligence Lab 工程规则

## 项目目标

本仓库只用于实现 Harmonizing Intelligence Lab 官网的 Next.js 前端。页面设计以 Figma 交付物为准，当前应用从最小入口开始逐步实现正式页面。

历史实验和研究资料不在本仓库中，不得作为运行时依赖或页面入口。需要参考时使用同级的 `../labWebSite-archive/`，不要把归档源码重新放回 `src/`。

## 技术栈

- Next.js 16 App Router
- React 19
- TypeScript strict mode
- Tailwind CSS v4、PostCSS 和 shadcn/ui

写代码前确认当前依赖版本对应的本地文档，不把其他版本的 API 约定直接套进来。

## 目录结构

```text
src/
  app/          # 页面、布局和全局样式
  components/   # 可复用 React 组件
  hooks/        # 客户端交互 hooks
  lib/          # 无 UI 的工具函数和配置
  types/        # 共享 TypeScript 类型
public/         # 正式官网静态资源
```

运行时代码只能从 `src/` 和 `public/` 读取资源。根目录配置只服务当前官网工程。

## 编码规范

- 使用 TypeScript，不使用 `any` 绕过类型检查。
- React 组件使用 PascalCase，hooks 使用 `useXxx`，工具函数使用 camelCase。
- 优先使用具名导出和小而清晰的组件；共享逻辑放入 `components/`、`hooks/` 或 `lib/`。
- 样式优先使用 Tailwind utility 和组件级 CSS；全局 CSS 只放 reset、字体变量和全局设计 token。
- 保持移动端优先和语义化 HTML，不提前引入后端、数据库或无需求的状态管理。
- 页面实现以 Figma 的布局、内容、响应式状态和交互为依据，不擅自加入无关视觉方向。

## 常用命令

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run check
```

提交代码前至少运行 `npm run check`。涉及路由或静态资源时，再检查开发服务器中的目标页面和移动端布局。

## 操作约束

- 不把外部归档资料复制回当前应用目录。
- 不执行 `git push`、远端仓库操作或分支操作，除非用户明确要求。
- 删除或迁移文件前确认它属于构建产物、模板遗留或已明确授权的历史资料。
