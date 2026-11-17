'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function InterviewPrep() {
  const [basic, setBasic] = useState('');
  const [experience, setExperience] = useState('');
  const [concern, setConcern] = useState('');

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
            <Link href="/company-research">公司研究</Link>
            <Link href="/interview-prep" className="active">面试准备</Link>
            <Link href="/career-direction">职业方向探索</Link>
          </nav>
        </div>
      </header>

      {/* 页面主体内容 */}
      <main className="flex-1">
        {/* Hero 大标题区 */}
        <section className="hero">
          <h1>面试准备</h1>
          <p>猜透面试官真正想考什么，还能来一场带点评的模拟面试。</p>
        </section>

        {/* 居中的表单卡片容器 */}
        <section className="tools single">
          <article className="card">
            
            {/* 1. 基础信息 */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>基础信息</label>
              <input
                type="text"
                value={basic}
                onChange={(e) => setBasic(e.target.value)}
                placeholder="目标公司 + 岗位名称 + 面试轮次"
              />
            </div>

            {/* 2. 你的经历 */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>你的经历</label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="核心优势 + 准备拿什么项目来打动面试官"
              />
            </div>

            {/* 3. 你的困惑 */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>你的困惑</label>
              <input
                type="text"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                placeholder="最怕被问到的问题，或者想重点模拟的环节"
              />
            </div>

            {/* 开始模拟面试按钮 */}
            <button 
              type="button" 
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
              开始模拟面试
            </button>

            <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#98a2b3' }}>
              模拟场景仅供参考，请结合实际岗位要求调整。
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