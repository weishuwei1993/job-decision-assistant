'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function JobAnalysis() {
  const [jd, setJd] = useState('');
  const [bg, setBg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!jd.trim()) {
      alert('请输入岗位 JD');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/job-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription: jd,
          background: bg,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '分析失败');
      }

      // 在这里可以处理成功响应，但为了保持原始UI不变，我们只处理错误
      console.log('分析结果:', data.result);
    } catch (error) {
      console.error('分析错误:', error);
      alert(error instanceof Error ? error.message : '分析过程中出现错误');
    } finally {
      setIsLoading(false);
    }
  };

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
            <Link href="/job-analysis" className="active">岗位分析</Link>
            <Link href="/company-research">公司研究</Link>
            <Link href="/interview-prep">面试准备</Link>
            <Link href="/career-direction">职业方向探索</Link>
          </nav>
        </div>
      </header>

      {/* 主体内容区 */}
      <main className="flex-1">
        {/* Hero 大标题区 */}
        <section className="hero">
          <h1>岗位需求分析器</h1>
          <p>把招聘 JD 完整粘贴进来，帮你想清楚：这份工作到底要什么，跟你合不合适，值不值得投。</p>
        </section>

        {/* 居中的表单卡片容器 (绝对居中修复) */}
        <section className="tools single">
          <article className="card">

            {/* 1. 岗位 JD 原文 */}
            <div style={{ marginBottom: 24 }}>
              <label htmlFor="jd" style={{ display: 'block', fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>岗位 JD 原文</label>
              <textarea
                id="jd"
                rows={8}
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="把招聘页面的岗位职责、任职要求完整复制粘贴到这里，越完整分析越准"
              />
            </div>

            {/* 2. 你的背景 */}
            <div style={{ marginBottom: 24 }}>
              <label htmlFor="bg" style={{ display: 'block', fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>你的背景（选填，越具体分析越准）</label>
              <textarea
                id="bg"
                rows={4}
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                placeholder="你的专业、工作年限、做过的项目、掌握的技能"
              />
            </div>

            {/* 开始分析按钮 */}
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                width: '100%',
                marginTop: 24,
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                background: 'var(--color-brand)',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 700,
                cursor: isLoading ? 'wait' : 'pointer'
              }}
            >
              {isLoading ? '分析中...' : '开始分析'}
            </button>

            {/* 底部免责声明 */}
            <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#98a2b3' }}>
              分析结果仅供参考，请结合实际情况综合判断。
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