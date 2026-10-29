import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#vision', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/learn', label: 'Learning' },
  { href: '/events', label: 'Events' },
  { href: '/incubation', label: 'Incubation' },
  { href: '/workflow', label: 'Workflow' },
];

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main Header */}
      <header className="public-header">
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 24px',
            height: 76,
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
              gap: 14,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <img
              src="/images/mit_adt_logo.png"
              alt="MIT-ADT University Logo"
              style={{
                height: 58,
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 19,
                  color: 'var(--color-primary-navy)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  display: 'block',
                }}
              >
                IT CLUB
              </span>
              <span className="header-brand-subtitle" style={{ fontSize: 11.5, color: 'var(--color-text-secondary)', fontWeight: 600, display: 'block', marginTop: 2 }}>
                MIT College of Management and Computer Application
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
                    padding: '7px 14px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--color-primary-navy)' : 'var(--color-text)',
                    background: isActive ? 'rgba(16, 39, 67, 0.06)' : 'transparent',
                    border: '1px solid transparent',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                  })}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile menu toggle */}
          <div className="mobile-menu-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
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
              padding: '16px 20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              background: 'var(--color-surface)',
              boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/'}
                onClick={() => setMobileOpen(false)}
                style={({ isActive }) => ({
                  padding: '11px 16px',
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

            <div style={{ marginTop: 8, paddingTop: 12, borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link
                to="/demo"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 14px',
                  borderRadius: 8,
                  background: 'var(--color-accent-light)',
                  color: 'var(--color-accent)',
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: 'none',
                }}
              >
                <Sparkles size={16} />
                <span>Switch Demo Roles (Student / Faculty / Admin)</span>
              </Link>
            </div>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div
                style={{
                  background: '#ffffff',
                  padding: '3px 8px',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <img
                  src="/images/mit_adt_logo.png"
                  alt="MIT-ADT University"
                  style={{ height: 32, width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </div>
              <div>
                <span style={{ fontWeight: 800, color: '#fff', fontSize: 16, display: 'block' }}>
                  IT CLUB
                </span>
                <span style={{ fontSize: 11, color: '#93C5FD', fontWeight: 600 }}>
                  MIT College of Management and Computer Application
                </span>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: 'rgba(255,255,255,0.76)', marginBottom: 16 }}>
              The official tech club of the <strong>Department of Computer Applications (MCA & BCA)</strong> at <strong>MIT College of Management (MITCOM)</strong>, MIT-ADT University. Fostering software engineering, hackathons, and pre-incubation.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 12px',
                background: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: 6,
                fontSize: 12,
                color: '#93C5FD',
              }}
            >
              <span>🏛️ MIT-ADT University · Rajbaug Campus</span>
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
              Campus & Department
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', marginBottom: 12 }}>
              <strong>MIT College of Management (MITCOM)</strong><br />
              <span style={{ color: '#93C5FD' }}>Department of Computer Applications</span><br />
              MIT Art, Design and Technology University<br />
              Rajbaug, Loni Kalbhor, Pune, Maharashtra 412201
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
              MITCOM Innovation Lab · Computer Applications Block<br />
              MCA & BCA Student Sprints · Weekly Coding Labs
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
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          <span>
            © 2026 MITCOM IT Club & Innovation Hub · MIT College of Management, Dept. of Computer Applications, MIT-ADT University.
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#93C5FD' }}>
            <span>🎓 Official IT Club Portal · MITCOM</span>
          </span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 1040px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 680px) {
          .btn-explore-roles { display: none !important; }
          .header-brand-subtitle { display: none !important; }
        }
        .nav-link-hover:hover {
          background: rgba(16, 39, 67, 0.05);
          color: var(--color-primary-navy) !important;
        }
      `}</style>
    </div>
  );
}
