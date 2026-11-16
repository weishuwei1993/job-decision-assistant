/** 段落型结果卡：标题 + 一段分析文字，所有分析页共用 */
export function TextCard({ title, text }: { title: string; text: string }) {
  if (!text) return null;
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 rounded-full bg-blue-100 p-1 dark:bg-blue-900/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          {title}
        </h2>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        {text}
      </p>
    </div>
  );
}
