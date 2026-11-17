'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CompanyResearch() {
  const [company, setCompany] = useState('');
  const [job, setJob] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航栏 */}
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
            <Link href="/">首页</Link>
            <Link href="/job-analysis">岗位分析</Link>
            <Link href="/company-research" className="active">公司研究</Link>
            <Link href="/interview-prep">面试准备</Link>
            <Link href="/career-direction">职业方向探索</Link>
          </nav>
        </div>
      </header>

      {/* 页面主体内容 */}
      <main className="flex-1">
        {/* Hero 大标题区 */}
        <section className="hero">
          <h1>公司/行业研究助手</h1>
          <p>输入公司或行业，帮你摸清它的赚钱逻辑、口碑风评和行业趋势。</p>
        </section>

        {/* 居中的表单卡片容器 */}
        <section className="tools single">
          <article className="card">
            
            {/* 公司名称或行业领域 */}
            <div style={{ marginBottom: 24 }}>
              <label htmlFor="company" style={{ display: 'block', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>公司名称或行业领域</label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="例如：字节跳动、跨境电商"
              />
            </div>

            {/* 面试岗位 (新增部分) */}
            <div style={{ marginBottom: 24 }}>
              <label htmlFor="job" style={{ display: 'block', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>面试岗位</label>
              <input
                id="job"
                type="text"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                placeholder="例如：前端开发工程师、高级产品经理"
              />
            </div>

            {/* 开始研究按钮 */}
            <button 
              type="button" 
              className="btn-start" 
              style={{ 
                width: '100%', 
                marginTop: 24, 
                padding: 14, 
                borderRadius: 12, 
                border: 'none', 
                background: 'var(--color-brand)', 
                color: '#fff', 
                fontSize: 16, 
                fontWeight: 700, 
                cursor: 'pointer' 
              }}
            >
              开始研究
            </button>

            <p className="footer-note" style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#98a2b3' }}>
              研究结果仅供参考，请结合多方信息综合判断。
            </p>

          </article>
        </section>
      </main>

      {/* 页面底部 Footer */}
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
    </div>
  );
}