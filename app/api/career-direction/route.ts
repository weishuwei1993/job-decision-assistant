import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fillTemplate, runChat } from "@/lib/ai";
import { sanitizeHistory } from "@/lib/chat";

export async function POST(req: Request) {
  let body: { messages?: unknown; background?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "请求格式不正确" }, { status: 400 });
  }

  const history = sanitizeHistory(body.messages);
  if (!history.ok) {
    return NextResponse.json({ error: history.error }, { status: 400 });
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
    const reply = await runChat({ system, messages: history.messages });
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("职业方向对话失败:", err);
    const message = err instanceof Error ? err.message : "";
    return NextResponse.json(
      {
        error: message.includes("ZHIPU_API_KEY")
          ? "服务端 API Key 未配置或无效，请在 .env.local 中检查 ZHIPU_API_KEY"
          : "回复失败，请稍后再试",
      },
      { status: 502 }
    );
  }
}
