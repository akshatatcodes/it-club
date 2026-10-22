import React, { useState } from 'react';
import { ChevronUp, UserCircle2, GraduationCap, Shield } from 'lucide-react';
import { useDemoRole } from '../hooks/useAppContext';
import type { Role } from '../types';
import { useNavigate } from 'react-router-dom';
import { getInitials } from '../utils';

const roles: { role: Role; label: string; icon: React.ReactNode; path: string; description: string }[] = [
  {
    role: 'student',
    label: 'Student',
    icon: <GraduationCap size={16} />,
    path: '/student/dashboard',
    description: 'Arjun Sharma · CS Year 3',
  },
  {
    role: 'faculty',
    label: 'Faculty',
    icon: <UserCircle2 size={16} />,
    path: '/faculty/dashboard',
    description: 'Dr. Meena Iyer · CS Dept.',
  },
  {
    role: 'admin',
    label: 'Admin',
    icon: <Shield size={16} />,
    path: '/admin/dashboard',
    description: 'Aditya Kumar · IT Club Admin',
  },
];

export function DemoRoleSwitcher() {
  const [open, setOpen] = useState(false);
  const { currentRole, currentUser, switchRole } = useDemoRole();
  const navigate = useNavigate();

  const activeRoleConfig = roles.find((r) => r.role === currentRole)!;

  function handleSwitch(role: Role, path: string) {
    switchRole(role);
    setOpen(false);
    // Navigate to the appropriate dashboard when switching roles
    navigate(path);
  }

  return (
    <div className="demo-switcher">
      {/* Panel */}
      {open && (
        <div className="demo-switcher-panel" style={{ marginBottom: 10 }}>
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-secondary)', marginBottom: 4 }}>
              🎭 Demo Mode
            </p>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
              Switch roles to explore different experiences. No real auth.
            </p>
          </div>
          <hr className="divider" style={{ marginBottom: 12 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {roles.map((r) => (
              <button
                key={r.role}
                onClick={() => handleSwitch(r.role, r.path)}
                aria-pressed={currentRole === r.role}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'all 0.15s ease',
                  background: currentRole === r.role ? 'var(--color-primary)' : 'transparent',
                  borderColor: currentRole === r.role ? 'var(--color-primary)' : 'transparent',
                  color: currentRole === r.role ? '#ffffff' : 'var(--color-text)',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ opacity: 0.85 }}>{r.icon}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{r.label}</p>
                  <p style={{ fontSize: 11, opacity: 0.75, margin: 0, marginTop: 1 }}>{r.description}</p>
                </div>
                {currentRole === r.role && (
                  <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.8 }}>Active</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        aria-label="Toggle demo role switcher"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 14px',
          background: 'var(--color-primary)',
          color: '#ffffff',
          border: 'none',
          borderRadius: 'var(--radius-xl)',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 13,
          fontWeight: 600,
          boxShadow: '0 4px 16px rgba(23, 54, 93, 0.35)',
          transition: 'all 0.15s ease',
        }}
      >
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 700,
          }}
        >
          {getInitials(currentUser.name)}
        </span>
        🎭 Demo: {activeRoleConfig.label}
        <ChevronUp
          size={14}
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s ease' }}
        />
      </button>
    </div>
  );
}
