"use client";

import { FormEvent, useState } from "react";
import { StringList } from "@/components/string-list";
import { TextCard } from "@/components/text-card";
import { VerdictCard } from "@/components/verdict-card";
import { LoadingSpinner } from "@/components/loading-spinner";

type RequirementItem = {
  item: string;
  explain: string;
  match: "matched" | "gap" | "unknown";
};

// 与 prompts/job-requirement-analysis.md 定义的 JSON 输出结构一一对应
type AnalysisResult = {
  verdict: string;
  between_lines: string;
  hard_requirements: RequirementItem[];
  soft_requirements: RequirementItem[];
  hidden_costs: string[];
  action_items: string[];
};

const MATCH_BADGE: Record<
  RequirementItem["match"],
  { icon: string; label: string; className: string; bgColor: string }
> = {
  matched: {
    icon: "✅",
    label: "匹配",
    className:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  gap: {
    icon: "⚠️",
    label: "缺口",
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
  },
  unknown: {
    icon: "❓",
    label: "未知",
    className:
      "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
    bgColor: "bg-neutral-100 dark:bg-neutral-800",
  },
};

function RequirementList({
  title,
  items,
}: {
  title: string;
  items: RequirementItem[];
}) {
  if (!items.length) return null;
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 rounded-full bg-blue-100 p-1 dark:bg-blue-900/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          {title}
        </h2>
      </div>
      <ul className="mt-4 space-y-4">
        {items.map((req, i) => {
          const badge = MATCH_BADGE[req.match] ?? MATCH_BADGE.unknown;
          return (
            <li key={i} className="border-b border-neutral-100 pb-4 last:border-b-0 last:pb-0 dark:border-neutral-800">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
                >
                  {badge.icon} {badge.label}
                </span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {req.item}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {req.explain}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function JobAnalysisPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/job-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, background }),
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
      <div className="text-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          岗位需求分析器
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          把招聘 JD 完整粘贴进来，帮你想清楚：这份工作到底要什么，跟你合不合适，值不值得投。
        </p>
      </div>

      {/* 输入表单 */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
      >
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          岗位 JD 原文
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="把招聘页面的岗位职责、任职要求完整复制粘贴到这里，越完整分析越准"
            rows={10}
            required
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-blue-400"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          你的背景（选填，越具体分析越准）
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="你的专业、工作年限、做过的项目、掌握的技能"
            rows={4}
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-blue-400"
          />
        </label>
        <button
          type="submit"
          disabled={loading || !jobDescription.trim()}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner />
              <span>分析中...</span>
            </div>
          ) : (
            "开始分析"
          )}
        </button>
        {error && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50">
            {error}
          </p>
        )}
      </form>

      {/* 结构化结果展示 */}
      {result && (
        <section className="mt-8 space-y-6">
          {/* 一句话结论放最上面，视觉最重 */}
          <VerdictCard text={result.verdict} />

          <TextCard title="JD 的言外之意" text={result.between_lines} />

          <RequirementList title="硬门槛（没有它干不了）" items={result.hard_requirements} />
          <RequirementList title="软要求（加分项和氛围信号）" items={result.soft_requirements} />

          <StringList
            title="需要警惕或跟对方确认的点"
            items={result.hidden_costs}
            accent="amber"
          />
          <StringList
            title="本周行动清单"
            items={result.action_items}
            accent="emerald"
          />
        </section>
      )}

      <div className="mt-12 rounded-2xl border border-dashed border-neutral-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center dark:border-neutral-800 dark:from-blue-950/20 dark:to-indigo-950/20">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          📝 提示
        </h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          分析结果仅作参考。请结合实际情况综合判断。
        </p>
      </div>
    </main>
  );
}
