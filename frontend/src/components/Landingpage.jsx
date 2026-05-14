import { useState } from 'react';
import {
  Sparkles, Zap, Clock, Target, Users, ArrowRight,
  Star, CheckCircle, Briefcase, Globe, TrendingUp, Crown,
  ExternalLink,
} from 'lucide-react';

function GitHubIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedInIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function Badge({ children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '5px 14px',
      background: 'rgba(59,130,246,0.08)',
      border: '1px solid rgba(59,130,246,0.22)',
      borderRadius: '99px',
      fontSize: '11px', fontWeight: 700, color: '#60a5fa',
      letterSpacing: '0.07em', textTransform: 'uppercase',
    }}>
      {children}
    </span>
  );
}

function FeatureCard({ icon: Icon, title, body, accent }) {
  return (
    <div
      style={{
        padding: '28px', background: '#0f1419',
        border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px',
        display: 'flex', flexDirection: 'column', gap: '14px',
        transition: 'border-color 0.2s, transform 0.2s', cursor: 'default',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}45`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{
        width: '42px', height: '42px', borderRadius: '10px',
        background: `${accent}15`, border: `1px solid ${accent}28`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon style={{ width: '18px', height: '18px', color: accent }} />
      </div>
      <div>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '15px', fontWeight: 700, color: '#f0f4f8', marginBottom: '6px' }}>{title}</h3>
        <p style={{ fontSize: '13px', color: '#6b8299', lineHeight: 1.75 }}>{body}</p>
      </div>
    </div>
  );
}

function StatCard({ value, label, icon: Icon }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
      padding: '24px 20px', background: '#0f1419',
      border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', textAlign: 'center',
    }}>
      <Icon style={{ width: '20px', height: '20px', color: '#3b82f6', marginBottom: '4px' }} />
      <span style={{
        fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 800, lineHeight: 1,
        background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>{value}</span>
      <span style={{ fontSize: '12px', color: '#4a6080', fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function SocialBtn({ href, renderIcon, label, accent }) {
  const [hov, setHov] = useState(false);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '7px 13px',
        background: hov ? `${accent}18` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hov ? accent + '45' : 'rgba(255,255,255,0.09)'}`,
        borderRadius: '8px',
        color: hov ? accent : '#8fa3b8',
        fontSize: '12px', fontWeight: 600,
        textDecoration: 'none',
        transition: 'all 0.18s',
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      {renderIcon(13)}
      {label}
    </a>
  );
}

function TeamCard({ name, role, photo, accent, initials, isLead, github, linkedin }) {
  const [imgErr, setImgErr] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        padding: '28px 20px 22px',
        background: isLead
          ? 'linear-gradient(160deg, #131a24 0%, #0f1419 100%)'
          : '#0f1419',
        border: `1px solid ${hovered ? accent + '50' : (isLead ? accent + '30' : 'rgba(255,255,255,0.07)')}`,
        borderRadius: '20px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0',
        textAlign: 'center',
        transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 16px 48px ${accent}1e`
          : isLead ? `0 4px 24px ${accent}12` : 'none',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      { }
      {isLead && (
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '3px 10px',
          background: `${accent}18`,
          border: `1px solid ${accent}40`,
          borderRadius: '99px',
        }}>
          <Crown style={{ width: '10px', height: '10px', color: accent }} />
          <span style={{ fontSize: '10px', fontWeight: 700, color: accent, letterSpacing: '0.08em' }}>LEAD</span>
        </div>
      )}

      { }
      <div style={{
        position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)',
        width: '140px', height: '140px', borderRadius: '50%',
        background: `radial-gradient(ellipse, ${accent}20 0%, transparent 70%)`,
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0.45,
        transition: 'opacity 0.3s',
      }} />

      { }
      <div style={{
        width: isLead ? '88px' : '76px',
        height: isLead ? '88px' : '76px',
        borderRadius: '50%',
        border: `2px solid ${hovered ? accent : accent + '55'}`,
        overflow: 'hidden',
        boxShadow: hovered
          ? `0 0 0 5px ${accent}14, 0 10px 28px ${accent}28`
          : `0 0 0 3px ${accent}0e`,
        flexShrink: 0,
        background: `linear-gradient(135deg, ${accent}cc, ${accent}66)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        position: 'relative', zIndex: 1,
        marginBottom: '16px',
      }}>
        {!imgErr ? (
          <img src={photo} alt={name} onError={() => setImgErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
        ) : (
          <span style={{
            fontSize: isLead ? '24px' : '20px', fontWeight: 800,
            color: '#fff', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.02em',
          }}>{initials}</span>
        )}
      </div>

      { }
      <div style={{ position: 'relative', zIndex: 1, marginBottom: '14px' }}>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: isLead ? '15px' : '14px',
          fontWeight: 700, color: '#f0f4f8',
          marginBottom: '8px', letterSpacing: '-0.01em',
        }}>{name}</div>
        <div style={{
          display: 'inline-block',
          padding: '4px 12px',
          background: `${accent}14`,
          border: `1px solid ${accent}30`,
          borderRadius: '99px',
          fontSize: '11px', fontWeight: 600, color: accent,
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>{role}</div>
      </div>

      { }
      <div style={{
        width: '100%', height: '1px',
        background: 'rgba(255,255,255,0.06)',
        marginBottom: '14px',
        position: 'relative', zIndex: 1,
      }} />

      { }
      <div style={{
        display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap',
        position: 'relative', zIndex: 1,
      }}>
        <SocialBtn href={github}   renderIcon={(s) => <GitHubIcon size={s} />}   label="GitHub"   accent={accent} />
        <SocialBtn href={linkedin} renderIcon={(s) => <LinkedInIcon size={s} />} label="LinkedIn" accent={accent} />
      </div>
    </div>
  );
}

const TEAM = [
  {
    name: 'Nethmi',
    role: 'Project Lead',
    photo: '/team/nethmi.png',
    accent: '#06b6d4',
    initials: 'N',
    isLead: true,
    github:   'https://github.com/NethmiNimansanaWaththage',
    linkedin: 'https://www.linkedin.com/in/nethmi-nimansana-waththage-b3053934b?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    name: 'Kusal D Ranasinghe',
    role: 'Developer',
    photo: '/team/kusal.png',
    accent: '#c9a84c',
    initials: 'KR',
    isLead: false,
    github:   'https://github.com/kusalranasinghe',
    linkedin: 'https://linkedin.com/in/kusal-ranasinghe-b6a041346',
  },
  {
    name: 'Manusha Vishmika',
    role: 'Developer',
    photo: '/team/manusha.png',
    accent: '#10b981',
    initials: 'MV',
    isLead: false,
    github:   'https://github.com/manushavishmika',
    linkedin: 'https://lk.linkedin.com/in/manusha-vishmika-b3975a392',
  },
  {
    name: 'Chathupa Chamika',
    role: 'Developer',
    photo: '/team/chathupa.png',
    accent: '#8b5cf6',
    initials: 'CC',
    isLead: false,
    github:   'https://github.com/Chathupachamika',
    linkedin: 'www.linkedin.com/in/chathupa-chamika-',
  },
];

const FEATURES = [
  { icon: Zap,        accent: '#3b82f6', title: 'Instant Generation',     body: "Get a polished, structured job description in under 10 seconds — powered by Llama 3 on Groq's ultra-fast inference." },
  { icon: Target,     accent: '#06b6d4', title: 'Role-Aware Writing',     body: 'The AI understands seniority, industry norms, and inclusive language best practices for every level.' },
  { icon: Clock,      accent: '#10b981', title: 'Save Hours of Work',     body: 'What used to take an hour of back-and-forth with your team now takes 30 seconds from first click to copy.' },
  { icon: Users,      accent: '#f59e0b', title: 'Bias-Reduced Language',  body: 'Outputs are reviewed for gendered or exclusionary phrasing so you attract the widest, most qualified pool.' },
  { icon: Globe,      accent: '#8b5cf6', title: 'Any Industry, Any Role', body: 'From healthcare to fintech, junior to C-suite — the model adapts tone, terminology, and structure accordingly.' },
  { icon: TrendingUp, accent: '#ef4444', title: 'Higher Apply Rates',     body: 'Clear structure and compelling copy have been shown to increase qualified application rates by up to 40%.' },
];

const PERKS = [
  'No sign-up required', 'Free to use', 'Copy in one click',
  'Download as text', 'Inclusive language built-in', 'Powered by Llama 3',
];

const smoothScroll = (id) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
};

export default function LandingPage({ onOpenForm }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      { }
      <section style={{ position: 'relative', overflow: 'hidden', padding: '88px 24px 0', textAlign: 'center' }}>
        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.13) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        { }
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: '780px', margin: '0 auto', paddingBottom: '56px' }}>
          <div style={{ marginBottom: '24px' }}>
            <Badge><Sparkles style={{ width: '11px', height: '11px' }} /> AI-Powered · Free to Use</Badge>
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 800, color: '#f0f4f8', lineHeight: 1.1,
            letterSpacing: '-0.03em', marginBottom: '24px',
          }}>
            Craft the perfect{' '}
            <span style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              job posting
            </span>
            <br />in under 30 seconds.
          </h1>

          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#6b8299', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 40px' }}>
            Stop wrestling with blank pages. Describe the role, hit generate,
            and get a structured, inclusive, ready-to-publish job description
            — powered by Llama 3 on Groq.
          </p>

          { }
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button
              onClick={onOpenForm}
              style={{
                display: 'flex', alignItems: 'center', gap: '9px', padding: '15px 30px',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', border: 'none',
                borderRadius: '12px', color: '#fff', fontFamily: "'Syne', sans-serif",
                fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 32px rgba(59,130,246,0.4)', transition: 'opacity 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <Sparkles style={{ width: '16px', height: '16px' }} />
              Generate a Job Posting — Free
            </button>
            <a
              href="#how-it-works"
              onClick={e => { e.preventDefault(); smoothScroll('how-it-works'); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px', padding: '15px 24px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', color: '#8fa3b8', fontSize: '15px', fontWeight: 500,
                textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.color = '#f0f4f8'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#8fa3b8'; }}
            >
              See how it works <ArrowRight style={{ width: '14px', height: '14px' }} />
            </a>
          </div>

          { }
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {PERKS.map(p => (
              <span key={p} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#4a6080' }}>
                <CheckCircle style={{ width: '13px', height: '13px', color: '#10b981' }} />
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      { }
      <section style={{ padding: '0 24px 72px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
          <StatCard value="10s"  label="Avg. generation time" icon={Zap} />
          <StatCard value="50k+" label="Job postings created"  icon={Briefcase} />
          <StatCard value="40%"  label="Higher apply rates"    icon={TrendingUp} />
          <StatCard value="100%" label="Free, always"          icon={Star} />
        </div>
      </section>

      { }
      <section id="how-it-works" style={{ padding: '64px 24px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Badge>How it works</Badge>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#f0f4f8', marginTop: '16px', letterSpacing: '-0.02em' }}>
              Three steps to a great posting
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { n: '01', title: 'Describe the role', body: 'Enter the job title, company, experience level, location, and a brief company description.' },
              { n: '02', title: 'Let AI write it',   body: 'Llama 3 on Groq generates a complete, structured job posting in under 10 seconds.' },
              { n: '03', title: 'Copy & publish',    body: 'Review, copy, or download the output. Paste it anywhere — LinkedIn, your ATS, your careers page.' },
            ].map(step => (
              <div key={step.n} style={{ padding: '28px', background: '#0f1419', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '16px', right: '16px', fontFamily: "'Syne', sans-serif", fontSize: '48px', fontWeight: 800, color: 'rgba(59,130,246,0.07)', lineHeight: 1, userSelect: 'none' }}>{step.n}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '15px', fontWeight: 700, color: '#f0f4f8', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', color: '#6b8299', lineHeight: 1.7 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      { }
      <section id="features" style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Badge>Features</Badge>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#f0f4f8', marginTop: '16px', letterSpacing: '-0.02em' }}>
              Built for modern hiring teams
            </h2>
            <p style={{ fontSize: '15px', color: '#6b8299', maxWidth: '500px', margin: '12px auto 0' }}>
              Everything you need to produce accurate, engaging, inclusive job postings — without the agency price tag.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            {FEATURES.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      { }
      <section id="team" style={{
        padding: '72px 24px 88px',
        background: 'rgba(255,255,255,0.012)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          { }
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <Badge>Meet the Team</Badge>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 800, color: '#f0f4f8',
              marginTop: '16px', letterSpacing: '-0.02em',
            }}>
              Built by us, for you
            </h2>
            <p style={{ fontSize: '15px', color: '#6b8299', marginTop: '12px', maxWidth: '440px', margin: '12px auto 0', lineHeight: 1.75 }}>
              A passionate team of developers who believe hiring should be effortless and accessible.
            </p>
          </div>

          { }
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}>
            {TEAM.map(m => (
              <TeamCard key={m.name} {...m} />
            ))}
          </div>

          { }
          <div style={{
            marginTop: '36px', textAlign: 'center',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          }}>
            <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            <span style={{ fontSize: '12px', color: '#3a5070', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ExternalLink style={{ width: '11px', height: '11px' }} />
              Connect with us on GitHub or LinkedIn
            </span>
            <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          </div>
        </div>
      </section>

      { }
      <section style={{ padding: '80px 24px', background: 'rgba(59,130,246,0.04)', borderTop: '1px solid rgba(59,130,246,0.12)', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', boxShadow: '0 8px 32px rgba(59,130,246,0.4)',
          }}>
            <Sparkles style={{ width: '28px', height: '28px', color: '#fff' }} />
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#f0f4f8', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Ready to write your next posting?
          </h2>
          <p style={{ fontSize: '15px', color: '#6b8299', lineHeight: 1.75, marginBottom: '36px' }}>
            No account needed. No credit card. Just describe the role and get a polished job description in seconds.
          </p>
          <button
            onClick={onOpenForm}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '16px 36px',
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', border: 'none',
              borderRadius: '12px', color: '#fff', fontFamily: "'Syne', sans-serif",
              fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 32px rgba(59,130,246,0.4)', transition: 'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Sparkles style={{ width: '16px', height: '16px' }} />
            Get started — it's free
          </button>
        </div>
      </section>
    </div>
  );
}