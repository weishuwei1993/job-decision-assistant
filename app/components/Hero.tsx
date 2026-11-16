'use client';

import Link from 'next/link';

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden px-5 pb-16 pt-16 sm:px-8 sm:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="float-soft absolute -left-16 top-6 size-56 rounded-full bg-[#eef2fe]/80 blur-2xl"></div>
        <div className="float-soft absolute -right-10 top-20 size-64 rounded-full bg-[#e7edfe]/80 blur-2xl" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-0 left-1/3 size-48 rounded-full bg-[#dee7fd]/70 blur-2xl"></div>
        <div className="absolute left-[14%] top-28 size-3 rounded-full bg-[#2b4be0]/40"></div>
        <div className="absolute right-[16%] top-16 size-2.5 rounded-full bg-[#dee7fd]"></div>
        <div className="absolute bottom-16 right-[26%] size-2 rounded-full bg-[#2b4be0]/25"></div>
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <h1 id="hero-title" className="pop mt-2 text-[clamp(2.3rem,7vw,3.8rem)] font-extrabold leading-[1.15] tracking-[0.01em] text-[#101828]">
          天生我材<span className="underline decoration-[#2b4be0]/50 decoration-[7px] underline-offset-[10px] sm:decoration-[9px]">必有用</span>
        </h1>

        <p className="pop pop-2 mx-auto mt-4 max-w-xl text-[15px] leading-8 text-[#475467] sm:text-[16.5px]">
          把求职从碰运气变成有方法
        </p>

        <div className="pop pop-2 mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/job-analysis"
            className="group inline-flex items-center gap-2 rounded-full bg-[#2b4be0] px-7 py-3.5 text-[14.5px] font-bold text-white shadow-[0_6px_0_0_#c7d3f8] transition-all duration-150 hover:bg-[#1f38b5] active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b4be0]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F8FB]"
          >
            开始岗位分析
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
          <Link
            href="/career-direction"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#e5e8ef] bg-white px-6 py-3 text-[14.5px] font-bold text-[#475467] transition-colors hover:border-[#2b4be0]/40 hover:text-[#2b4be0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b4be0]/40"
          >
            看看四件工具
          </Link>
        </div>
      </div>
    </section>
  );
}