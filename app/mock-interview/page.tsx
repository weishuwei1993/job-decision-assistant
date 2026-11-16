"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AssistantBubble, UserBubble } from "@/components/chat-bubbles";
import { LoadingSpinner } from "@/components/loading-spinner";

type ChatMessage = { role: "user" | "assistant"; content: string };

// 发给 API 的合成开场消息：让面试官按开场规则先开口，不在界面显示
const KICKOFF =
  "（用户已就位。请按开场规则进行：一句话说明面试开始和预计流程，然后立刻提出第一个问题。）";

export default function MockInterviewPage() {
  const [started, setStarted] = useState(false);
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [background, setBackground] = useState("");
  // 界面显示的真实轮次（不含合成开场消息）
  const [turns, setTurns] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, loading, error]);

  async function callApi(messages: ChatMessage[]): Promise<string> {
    const res = await fetch("/api/mock-interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ position, company, background, messages }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "面试官暂时联系不上，请稍后再试");
    return data.reply as string;
  }

  async function handleStart(e: FormEvent) {
    e.preventDefault();
    if (!position.trim() || loading) return;
    setStarted(true);
    setTurns([]);
    setLoading(true);
    setError(null);
    try {
      const reply = await callApi([{ role: "user", content: KICKOFF }]);
      setTurns([{ role: "assistant", content: reply }]);
    } catch (err) {
      setStarted(false);
      setError(err instanceof Error ? err.message : "面试开始失败，请重试");
    } finally {
      setLoading(false);
    }
  }

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const apiMessages: ChatMessage[] = [
      { role: "user", content: KICKOFF },
      ...turns,
      { role: "user", content: text },
    ];
    setTurns((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const reply = await callApi(apiMessages);
      setTurns((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "回复失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setStarted(false);
    setTurns([]);
    setInput("");
    setError(null);
  }

  if (!started) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            模拟面试
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            先设定岗位和背景，AI 面试官会像真人一样逐层追问，每 3-5 题给一次点评，结束时给总评和行动建议。
          </p>
        </div>
        {error && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50">
            {error}
          </p>
        )}
        <form
          onSubmit={handleStart}
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
              placeholder="填了会模仿这家公司的面试风格"
              className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-blue-400"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            你的背景与经历（选填，填了提问会更贴合你）
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
            disabled={loading || !position.trim()}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner />
                <span>面试官入场中...</span>
              </div>
            ) : (
              "开始面试"
            )}
          </button>
        </form>

        <div className="mt-12 rounded-2xl border border-dashed border-neutral-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center dark:border-neutral-800 dark:from-blue-950/20 dark:to-indigo-950/20">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            🎯 提示
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            请认真对待每次回答，就像真实的面试一样。
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            模拟面试
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {position}
            {company.trim() ? ` · ${company.trim()}` : ""}
          </p>
        </div>
        <button
          onClick={handleReset}
          className="shrink-0 rounded-xl border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-100 dark:hover:text-neutral-100"
        >
          结束重来
        </button>
      </div>

      {/* 对话区 */}
      <section className="mt-8 space-y-4">
        {turns.map((msg, i) =>
          msg.role === "user" ? (
            <UserBubble key={i} content={msg.content} />
          ) : (
            <AssistantBubble key={i} content={msg.content} />
          )
        )}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <LoadingSpinner />
            <span>面试官思考中...</span>
          </div>
        )}
        {error && (
          <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50">
            {error}
          </p>
        )}
        <div ref={endRef} />
      </section>

      {/* 输入区 */}
      <form
        onSubmit={handleSend}
        className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
      >
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          你的回答
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="认真回答，像在真实面试一样"
            rows={4}
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-blue-400"
          />
        </label>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner />
              <span>发送回答</span>
            </div>
          ) : (
            "发送回答"
          )}
        </button>
      </form>

      <div className="mt-12 rounded-2xl border border-dashed border-neutral-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center dark:border-neutral-800 dark:from-blue-950/20 dark:to-indigo-950/20">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          🎯 提示
        </h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          请认真对待每次回答，就像真实的面试一样。
        </p>
      </div>
    </main>
  );
}
