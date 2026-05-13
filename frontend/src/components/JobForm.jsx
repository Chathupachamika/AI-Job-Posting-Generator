import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  Briefcase, Building2, MapPin, DollarSign,
  FileText, Loader2, AlertCircle, ChevronDown, Wand2,
} from 'lucide-react';

const EXPERIENCE_LEVELS = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Principal'];
const LOCATIONS         = ['Remote', 'Hybrid', 'On-site', 'Flexible'];

const swalBase = {
  customClass: {
    popup: 'swal-popup', title: 'swal-title', htmlContainer: 'swal-html',
    confirmButton: 'swal-btn-confirm', cancelButton: 'swal-btn-cancel',
  },
  buttonsStyling: false,
};

const inputStyle = {
  width: '100%', padding: '10px 14px',
  background: '#161d27',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '9px', color: '#f0f4f8',
  fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
  outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

function Field({ label, required, icon: Icon, children, hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
      <label style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        fontFamily: "'Syne', sans-serif", fontSize: '11px', fontWeight: 600,
        color: '#6b8299', letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>
        {Icon && <Icon style={{ width: '12px', height: '12px', color: '#3b82f6' }} />}
        {label}
        {required && <span style={{ color: '#3b82f6', fontSize: '9px' }}>●</span>}
      </label>
      {children}
      {hint && <span style={{ fontSize: '11px', color: '#4a6080' }}>{hint}</span>}
    </div>
  );
}

function SelectField({ value, onChange, options }) {
  return (
    <div style={{ position: 'relative' }}>
      <select value={value} onChange={onChange}
        style={{ ...inputStyle, appearance: 'none', paddingRight: '36px', cursor: 'pointer' }}>
        {options.map(o => <option key={o} value={o} style={{ background: '#0f1419' }}>{o}</option>)}
      </select>
      <ChevronDown style={{
        position: 'absolute', right: '11px', top: '50%', transform: 'translateY(-50%)',
        width: '14px', height: '14px', color: '#4a6080', pointerEvents: 'none',
      }} />
    </div>
  );
}

function StepDot({ label, delay }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6b8299' }}>
      <span style={{
        width: '7px', height: '7px', borderRadius: '50%', display: 'inline-block',
        background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
        animation: `dot-bounce 1.4s ${delay} ease-in-out infinite`,
      }} />
      {label}
    </div>
  );
}

export default function JobForm({ onGenerate, isLoading, error }) {
  const [form, setForm] = useState({
    jobTitle: '', companyName: '', experienceLevel: 'Mid Level',
    location: 'Remote', companyDescription: '', salaryRange: '',
  });
  const [focused, setFocused]       = useState('');
  const [showOptional, setShowOpt]  = useState(false);

  useEffect(() => {
    if (!error) return;
    Swal.fire({ ...swalBase, title: 'Generation Failed',
      html: `<span style="color:#a09070">${error}</span>`,
      icon: 'error', confirmButtonText: 'Try Again' });
  }, [error]);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const fStyle = (key) => ({
    ...inputStyle,
    ...(focused === key ? {
      borderColor: 'rgba(59,130,246,0.5)',
      boxShadow: '0 0 0 3px rgba(59,130,246,0.15)',
    } : {}),
  });

  const filledCount = [form.jobTitle, form.companyName, form.companyDescription,
    form.location, form.experienceLevel].filter(Boolean).length;
  const pct = Math.round((filledCount / 5) * 100);

  const handleSubmit = () => {
    if (form.companyDescription.trim().length < 20) {
      Swal.fire({ ...swalBase, title: 'Description too short',
        html: '<span style="color:#a09070">Please write at least a sentence about your company.</span>',
        icon: 'warning', confirmButtonText: 'Got it' });
      return;
    }
    onGenerate(form);
  };

  const canSubmit = !!(form.jobTitle && form.companyName && form.companyDescription);

  return (
    <>
      <style>{SWAL_STYLES}</style>
      <style>{`
        @keyframes dot-bounce { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-5px);opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        select option { background:#0f1419; color:#f0f4f8; }
      `}</style>

      <div style={{ padding: '20px 24px 28px' }}>
        {/* Progress bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px', marginBottom: '22px',
          background: '#161d27', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px',
        }}>
          <span style={{ fontSize: '12px', color: '#4a6080', fontWeight: 500 }}>Completion</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '120px', height: '4px', borderRadius: '99px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: '99px', width: `${pct}%`, background: 'linear-gradient(90deg,#3b82f6,#06b6d4)', transition: 'width .3s ease' }} />
            </div>
            <span style={{ fontSize: '12px', color: '#8fa3b8', fontWeight: 600, minWidth: '32px' }}>{pct}%</span>
          </div>
        </div>

        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '11px', fontWeight: 600, color: '#3b82f6', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
          Required Details
        </p>

        {/* Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          <Field label="Job Title" required icon={Briefcase}>
            <input type="text" value={form.jobTitle} onChange={set('jobTitle')}
              placeholder="Senior Python Developer"
              onFocus={() => setFocused('t')} onBlur={() => setFocused('')}
              style={fStyle('t')} />
          </Field>
          <Field label="Company Name" required icon={Building2}>
            <input type="text" value={form.companyName} onChange={set('companyName')}
              placeholder="TechCorp Inc."
              onFocus={() => setFocused('c')} onBlur={() => setFocused('')}
              style={fStyle('c')} />
          </Field>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          <Field label="Experience Level" required icon={ChevronDown}>
            <SelectField value={form.experienceLevel} onChange={set('experienceLevel')} options={EXPERIENCE_LEVELS} />
          </Field>
          <Field label="Location" required icon={MapPin}>
            <SelectField value={form.location} onChange={set('location')} options={LOCATIONS} />
          </Field>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '16px' }}>
          <Field label="Company Description" required icon={FileText}
            hint={`${form.companyDescription.length} chars (min 20)`}>
            <textarea value={form.companyDescription} onChange={set('companyDescription')}
              placeholder="Describe what your company does and its culture..."
              rows={4}
              onFocus={() => setFocused('d')} onBlur={() => setFocused('')}
              style={{ ...fStyle('d'), resize: 'vertical', minHeight: '96px' }}
            />
          </Field>
        </div>

        {/* Optional */}
        <div style={{ marginBottom: '22px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
          <button onClick={() => setShowOpt(s => !s)} style={{
            width: '100%', padding: '11px 14px', background: showOptional ? 'rgba(59,130,246,0.07)' : 'rgba(255,255,255,0.02)',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            color: '#6b8299', fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', transition: 'background 0.15s',
          }}>
            <span>Optional details</span>
            <ChevronDown style={{ width: '14px', height: '14px', transform: showOptional ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
          </button>
          {showOptional && (
            <div style={{ padding: '14px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <Field label="Salary Range" icon={DollarSign}>
                <input type="text" value={form.salaryRange} onChange={set('salaryRange')}
                  placeholder="e.g. $80,000 – $120,000"
                  onFocus={() => setFocused('s')} onBlur={() => setFocused('')}
                  style={fStyle('s')} />
              </Field>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '12px 14px', marginBottom: '16px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '9px', fontSize: '13px', color: '#f87171' }}>
            <AlertCircle style={{ width: '15px', height: '15px', flexShrink: 0, marginTop: '1px' }} />
            <span>{error}</span>
          </div>
        )}

        {/* Submit */}
        <button onClick={handleSubmit} disabled={isLoading || !canSubmit}
          style={{
            width: '100%', padding: '14px', borderRadius: '11px', border: 'none',
            cursor: isLoading || !canSubmit ? 'not-allowed' : 'pointer',
            background: isLoading || !canSubmit ? 'rgba(59,130,246,0.25)' : 'linear-gradient(135deg,#3b82f6,#06b6d4)',
            color: '#fff', fontFamily: "'Syne', sans-serif", fontSize: '14px', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px',
            boxShadow: !isLoading && canSubmit ? '0 4px 24px rgba(59,130,246,0.35)' : 'none',
            opacity: !canSubmit ? 0.5 : 1,
            transition: 'opacity 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => { if (!isLoading && canSubmit) { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {isLoading
            ? <><Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} /> Generating…</>
            : <><Wand2 style={{ width: '16px', height: '16px' }} /> Generate Job Posting</>
          }
        </button>

        {/* Loading agents */}
        {isLoading && (
          <div style={{ marginTop: '14px', padding: '14px 16px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.12)', borderRadius: '10px' }}>
            <p style={{ fontSize: '11px', color: '#4a6080', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '10px' }}>
              AI agents at work
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <StepDot label="Researcher" delay="0s" />
              <StepDot label="Writer"     delay="0.4s" />
              <StepDot label="Editor"     delay="0.8s" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const SWAL_STYLES = `
  .swal-popup { background:#0c1430!important;border:1px solid #2a3560!important;border-top:3px solid #3b82f6!important;border-radius:14px!important;box-shadow:0 24px 60px rgba(0,0,0,.6)!important;font-family:inherit!important;padding:2rem 2rem 1.6rem!important; }
  .swal-title  { color:#f0e8d4!important;font-size:1.1rem!important;font-weight:700!important;margin-bottom:.4rem!important; }
  .swal-html   { color:#a09070!important;font-size:.88rem!important;line-height:1.6!important; }
  .swal-btn-confirm { background:linear-gradient(135deg,#3b82f6,#06b6d4)!important;color:#fff!important;font-weight:700!important;font-size:.85rem!important;border:none!important;border-radius:8px!important;padding:.55rem 1.3rem!important;cursor:pointer!important;transition:opacity .15s,transform .15s!important; }
  .swal-btn-confirm:hover { opacity:.88!important;transform:translateY(-1px)!important; }
  .swal-btn-cancel { background:transparent!important;color:#7888a8!important;font-weight:600!important;font-size:.85rem!important;border:1px solid #2a3560!important;border-radius:8px!important;padding:.55rem 1.3rem!important;cursor:pointer!important;margin-right:8px!important;transition:border-color .15s,color .15s!important; }
  .swal-btn-cancel:hover { border-color:#3b82f6!important;color:#3b82f6!important; }
  .swal2-icon.swal2-warning { border-color:#f59e0b!important;color:#f59e0b!important; }
  .swal2-icon.swal2-error   { border-color:#ef4444!important;color:#ef4444!important; }
  .swal2-icon.swal2-error [class^='swal2-x-mark-line'] { background-color:#ef4444!important; }
  .swal2-timer-progress-bar { background:#3b82f6!important;opacity:.7!important; }
  .swal2-backdrop-show { background:rgba(0,0,0,.65)!important;backdrop-filter:blur(3px)!important; }
`;