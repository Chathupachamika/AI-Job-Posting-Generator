import { useEffect, useRef } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';

/**
 * JobFormModal
 * ─────────────────────────────────────────────────────────────
 * Props
 *   isOpen    boolean   – mount / unmount the overlay
 *   onClose   () => void
 *   lockClose boolean   – when true, disables Escape + backdrop + X (during loading)
 *   children  ReactNode – the <JobForm /> component
 */
export default function JobFormModal({ isOpen, onClose, lockClose = false, children }) {
  const overlayRef = useRef(null);

  /* Escape to close (unless locked) */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && !lockClose) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose, lockClose]);

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Backdrop click (unless locked) */
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current && !lockClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(4,7,12,0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        animation: 'overlay-in 0.18s ease both',
      }}
    >
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Create job posting"
        style={{
          position: 'relative',
          width: '100%', maxWidth: '680px',
          maxHeight: 'calc(100dvh - 32px)',
          overflowY: 'auto',
          background: '#090c10',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '22px',
          boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(59,130,246,0.08)',
          animation: 'panel-in 0.28s cubic-bezier(0.34,1.22,0.64,1) both',
        }}
      >
        {/* ── Sticky modal top-bar ──────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 22px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'sticky', top: 0, zIndex: 10,
          background: 'rgba(9,12,16,0.96)',
          backdropFilter: 'blur(16px)',
          borderRadius: '22px 22px 0 0',
        }}>
          {/* Logo + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '9px',
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 18px rgba(59,130,246,0.4)', flexShrink: 0,
            }}>
              {lockClose
                ? <Loader2 style={{ width: '15px', height: '15px', color: '#fff', animation: 'modal-spin 1s linear infinite' }} />
                : <Sparkles style={{ width: '15px', height: '15px', color: '#fff' }} />
              }
            </div>
            <div>
              <p style={{
                fontFamily: "'Syne', sans-serif", fontSize: '14px',
                fontWeight: 700, color: '#f0f4f8', lineHeight: 1.2,
              }}>
                {lockClose ? 'Generating your posting…' : 'Create Job Posting'}
              </p>
              <p style={{ fontSize: '11px', color: '#4a6080', marginTop: '1px' }}>
                Powered by Groq &amp; Llama 3
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => { if (!lockClose) onClose(); }}
            aria-label="Close modal"
            disabled={lockClose}
            style={{
              width: '34px', height: '34px', borderRadius: '9px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: lockClose ? '#2a3a50' : '#8fa3b8',
              cursor: lockClose ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s, color 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              if (!lockClose) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                e.currentTarget.style.color = '#f0f4f8';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.color = lockClose ? '#2a3a50' : '#8fa3b8';
            }}
          >
            <X style={{ width: '15px', height: '15px' }} />
          </button>
        </div>

        {/* ── Form content ─────────────────────────────────── */}
        <div>{children}</div>
      </div>

      <style>{`
        @keyframes overlay-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes panel-in   { from { opacity: 0; transform: scale(0.93) translateY(18px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes modal-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}