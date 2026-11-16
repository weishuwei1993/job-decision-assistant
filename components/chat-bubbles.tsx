import ReactMarkdown from "react-markdown";
import type { ReactNode } from "react";

const MARKDOWN_COMPONENTS = {
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mb-3 leading-relaxed last:mb-0">{children}</p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="mb-3 text-base font-semibold last:mb-0">{children}</h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="mb-3 text-sm font-semibold last:mb-0">{children}</h3>
  ),
};

/** AI 回复气泡（左侧，卡片式，渲染 markdown），对话页共用 */
export function AssistantBubble({ content }: { content: string }) {
  return (
    <div className="mr-auto max-w-[90%] rounded-2xl border border-neutral-200 bg-white p-5 text-sm text-neutral-800 shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
      <ReactMarkdown components={MARKDOWN_COMPONENTS}>{content}</ReactMarkdown>
    </div>
  );
}

/** 用户消息气泡（右侧，深色底），对话页共用 */
export function UserBubble({ content }: { content: string }) {
  return (
    <div className="ml-auto max-w-[90%] whitespace-pre-wrap rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm leading-relaxed text-white shadow-sm transition-all duration-200 hover:shadow-md dark:from-blue-500 dark:to-indigo-500">
      {content}
    </div>
  );
}
