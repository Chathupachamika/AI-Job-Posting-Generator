import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import {
  Copy, Download, RotateCcw, Check,
  Building2, MapPin, Briefcase, Users, DollarSign,
} from 'lucide-react';

const swalBase = {
  customClass: {
    popup:         'swal-popup',
    title:         'swal-title',
    htmlContainer: 'swal-html',
    confirmButton: 'swal-btn-confirm',
    cancelButton:  'swal-btn-cancel',
    icon:          'swal-icon',
  },
  buttonsStyling: false,
};

const Toast = Swal.mixin({
  ...swalBase,
  toast:             true,
  position:          'top-end',
  showConfirmButton: false,
  timer:             2800,
  timerProgressBar:  true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

function extractMeta(text) {
  const meta = {};
  const patterns = {
    company:    /Company:\s*([^|•\n]+?)(?=\s*(Location:|Employment|Experience|Salary|$))/i,
    location:   /Location:\s*([^|•\n]+?)(?=\s*(Employment|Experience|Salary|Company:|$))/i,
    employment: /Employment\s*Type:\s*([^|•\n]+?)(?=\s*(Experience|Salary|Location:|Company:|$))/i,
    experience: /Experience\s*Level:\s*([^|•\n]+?)(?=\s*(Salary|Employment|Location:|Company:|$))/i,
    salary:     /Salary\s*Range:\s*([^|•\n]+?)(?=\s*(Experience|Employment|Location:|Company:|$))/i,
  };
  for (const [key, re] of Object.entries(patterns)) {
    const m = text.match(re);
    if (m) meta[key] = m[1].trim();
  }
  return meta;
}

function stripMetaLine(text) {
  return text
    .replace(/\*?\*?Company:\*?\*?\s*[^\n]+/gi, '')
    .replace(/\*?\*?Location:\*?\*?\s*[^\n]+/gi, '')
    .replace(/\*?\*?Employment\s*Type:\*?\*?\s*[^\n]+/gi, '')
    .replace(/\*?\*?Experience\s*Level:\*?\*?\s*[^\n]+/gi, '')
    .replace(/\*?\*?Salary\s*Range:\*?\*?\s*[^\n]+/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const META_ICONS = {
  company:    Building2,
  location:   MapPin,
  employment: Briefcase,
  experience: Users,
  salary:     DollarSign,
};

const META_LABELS = {
  company:    'Company',
  location:   'Location',
  employment: 'Employment',
  experience: 'Experience',
  salary:     'Salary Range',
};

export default function JobResult({ result, jobTitle, onReset }) {
  const [copied, setCopied] = useState(false);
  const meta      = extractMeta(result);
  const cleanBody = stripMetaLine(result);

  useEffect(() => {
    Swal.fire({
      ...swalBase,
      title:             'Job posting generated!',
      html:              '<span style="color:#a09070">Ready to publish — copy or download below.</span>',
      icon:              'success',
      confirmButtonText: "Let's go!",
      timer:             3500,
      timerProgressBar:  true,
    });
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      await Swal.fire({
        ...swalBase,
        title:             'Copied to clipboard!',
        html:              '<span style="color:#a09070">Job posting text is ready to paste.</span>',
        icon:              'success',
        confirmButtonText: 'Got it',
        timer:             2500,
        timerProgressBar:  true,
      });
    } catch {
      Swal.fire({
        ...swalBase,
        title:             'Copy failed',
        html:              '<span style="color:#a09070">Please select and copy the text manually.</span>',
        icon:              'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleDownload = async () => {
    const { isConfirmed } = await Swal.fire({
      ...swalBase,
      title:             'Download PDF?',
      html:              `<span style="color:#a09070">Save <strong style="color:#c9a84c">${jobTitle}</strong> as a formatted PDF document.</span>`,
      icon:              'question',
      showCancelButton:  true,
      confirmButtonText: '⬇ Download',
      cancelButtonText:  'Cancel',
      reverseButtons:    true,
    });

    if (!isConfirmed) return;

    try {
      _generatePDF(jobTitle, cleanBody, meta);
      await Swal.fire({
        ...swalBase,
        title:             'PDF Downloaded!',
        html:              `<span style="color:#a09070">Your job posting for <strong style="color:#c9a84c">${jobTitle}</strong> has been saved.</span>`,
        icon:              'success',
        confirmButtonText: 'Great!',
        timer:             3500,
        timerProgressBar:  true,
      });
    } catch (err) {
      Swal.fire({
        ...swalBase,
        title:             'Download Failed',
        html:              `<span style="color:#a09070">${err.message || 'Something went wrong generating the PDF.'}</span>`,
        icon:              'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleReset = async () => {
    const { isConfirmed } = await Swal.fire({
      ...swalBase,
      title:             'Start over?',
      html:              '<span style="color:#a09070">This will clear the current job posting and return to the form.</span>',
      icon:              'warning',
      showCancelButton:  true,
      confirmButtonText: 'Yes, reset',
      cancelButtonText:  'Keep editing',
      reverseButtons:    true,
    });
    if (isConfirmed) onReset();
  };

  const rendered    = renderMarkdown(cleanBody);
  const metaEntries = Object.entries(meta).filter(([, v]) => v);

  return (
    <>
      <style>{SWAL_STYLES}</style>

      <div>
        { }
        <div className="action-bar">
          <button onClick={handleCopy} className="btn-secondary">
            {copied
              ? <><Check size={13} style={{ color: 'var(--accent-green)' }} /> Copied!</>
              : <><Copy size={13} /> Copy text</>}
          </button>
          <button onClick={handleDownload} className="btn-secondary">
            <Download size={13} />
            Download PDF
          </button>
          <button onClick={handleReset} className="btn-generate-again">
            <RotateCcw size={13} />
            Generate another
          </button>
        </div>

        { }
        <div className="result-card">

          { }
          <div className="result-card-header">
            <div className="result-card-dot" />
            <div className="result-card-title">{jobTitle}</div>
          </div>

          { }
          {metaEntries.length > 0 && (
            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap:                 10,
              padding:             '16px 20px',
              borderBottom:        '1px solid var(--border-subtle)',
              background:          'rgba(255,255,255,0.02)',
            }}>
              {metaEntries.map(([key, value]) => {
                const Icon = META_ICONS[key];
                return (
                  <div key={key} style={{
                    display:       'flex',
                    flexDirection: 'column',
                    gap:           4,
                    padding:       '10px 14px',
                    background:    'var(--bg-raised)',
                    border:        '1px solid var(--border-subtle)',
                    borderRadius:  10,
                    borderTop:     '2px solid var(--brand-gold)',
                  }}>
                    <div style={{
                      display:       'flex',
                      alignItems:    'center',
                      gap:           5,
                      fontSize:      '0.62rem',
                      fontWeight:    700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color:         'var(--text-muted)',
                    }}>
                      {Icon && <Icon size={10} style={{ color: 'var(--brand-gold)', flexShrink: 0 }} />}
                      {META_LABELS[key]}
                    </div>
                    <div style={{
                      fontSize:   '0.85rem',
                      fontWeight: 600,
                      color:      'var(--text-primary)',
                      lineHeight: 1.3,
                    }}>
                      {value}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Body prose */}
          <div className="result-card-body">
            <div
              className="result-prose"
              dangerouslySetInnerHTML={{ __html: rendered }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function _generatePDF(jobTitle, cleanBody, meta) {
  const doc      = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageW    = doc.internal.pageSize.getWidth();
  const pageH    = doc.internal.pageSize.getHeight();
  const margin   = 50;
  const contentW = pageW - margin * 2;

  const navy     = [12, 20, 48];
  const goldSoft = [201, 168, 76];
  const slate    = [55, 65, 81];
  const muted    = [107, 114, 128];
  const white    = [255, 255, 255];
  const divClr   = [226, 232, 240];
  const cardBg   = [245, 247, 252];

  let y = 0;

  doc.setFillColor(...navy);
  doc.rect(0, 0, pageW, 130, 'F');
  doc.setFillColor(...goldSoft);
  doc.rect(0, 0, 5, 130, 'F');
  doc.setGState(doc.GState({ opacity: 0.06 }));
  doc.setFillColor(255, 255, 255);
  doc.circle(pageW + 10, -20, 110, 'F');
  doc.setGState(doc.GState({ opacity: 1 }));

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...goldSoft);
  doc.setCharSpace(4);
  doc.text('JOB POSTING', margin, 32);
  doc.setCharSpace(0);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...white);
  const titleLines = doc.splitTextToSize(jobTitle, contentW - 80);
  doc.text(titleLines, margin, 58);

  doc.setDrawColor(...goldSoft);
  doc.setLineWidth(2);
  doc.line(margin, 70, margin + 55, 70);

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(160, 155, 145);
  doc.text(today, pageW - margin, 32, { align: 'right' });

  y = 148;
  const metaEntries = Object.entries(meta).filter(([, v]) => v);

  const META_LABELS_PDF = {
    company: 'Company', location: 'Location', employment: 'Employment',
    experience: 'Experience', salary: 'Salary Range',
  };

  if (metaEntries.length) {
    const cols  = Math.min(metaEntries.length, 3);
    const colW  = contentW / cols;
    const cardH = metaEntries.length > 3 ? 76 : 52;

    doc.setFillColor(...cardBg);
    doc.roundedRect(margin, y, contentW, cardH, 5, 5, 'F');
    doc.setDrawColor(...divClr);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentW, cardH, 5, 5, 'S');
    doc.setFillColor(...goldSoft);
    doc.roundedRect(margin, y, contentW, 3, 2, 2, 'F');

    metaEntries.forEach(([key, value], i) => {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const cx  = margin + col * colW + 14;
      const cy  = y + 8 + row * 36;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(...muted);
      doc.setCharSpace(1.5);
      doc.text(META_LABELS_PDF[key].toUpperCase(), cx, cy + 12);
      doc.setCharSpace(0);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...slate);
      doc.text(value.slice(0, 32), cx, cy + 26);

      if (col < cols - 1 && row === 0) {
        doc.setDrawColor(...divClr);
        doc.setLineWidth(0.5);
        doc.line(
          margin + (col + 1) * colW, y + 10,
          margin + (col + 1) * colW, y + cardH - 10,
        );
      }
    });
    y += cardH + 24;
  } else {
    y += 8;
  }

  const lines     = cleanBody.split('\n');
  let   listItems = [];

  const flushList = () => {
    if (!listItems.length) return;
    const lineH  = 15;
    const blockH = listItems.reduce((acc, item) => {
      const wrapped = doc.splitTextToSize(item, contentW - 32);
      return acc + wrapped.length * lineH;
    }, 0) + 20;

    if (y + blockH > pageH - 70) { doc.addPage(); addPageChrome(); }
    doc.setFillColor(245, 247, 252);
    doc.roundedRect(margin, y - 6, contentW, blockH, 4, 4, 'F');
    doc.setFillColor(...goldSoft);
    doc.roundedRect(margin, y - 6, 3, blockH, 2, 2, 'F');

    listItems.forEach((item) => {
      if (y + lineH > pageH - 70) { doc.addPage(); addPageChrome(); }
      doc.setFillColor(...goldSoft);
      doc.circle(margin + 14, y - 3, 2, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...slate);
      const wrapped = doc.splitTextToSize(item, contentW - 32);
      doc.text(wrapped, margin + 22, y);
      y += wrapped.length * lineH;
    });
    y += 14;
    listItems = [];
  };

  const addPageChrome = () => {
    doc.setFillColor(...navy);
    doc.rect(0, 0, pageW, 30, 'F');
    doc.setFillColor(...goldSoft);
    doc.rect(0, 0, 5, 30, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...white);
    doc.setCharSpace(1.5);
    doc.text(jobTitle.toUpperCase().slice(0, 55), margin, 19);
    doc.setCharSpace(0);

    const pn = doc.internal.getCurrentPageInfo().pageNumber;
    doc.setDrawColor(...divClr);
    doc.setLineWidth(0.5);
    doc.line(margin, pageH - 30, pageW - margin, pageH - 30);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    doc.text('Confidential — Internal Use Only', margin, pageH - 16);
    doc.text(`Page ${pn}`, pageW - margin, pageH - 16, { align: 'right' });
    y = 48;
  };

  doc.setDrawColor(...divClr);
  doc.setLineWidth(0.5);
  doc.line(margin, pageH - 30, pageW - margin, pageH - 30);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...muted);
  doc.text('Confidential — Internal Use Only', margin, pageH - 16);
  doc.text('Page 1', pageW - margin, pageH - 16, { align: 'right' });

  lines.forEach((raw) => {
    const line = raw.trim();

    if (/^# /.test(line)) {
      flushList();
      const text = line.replace(/^# /, '');
      if (y + 52 > pageH - 70) { doc.addPage(); addPageChrome(); }
      doc.setFillColor(...navy);
      doc.roundedRect(margin, y, contentW, 30, 3, 3, 'F');
      doc.setFillColor(...goldSoft);
      doc.roundedRect(margin, y, 4, 30, 2, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...white);
      doc.text(text, margin + 14, y + 20);
      y += 44;
      return;
    }
    if (/^## /.test(line)) {
      flushList();
      const text = line.replace(/^## /, '');
      if (y + 40 > pageH - 70) { doc.addPage(); addPageChrome(); }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(...goldSoft);
      doc.setCharSpace(2.5);
      doc.text(text.toUpperCase(), margin, y);
      doc.setCharSpace(0);
      doc.setDrawColor(...divClr);
      doc.setLineWidth(0.5);
      doc.line(margin, y + 5, margin + contentW, y + 5);
      y += 18;
      return;
    }
    if (/^### /.test(line)) {
      flushList();
      const text = line.replace(/^### /, '');
      if (y + 28 > pageH - 70) { doc.addPage(); addPageChrome(); }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...slate);
      doc.text(text, margin, y);
      y += 16;
      return;
    }
    if (/^[-•*] /.test(line)) {
      listItems.push(line.replace(/^[-•*] /, ''));
      return;
    }
    if (line === '') { flushList(); y += 8; return; }

    flushList();
    if (y + 18 > pageH - 70) { doc.addPage(); addPageChrome(); }
    const clean = line.replace(/\*\*(.+?)\*\*/g, '$1');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...slate);
    const wrapped = doc.splitTextToSize(clean, contentW);
    wrapped.forEach((wl) => {
      if (y + 13 > pageH - 70) { doc.addPage(); addPageChrome(); }
      doc.text(wl, margin, y);
      y += 13;
    });
    y += 5;
  });

  flushList();

  doc.setFillColor(...navy);
  doc.rect(0, pageH - 44, pageW, 44, 'F');
  doc.setFillColor(...goldSoft);
  doc.rect(0, pageH - 44, 5, 44, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...goldSoft);
  doc.setCharSpace(2);
  doc.text('JOBCRAFT AI', margin, pageH - 24);
  doc.setCharSpace(0);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(130, 125, 115);
  doc.text('Powered by Groq & Llama 3', margin, pageH - 12);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(130, 125, 115);
  doc.text('Confidential — for internal use only', pageW - margin, pageH - 12, { align: 'right' });

  doc.save(`${jobTitle.toLowerCase().replace(/\s+/g, '_')}_job_posting.pdf`);
}

function renderMarkdown(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^# (.+)$/gm,   '<h1>$1</h1>')
    .replace(/^## (.+)$/gm,  '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^[•\-] (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/^(?!<)(.+)$/gm, '<p>$1</p>')
    .replace(/<p>\s*<\/p>/g, '');
}

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
  .swal-btn-confirm:hover { opacity: 0.88 !important; transform: translateY(-1px) !important; }
  .swal-btn-confirm:focus { box-shadow: 0 0 0 3px rgba(201,168,76,0.35) !important; outline: none !important; }

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
  .swal-btn-cancel:hover { border-color: #c9a84c !important; color: #c9a84c !important; }
  .swal-btn-cancel:focus { box-shadow: 0 0 0 3px rgba(201,168,76,0.2) !important; outline: none !important; }

  .swal2-icon.swal2-success { border-color: #c9a84c !important; color: #c9a84c !important; }
  .swal2-icon.swal2-success [class^='swal2-success-line'] { background-color: #c9a84c !important; }
  .swal2-icon.swal2-success .swal2-success-ring { border-color: rgba(201,168,76,0.25) !important; }

  .swal2-icon.swal2-question { border-color: #4a7cc7 !important; color: #4a7cc7 !important; }
  .swal2-icon.swal2-warning  { border-color: #e8a838 !important; color: #e8a838 !important; }
  .swal2-icon.swal2-error    { border-color: #d45a5a !important; color: #d45a5a !important; }
  .swal2-icon.swal2-error [class^='swal2-x-mark-line'] { background-color: #d45a5a !important; }

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