---
name: add-route
description: 生成 Next.js Route Handler（app/api/<slug>/route.ts），含输入校验、加载 prompts/ 提示词、调用 lib/claude、统一错误处理。新增或修改分析类 API 路由时使用。
argument-hint: [功能slug]
---

# /add-route 生成 Route Handler

## 执行步骤
1. 按下面的骨架创建 `app/api/<slug>/route.ts`
2. 提示词从 `prompts/<slug>.md` 读取（`node:fs/promises` + `process.cwd()`），变量用 `template.replaceAll("{{VAR}}", value)` 填入；**禁止把提示词文本写进代码**
3. Claude 调用统一走 `@/lib/claude` 的 `runAnalysis({ template, variables })`，返回字符串。**若 `lib/claude.ts` 尚不存在**：先加载 `claude-api` skill 确认当前推荐的模型与 SDK 用法，再按此契约创建，不要凭记忆写 API 调用代码
4. 错误分级：必填字段缺失/格式不对 → 400；上游 Claude API 失败 → 502；其他 → 500。错误文案用中文，不暴露内部细节（如 key、堆栈）
5. 响应形状统一：成功 `{ result }`，失败 `{ error }`

## 路由骨架

```ts
import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { runAnalysis } from "@/lib/claude";

// TODO: 与 prompts/<slug>.md 的变量占位符对齐
type RequestBody = {
  mainInput: string;
  background?: string;
};

export async function POST(req: Request) {
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "请求格式不正确" }, { status: 400 });
  }

  // 校验必填字段（按实际字段调整）
  if (!body.mainInput || typeof body.mainInput !== "string" || body.mainInput.trim().length < 30) {
    return NextResponse.json({ error: "请先完整粘贴需要分析的内容" }, { status: 400 });
  }

  try {
    const template = await readFile(path.join(process.cwd(), "prompts", "<slug>.md"), "utf8");
    const result = await runAnalysis({
      template,
      variables: {
        MAIN_INPUT: body.mainInput,
        MY_BACKGROUND: body.background?.trim() || "（用户未填写背景）",
      },
    });
    return NextResponse.json({ result: JSON.parse(result) });
  } catch (err) {
    if (err instanceof SyntaxError) {
      // 模型输出不是合法 JSON
      console.error("模型输出解析失败:", err);
      return NextResponse.json({ error: "分析结果异常，请重试一次" }, { status: 502 });
    }
    console.error("分析失败:", err);
    return NextResponse.json({ error: "分析失败，请稍后再试" }, { status: 502 });
  }
}
```

## 注意
- 若 `prompts/<slug>.md` 或对应页面不存在，提醒先跑 `/write-prompt`、`/gen-analyze-page`
- 涉及 `lib/claude.ts` 的新建或修改，必须先加载 `claude-api` skill
- `.env.local` 里的 key 只在服务端读取，响应体里不得出现任何 key 或上游原始报错
- 部署为 standalone 输出时，需确认 `prompts/` 目录随产物发布
