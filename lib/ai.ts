// 统一的模型调用层：智谱 GLM（OpenAI 兼容接口，文档 https://docs.bigmodel.cn）
// 对上保持固定契约：runAnalysis / runChat / fillTemplate / parseJsonResult。
// 以后换模型只改这个文件和 .env.local，路由层不动。

// 临时解决方案：为了测试目的，这里硬编码API密钥
// 注意：实际部署时请使用环境变量，这里仅为快速验证功能
const MODEL = process.env.ZHIPU_MODEL ?? "glm-5.3-flash";
const API_KEY = process.env.ZHIPU_API_KEY || "sk-ws-H.PPIEXPD.hHW5.MEUCIQCAtIpKaHwvL7s5yutji5ghOish3onW_Jn_rcs6ZRurKAIgSYJKsy-NenXhB9o44eqOzmSwCcQ1S5e3ujbyO9QBlA4"; // 临时硬编码
const BASE_URL = (
  process.env.ZHIPU_BASE_URL ?? "https://open.bigmodel.cn/api/paas/v4"
).replace(/\/+$/, "");
// 32768 只是上限保护，不是目标长度；GLM-5.3-Flash 最大输出 128K，计费按实际生成量
const MAX_TOKENS = 32768;
const TIMEOUT_MS = 300_000;

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
  console.log("DEBUG: Checking API key...");
  console.log("DEBUG: process.env.ZHIPU_API_KEY =", process.env.ZHIPU_API_KEY);
  console.log("DEBUG: typeof process.env.ZHIPU_API_KEY =", typeof process.env.ZHIPU_API_KEY);
  if (!process.env.ZHIPU_API_KEY) {
    throw new Error("ZHIPU_API_KEY 未配置：请在 .env.local 填写后重启服务");
  }
  if (process.env.ZHIPU_API_KEY.trim() === "") {
    throw new Error("ZHIPU_API_KEY 为空：请检查 .env.local 文件中的 API Key 是否正确填写");
  }
}

/** 智谱“对话中的网络搜索”工具：平台在服务端检索并把结果注入上下文 */
function buildWebSearchTool() {
  return {
    type: "web_search",
    web_search: {
      enable: true,
      // search_pro 召回率和准确率更高（0.03 元/次），公司研究这类场景值得
      search_engine: "search_pro",
      search_result: true,
      count: 5,
      content_size: "high",
    },
  };
}

type StreamChunk = {
  choices?: {
    delta?: { content?: string };
    finish_reason?: string;
  }[];
};

/** 解析 OpenAI 兼容的 SSE 流，聚合正文与结束原因 */
async function readStream(
  body: ReadableStream<Uint8Array>
): Promise<{ content: string; finishReason: string }> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let content = "";
  let finishReason = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? ""; // 最后一段可能被截断，留到下一轮拼接
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (payload === "[DONE]") {
        return { content, finishReason };
      }
      let chunk: StreamChunk;
      try {
        chunk = JSON.parse(payload);
      } catch {
        continue; // 心跳等无法解析的行，跳过
      }
      const choice = chunk.choices?.[0];
      if (choice?.delta?.content) content += choice.delta.content;
      if (choice?.finish_reason) finishReason = choice.finish_reason;
    }
  }

  return { content, finishReason };
}

/** 发起一次流式请求并返回完整正文文本 */
async function complete(params: {
  system?: string;
  messages: ChatMessage[];
  temperature: number;
  /** 思考程度：分析报告用 high；对话轮次用 low 控制延迟 */
  reasoningEffort: "low" | "high";
  webSearch?: boolean;
}): Promise<string> {
  assertApiKey();

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        ...(params.system ? [{ role: "system", content: params.system }] : []),
        ...params.messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      temperature: params.temperature,
      max_tokens: MAX_TOKENS,
      // 流式接收，避免长思考撞上 HTTP 超时；推理内容单独放在 reasoning_content，这里只聚合正文
      stream: true,
      // GLM-5.3-Flash 的思考模式只能开启、不能关闭；
      // reasoning_effort 默认 max（深度思考），真实分析场景会跑到几分钟级，必须显式降档
      thinking: { type: "enabled" },
      reasoning_effort: params.reasoningEffort,
      ...(params.webSearch ? { tools: [buildWebSearchTool()] } : {}),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("ZHIPU_API_KEY 无效或未授权：请检查 .env.local 中的 Key");
    }
    const detail = await res.text().catch(() => "");
    throw new Error(`智谱 API 请求失败（HTTP ${res.status}）：${detail.slice(0, 300)}`);
  }
  if (!res.body) {
    throw new Error("智谱 API 返回了空响应");
  }

  const { content, finishReason } = await readStream(res.body);

  if (finishReason === "length") {
    throw new Error("回复过长被截断，请重试一次");
  }
  const text = content.trim();
  if (!text) {
    throw new Error("模型返回了空结果");
  }
  return text;
}

/**
 * 完成一次分析报告，返回模型输出的原始文本。
 * 结构化 JSON 输出用偏低 temperature 求稳；抛出的 Error.message 为中文，可直接用于展示或日志。
 */
export async function runAnalysis({
  template,
  variables,
  webSearch = false,
}: RunAnalysisOptions): Promise<string> {
  return complete({
    messages: [{ role: "user", content: fillTemplate(template, variables) }],
    temperature: 0.6,
    reasoningEffort: "high",
    webSearch,
  });
}

/**
 * 多轮对话（职业方向探索、模拟面试等）：传入完整历史，返回本轮回复文本。
 * 对话用模型推荐区间的 temperature，语气更自然。
 */
export async function runChat({
  system,
  messages,
  webSearch = false,
}: RunChatOptions): Promise<string> {
  return complete({
    system,
    messages,
    temperature: 0.9,
    reasoningEffort: "low",
    webSearch,
  });
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
