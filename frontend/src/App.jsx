import { useState, useCallback, useEffect } from 'react';
import Header       from './components/Header';
import LandingPage  from './components/LandingPage';
import JobFormModal from './components/JobFormModel';
import JobForm      from './components/JobForm';
import JobResult    from './components/JobResult';

export default function App() {
  const [appState,  setAppState]  = useState('idle');   
  const [result,    setResult]    = useState('');
  const [error,     setError]     = useState('');
  const [formData,  setFormData]  = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (appState === 'result' || appState === 'idle') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [appState]);

  const openModal  = useCallback(() => setModalOpen(true),  []);
  const closeModal = useCallback(() => {
    if (appState !== 'loading') setModalOpen(false);
  }, [appState]);

  const handleGenerate = useCallback(async (data) => {
    setAppState('loading');
    setFormData(data);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || `Server error ${response.status}`);
      }

      setResult(json.result || json.content || '');
      setAppState('result');   
      setModalOpen(false);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setAppState('error');
    }
  }, []);

  const handleReset = useCallback(() => {
    setAppState('idle');       
    setResult('');
    setError('');
    setFormData(null);
  }, []);

  const isLoading   = appState === 'loading';
  const showResult  = appState === 'result' && !!result;
  const formVisible = appState === 'idle' || appState === 'loading' || appState === 'error';

  return (
    <div style={{ minHeight: '100vh', background: '#090c10' }}>

      { }
      <Header onOpenForm={showResult ? undefined : openModal} />

      { }
      {!showResult && (
        <div
          key="landing-page"
          style={{ animation: 'page-in 0.4s cubic-bezier(0.34,1.1,0.64,1) both' }}
        >
          <LandingPage onOpenForm={openModal} />
        </div>
      )}

      { }
      {showResult && (
        <div
          key="result-page"
          style={{ animation: 'page-in 0.45s cubic-bezier(0.34,1.1,0.64,1) both' }}
        >
          { }
          <div style={{
            maxWidth:      '860px',
            margin:        '0 auto',
            padding:       '40px 24px 0',
            display:       'flex',
            alignItems:    'center',
            justifyContent:'space-between',
            gap:           '16px',
            flexWrap:      'wrap',
          }}>
            { }
            <button
              onClick={handleReset}
              style={{
                display:    'inline-flex',
                alignItems: 'center',
                gap:        '7px',
                padding:    '9px 18px',
                background: 'rgba(255,255,255,0.04)',
                border:     '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                color:      '#8fa3b8',
                fontSize:   '13px',
                fontWeight: 600,
                cursor:     'pointer',
                transition: 'background 0.15s, border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background   = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor  = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.color        = '#f0f4f8';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background   = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor  = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color        = '#8fa3b8';
              }}
            >
              ← Back to home
            </button>

            { }
            <button
              onClick={openModal}
              style={{
                display:    'inline-flex',
                alignItems: 'center',
                gap:        '8px',
                padding:    '9px 20px',
                background: 'rgba(59,130,246,0.08)',
                border:     '1px solid rgba(59,130,246,0.2)',
                borderRadius: '10px',
                color:      '#60a5fa',
                fontSize:   '13px',
                fontWeight: 600,
                cursor:     'pointer',
                transition: 'background 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = 'rgba(59,130,246,0.15)';
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'rgba(59,130,246,0.08)';
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.2)';
              }}
            >
              ✦ Generate another posting
            </button>
          </div>

          { }
          <div style={{
            maxWidth:  '860px',
            margin:    '24px auto 0',
            padding:   '0 24px',
            display:   'flex',
            alignItems:'center',
            gap:       '14px',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            <span style={{
              fontFamily:    "'Syne', sans-serif",
              fontSize:      '11px',
              fontWeight:    600,
              color:         '#4a6080',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              whiteSpace:    'nowrap',
            }}>
              ✦ Your generated posting
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          </div>

          { }
          <section style={{
            maxWidth: '860px',
            margin:   '24px auto 0',
            padding:  '0 24px 100px',
          }}>
            <JobResult
              result={result}
              jobTitle={formData?.jobTitle ?? ''}
              onReset={handleReset}
            />
          </section>
        </div>
      )}

      { }
      <JobFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        lockClose={isLoading}
      >
        {formVisible && (
          <JobForm
            onGenerate={handleGenerate}
            isLoading={isLoading}
            error={error}
          />
        )}
      </JobFormModal>

      <style>{`
        @keyframes page-in {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}