'use client';

import { Hero } from '@/app/components/Hero';
import { ToolGrid } from '@/app/components/ToolGrid';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#tools"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#101828] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        跳到工具区
      </a>

      <header className="sticky top-0 z-40 px-4 pt-3 sm:px-6">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 rounded-full border-2 border-white bg-white/90 px-3 shadow-[0_10px_30px_-24px_rgba(16,24,40,0.45)] backdrop-blur-md sm:px-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-full pl-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b4be0]/40 focus-visible:ring-offset-2"
          >
            <span className="grid size-10 place-items-center rounded-2xl bg-[#eef2fe] text-[#2b4be0] ring-1 ring-[#2b4be0]/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </span>
            <span className="hidden text-[15px] font-bold tracking-tight text-[#101828] sm:inline">天生我材必有用</span>
          </Link>

          <nav aria-label="主导航" className="flex items-center gap-1 sm:gap-1.5">
            <Link
              href="/"
              className="rounded-full bg-[#eef2fe] px-3 py-2 text-[12.5px] font-bold text-[#2b4be0] transition-colors hover:bg-[#2b4be0] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b4be0]/40 sm:px-3.5"
            >
              首页
            </Link>
            <Link
              href="/job-analysis"
              className="rounded-full bg-[#eef2fe] px-3 py-2 text-[12.5px] font-bold text-[#2b4be0] transition-colors hover:bg-[#2b4be0] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b4be0]/40 sm:px-3.5"
            >
              岗位分析
            </Link>
            <Link
              href="/company-research"
              className="rounded-full bg-[#eef2fe] px-3 py-2 text-[12.5px] font-bold text-[#2b4be0] transition-colors hover:bg-[#2b4be0] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b4be0]/40 sm:px-3.5"
            >
              公司研究
            </Link>
            <Link
              href="/interview-prep"
              className="rounded-full bg-[#eef2fe] px-3.5 py-2 text-[12.5px] font-bold text-[#2b4be0] transition-colors hover:bg-[#2b4be0] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b4be0]/40 sm:inline-flex"
            >
              面试准备
            </Link>
            <Link
              href="/career-direction"
              className="rounded-full bg-[#eef2fe] px-3.5 py-2 text-[12.5px] font-bold text-[#2b4be0] transition-colors hover:bg-[#2b4be0] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b4be0]/40 sm:inline-flex"
            >
              职业方向探索
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Hero />

        <ToolGrid />
      </main>

      <footer className="px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <span className="grid size-9 place-items-center rounded-2xl bg-[#eef2fe] text-[#2b4be0]">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </span>
          <p className="text-[13px] font-bold text-[#101828]">天生我材必有用</p>
          <nav aria-label="页脚导航" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] font-medium">
            <Link
              href="/job-analysis"
              className="text-[#667085] transition-colors hover:text-[#2b4be0]"
            >
              岗位分析
            </Link>
            <Link
              href="/company-research"
              className="text-[#667085] transition-colors hover:text-[#2b4be0]"
            >
              公司研究
            </Link>
            <Link
              href="/interview-prep"
              className="text-[#667085] transition-colors hover:text-[#2b4be0]"
            >
              面试准备
            </Link>
            <Link
              href="/career-direction"
              className="text-[#667085] transition-colors hover:text-[#2b4be0]"
            >
              职业方向探索
            </Link>
          </nav>
          <p className="text-[11.5px] text-[#667085]/80">给认真找工作的你 · © 2026</p>
        </div>
      </footer>
    </div>
  );
}