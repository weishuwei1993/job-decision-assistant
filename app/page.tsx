import Link from "next/link";

type Feature = {
  href: string;
  title: string;
  desc: string;
  ready: boolean;
};

const FEATURES: Feature[] = [
  {
    href: "/job-analysis",
    title: "岗位需求分析器",
    desc: "粘贴 JD，看懂它到底要什么、跟你合不合适、值不值得投",
    ready: true,
  },
  {
    href: "/company-research",
    title: "公司/行业研究助手",
    desc: "查公司靠什么赚钱、行业往哪走、口碑如何，判断值不值得去",
    ready: true,
  },
  {
    href: "/interview-prep",
    title: "面试准备",
    desc: "猜透面试官真正想考什么，带着答题思路和反问清单上场",
    ready: true,
  },
  {
    href: "/career-direction",
    title: "职业方向探索",
    desc: "迷茫的时候聊一聊，用小实验低成本验证下一个方向",
    ready: true,
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        天生我材必有用
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        投简历前，先想清楚三件事：我想去哪、我能去哪、哪家公司值得去。
      </p>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {FEATURES.map((feature) =>
          feature.ready ? (
            <Link
              key={feature.href}
              href={feature.href}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-neutral-900 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-100"
            >
              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {feature.desc}
              </p>
              <p className="mt-4 text-sm font-medium text-neutral-900 group-hover:underline dark:text-neutral-100">
                进入 →
              </p>
            </Link>
          ) : (
            <div
              key={feature.href}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm opacity-60 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {feature.title}
                </h2>
                <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                  即将上线
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {feature.desc}
              </p>
            </div>
          )
        )}
      </section>

      <p className="mt-12 text-center text-xs text-neutral-400">
        AI 分析仅供参考，重大决策请多方核实。
      </p>
    </main>
  );
}
