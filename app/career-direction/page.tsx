'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CareerDirection() {
  const [confusion, setConfusion] = useState('');
  const [interest, setInterest] = useState('');
  const [skills, setSkills] = useState('');

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
            <Link href="/interview-prep">面试准备</Link>
            <Link href="/career-direction" className="active">职业方向探索</Link>
          </nav>
        </div>
      </header>

      {/* 页面主体内容 */}
      <main className="flex-1">
        {/* Hero 大标题区 */}
        <section className="hero">
          <h1>职业方向探索</h1>
          <p>迷茫的时候聊一聊，用小实验低成本验证下一个方向。</p>
        </section>

        {/* 居中的表单卡片容器 */}
        <section className="tools single">
          <article className="card">
            
            {/* 1. 目前的困惑 */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>目前的困惑</label>
              <input
                type="text"
                value={confusion}
                onChange={(e) => setConfusion(e.target.value)}
                placeholder="例如：做运营三年了，感觉每天都在重复，没什么成长…"
              />
            </div>

            {/* 2. 感兴趣的新方向 */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>感兴趣的新方向</label>
              <input
                type="text"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="例如：想转数据分析师、对AI产品感兴趣，或想往客户成功方向试试"
              />
            </div>

            {/* 3. 技能与经验盘点 */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>技能与经验盘点</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="例如：会写文案、做过活动策划、能独立跑数据分析、沟通协调强"
              />
            </div>

            {/* 开始探索按钮 */}
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
              开始探索
            </button>

            <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#98a2b3' }}>
              探索建议仅供参考，职业方向需结合多方因素慎重考虑。
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