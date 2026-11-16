type Accent = "amber" | "emerald" | "neutral";

const ACCENT_TITLE: Record<Accent, string> = {
  amber: "text-amber-700 dark:text-amber-400",
  emerald: "text-emerald-700 dark:text-emerald-400",
  neutral: "text-neutral-500 dark:text-neutral-400",
};

// 使用函数方式避免JSX命名空间问题
const ACCENT_ICON = (accent: Accent) => {
  switch (accent) {
    case "amber":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    case "emerald":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    case "neutral":
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      );
  }
};

/** 字符串列表结果卡（风险点、行动清单、口碑信号等），所有分析页共用 */
export function StringList({
  title,
  items,
  accent = "neutral",
}: {
  title: string;
  items: string[];
  accent?: Accent;
}) {
  if (!items.length) return null;
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 rounded-full bg-opacity-10 p-1 dark:bg-opacity-10">
          {ACCENT_ICON(accent)}
        </div>
        <h2 className={`text-sm font-semibold ${ACCENT_TITLE[accent]}`}>
          {title}
        </h2>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300"
          >
            <span className="flex-shrink-0 mt-0.5 text-neutral-400 dark:text-neutral-500">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}