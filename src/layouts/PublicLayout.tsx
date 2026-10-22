import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { PrimaryButton } from '../components/ui/Button';
import { useDemoRole } from '../hooks/useAppContext';
import { getInitials } from '../utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/events', label: 'Events' },
  { href: '/learn', label: 'Learn' },
  { href: '/ideas', label: 'Ideas' },
  { href: '/workflow', label: 'Workflow' },
  { href: '/incubation', label: 'Incubation' },
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
      {/* Header */}
      <header className="public-header">
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <Code2 size={20} />
            </div>
            <div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: 'var(--color-text)',
                  display: 'block',
                  lineHeight: 1.2,
                }}
              >
                IT Club
              </span>
              <span style={{ fontSize: 11, color: 'var(--color-text-secondary)', fontWeight: 400 }}>
                Innovation Hub
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
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/'}
                style={({ isActive }) => ({
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  background: isActive ? 'var(--color-accent-light)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <Link to={dashboardPath}>
              <PrimaryButton size="sm" variant="secondary">
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
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
              style={{ display: 'none' }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav
            aria-label="Mobile navigation"
            style={{
              borderTop: '1px solid var(--color-border)',
              padding: '12px 24px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
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
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
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

      {/* Footer */}
      <footer
        style={{
          background: 'var(--color-primary)',
          color: 'rgba(255,255,255,0.8)',
          padding: '40px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 32,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Code2 size={18} color="#fff" />
              </div>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>IT Club & Innovation Hub</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6 }}>
              Empowering students to build, learn, and innovate. Home of the next generation of tech leaders.
            </p>
          </div>
          <div>
            <p style={{ fontWeight: 600, color: '#fff', marginBottom: 10, fontSize: 14 }}>Platform</p>
            {['Projects', 'Events', 'Learn', 'Ideas', 'Leaderboard'].map((item) => (
              <div key={item} style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 13, cursor: 'pointer', opacity: 0.75, transition: 'opacity 0.15s' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: 600, color: '#fff', marginBottom: 10, fontSize: 14 }}>Resources</p>
            {['Documentation', 'Incubation Center', 'Faculty Portal', 'Contact Us'].map((item) => (
              <div key={item} style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 13, cursor: 'pointer', opacity: 0.75 }}>{item}</span>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: 600, color: '#fff', marginBottom: 10, fontSize: 14 }}>Contact</p>
            <p style={{ fontSize: 13, lineHeight: 1.7 }}>
              itclub@college.edu<br />
              Innovation Lab, Block C<br />
              Mon–Fri, 10am–5pm
            </p>
          </div>
        </div>
        <div
          style={{
            maxWidth: 1200,
            margin: '32px auto 0',
            paddingTop: 20,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
            fontSize: 13,
          }}
        >
          <span>© 2026 IT Club & Innovation Hub. All rights reserved.</span>
          <span style={{ opacity: 0.6 }}>🎓 Powered by student innovation</span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
