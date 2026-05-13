import { useEffect, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';

/**
 * JobFormModal
 * Wraps any children in a slide-up overlay modal.
 * Props:
 *   isOpen   – boolean
 *   onClose  – () => void
 *   children – the <JobForm /> component
 */
export default function JobFormModal({ isOpen, onClose, children }) {
  const overlayRef = useRef(null);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Click outside overlay to close */
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(4,7,12,0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        animation: 'modal-overlay-in 0.2s ease both',
      }}
    >
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'relative',
          width: '100%', maxWidth: '680px',
          maxHeight: 'calc(100vh - 32px)',
          overflowY: 'auto',
          background: '#090c10',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '22px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(59,130,246,0.1)',
          animation: 'modal-panel-in 0.28s cubic-bezier(0.34,1.26,0.64,1) both',
        }}
      >
        {/* Modal top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'sticky', top: 0, zIndex: 10,
          background: 'rgba(9,12,16,0.95)',
          backdropFilter: 'blur(12px)',
          borderRadius: '22px 22px 0 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '9px',
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(59,130,246,0.35)',
            }}>
              <Sparkles style={{ width: '15px', height: '15px', color: '#fff' }} />
            </div>
            <div>
              <p style={{
                fontFamily: "'Syne', sans-serif", fontSize: '14px',
                fontWeight: 700, color: '#f0f4f8', lineHeight: 1.2,
              }}>Create Job Posting</p>
              <p style={{ fontSize: '11px', color: '#4a6080', marginTop: '1px' }}>
                Powered by Groq &amp; Llama 3
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              width: '34px', height: '34px', borderRadius: '9px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#8fa3b8', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#f0f4f8'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#8fa3b8'; }}
          >
            <X style={{ width: '15px', height: '15px' }} />
          </button>
        </div>

        {/* Form content */}
        <div style={{ padding: '0' }}>
          {children}
        </div>
      </div>

      <style>{`
        @keyframes modal-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modal-panel-in {
          from { opacity: 0; transform: scale(0.94) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}