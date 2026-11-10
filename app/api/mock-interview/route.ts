import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fillTemplate, runChat } from "@/lib/ai";
import { sanitizeHistory } from "@/lib/chat";

export async function POST(req: Request) {
  let body: {
    position?: unknown;
    company?: unknown;
    background?: unknown;
    messages?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "请求格式不正确" }, { status: 400 });
  }

  if (typeof body.position !== "string" || body.position.trim().length < 2) {
    return NextResponse.json(
      { error: "请先填写目标岗位，例：产品经理 / Java 后端" },
      { status: 400 }
    );
  }

  const history = sanitizeHistory(body.messages);
  if (!history.ok) {
    return NextResponse.json({ error: history.error }, { status: 400 });
  }

  try {
    const template = await readFile(
      path.join(process.cwd(), "prompts", "mock-interview.md"),
      "utf8"
    );
    const system = fillTemplate(template, {
      POSITION: body.position.trim(),
      COMPANY:
        typeof body.company === "string" && body.company.trim()
          ? body.company.trim()
          : "（用户未填写目标公司，用该行业通用面试风格）",
      MY_BACKGROUND:
        typeof body.background === "string" && body.background.trim()
          ? body.background.trim()
          : "（用户未填写背景）",
    });
    const reply = await runChat({ system, messages: history.messages });
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("模拟面试失败:", err);
    const message = err instanceof Error ? err.message : "";
    return NextResponse.json(
      {
        error: message.includes("ZHIPU_API_KEY")
          ? "服务端 API Key 未配置或无效，请在 .env.local 中检查 ZHIPU_API_KEY"
          : "面试官暂时联系不上，请稍后再试",
      },
      { status: 502 }
    );
  }
}
