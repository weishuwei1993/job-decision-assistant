"use client";

import { FormEvent, useState } from "react";
import { StringList } from "@/components/string-list";
import { TextCard } from "@/components/text-card";
import { VerdictCard } from "@/components/verdict-card";

// 与 prompts/company-research.md 定义的 JSON 输出结构一一对应
type AnalysisResult = {
  verdict: string;
  snapshot: string;
  business_health: string;
  industry_outlook: string;
  culture_signals: string[];
  risks: string[];
  match_assessment: string;
  action_items: string[];
};

export default function CompanyResearchPage() {
  const [companyName, setCompanyName] = useState("");
  const [focus, setFocus] = useState("");
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/company-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, focus, background }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "分析失败，请稍后再试");
      setResult(data.result as AnalysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "分析失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        公司/行业研究助手
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        查公司靠什么赚钱、经营得怎么样、行业往哪走、口碑如何，帮你判断这家公司值不值得去。
      </p>

      {/* 输入表单 */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
      >
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          公司或行业名称
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="例：字节跳动 / 智能驾驶行业"
            required
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-100"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          你最关心的问题（选填）
          <textarea
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            placeholder="例：加班严重吗？这个业务线稳定吗？应届生进去成长空间大吗？"
            rows={3}
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-100"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          你的背景（选填，越具体分析越准）
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="你的专业、工作年限、做过的项目、掌握的技能"
            rows={4}
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-100"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
        >
          {loading ? "分析中，需要联网查资料，通常需要一到两分钟……" : "开始研究"}
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
          <VerdictCard text={result.verdict} />

          <TextCard title="这家公司是做什么的" text={result.snapshot} />
          <TextCard title="经营状况" text={result.business_health} />
          <TextCard title="行业 3-5 年走向" text={result.industry_outlook} />

          <StringList title="文化口碑信号" items={result.culture_signals} />
          <StringList title="风险点" items={result.risks} accent="amber" />

          <TextCard title="与你的适配度" text={result.match_assessment} />

          <StringList
            title="面试/投递前的功课"
            items={result.action_items}
            accent="emerald"
          />
        </section>
      )}

      <p className="mt-10 text-center text-xs text-neutral-400">
        AI 分析仅供参考，重大决策请多方核实。
      </p>
    </main>
  );
}
