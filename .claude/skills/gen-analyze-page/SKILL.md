---
name: gen-analyze-page
description: 生成「输入表单 → 调 API → 结构化结果展示」的分析页面骨架（app/<slug>/page.tsx）。新建分析类功能页面时使用。
argument-hint: [功能slug] [中文页面标题]
---

# /gen-analyze-page 生成分析页面骨架

## 输入
- 参数 1：功能 slug（kebab-case，如 `job-analysis`），决定页面路径 `app/<slug>/page.tsx` 与 API 路径 `app/api/<slug>/route.ts`
- 参数 2：中文页面标题（如「岗位需求分析器」）

## 执行步骤
1. 按下面的骨架创建 `app/<slug>/page.tsx`，按该功能的实际输入字段调整表单
2. `AnalysisResult` 类型的字段**必须与 `prompts/<slug>.md` 里定义的 JSON 输出结构一一对应**；若该提示词文件还不存在，先停下来提醒用户跑 `/write-prompt`
3. 若 `app/api/<slug>/route.ts` 不存在，完成后提醒接着跑 `/add-route`
4. 本次任务若涉及超过 3 个文件（页面 + 路由 + 提示词 + lib），按 README 约定先做计划再动手

## 页面骨架

```tsx
"use client";

import { FormEvent, useState } from "react";

// TODO: 按 prompts/<slug>.md 定义的 JSON 输出结构调整此类型
type AnalysisResult = {
  verdict: string;
};

export default function TemplatePage() {
  const [mainInput, setMainInput] = useState("");
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/<slug>", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mainInput, background }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "分析失败，请稍后再试");
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "分析失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        <页面标题>
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        <一句话说明这个工具帮用户做什么判断>
      </p>

      {/* 输入表单 */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
      >
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          <主输入项名称>
          <textarea
            value={mainInput}
            onChange={(e) => setMainInput(e.target.value)}
            placeholder="<输入引导文案>"
            rows={10}
            required
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-100"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          用户背景（选填，越具体分析越准）
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="你的专业、工作年限、做过的项目"
            rows={4}
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-100"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
        >
          {loading ? "分析中，大约需要十几秒……" : "开始分析"}
        </button>
        {error && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50">
            {error}
          </p>
        )}
      </form>

      {/* 结构化结果展示 */}
      {result && (
        <section className="mt-8 space-y-4">
          {/* 一句话结论放最上面，视觉最重 */}
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 dark:border-amber-700 dark:bg-amber-950/40">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">结论</p>
            <p className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {result.verdict}
            </p>
          </div>

          {/* TODO: 按 AnalysisResult 字段逐块渲染。
              数组字段渲染为列表；match 值 matched/gap/unknown
              分别用 ✅ emerald / ⚠️ amber / ❓ neutral 着色 */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">详细分析</p>
          </div>
        </section>
      )}

      <p className="mt-10 text-center text-xs text-neutral-400">
        AI 分析仅供参考，重大决策请多方核实。
      </p>
    </main>
  );
}
```

## 风格要求（必须遵守）
- 函数式组件 + Hooks，不用 class；组件名 PascalCase，文件按 Next.js 约定命名
- 容器统一 `mx-auto max-w-3xl px-4 py-10`，卡片 `rounded-2xl` + 中性色边框，间距用 4 的倍数
- 语义色固定：✅ 匹配 emerald、⚠️ 缺口 amber、❓ 未知 neutral、错误 red
- 全中文 UI 文案，按钮和提示语口语化
- 页面底部固定保留「AI 分析仅供参考，重大决策请多方核实」
