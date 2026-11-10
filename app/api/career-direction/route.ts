import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fillTemplate, runChat } from "@/lib/claude";

type ChatMessage = { role: "user" | "assistant"; content: string };

// 防滥用上限：会话最多取最近 50 条，单条内容最长 10000 字符
const MAX_MESSAGES = 50;
const MAX_CONTENT_LENGTH = 10000;

export async function POST(req: Request) {
  let body: { messages?: unknown; background?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "请求格式不正确" }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "请先输入内容开始对话" }, { status: 400 });
  }

  const messages: ChatMessage[] = [];
  for (const item of body.messages.slice(-MAX_MESSAGES)) {
    if (!item || typeof item !== "object") {
      return NextResponse.json(
        { error: "对话记录格式不正确，请刷新页面重试" },
        { status: 400 }
      );
    }
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (
      (role !== "user" && role !== "assistant") ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      return NextResponse.json(
        { error: "对话记录格式不正确，请刷新页面重试" },
        { status: 400 }
      );
    }
    messages.push({
      role,
      content: content.slice(0, MAX_CONTENT_LENGTH),
    });
  }
  if (messages[messages.length - 1].role !== "user") {
    return NextResponse.json(
      { error: "对话记录格式不正确，请刷新页面重试" },
      { status: 400 }
    );
  }

  try {
    const template = await readFile(
      path.join(process.cwd(), "prompts", "career-direction.md"),
      "utf8"
    );
    const background =
      typeof body.background === "string" && body.background.trim()
        ? body.background.trim()
        : "（用户未填写背景，先从了解用户开始）";
    const system = fillTemplate(template, { MY_BACKGROUND: background });
    const reply = await runChat({ system, messages });
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("职业方向对话失败:", err);
    const message = err instanceof Error ? err.message : "";
    return NextResponse.json(
      {
        error: message.includes("ANTHROPIC_API_KEY")
          ? "服务端未配置 API Key，请在 .env.local 中填写 ANTHROPIC_API_KEY"
          : "回复失败，请稍后再试",
      },
      { status: 502 }
    );
  }
}
