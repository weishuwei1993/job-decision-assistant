"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { StringList } from "@/components/string-list";
import { TextCard } from "@/components/text-card";
import { VerdictCard } from "@/components/verdict-card";
import { LoadingSpinner } from "@/components/loading-spinner";

type PrepQuestion = {
  question: string;
  why: string;
  answer_angle: string;
  risk: string;
};

// 与 prompts/interview-prep.md 定义的 JSON 输出结构一一对应
type AnalysisResult = {
  verdict: string;
  real_intent: string;
  prep_questions: PrepQuestion[];
  questions_to_ask: string[];
  signals_to_watch: string[];
  action_items: string[];
};

function PrepQuestionList({ items }: { items: PrepQuestion[] }) {
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
          高概率被问的问题
        </h2>
      </div>
      <ul className="mt-4 space-y-5">
        {items.map((q, i) => (
          <li
            key={i}
            className="border-b border-neutral-100 pb-5 last:border-b-0 last:pb-0 dark:border-neutral-800"
          >
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {q.question}
            </p>
            <dl className="mt-3 space-y-3">
              <div>
                <dt className="text-xs font-medium text-neutral-400">为什么问这个</dt>
                <dd className="mt-0.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {q.why}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  答题思路
                </dt>
                <dd className="mt-0.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {q.answer_angle}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  ⚠️ 最容易踩的坑
                </dt>
                <dd className="mt-0.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {q.risk}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function InterviewPrepPage() {
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [background, setBackground] = useState("");
  const [extraNotes, setExtraNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/interview-prep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ position, company, background, extraNotes }),
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
          面试准备
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          猜透面试官真正想考察什么，带着答题思路、反问清单和避坑提醒上场。
        </p>
        <p className="mt-3 text-sm">
          <Link
            href="/mock-interview"
            className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            备考做完了？直接来一场模拟面试 →
          </Link>
        </p>
      </div>

      {/* 输入表单 */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
      >
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          目标岗位
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="例：产品经理 / Java 后端 / 新媒体运营"
            required
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-blue-400"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          目标公司（选填）
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="填了会结合这家公司的风格分析"
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-blue-400"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          你的背景与经历（选填，填了答题思路会更贴合你）
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="你的专业、工作年限、做过的项目、掌握的技能"
            rows={4}
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-blue-400"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          补充材料（选填）
          <textarea
            value={extraNotes}
            onChange={(e) => setExtraNotes(e.target.value)}
            placeholder="简历要点、之前面试被问到的问题或卡壳的地方"
            rows={3}
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-blue-400"
          />
        </label>
        <button
          type="submit"
          disabled={loading || !position.trim()}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner />
              <span>分析中...</span>
            </div>
          ) : (
            "生成备考报告"
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
          <VerdictCard text={result.verdict} />

          <TextCard title="面试官真正想考察什么" text={result.real_intent} />

          <PrepQuestionList items={result.prep_questions} />

          <StringList title="值得反问面试官的问题" items={result.questions_to_ask} />
          <StringList
            title="面试中值得观察的信号"
            items={result.signals_to_watch}
            accent="amber"
          />
          <StringList
            title="面试前行动清单"
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
          请结合自身实际情况灵活运用备考建议。
        </p>
      </div>
    </main>
  );
}
