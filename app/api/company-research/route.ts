import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseJsonResult, runAnalysis } from "@/lib/ai";

type RequestBody = {
  companyName: string;
  focus?: string;
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
    !body.companyName ||
    typeof body.companyName !== "string" ||
    body.companyName.trim().length < 2
  ) {
    return NextResponse.json(
      { error: "请先填写要研究的公司或行业名称" },
      { status: 400 }
    );
  }

  try {
    const template = await readFile(
      path.join(process.cwd(), "prompts", "company-research.md"),
      "utf8"
    );
    const raw = await runAnalysis({
      template,
      webSearch: true,
      variables: {
        COMPANY_NAME: body.companyName.trim(),
        FOCUS:
          typeof body.focus === "string" && body.focus.trim()
            ? body.focus.trim()
            : "（用户没有特别关心的问题，做全面评估即可）",
        MY_BACKGROUND:
          typeof body.background === "string" && body.background.trim()
            ? body.background.trim()
            : "（用户未填写背景，match_assessment 只做通用评估）",
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
    console.error("公司研究失败:", err);
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
