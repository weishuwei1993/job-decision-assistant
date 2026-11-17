import Link from 'next/link';

export default function Home() {
  const tools = [
    {
      id: '01',
      title: '岗位需求分析器',
      desc: '粘贴 JD，看懂它到底要什么、跟你合不合适、值不值得投。',
      tag: '输入 JD',
      path: '/job-analysis',
    },
    {
      id: '02',
      title: '公司/行业研究助手',
      desc: '查公司靠什么赚钱、行业往哪走、口碑如何，判断值不值得去。',
      tag: '输入公司/行业',
      path: '/company-research',
    },
    {
      id: '03',
      title: '面试准备',
      desc: '猜透面试官真正想考什么，还能来一场带点评的模拟面试。',
      tag: '模拟问答',
      path: '/interview-prep',
    },
    {
      id: '04',
      title: '职业方向探索',
      desc: '迷茫的时候聊一聊，用小实验低成本验证下一个方向。',
      tag: '聊一聊',
      path: '/career-direction',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f8fafc', fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif' }}>
      {/* 顶部超大标题区 (完美复刻第二张图顶部) */}
      <header style={{ textAlign: 'center', paddingTop: '100px', paddingBottom: '60px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#0f172a', margin: '0', letterSpacing: '2px' }}>
          天生我材必有用
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280', margin: '16px 0 0', letterSpacing: '1px' }}>
          把求职从碰运气变成有方法
        </p>
      </header>

      {/* 主体 2x2 卡片网格区 (完美复刻第二张图卡片) */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          {tools.map((tool) => (
            <Link 
              key={tool.id} 
              href={tool.path} 
              style={{ textDecoration: 'none' }}
            >
              <article style={{ 
                position: 'relative',
                background: 'var(--color-bg-light, #f0f7ff)', 
                borderRadius: '24px', 
                padding: '32px', 
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}>
                {/* 右上角序号 */}
                <div style={{ position: 'absolute', top: '32px', right: '32px', fontSize: '14px', color: '#94a3b8' }}>
                  {tool.id}
                </div>

                {/* 卡片左侧内容区 */}
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: '0 0 16px 0' }}>{tool.title}</h2>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>{tool.desc}</p>
                </div>

                {/* 卡片底部操作区 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                  {/* 左侧标签 */}
                  <span style={{ 
                    display: 'inline-block',
                    background: '#ffffff', 
                    color: '#3b82f6',
                    fontSize: '12px', 
                    fontWeight: '500',
                    padding: '6px 14px', 
                    borderRadius: '999px',
                    border: '1px solid #bfdbfe'
                  }}>
                    {tool.tag}
                  </span>
                  {/* 右侧进入按钮 */}
                  <span style={{ fontSize: '14px', color: '#2563eb', fontWeight: '600' }}>
                    进入 &rarr;
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      {/* 底部 */}
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