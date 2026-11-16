/** 一句话结论卡——结果区视觉最重的元素，所有分析页共用 */
export function VerdictCard({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100 p-6 shadow-sm dark:border-amber-800 dark:from-amber-950/30 dark:to-amber-900/30">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 rounded-full bg-amber-500 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">核心结论</p>
      </div>
      <p className="mt-3 text-lg font-bold text-neutral-900 dark:text-neutral-100">
        {text}
      </p>
    </div>
  );
}
