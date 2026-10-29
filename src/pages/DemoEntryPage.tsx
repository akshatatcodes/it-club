import React from 'react';
import { Link } from 'react-router-dom';
import { useDemoRole } from '../hooks/useAppContext';
import { GraduationCap, UserCircle2, Shield, ArrowRight, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Role } from '../types';
import { getInitials } from '../utils';

interface RoleOption {
  role: Role;
  name: string;
  title: string;
  department: string;
  description: string;
  buttonLabel: string;
  icon: React.ReactNode;
  accentColor: string;
  path: string;
  features: string[];
}

const roleOptions: RoleOption[] = [
  {
    role: 'student',
    name: 'Akshat Jain',
    title: 'Student Innovator & Tech Lead',
    department: 'Dept. of Computer Applications (MCA) · MITCOM',
    description: 'Explore projects, submit ideas, connect with teammates, and manage learning activities.',
    buttonLabel: 'Explore as Student',
    icon: <GraduationCap size={28} />,
    accentColor: '#3678B7',
    path: '/student/dashboard',
    features: [
      'Submit and vote on student innovation ideas',
      'Discover projects and request to join teams',
      'Connect with teammates with complementary skills',
      'Track project tasks, milestones, and quizzes',
    ],
  },
  {
    role: 'faculty',
    name: 'Dr. Rahul Satyakam',
    title: 'Associate Professor & Faculty Mentor',
    department: 'Dept. of Computer Applications, MITCOM · MIT-ADT University',
    description: 'Explore how faculty can review student ideas, guide project teams, and monitor progress.',
    buttonLabel: 'Explore as Faculty',
    icon: <UserCircle2 size={28} />,
    accentColor: '#17365D',
    path: '/faculty/dashboard',
    features: [
      'Evaluate submitted student ideas and provide guidance',
      'Monitor mentored project milestones and deliverables',
      'Schedule collaborative sprint and review sessions',
      'Recommend promising projects for Crieya incubation',
    ],
  },
  {
    role: 'admin',
    name: 'Aarav Mehta',
    title: 'Club Coordinator & Platform Admin',
    department: 'MITCOM IT Club Administration, MIT-ADT University',
    description: 'Explore member management, club activities, illustrative analytics, and announcements.',
    buttonLabel: 'Explore as Admin',
    icon: <Shield size={28} />,
    accentColor: '#102743',
    path: '/admin/dashboard',
    features: [
      'Oversee club member directories and applications',
      'Organize campus hackathons, talks, and workshops',
      'Publish university club announcements and alerts',
      'Review participation metrics and innovation reports',
    ],
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
      {/* Top Header */}
      <header
        style={{
          background: 'var(--color-primary-navy)',
          padding: '0 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            maxWidth: 1140,
            margin: '0 auto',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(37, 99, 235, 0.3) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Code2 size={20} color="#38BDF8" />
            </div>
            <div>
              <span style={{ fontWeight: 800, color: '#fff', fontSize: 15, display: 'block' }}>
                MITCOM IT Club & Innovation Hub
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>
                MIT College of Management · MIT-ADT University
              </span>
            </div>
          </Link>

          <Link
            to="/"
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.8)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            ← Back to Homepage
          </Link>
        </div>
      </header>

      {/* Subtle Demo Prototype Disclaimer Banner */}
      <div
        style={{
          background: '#FEF3C7',
          borderBottom: '1px solid #FDE68A',
          padding: '10px 24px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: 13, color: '#92400E', fontWeight: 500, margin: 0 }}>
          💡 <strong>Interactive Presentation Prototype:</strong> This interface demonstrates the student,
          faculty, and administrator portals for college director review. No actual login credentials required.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '48px 24px 64px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              background: 'var(--color-accent-light)',
              borderRadius: 99,
              marginBottom: 16,
              border: '1px solid #D0E4F7',
            }}
          >
            <Sparkles size={14} style={{ color: 'var(--color-accent)' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Select a Persona to Explore
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              color: 'var(--color-primary-navy)',
              marginBottom: 12,
              letterSpacing: '-0.02em',
            }}
          >
            Choose Your Platform Perspective
          </h1>
          <p
            style={{
              fontSize: 16,
              color: 'var(--color-text-secondary)',
              maxWidth: 620,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Select any of the three demonstration profiles below to experience how students, faculty mentors,
            and club coordinators collaborate within the Innovation Hub.
          </p>
        </div>

        {/* 3 Distinct Role Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
            marginBottom: 40,
          }}
        >
          {roleOptions.map((opt) => {
            const isActive = currentRole === opt.role;

            return (
              <div
                key={opt.role}
                className="card"
                style={{
                  border: `2px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 18,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: isActive ? '0 12px 32px rgba(54, 120, 183, 0.16)' : 'var(--shadow-card)',
                  transition: 'all 0.2s ease',
                  background: 'var(--color-surface)',
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      background: 'var(--color-accent)',
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 99,
                      letterSpacing: '0.05em',
                    }}
                  >
                    CURRENT ACTIVE ROLE
                  </div>
                )}

                {/* Profile Avatar & Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 14,
                      background: 'linear-gradient(135deg, #102743 0%, #17365D 100%)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      fontWeight: 800,
                      flexShrink: 0,
                      border: '2px solid rgba(255,255,255,0.15)',
                      boxShadow: '0 4px 12px rgba(16,39,67,0.15)',
                    }}
                  >
                    {getInitials(opt.name)}
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: 2 }}>
                      {opt.name}
                    </h2>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-accent)', margin: 0 }}>
                      {opt.title}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: 0, marginTop: 2 }}>
                      {opt.department}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--color-text)',
                    lineHeight: 1.6,
                    marginBottom: 20,
                    minHeight: 44,
                  }}
                >
                  {opt.description}
                </p>

                {/* Feature Checklist */}
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 16, marginBottom: 24, flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-secondary)', marginBottom: 10 }}>
                    What You Can Explore:
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {opt.features.map((feat, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--color-text)', lineHeight: 1.45 }}>
                        <CheckCircle2 size={15} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <Link to={opt.path} onClick={() => switchRole(opt.role)} style={{ textDecoration: 'none' }}>
                  <button
                    className={isActive ? 'btn btn-primary' : 'btn btn-secondary'}
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      fontSize: 14,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      borderRadius: 10,
                      borderColor: isActive ? 'var(--color-primary-navy)' : 'var(--color-border)',
                    }}
                  >
                    <span>{opt.buttonLabel}</span>
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Presentation Help Note */}
        <div
          className="card"
          style={{
            padding: '18px 24px',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: 2 }}>
              Presenting on Projector or Large Screen?
            </p>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
              Use the floating <strong>Demo Switcher</strong> at the bottom-left of the screen at any moment to jump
              seamlessly between Student, Faculty, and Admin dashboards without leaving your workflow.
            </p>
          </div>
          <Link to="/">
            <button className="btn btn-ghost btn-sm" style={{ fontWeight: 600 }}>
              Return to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
