type Accent = "amber" | "emerald" | "neutral";

const ACCENT_TITLE: Record<Accent, string> = {
  amber: "text-amber-700 dark:text-amber-400",
  emerald: "text-emerald-700 dark:text-emerald-400",
  neutral: "text-neutral-500 dark:text-neutral-400",
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
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <h2 className={`text-sm font-medium ${ACCENT_TITLE[accent]}`}>{title}</h2>
      <ul className="mt-4 space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300"
          >
            <span aria-hidden>·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
