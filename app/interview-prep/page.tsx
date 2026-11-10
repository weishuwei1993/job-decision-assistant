"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { StringList } from "@/components/string-list";
import { TextCard } from "@/components/text-card";
import { VerdictCard } from "@/components/verdict-card";

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
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
        高概率被问的问题
      </h2>
      <ul className="mt-4 space-y-4">
        {items.map((q, i) => (
          <li
            key={i}
            className="border-b border-neutral-100 pb-4 last:border-b-0 last:pb-0 dark:border-neutral-800"
          >
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {q.question}
            </p>
            <dl className="mt-3 space-y-2">
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
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        面试准备
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        猜透面试官真正想考察什么，带着答题思路、反问清单和避坑提醒上场。
      </p>
      <p className="mt-3 text-sm">
        <Link
          href="/mock-interview"
          className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-400"
        >
          备考做完了？直接来一场模拟面试 →
        </Link>
      </p>

      {/* 输入表单 */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
      >
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          目标岗位
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="例：产品经理 / Java 后端 / 新媒体运营"
            required
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-100"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          目标公司（选填）
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="填了会结合这家公司的风格分析"
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-100"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          你的背景与经历（选填，填了答题思路会更贴合你）
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="你的专业、工作年限、做过的项目、掌握的技能"
            rows={4}
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-100"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          补充材料（选填）
          <textarea
            value={extraNotes}
            onChange={(e) => setExtraNotes(e.target.value)}
            placeholder="简历要点、之前面试被问到的问题或卡壳的地方"
            rows={3}
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-100"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
        >
          {loading ? "分析中，通常需要半分钟到一分钟……" : "生成备考报告"}
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

      <p className="mt-10 text-center text-xs text-neutral-400">
        AI 分析仅供参考，重大决策请多方核实。
      </p>
    </main>
  );
}
