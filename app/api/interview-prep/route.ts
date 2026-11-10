import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseJsonResult, runAnalysis } from "@/lib/ai";

type RequestBody = {
  position: string;
  company?: string;
  background?: string;
  extraNotes?: string;
};

export async function POST(req: Request) {
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "请求格式不正确" }, { status: 400 });
  }

  if (
    !body.position ||
    typeof body.position !== "string" ||
    body.position.trim().length < 2
  ) {
    return NextResponse.json(
      { error: "请先填写目标岗位，例：产品经理 / Java 后端" },
      { status: 400 }
    );
  }

  try {
    const template = await readFile(
      path.join(process.cwd(), "prompts", "interview-prep.md"),
      "utf8"
    );
    const raw = await runAnalysis({
      template,
      variables: {
        POSITION: body.position.trim(),
        COMPANY:
          typeof body.company === "string" && body.company.trim()
            ? body.company.trim()
            : "（用户未填写目标公司，按行业通用情况分析并注明）",
        MY_BACKGROUND:
          typeof body.background === "string" && body.background.trim()
            ? body.background.trim()
            : "（用户未填写背景，answer_angle 给通用思路，并提醒用户补充个人经历）",
        EXTRA_NOTES:
          typeof body.extraNotes === "string" && body.extraNotes.trim()
            ? body.extraNotes.trim()
            : "（用户未提供补充材料）",
      },
    });
    return NextResponse.json({ result: parseJsonResult(raw) });
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.error("模型输出不是合法 JSON:", err);
      return NextResponse.json(
        { error: "分析结果异常，请重试一次" },
        { status: 502 }
      );
    }
    if (err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError")) {
      console.error("面试准备分析超时:", err);
      return NextResponse.json({ error: "分析超时了，请重试一次" }, { status: 504 });
    }
    console.error("面试准备分析失败:", err);
    const message = err instanceof Error ? err.message : "";
    return NextResponse.json(
      {
        error: message.includes("ZHIPU_API_KEY")
          ? "服务端 API Key 未配置或无效，请在 .env.local 中检查 ZHIPU_API_KEY"
          : "分析失败，请稍后再试",
      },
      { status: 502 }
    );
  }
}
