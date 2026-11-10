---
name: review-style
description: 按项目编码规范检查改动的 Tailwind 风格、组件写法与命名（函数式 + Hooks、kebab-case 文件、PascalCase 组件、API 只走 Route Handler、无硬编码 key、提示词不硬编码）。提交前自查时使用。
argument-hint: [可选：要检查的文件或目录，默认查 git 未提交改动]
---

# /review-style 风格与命名检查

## 确定检查范围
- 参数给了文件/目录 → 只查它们
- 没给参数 → 查 `git status --short` + `git diff --name-only HEAD` 的未提交改动
- 没有任何未提交改动 → 直接说明无事可查，不要硬凑

## 检查清单（逐条过，逐条报）
1. **组件写法**：函数式组件 + Hooks；出现 class 组件即报
2. **命名**：文件名 kebab-case（`page.tsx`/`route.ts`/`layout.tsx` 等 Next.js 约定名除外）；组件和类型 PascalCase；其余变量/函数 camelCase；导入走 `@/` 别名
3. **API 边界**：前端只通过 `fetch("/api/...")` 调本项目的 Route Handler；页面/客户端组件里不得出现第三方后端 SDK 直连
4. **密钥安全**：不得出现硬编码 key；`ANTHROPIC_API_KEY`、Supabase 服务端密钥只能在服务端代码读取；`"use client"` 文件里引用服务端专用环境变量即报
5. **提示词**：提示词文本不得硬编码在代码里，必须从 `prompts/` 加载
6. **页面模式**：新增分析页面必须遵循「输入表单 → 调 API → 结构化结果展示」；结论卡片在最上、底部有「AI 分析仅供参考」提示
7. **Tailwind**：语义色固定（emerald=✅ 匹配、amber=⚠️ 缺口/结论强调、neutral=常规、red=错误）；间距用 4 的倍数（p-4/p-6/mt-8）；容器统一 `mx-auto max-w-3xl px-4 py-10`；同页面内按钮/卡片样式一致；深色模式类成对出现（`dark:`）
8. **文案**：UI 全中文、口语化；报错文案不暴露内部细节

## 输出格式
- 每个问题一行：`文件:行号 — 问题 — 修改建议`
- 全部通过时明确说「未发现违规」，不硬凑问题
- 只报清单内的问题；功能性 bug 不是本命令的职责，发现时提一句「建议另行 /code-review」即可
