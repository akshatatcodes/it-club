import React from 'react';
import { Link } from 'react-router-dom';
import { useDemoRole } from '../hooks/useAppContext';
import { useAppStore } from '../hooks/useAppStore';
import { GraduationCap, UserCircle2, Shield, ArrowRight, Code2, Zap, Lightbulb, BookOpen } from 'lucide-react';
import type { Role } from '../types';

const roles: { role: Role; label: string; subtitle: string; icon: React.ReactNode; accentColor: string; path: string; perks: string[] }[] = [
  {
    role: 'student',
    label: 'Student',
    subtitle: 'Arjun Sharma · CS Year 3',
    icon: <GraduationCap size={28} />,
    accentColor: '#3678B7',
    path: '/student/dashboard',
    perks: ['Browse & join projects', 'Submit ideas', 'Track applications', 'Attend events & quizzes'],
  },
  {
    role: 'faculty',
    label: 'Faculty / Mentor',
    subtitle: 'Dr. Meena Iyer · CS Dept.',
    icon: <UserCircle2 size={28} />,
    accentColor: '#22C55E',
    path: '/faculty/dashboard',
    perks: ['Review student ideas', 'Mentor active projects', 'Schedule sessions', 'Post project opportunities'],
  },
  {
    role: 'admin',
    label: 'Club Admin',
    subtitle: 'Aditya Kumar · IT Club Admin',
    icon: <Shield size={28} />,
    accentColor: '#8B5CF6',
    path: '/admin/dashboard',
    perks: ['Manage members', 'Analytics & reports', 'Create announcements', 'Oversee all activity'],
  },
];

export function DemoEntryPage() {
  const { currentRole, switchRole } = useDemoRole();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header style={{ background: 'var(--color-primary)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code2 size={18} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>IT Club & Innovation Hub</span>
          </Link>
          <Link to="/" style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
            ← Back to Public Site
          </Link>
        </div>
      </header>

      {/* Demo Banner */}
      <div style={{ background: '#FFFBEB', borderBottom: '1px solid #FDE68A', padding: '8px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: '#92400E', fontWeight: 500 }}>
          🎭 <strong>Demo Mode</strong> — This is a visual prototype for presentation purposes. No real authentication is required.
        </p>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px 0', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 14px', background: 'var(--color-accent-light)', borderRadius: 99, marginBottom: 20 }}>
          <Zap size={13} style={{ color: 'var(--color-accent)' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent)' }}>Select a role to explore</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-primary)', marginBottom: 12 }}>
          Explore the Platform as...
        </h1>
        <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Choose a role below to see the full dashboard experience. You can switch roles at any time using the Demo button in the bottom-left corner.
        </p>

        {/* Role Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 48 }}>
          {roles.map((r) => {
            const isActive = currentRole === r.role;
            return (
              <div
                key={r.role}
                style={{
                  background: 'var(--color-surface)',
                  border: `2px solid ${isActive ? r.accentColor : 'var(--color-border)'}`,
                  borderRadius: 16,
                  padding: 24,
                  textAlign: 'left',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? `0 0 0 4px ${r.accentColor}22` : 'none',
                }}
              >
                {isActive && (
                  <div style={{ position: 'absolute', top: 12, right: 12, background: r.accentColor, color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99 }}>
                    ACTIVE
                  </div>
                )}
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${r.accentColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.accentColor, marginBottom: 16 }}>
                  {r.icon}
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>{r.label}</h2>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16 }}>{r.subtitle}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {r.perks.map((perk) => (
                    <li key={perk} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--color-text)' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: r.accentColor, flexShrink: 0 }} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <Link to={r.path} onClick={() => switchRole(r.role)}>
                  <button
                    style={{
                      width: '100%',
                      padding: '10px 20px',
                      background: isActive ? r.accentColor : 'transparent',
                      color: isActive ? '#fff' : r.accentColor,
                      border: `1.5px solid ${r.accentColor}`,
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      transition: 'all 0.15s ease',
                      fontFamily: 'inherit',
                    }}
                  >
                    {isActive ? 'Go to Dashboard' : `Enter as ${r.label}`}
                    <ArrowRight size={15} />
                  </button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24, marginBottom: 48 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16, textAlign: 'left' }}>Quick Preview Links</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {[
              { to: '/projects', label: 'Browse Projects', icon: <Code2 size={14} /> },
              { to: '/ideas/submit', label: 'Submit an Idea', icon: <Lightbulb size={14} /> },
              { to: '/workflow', label: 'Idea-to-Project Workflow', icon: <Zap size={14} /> },
              { to: '/learn', label: 'Knowledge Hub', icon: <BookOpen size={14} /> },
              { to: '/incubation', label: 'Crieya Incubation Corner', icon: <ArrowRight size={14} /> },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 14px',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 10,
                  fontSize: 13,
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{ color: 'var(--color-accent)' }}>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
