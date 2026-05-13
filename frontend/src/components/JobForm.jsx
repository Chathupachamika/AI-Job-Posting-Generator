// components/JobForm.jsx

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  Briefcase,
  Building2,
  ChevronDown,
  MapPin,
  DollarSign,
  FileText,
  Loader2,
  AlertCircle,
} from 'lucide-react';

const EXPERIENCE_LEVELS = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Principal'];
const LOCATIONS = ['Remote', 'Hybrid', 'On-site', 'Flexible'];

// ── Shared SweetAlert2 base config — navy/gold palette ────────────────────────
const swalBase = {
  customClass: {
    popup:         'swal-popup',
    title:         'swal-title',
    htmlContainer: 'swal-html',
    confirmButton: 'swal-btn-confirm',
    cancelButton:  'swal-btn-cancel',
  },
  buttonsStyling: false,
};

export default function JobForm({ onGenerate, isLoading, error }) {
  const [form, setForm] = useState({
    jobTitle:           '',
    companyName:        '',
    experienceLevel:    'Mid Level',
    location:           'Remote',
    companyDescription: '',
    salaryRange:        '',
  });

  // Show a SweetAlert whenever the parent passes a new error string
  useEffect(() => {
    if (!error) return;
    Swal.fire({
      ...swalBase,
      title:             'Generation Failed',
      html:              `<span style="color:#a09070">${error}</span>`,
      icon:              'error',
      confirmButtonText: 'Try Again',
    });
  }, [error]);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side guard: company description too short
    if (form.companyDescription.trim().length < 20) {
      Swal.fire({
        ...swalBase,
        title: 'Description too short',
        html:  '<span style="color:#a09070">Please provide at least a sentence about your company so the AI can craft an accurate posting.</span>',
        icon:  'warning',
        confirmButtonText: 'Got it',
      });
      return;
    }

    onGenerate(form);
  };

  return (
    <>
      {/* Inject SweetAlert2 palette styles (same sheet as JobResult) */}
      <style>{SWAL_STYLES}</style>

      <div>
        {/* Hero */}
        <div className="hero">
          <div className="hero-eyebrow">
            <span>✦</span> AI-Powered
          </div>
          <h2 className="hero-title">
            Create a <em>professional</em><br />job posting
          </h2>
          <p className="hero-desc">
            Fill in a few details and AI will generate a structured,
            inclusive, and ready-to-publish job description in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card">
          {/* Required fields */}
          <div className="form-section">
            <div className="form-section-label">Job Details</div>

            <div className="form-grid" style={{ marginBottom: 16 }}>
              <Field label="Job Title" required icon={<Briefcase size={13} />}>
                <input
                  type="text"
                  value={form.jobTitle}
                  onChange={set('jobTitle')}
                  placeholder="e.g. Senior Python Developer"
                  required
                  className="input"
                />
              </Field>

              <Field label="Company Name" required icon={<Building2 size={13} />}>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={set('companyName')}
                  placeholder="e.g. TechCorp Inc."
                  required
                  className="input"
                />
              </Field>

              <Field label="Experience Level" required icon={<ChevronDown size={13} />}>
                <select
                  value={form.experienceLevel}
                  onChange={set('experienceLevel')}
                  className="input"
                >
                  {EXPERIENCE_LEVELS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </Field>

              <Field label="Location" required icon={<MapPin size={13} />}>
                <select
                  value={form.location}
                  onChange={set('location')}
                  className="input"
                >
                  {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Company Description" required icon={<FileText size={13} />}>
              <textarea
                value={form.companyDescription}
                onChange={set('companyDescription')}
                placeholder="Describe what your company does and its culture..."
                rows={3}
                required
                className="input"
                style={{ marginBottom: 20 }}
              />
            </Field>
          </div>

          {/* Optional */}
          <div className="optional-section">
            <details>
              <summary className="optional-toggle">
                <span className="group-open:hidden">+ Optional details</span>
              </summary>

              <Field label="Salary Range" icon={<DollarSign size={13} />}>
                <input
                  type="text"
                  value={form.salaryRange}
                  onChange={set('salaryRange')}
                  placeholder="e.g. $80,000 – $120,000"
                  className="input"
                />
              </Field>
            </details>
          </div>

          {/*
            NOTE: The inline error banner is intentionally kept as a silent
            fallback. The useEffect above already fires a SweetAlert for errors,
            so this div is hidden. Remove it entirely if you prefer.
          */}
          {error && (
            <div className="error-banner" style={{ display: 'none' }}>
              <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <div className="submit-wrap">
            <button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? (
                <>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  Generating your job posting…
                </>
              ) : (
                'Generate Job Posting →'
              )}
            </button>
          </div>
        </form>

        {/* Loading hint */}
        {isLoading && (
          <div className="loading-hint">
            <div className="loading-hint-title">AI agents at work</div>
            <div className="loading-steps">
              <Step label="Researcher" delay="0s" />
              <Step label="Writer"     delay="0.4s" />
              <Step label="Editor"     delay="0.8s" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Field({ label, required, icon, children }) {
  return (
    <div className="form-group">
      <label className="form-label">
        <span className="form-label-icon">{icon}</span>
        {label}
        {required && <span className="required-dot" />}
      </label>
      {children}
    </div>
  );
}

function Step({ label, delay }) {
  return (
    <div className="loading-step">
      <div className="step-dot" style={{ animationDelay: delay }} />
      {label}
    </div>
  );
}

// ── SweetAlert2 theme — navy/gold palette (mirror of JobResult sheet) ─────────
const SWAL_STYLES = `
  .swal-popup {
    background: #0c1430 !important;
    border: 1px solid #2a3560 !important;
    border-top: 3px solid #c9a84c !important;
    border-radius: 14px !important;
    box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.08) !important;
    font-family: inherit !important;
    padding: 2rem 2rem 1.6rem !important;
  }
  .swal-title {
    color: #f0e8d4 !important;
    font-size: 1.15rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.01em !important;
    margin-bottom: 0.4rem !important;
  }
  .swal-html {
    color: #a09070 !important;
    font-size: 0.88rem !important;
    line-height: 1.6 !important;
  }

  .swal-btn-confirm {
    background: linear-gradient(135deg, #c9a84c, #b8903a) !important;
    color: #0c1430 !important;
    font-weight: 700 !important;
    font-size: 0.85rem !important;
    letter-spacing: 0.04em !important;
    border: none !important;
    border-radius: 8px !important;
    padding: 0.55rem 1.3rem !important;
    cursor: pointer !important;
    transition: opacity 0.15s, transform 0.15s !important;
  }
  .swal-btn-confirm:hover  { opacity: 0.88 !important; transform: translateY(-1px) !important; }
  .swal-btn-confirm:focus  { box-shadow: 0 0 0 3px rgba(201,168,76,0.35) !important; outline: none !important; }

  .swal-btn-cancel {
    background: transparent !important;
    color: #7888a8 !important;
    font-weight: 600 !important;
    font-size: 0.85rem !important;
    border: 1px solid #2a3560 !important;
    border-radius: 8px !important;
    padding: 0.55rem 1.3rem !important;
    cursor: pointer !important;
    transition: border-color 0.15s, color 0.15s !important;
    margin-right: 8px !important;
  }
  .swal-btn-cancel:hover  { border-color: #c9a84c !important; color: #c9a84c !important; }
  .swal-btn-cancel:focus  { box-shadow: 0 0 0 3px rgba(201,168,76,0.2) !important; outline: none !important; }

  /* Icon colours */
  .swal2-icon.swal2-success { border-color: #c9a84c !important; color: #c9a84c !important; }
  .swal2-icon.swal2-success [class^='swal2-success-line'] { background-color: #c9a84c !important; }
  .swal2-icon.swal2-success .swal2-success-ring { border-color: rgba(201,168,76,0.25) !important; }

  .swal2-icon.swal2-question { border-color: #4a7cc7 !important; color: #4a7cc7 !important; }
  .swal2-icon.swal2-warning  { border-color: #e8a838 !important; color: #e8a838 !important; }
  .swal2-icon.swal2-error    { border-color: #d45a5a !important; color: #d45a5a !important; }
  .swal2-icon.swal2-error [class^='swal2-x-mark-line'] { background-color: #d45a5a !important; }

  /* Toast */
  .swal2-toast.swal-popup {
    padding: 0.7rem 1rem !important;
    border-radius: 10px !important;
    border-top: none !important;
    border-left: 3px solid #c9a84c !important;
    min-width: 260px !important;
    gap: 10px !important;
  }
  .swal2-toast .swal-title { font-size: 0.9rem !important; margin-bottom: 0 !important; }
  .swal2-toast .swal2-icon { width: 1.6em !important; height: 1.6em !important; margin: 0 !important; }

  .swal2-timer-progress-bar { background: #c9a84c !important; opacity: 0.7 !important; }
  .swal2-backdrop-show { background: rgba(0,0,0,0.65) !important; backdrop-filter: blur(3px) !important; }
`;