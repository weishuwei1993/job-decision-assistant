import type { ChatMessage } from "@/lib/claude";

// 防滥用上限：会话最多取最近 50 条，单条内容最长 10000 字符
const MAX_MESSAGES = 50;
const MAX_CONTENT_LENGTH = 10000;

export type SanitizeResult =
  | { ok: true; messages: ChatMessage[] }
  | { ok: false; error: string };

/**
 * 校验并清洗客户端传来的对话历史：
 * role 白名单（防 system 注入）、最后一条必须是 user、
 * 截断到最近 MAX_MESSAGES 条、单条内容截断。
 */
export function sanitizeHistory(raw: unknown): SanitizeResult {
  if (!Array.isArray(raw) || raw.length === 0) {
    return { ok: false, error: "请先输入内容开始对话" };
  }
  const messages: ChatMessage[] = [];
  for (const item of raw.slice(-MAX_MESSAGES)) {
    if (!item || typeof item !== "object") {
      return { ok: false, error: "对话记录格式不正确，请刷新页面重试" };
    }
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (
      (role !== "user" && role !== "assistant") ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      return { ok: false, error: "对话记录格式不正确，请刷新页面重试" };
    }
    messages.push({ role, content: content.slice(0, MAX_CONTENT_LENGTH) });
  }
  if (messages[messages.length - 1].role !== "user") {
    return { ok: false, error: "对话记录格式不正确，请刷新页面重试" };
  }
  return { ok: true, messages };
}
