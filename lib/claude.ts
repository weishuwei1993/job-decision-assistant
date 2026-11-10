import Anthropic from "@anthropic-ai/sdk";

// 模型可在 .env.local 用 CLAUDE_MODEL 覆盖，默认 claude-opus-5-5
const MODEL = process.env.CLAUDE_MODEL ?? "claude-opus-5-5";
const MAX_TOKENS = 16000;

export type RunAnalysisOptions = {
  /** 提示词模板全文（从 prompts/ 目录读入） */
  template: string;
  /** 占位符变量，key 为模板里的 {{UPPER_SNAKE}} 名称 */
  variables: Record<string, string>;
  /** 是否启用联网搜索（公司研究等需要最新信息的场景） */
  webSearch?: boolean;
};

export type ChatMessage = { role: "user" | "assistant"; content: string };

export type RunChatOptions = {
  /** 系统提示词（多轮对话的角色设定） */
  system: string;
  /** 完整对话历史，最后一条必须是 user */
  messages: ChatMessage[];
  /** 是否启用联网搜索 */
  webSearch?: boolean;
};

/** 把模板里的 {{VAR}} 替换为实际值；未提供的变量替换为空并告警 */
export function fillTemplate(template: string, variables: Record<string, string>): string {
  return template.replaceAll(/\{\{([A-Z0-9_]+)\}\}/g, (match, name: string) => {
    const value = variables[name];
    if (value === undefined) {
      console.warn(`提示词变量未提供: {{${name}}}`);
      return "";
    }
    return value;
  });
}

function assertApiKey(): void {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY 未配置：请在 .env.local 填写后重启服务");
  }
}

/** 发起一次流式请求并返回完整消息；检查 refusal / max_tokens 停止原因 */
async function complete(params: {
  messages: Anthropic.MessageParam[];
  system?: string;
  webSearch: boolean;
  /** 分析报告用 high；短对话轮次用 medium 控制成本与延迟 */
  effort: "medium" | "high";
}): Promise<Anthropic.Message> {
  const client = new Anthropic();

  // 流式请求避免长响应撞上 HTTP 超时；不逐事件处理，取最终完整消息
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    thinking: { type: "adaptive" },
    output_config: { effort: params.effort },
    ...(params.webSearch
      ? {
          tools: [
            { type: "web_search_20260209", name: "web_search", max_uses: 5 },
          ],
        }
      : {}),
    ...(params.system ? { system: params.system } : {}),
    messages: params.messages,
  });

  const message = await stream.finalMessage();

  if (message.stop_reason === "refusal") {
    throw new Error("模型拒绝了本次请求，请调整内容后重试");
  }
  if (message.stop_reason === "max_tokens") {
    throw new Error("回复过长被截断，请重试一次");
  }
  return message;
}

function extractText(message: Anthropic.Message): string {
  const text = message.content
    .map((block) => (block.type === "text" ? block.text : ""))
    .join("")
    .trim();
  if (!text) {
    throw new Error("模型返回了空结果");
  }
  return text;
}

/**
 * 调用 Claude 完成一次分析报告，返回模型输出的原始文本。
 * 抛出的 Error.message 为中文，可直接用于展示或日志。
 */
export async function runAnalysis({
  template,
  variables,
  webSearch = false,
}: RunAnalysisOptions): Promise<string> {
  assertApiKey();
  const message = await complete({
    messages: [{ role: "user", content: fillTemplate(template, variables) }],
    webSearch,
    effort: "high",
  });
  return extractText(message);
}

/**
 * 多轮对话（职业方向探索、模拟面试等）：传入完整历史，返回本轮回复文本。
 * 对话轮次短，effort 用 medium 控制成本与延迟。
 */
export async function runChat({
  system,
  messages,
  webSearch = false,
}: RunChatOptions): Promise<string> {
  assertApiKey();
  const message = await complete({
    system,
    messages: messages as Anthropic.MessageParam[],
    webSearch,
    effort: "medium",
  });
  return extractText(message);
}

/**
 * 解析模型的 JSON 输出：容错处理 markdown 代码块围栏和前后杂文。
 * 解析失败抛 SyntaxError，由调用方转成 502。
 */
export function parseJsonResult<T = unknown>(text: string): T {
  const cleaned = text
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/```\s*$/, "")
    .trim();
  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) {
    throw new SyntaxError("模型输出中未找到 JSON 对象");
  }
  return JSON.parse(cleaned.slice(first, last + 1)) as T;
}
