import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Code2, Sparkles } from 'lucide-react';
import { PrimaryButton } from '../components/ui/Button';
import { useDemoRole } from '../hooks/useAppContext';
import { getInitials } from '../utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#vision', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/learn', label: 'Learning' },
  { href: '/events', label: 'Events' },
  { href: '/incubation', label: 'Incubation' },
  { href: '/workflow', label: 'Workflow' },
  { href: '/demo', label: 'Explore Platform', isPill: true },
];

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentRole, currentUser } = useDemoRole();

  const dashboardPath =
    currentRole === 'student'
      ? '/student/dashboard'
      : currentRole === 'faculty'
      ? '/faculty/dashboard'
      : '/admin/dashboard';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top University Context Bar */}
      <div
        style={{
          background: 'var(--color-primary-navy)',
          color: 'rgba(255,255,255,0.85)',
          fontSize: 12,
          padding: '6px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>
              MIT-ADT UNIVERSITY
            </span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span style={{ opacity: 0.9 }}>Rajbaug Campus, Loni Kalbhor, Pune</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#93C5FD' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#60A5FA' }} />
              Active Innovation Session · 2026
            </span>
            <Link
              to="/demo"
              style={{
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 11,
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '2px 8px',
                borderRadius: 4,
              }}
            >
              Demo Mode
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="public-header">
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 24px',
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          {/* Brand Identity */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #102743 0%, #17365D 100%)',
                border: '1px solid #1E4678',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 2px 8px rgba(16, 39, 67, 0.2)',
              }}
            >
              <Code2 size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: 16,
                    color: 'var(--color-primary-navy)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  IT CLUB
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    background: 'var(--color-accent-light)',
                    color: 'var(--color-accent)',
                    padding: '1px 6px',
                    borderRadius: 4,
                    letterSpacing: '0.04em',
                  }}
                >
                  HUB
                </span>
              </div>
              <span style={{ fontSize: 11, color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                MIT-ADT University · Innovation Initiative
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Main navigation"
            style={{
              display: 'flex',
              gap: 4,
              alignItems: 'center',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              if (link.href.startsWith('/#')) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--color-text)',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                    }}
                    className="nav-link-hover"
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  style={({ isActive }) => ({
                    padding: link.isPill ? '6px 14px' : '7px 14px',
                    borderRadius: link.isPill ? 99 : 8,
                    fontSize: 14,
                    fontWeight: isActive || link.isPill ? 600 : 500,
                    color: link.isPill
                      ? 'var(--color-accent)'
                      : isActive
                      ? 'var(--color-primary-navy)'
                      : 'var(--color-text)',
                    background: link.isPill
                      ? 'var(--color-accent-light)'
                      : isActive
                      ? 'rgba(16, 39, 67, 0.06)'
                      : 'transparent',
                    border: link.isPill ? '1px solid #CDE2F6' : '1px solid transparent',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                  })}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Actions & Role Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <Link to="/demo" style={{ textDecoration: 'none' }}>
              <button
                className="btn btn-secondary btn-sm"
                style={{
                  gap: 6,
                  padding: '7px 14px',
                  fontWeight: 600,
                  fontSize: 13,
                  borderColor: 'var(--color-border)',
                }}
              >
                <Sparkles size={14} color="var(--color-accent)" />
                <span>Explore Roles</span>
              </button>
            </Link>

            <Link to={dashboardPath} style={{ textDecoration: 'none' }}>
              <PrimaryButton size="sm" style={{ gap: 8, padding: '7px 16px', fontSize: 13 }}>
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.25)',
                    color: '#fff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {getInitials(currentUser.name)}
                </span>
                Dashboard
              </PrimaryButton>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="btn btn-ghost btn-sm mobile-menu-btn"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              style={{ display: 'none', padding: 8 }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav
            aria-label="Mobile navigation"
            style={{
              borderTop: '1px solid var(--color-border)',
              padding: '14px 24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              background: 'var(--color-surface)',
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/'}
                onClick={() => setMobileOpen(false)}
                style={({ isActive }) => ({
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--color-primary-navy)' : 'var(--color-text)',
                  background: isActive ? 'var(--color-accent-light)' : 'transparent',
                  textDecoration: 'none',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      {/* Page content */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* Premium Campus Footer */}
      <footer
        style={{
          background: 'var(--color-primary-navy)',
          color: 'rgba(255,255,255,0.8)',
          padding: '60px 24px 32px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 40,
          }}
        >
          {/* Identity & Campus Context */}
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Code2 size={20} color="#fff" />
              </div>
              <div>
                <span style={{ fontWeight: 800, color: '#fff', fontSize: 16, display: 'block' }}>
                  IT Club & Innovation Hub
                </span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
                  MIT-ADT University, Pune
                </span>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', marginBottom: 16 }}>
              A collaborative student and faculty community fostering project-based learning, research,
              technical mentorship, and pre-incubation pathways at Rajbaug campus.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 6,
                fontSize: 12,
                color: '#93C5FD',
              }}
            >
              <span>🏛️ Rajbaug Campus · 125+ Acres</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p style={{ fontWeight: 700, color: '#fff', marginBottom: 14, fontSize: 14, letterSpacing: '0.02em' }}>
              Platform Navigation
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link to="/projects" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                Featured Projects
              </Link>
              <Link to="/events" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                Workshops & Hackathons
              </Link>
              <Link to="/learn" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                Technical Learning Lab
              </Link>
              <Link to="/ideas" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                Submit Student Ideas
              </Link>
              <Link to="/workflow" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                Innovation Journey (01–07)
              </Link>
              <Link to="/incubation" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                Crieya Incubation Overview
              </Link>
            </div>
          </div>

          {/* Interactive Portals */}
          <div>
            <p style={{ fontWeight: 700, color: '#fff', marginBottom: 14, fontSize: 14, letterSpacing: '0.02em' }}>
              Interactive Portals
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link to="/student/dashboard" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                Student Workspace (Akshat Jain)
              </Link>
              <Link to="/faculty/dashboard" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                Faculty Portal (Dr. Rahul Satyakam)
              </Link>
              <Link to="/admin/dashboard" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                Club Administration (Aarav Mehta)
              </Link>
              <Link to="/demo" style={{ fontSize: 13, color: '#93C5FD', fontWeight: 600, textDecoration: 'none' }}>
                Switch Demo Roles →
              </Link>
            </div>
          </div>

          {/* Campus Location */}
          <div>
            <p style={{ fontWeight: 700, color: '#fff', marginBottom: 14, fontSize: 14, letterSpacing: '0.02em' }}>
              Campus Information
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', marginBottom: 12 }}>
              <strong>MIT Art, Design and Technology University</strong><br />
              Vishwarajbaug, Pune-Solapur Highway,<br />
              Loni Kalbhor, Pune, Maharashtra 412201
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
              IT Club Innovation Lab · Computing & Engineering Complex<br />
              Weekly Student-Faculty Sprints: Wednesdays & Fridays
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            maxWidth: 1240,
            margin: '40px auto 0',
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: 12,
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          <span>
            © 2026 IT Club & Innovation Hub · MIT-ADT University Rajbaug Campus. Developed for College Presentation.
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span>🎓 Visual Prototype & Innovation Showcase</span>
          </span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        .nav-link-hover:hover {
          background: rgba(16, 39, 67, 0.05);
          color: var(--color-primary-navy) !important;
        }
      `}</style>
    </div>
  );
}
