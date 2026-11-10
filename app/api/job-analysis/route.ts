import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseJsonResult, runAnalysis } from "@/lib/claude";

type RequestBody = {
  jobDescription: string;
  background?: string;
};

export async function POST(req: Request) {
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "请求格式不正确" }, { status: 400 });
  }

  if (
    !body.jobDescription ||
    typeof body.jobDescription !== "string" ||
    body.jobDescription.trim().length < 30
  ) {
    return NextResponse.json(
      { error: "请先完整粘贴岗位 JD（至少 30 字）" },
      { status: 400 }
    );
  }

  try {
    const template = await readFile(
      path.join(process.cwd(), "prompts", "job-requirement-analysis.md"),
      "utf8"
    );
    const raw = await runAnalysis({
      template,
      variables: {
        JOB_DESCRIPTION: body.jobDescription.trim(),
        MY_BACKGROUND:
          typeof body.background === "string" && body.background.trim()
            ? body.background.trim()
            : "（用户未填写背景，只分析 JD 本身，match 一律用 unknown）",
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
    console.error("岗位分析失败:", err);
    const message = err instanceof Error ? err.message : "";
    return NextResponse.json(
      {
        error: message.includes("ANTHROPIC_API_KEY")
          ? "服务端未配置 API Key，请在 .env.local 中填写 ANTHROPIC_API_KEY"
          : "分析失败，请稍后再试",
      },
      { status: 502 }
    );
  }
}
