'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#tools" className="sr-only">跳到工具区</a>

      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="logo">
            <span className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </span>
            <span>天生我材必有用</span>
          </Link>
          <nav className="nav">
            <Link href="/" className="active">首页</Link>
            <Link href="/job-analysis">岗位分析</Link>
            <Link href="/company-research">公司研究</Link>
            <Link href="/interview-prep">面试准备</Link>
            <Link href="/career-direction">职业方向探索</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="hero">
          <h1>天生我材必有用</h1>
          <p>把求职从碰运气变成有方法</p>
        </section>

        <section id="tools" className="tools">
          <article className="card">
            <span className="card-num">01</span>
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3>岗位需求分析器</h3>
            <p>粘贴 JD，看懂它到底要什么、跟你合不合适、值不值得投。</p>
            <div className="card-foot">
              <span className="tag">输入 JD</span>
              <Link href="/job-analysis" className="enter">进入 →</Link>
            </div>
          </article>

          <article className="card">
            <span className="card-num">02</span>
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
            </div>
            <h3>公司/行业研究助手</h3>
            <p>查公司靠什么赚钱、行业往哪走、口碑如何，判断值不值得去。</p>
            <div className="card-foot">
              <span className="tag">输入公司 / 行业</span>
              <Link href="/company-research" className="enter">进入 →</Link>
            </div>
          </article>

          <article className="card">
            <span className="card-num">03</span>
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3>面试准备</h3>
            <p>猜透面试官真正想考什么，还能来一场带点评的模拟面试。</p>
            <div className="card-foot">
              <span className="tag">模拟问答</span>
              <Link href="/interview-prep" className="enter">进入 →</Link>
            </div>
          </article>

          <article className="card">
            <span className="card-num">04</span>
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"></path>
                <polyline points="1 6 1 16 8 12 16 16 23 12 23 2 16 6 8 2 1 6"></polyline>
              </svg>
            </div>
            <h3>职业方向探索</h3>
            <p>迷茫的时候聊一聊，用小实验低成本验证下一个方向。</p>
            <div className="card-foot">
              <span className="tag">聊一聊</span>
              <Link href="/career-direction" className="enter">进入 →</Link>
            </div>
          </article>
        </section>

        <footer className="site-footer">
          <div className="logo">
            <span className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </span>
            <span>天生我材必有用</span>
          </div>
          <div className="footer-links">
            <Link href="/job-analysis">岗位分析</Link>
            <Link href="/company-research">公司研究</Link>
            <Link href="/interview-prep">面试准备</Link>
            <Link href="/career-direction">方向探索</Link>
          </div>
          <p className="footer-note">给认真找工作的你 · © 2026 <span>求职小助手</span></p>
        </footer>
      </main>
    </div>
  );
}