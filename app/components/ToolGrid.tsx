'use client';

import Link from 'next/link';

export function ToolGrid() {
  return (
    <section id="tools" aria-labelledby="tools-title" className="scroll-mt-24 bg-white/60 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 id="tools-title" className="text-[26px] font-extrabold tracking-tight text-[#101828] sm:text-[30px]">四件工具</h2>
          <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-7 text-[#667085]">不用按顺序全用一遍，缺哪一步就补哪一步。</p>
        </div>

        <div className="mt-9 grid gap-4 sm:gap-5 md:grid-cols-2">

          <article id="tool-job" className="group relative scroll-mt-28 rounded-3xl border-2 border-[#dde5fa] bg-[#f3f6fe] p-6 shadow-[0_8px_0_0_#e9eefc] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_0_0_#e9eefc] hover:bg-[#edf1fe] sm:p-7">
            <div className="flex items-start justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-[#eef2fe] text-[#2b4be0] transition-transform duration-200 group-hover:-rotate-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </span>
              <span className="grid size-7 place-items-center rounded-full bg-[#eef2fe] font-mono text-[11px] font-bold text-[#2b4be0]">01</span>
            </div>
            <h3 className="mt-4 text-[18px] font-extrabold tracking-tight text-[#101828]">岗位需求分析器</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-[#475467]/90">粘贴 JD，看懂它到底要什么、跟你合不合适、值不值得投。</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="rounded-full bg-[#eef2fe] px-2.5 py-1 text-[11px] font-bold text-[#2b4be0]">输入 JD</span>
              <Link
                href="/job-analysis"
                className="group/cta inline-flex items-center gap-1.5 rounded-full border-2 border-[#2b4be0]/25 px-4 py-1.5 text-[13px] font-bold text-[#2b4be0] transition-colors hover:bg-[#2b4be0] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b4be0]/40 focus-visible:ring-offset-2"
              >
                进入
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover/cta:translate-x-0.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </article>

          <article id="tool-company" className="group relative scroll-mt-28 rounded-3xl border-2 border-[#dde5fa] bg-[#f3f6fe] p-6 shadow-[0_8px_0_0_#e9eefc] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_0_0_#e9eefc] hover:bg-[#edf1fe] sm:p-7">
            <div className="flex items-start justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-[#eef2fe] text-[#2b4be0] transition-transform duration-200 group-hover:-rotate-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="20" x2="12" y2="10"></line>
                  <line x1="18" y1="20" x2="18" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="16"></line>
                </svg>
              </span>
              <span className="grid size-7 place-items-center rounded-full bg-[#eef2fe] font-mono text-[11px] font-bold text-[#2b4be0]">02</span>
            </div>
            <h3 className="mt-4 text-[18px] font-extrabold tracking-tight text-[#101828]">公司/行业研究助手</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-[#475467]/90">查公司靠什么赚钱、行业往哪走、口碑如何，判断值不值得去。</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="rounded-full bg-[#eef2fe] px-2.5 py-1 text-[11px] font-bold text-[#2b4be0]">输入公司 / 行业</span>
              <Link
                href="/company-research"
                className="group/cta inline-flex items-center gap-1.5 rounded-full border-2 border-[#2b4be0]/25 px-4 py-1.5 text-[13px] font-bold text-[#2b4be0] transition-colors hover:bg-[#2b4be0] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b4be0]/40 focus-visible:ring-offset-2"
              >
                进入
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover/cta:translate-x-0.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </article>

          <article id="tool-interview" className="group relative scroll-mt-28 rounded-3xl border-2 border-[#dde5fa] bg-[#f3f6fe] p-6 shadow-[0_8px_0_0_#e9eefc] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_0_0_#e9eefc] hover:bg-[#edf1fe] sm:p-7">
            <div className="flex items-start justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-[#eef2fe] text-[#2b4be0] transition-transform duration-200 group-hover:-rotate-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <span className="grid size-7 place-items-center rounded-full bg-[#eef2fe] font-mono text-[11px] font-bold text-[#2b4be0]">03</span>
            </div>
            <h3 className="mt-4 text-[18px] font-extrabold tracking-tight text-[#101828]">面试准备</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-[#475467]/90">猜透面试官真正想考什么，还能来一场带点评的模拟面试。</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="rounded-full bg-[#eef2fe] px-2.5 py-1 text-[11px] font-bold text-[#2b4be0]">模拟问答</span>
              <Link
                href="/interview-prep"
                className="group/cta inline-flex items-center gap-1.5 rounded-full border-2 border-[#2b4be0]/25 px-4 py-1.5 text-[13px] font-bold text-[#2b4be0] transition-colors hover:bg-[#2b4be0] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b4be0]/40 focus-visible:ring-offset-2"
              >
                进入
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover/cta:translate-x-0.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </article>

          <article id="tool-direction" className="group relative scroll-mt-28 rounded-3xl border-2 border-[#dde5fa] bg-[#f3f6fe] p-6 shadow-[0_8px_0_0_#e9eefc] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_0_0_#e9eefc] hover:bg-[#edf1fe] sm:p-7">
            <div className="flex items-start justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-[#eef2fe] text-[#2b4be0] transition-transform duration-200 group-hover:-rotate-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"></path>
                  <polyline points="1 6 1 16 8 12 16 16 23 12 23 2 16 6 8 2 1 6"></polyline>
                </svg>
              </span>
              <span className="grid size-7 place-items-center rounded-full bg-[#eef2fe] font-mono text-[11px] font-bold text-[#2b4be0]">04</span>
            </div>
            <h3 className="mt-4 text-[18px] font-extrabold tracking-tight text-[#101828]">职业方向探索</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-[#475467]/90">迷茫的时候聊一聊，用小实验低成本验证下一个方向。</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="rounded-full bg-[#eef2fe] px-2.5 py-1 text-[11px] font-bold text-[#2b4be0]">聊一聊</span>
              <Link
                href="/career-direction"
                className="group/cta inline-flex items-center gap-1.5 rounded-full border-2 border-[#2b4be0]/25 px-4 py-1.5 text-[13px] font-bold text-[#2b4be0] transition-colors hover:bg-[#2b4be0] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b4be0]/40 focus-visible:ring-offset-2"
              >
                进入
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover/cta:translate-x-0.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}