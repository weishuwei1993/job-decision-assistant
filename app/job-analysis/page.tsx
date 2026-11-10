"use client";

import { FormEvent, useState } from "react";
import { StringList } from "@/components/string-list";
import { TextCard } from "@/components/text-card";
import { VerdictCard } from "@/components/verdict-card";

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
  { icon: string; label: string; className: string }
> = {
  matched: {
    icon: "✅",
    label: "匹配",
    className:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
  gap: {
    icon: "⚠️",
    label: "缺口",
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  },
  unknown: {
    icon: "❓",
    label: "未知",
    className:
      "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
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
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
        {title}
      </h2>
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
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        岗位需求分析器
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        把招聘 JD 完整粘贴进来，帮你想清楚：这份工作到底要什么，跟你合不合适，值不值得投。
      </p>

      {/* 输入表单 */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
      >
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          岗位 JD 原文
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="把招聘页面的岗位职责、任职要求完整复制粘贴到这里，越完整分析越准"
            rows={10}
            required
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
          {loading ? "分析中，通常需要半分钟到一分钟……" : "开始分析"}
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

      <p className="mt-10 text-center text-xs text-neutral-400">
        AI 分析仅供参考，重大决策请多方核实。
      </p>
    </main>
  );
}
