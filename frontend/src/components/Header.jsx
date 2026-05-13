// components/Header.jsx

import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">

        {/* Logo mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

          {/* Logo image */}
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: 'linear-gradient(145deg, #1a1400 0%, #2e2200 100%)',
            border: '1px solid rgba(201,168,76,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 2px 12px rgba(201,168,76,0.15)',
            overflow: 'hidden',
          }}>
            <img
              src={logo}
              alt="JobCraft AI logo"
              style={{ width: 26, height: 26, objectFit: 'contain' }}
            />
          </div>

          {/* Wordmark */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: '1.15rem',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>
                JobCraft
              </span>
              <span style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'var(--brand-gold)',
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.25)',
                borderRadius: 4,
                padding: '1px 5px',
                lineHeight: 1.7,
                textTransform: 'uppercase',
              }}>
                AI
              </span>
            </div>
            <div style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: '0.67rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              letterSpacing: '0.025em',
            }}>
              Powered by Groq &amp; Llama&nbsp;3
            </div>
          </div>
        </div>

        {/* Right side */}
        <div style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}>
          <div style={{
            width: 1,
            height: 22,
            background: 'var(--border-mid)',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: '0.68rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Beta
          </span>
        </div>

      </div>
    </header>
  );
}