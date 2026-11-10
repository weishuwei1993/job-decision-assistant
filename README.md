# 天生我材必有用

AI 驱动的求职决策助手，帮用户在投简历前想清楚：我想去哪、我能去哪、哪家公司值得去。

## 技术栈

- **前端**：Next.js App Router + React + TypeScript + Tailwind
- **分析层**：智谱 GLM（glm-5.3-flash，OpenAI 兼容接口，支持联网搜索）
- **数据层**：Supabase
- **包管理**：npm
- **开发**：Claude Code

## 目录结构

- `app/`：Next.js 页面和 API 路由
- `components/`：可复用 UI 组件
- `lib/`：模型调用（智谱 GLM）、Supabase 等工具封装
- `prompts/`：分析提示词模板，与代码分离
- `.claude/skills/`：Claude Code 自定义技能

## 功能范围（只此四项）

1. 岗位需求分析器
2. 公司/行业研究助手
3. 职业方向探索（多轮对话）
4. 面试准备（含模拟面试）

**明确排除**：求职看板。不要自作主张添加。

## 输出铁律（所有 AI 分析结果必须遵守）

- 先给一句话结论，让人 3 秒抓住重点
- 专业词紧跟括号解释，如"SQL（一种从数据库取数据的语言）"
- 多用类比，少堆术语
- 用 /️ 标注匹配与缺口
- 结尾必须给可执行的行动建议
- 提示词模板统一放在 `prompts/` 目录，不要硬编码在代码里

## 编码规范

- 组件用函数式 + Hooks，不用 class
- API 走 Next.js Route Handler（`app/api/.../route.ts`）
- 敏感 Key 放 `.env.local`，禁止硬编码或提交
- 新增页面统一走"输入表单 → 调 API → 结构化结果展示"模式
- 组件命名 PascalCase，文件 kebab-case

## 常用命令

- `npm run dev`：启动开发服务器
- `npm run build`：构建生产版本
- `npm run lint`：代码检查

## Skills 约定

开发期 Skill 放在 `.claude/skills/`，按斜杠命令触发：

- `/gen-analyze-page`：生成"输入→分析→结果"页面骨架
- `/write-prompt`：按输出铁律生成分析提示词
- `/add-route`：生成 Route Handler
- `/review-style`：检查 Tailwind 风格与命名

## 开发流程

超过 3 个文件需要修改的任务，先用 `/plan` 分析再动手。