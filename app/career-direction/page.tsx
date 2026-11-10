"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AssistantBubble, UserBubble } from "@/components/chat-bubbles";

type ChatMessage = { role: "user" | "assistant"; content: string };

const EMPTY_HINT =
  "先说说你现在的困惑吧：不知道自己适合什么、要不要转行、几个选择之间怎么挑，都可以。";

export default function CareerDirectionPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, error]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/career-direction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, background }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "回复失败，请稍后再试");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply as string },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "回复失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        职业方向探索
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        迷茫的时候聊一聊。AI 一次只问一个问题，聊几轮后给你 2-3 个候选方向和验证它的小实验。
      </p>

      {/* 对话区 */}
      <section className="mt-8 space-y-4">
        {messages.length === 0 && !loading && (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-sm text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
            {EMPTY_HINT}
          </div>
        )}
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <UserBubble key={i} content={msg.content} />
          ) : (
            <AssistantBubble key={i} content={msg.content} />
          )
        )}
        {loading && <p className="text-sm text-neutral-400">对方思考中……</p>}
        {error && (
          <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50">
            {error}
          </p>
        )}
        <div ref={endRef} />
      </section>

      {/* 输入区 */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
      >
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          你的背景小传（选填，随时可改，让 AI 更快懂你）
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="你的专业、工作年限、做过什么、在意什么"
            rows={2}
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-100"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          想说的话
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={messages.length === 0 ? EMPTY_HINT : "继续聊……"}
            rows={3}
            className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-100"
          />
        </label>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="mt-6 w-full rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
        >
          {loading ? "对方思考中……" : "发送"}
        </button>
      </form>

      <p className="mt-10 text-center text-xs text-neutral-400">
        AI 分析仅供参考，重大决策请多方核实。
      </p>
    </main>
  );
}
