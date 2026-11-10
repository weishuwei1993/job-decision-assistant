/** 一句话结论卡——结果区视觉最重的元素，所有分析页共用 */
export function VerdictCard({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 dark:border-amber-700 dark:bg-amber-950/40">
      <p className="text-sm font-medium text-amber-700 dark:text-amber-400">结论</p>
      <p className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        {text}
      </p>
    </div>
  );
}
