import { useState } from 'react';
import {
  Sparkles, Zap, Clock, Target, Users, ArrowRight,
  Star, CheckCircle, Briefcase, Globe, TrendingUp,
} from 'lucide-react';
import heroBanner from '../assets/hero-banner.png'; // ← rename your Gemini image to hero-banner.png in src/assets/

function Badge({ children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '5px 12px',
      background: 'rgba(59,130,246,0.1)',
      border: '1px solid rgba(59,130,246,0.25)',
      borderRadius: '99px',
      fontSize: '12px', fontWeight: 600, color: '#60a5fa',
      letterSpacing: '0.05em', textTransform: 'uppercase',
    }}>
      {children}
    </span>
  );
}

function FeatureCard({ icon: Icon, title, body, accent }) {
  return (
    <div style={{
      padding: '28px', background: '#0f1419',
      border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px',
      display: 'flex', flexDirection: 'column', gap: '14px',
      transition: 'border-color 0.2s, transform 0.2s', cursor: 'default',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}40`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{
        width: '42px', height: '42px', borderRadius: '10px',
        background: `${accent}18`, border: `1px solid ${accent}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon style={{ width: '18px', height: '18px', color: accent }} />
      </div>
      <div>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '15px', fontWeight: 700, color: '#f0f4f8', marginBottom: '6px' }}>{title}</h3>
        <p style={{ fontSize: '13px', color: '#6b8299', lineHeight: 1.7 }}>{body}</p>
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

function Testimonial({ quote, author, role, stars }) {
  return (
    <div style={{
      padding: '24px', background: '#0f1419',
      border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px',
      display: 'flex', flexDirection: 'column', gap: '16px',
    }}>
      <div style={{ display: 'flex', gap: '3px' }}>
        {Array(stars).fill(0).map((_, i) => (
          <Star key={i} style={{ width: '13px', height: '13px', color: '#f59e0b', fill: '#f59e0b' }} />
        ))}
      </div>
      <p style={{ fontSize: '13px', color: '#8fa3b8', lineHeight: 1.75, fontStyle: 'italic' }}>"{quote}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '13px', fontWeight: 700, color: '#fff', flexShrink: 0,
        }}>{author[0]}</div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f4f8' }}>{author}</div>
          <div style={{ fontSize: '11px', color: '#4a6080' }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: Zap,        accent: '#3b82f6', title: 'Instant Generation',     body: "Get a polished, structured job description in under 10 seconds — powered by Llama 3 on Groq's ultra-fast inference." },
  { icon: Target,     accent: '#06b6d4', title: 'Role-Aware Writing',     body: 'The AI understands seniority, industry norms, and inclusive language best practices for every level.' },
  { icon: Clock,      accent: '#10b981', title: 'Save Hours of Work',     body: 'What used to take an hour of back-and-forth with your team now takes 30 seconds from first click to copy.' },
  { icon: Users,      accent: '#f59e0b', title: 'Bias-Reduced Language',  body: 'Outputs are reviewed for gendered or exclusionary phrasing so you attract the widest, most qualified pool.' },
  { icon: Globe,      accent: '#8b5cf6', title: 'Any Industry, Any Role', body: 'From healthcare to fintech, junior to C-suite — the model adapts tone, terminology, and structure accordingly.' },
  { icon: TrendingUp, accent: '#ef4444', title: 'Higher Apply Rates',     body: 'Clear structure and compelling copy have been shown to increase qualified application rates by up to 40%.' },
];

const TESTIMONIALS = [
  { stars: 5, quote: 'We cut our time-to-post from 3 days to under an hour. The output quality is genuinely better than what we were writing manually.', author: 'Sarah K.',  role: 'Head of Talent, Fintech startup' },
  { stars: 5, quote: "I was skeptical about AI-written JDs but this actually sounds human. We've had zero candidates comment on it feeling generic.",        author: 'Marcus T.', role: 'Engineering Manager, SaaS Co.' },
  { stars: 5, quote: 'The inclusive language defaults alone were worth it. Our diversity metrics improved noticeably within two hiring cycles.',             author: 'Priya N.',  role: 'HR Director, Healthcare org' },
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

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 0', textAlign: 'center' }}>

        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px', pointerEvents: 'none',
        }} />

        {/* Text block */}
        <div style={{ position: 'relative', maxWidth: '780px', margin: '0 auto', paddingBottom: '48px' }}>
          <div style={{ marginBottom: '24px' }}>
            <Badge><Sparkles style={{ width: '11px', height: '11px' }} /> AI-Powered • Free to Use</Badge>
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
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#6b8299', lineHeight: 1.75, maxWidth: '560px', margin: '0 auto 40px' }}>
            Stop wrestling with blank pages. Describe the role, hit generate,
            and get a structured, inclusive, ready-to-publish job description
            — powered by Llama 3 on Groq.
          </p>

          {/* CTA buttons */}
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
              onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)'; }}
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
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#f0f4f8'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#8fa3b8'; }}
            >
              See how it works <ArrowRight style={{ width: '14px', height: '14px' }} />
            </a>
          </div>

          {/* Perks */}
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {PERKS.map(p => (
              <span key={p} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#4a6080' }}>
                <CheckCircle style={{ width: '13px', height: '13px', color: '#10b981' }} />
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* ── Hero image banner ──────────────────────────────── */}
        <div style={{
          position: 'relative',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {/* Top fade so it blends into the section bg */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '80px', zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(to bottom, #090c10 0%, transparent 100%)',
          }} />
          {/* Bottom fade into next section */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '120px', zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(to top, #090c10 0%, transparent 100%)',
          }} />
          {/* Side fades */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0,
            width: '80px', zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(to right, #090c10 0%, transparent 100%)',
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0,
            width: '80px', zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(to left, #090c10 0%, transparent 100%)',
          }} />

          <img
            src={heroBanner}
            alt="JobCraft AI — Your career path, crafted with intelligence"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '20px 20px 0 0',
              opacity: 0.88,
              maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            }}
          />
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 72px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
          <StatCard value="10s"  label="Avg. generation time" icon={Zap} />
          <StatCard value="50k+" label="Job postings created"  icon={Briefcase} />
          <StatCard value="40%"  label="Higher apply rates"    icon={TrendingUp} />
          <StatCard value="100%" label="Free, always"          icon={Star} />
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
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
              <div key={step.n} style={{
                padding: '28px', background: '#0f1419',
                border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: '16px', right: '16px',
                  fontFamily: "'Syne', sans-serif", fontSize: '48px',
                  fontWeight: 800, color: 'rgba(59,130,246,0.07)', lineHeight: 1, userSelect: 'none',
                }}>{step.n}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '15px', fontWeight: 700, color: '#f0f4f8', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', color: '#6b8299', lineHeight: 1.7 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────── */}
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

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section id="testimonials" style={{ padding: '0 24px 72px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Badge>Testimonials</Badge>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: '#f0f4f8', marginTop: '16px', letterSpacing: '-0.02em' }}>
              Trusted by hiring teams
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            {TESTIMONIALS.map(t => <Testimonial key={t.author} {...t} />)}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────── */}
      <section style={{ padding: '72px 24px', background: 'rgba(59,130,246,0.04)', borderTop: '1px solid rgba(59,130,246,0.12)', textAlign: 'center' }}>
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
          <p style={{ fontSize: '15px', color: '#6b8299', lineHeight: 1.7, marginBottom: '36px' }}>
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
            onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Sparkles style={{ width: '16px', height: '16px' }} />
            Get started — it's free
          </button>
        </div>
      </section>
    </div>
  );
}