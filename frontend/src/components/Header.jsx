// components/Header.jsx

import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

export default function Header({ onOpenForm }) {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);

  /* Shrink + blur header on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const NAV_LINKS = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Features',     href: '#features'     },
    { label: 'Testimonials', href: '#testimonials'  },
  ];

  return (
    <>
      <style>{CSS}</style>

      <header className={`hdr ${scrolled ? 'hdr--scrolled' : ''}`}>
        <div className="hdr__inner">

          {/* ── Logo ─────────────────────────────────────── */}
          <a href="/" className="hdr__brand" aria-label="JobCraft AI home">
            <div className="hdr__logo-wrap">
              <img src={logo} alt="" className="hdr__logo-img" />
            </div>

            <div className="hdr__wordmark">
              <div className="hdr__wordmark-row">
                <span className="hdr__name">JobCraft</span>
                <span className="hdr__badge">AI</span>
              </div>
              <span className="hdr__sub">Powered by Groq &amp; Llama&nbsp;3</span>
            </div>
          </a>

          {/* ── Desktop nav ──────────────────────────────── */}
          <nav className="hdr__nav" aria-label="Primary">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={href} href={href} className="hdr__nav-link">
                {label}
              </a>
            ))}
          </nav>

          {/* ── Desktop right actions ────────────────────── */}
          <div className="hdr__actions">
            <div className="hdr__divider" />
            <span className="hdr__beta-pill">Beta</span>
            {onOpenForm && (
              <button className="hdr__cta" onClick={onOpenForm}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9"/>
                  <path d="M18 3v6M21 6h-6"/>
                </svg>
                Generate free
              </button>
            )}
          </div>

          {/* ── Mobile hamburger ─────────────────────────── */}
          <button
            className={`hdr__burger ${mobileOpen ? 'hdr__burger--open' : ''}`}
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* ── Mobile drawer ────────────────────────────────── */}
        <div className={`hdr__drawer ${mobileOpen ? 'hdr__drawer--open' : ''}`}>
          <nav className="hdr__drawer-nav">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href} href={href}
                className="hdr__drawer-link"
                onClick={() => setMobileOpen(false)}
              >
                {label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            ))}
          </nav>
          {onOpenForm && (
            <button
              className="hdr__drawer-cta"
              onClick={() => { setMobileOpen(false); onOpenForm(); }}
            >
              ✦ Generate a posting — free
            </button>
          )}
        </div>
      </header>
    </>
  );
}

/* ─── Styles ───────────────────────────────────────────────── */
const CSS = `
/* ── Base shell ─────────────────────────────────────────── */
.hdr {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: rgba(9, 12, 16, 0.72);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: background 0.25s, box-shadow 0.25s, padding 0.25s;
}
.hdr--scrolled {
  background: rgba(9, 12, 16, 0.92);
  box-shadow: 0 4px 32px rgba(0,0,0,0.45);
}

/* ── Inner layout ───────────────────────────────────────── */
.hdr__inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 28px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ── Brand / logo ───────────────────────────────────────── */
.hdr__brand {
  display: flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
  flex-shrink: 0;
}
.hdr__logo-wrap {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(145deg, #1a1400 0%, #2e2200 100%);
  border: 1px solid rgba(201,168,76,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 12px rgba(201,168,76,0.18), 0 0 0 1px rgba(201,168,76,0.08);
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
}
.hdr__brand:hover .hdr__logo-wrap {
  box-shadow: 0 4px 20px rgba(201,168,76,0.3), 0 0 0 1px rgba(201,168,76,0.2);
  transform: translateY(-1px);
}
.hdr__logo-img {
  width: 26px;
  height: 26px;
  object-fit: contain;
}
.hdr__wordmark {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.hdr__wordmark-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.hdr__name {
  font-family: 'DM Serif Display', serif;
  font-size: 1.15rem;
  color: #f0e8d4;
  letter-spacing: -0.02em;
  line-height: 1;
}
.hdr__badge {
  font-family: 'Instrument Sans', 'DM Sans', sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #c9a84c;
  background: rgba(201,168,76,0.1);
  border: 1px solid rgba(201,168,76,0.28);
  border-radius: 4px;
  padding: 1px 5px;
  text-transform: uppercase;
  line-height: 1.7;
}
.hdr__sub {
  font-family: 'Instrument Sans', 'DM Sans', sans-serif;
  font-size: 0.67rem;
  font-weight: 500;
  color: #4a6080;
  letter-spacing: 0.02em;
}

/* ── Desktop nav links ──────────────────────────────────── */
.hdr__nav {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 28px;
}
.hdr__nav-link {
  font-family: 'Instrument Sans', 'DM Sans', sans-serif;
  font-size: 0.84rem;
  font-weight: 500;
  color: #6b8299;
  text-decoration: none;
  padding: 6px 13px;
  border-radius: 8px;
  letter-spacing: 0.01em;
  transition: color 0.15s, background 0.15s;
  white-space: nowrap;
}
.hdr__nav-link:hover {
  color: #f0e8d4;
  background: rgba(255,255,255,0.05);
}

/* ── Right actions ──────────────────────────────────────── */
.hdr__actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}
.hdr__divider {
  width: 1px;
  height: 22px;
  background: rgba(255,255,255,0.08);
  flex-shrink: 0;
}
.hdr__beta-pill {
  font-family: 'Instrument Sans', 'DM Sans', sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #3b82f6;
  background: rgba(59,130,246,0.1);
  border: 1px solid rgba(59,130,246,0.22);
  border-radius: 99px;
  padding: 3px 9px;
  white-space: nowrap;
}
.hdr__cta {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  background: linear-gradient(135deg, #c9a84c 0%, #b8903a 100%);
  border: none;
  border-radius: 9px;
  color: #0c1018;
  font-family: 'Instrument Sans', 'DM Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 2px 16px rgba(201,168,76,0.28), 0 0 0 1px rgba(201,168,76,0.15);
  transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
}
.hdr__cta:hover {
  opacity: 0.88;
  transform: translateY(-1px);
  box-shadow: 0 4px 22px rgba(201,168,76,0.4), 0 0 0 1px rgba(201,168,76,0.25);
}
.hdr__cta:active {
  transform: translateY(0);
  opacity: 1;
}

/* ── Mobile hamburger ───────────────────────────────────── */
.hdr__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  padding: 8px;
  margin-left: auto;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 9px;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s;
}
.hdr__burger:hover { background: rgba(255,255,255,0.08); }
.hdr__burger span {
  display: block;
  height: 1.5px;
  border-radius: 2px;
  background: #8fa3b8;
  transition: transform 0.22s, opacity 0.22s, width 0.22s;
  transform-origin: center;
}
.hdr__burger span:nth-child(1) { width: 100%; }
.hdr__burger span:nth-child(2) { width: 75%; }
.hdr__burger span:nth-child(3) { width: 88%; }
/* Open state — turns into ✕ */
.hdr__burger--open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); width: 100%; }
.hdr__burger--open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hdr__burger--open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); width: 100%; }

/* ── Mobile drawer ──────────────────────────────────────── */
.hdr__drawer {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.32s cubic-bezier(0.4,0,0.2,1);
  border-top: 1px solid transparent;
}
.hdr__drawer--open {
  max-height: 340px;
  border-top-color: rgba(255,255,255,0.06);
}
.hdr__drawer-nav {
  display: flex;
  flex-direction: column;
  padding: 8px 20px;
}
.hdr__drawer-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 8px;
  font-family: 'Instrument Sans', 'DM Sans', sans-serif;
  font-size: 0.92rem;
  font-weight: 500;
  color: #8fa3b8;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  transition: color 0.15s;
}
.hdr__drawer-link:last-child { border-bottom: none; }
.hdr__drawer-link:hover { color: #f0e8d4; }
.hdr__drawer-cta {
  margin: 8px 20px 20px;
  padding: 13px;
  background: linear-gradient(135deg, #c9a84c, #b8903a);
  border: none;
  border-radius: 10px;
  color: #0c1018;
  font-family: 'Instrument Sans', 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 2px 16px rgba(201,168,76,0.25);
  transition: opacity 0.15s;
}
.hdr__drawer-cta:hover { opacity: 0.88; }

/* ── Responsive breakpoints ─────────────────────────────── */
@media (max-width: 860px) {
  .hdr__nav { display: none; }
}
@media (max-width: 640px) {
  .hdr__nav    { display: none; }
  .hdr__actions { display: none; }
  .hdr__burger  { display: flex; }
  .hdr__inner   { padding: 0 18px; }
}
@media (min-width: 641px) and (max-width: 860px) {
  .hdr__actions { display: flex; }
  .hdr__burger  { display: none; }
}
`;