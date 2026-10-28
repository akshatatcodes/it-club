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
    description: 'Akshat Jain · IT Year 3',
  },
  {
    role: 'faculty',
    label: 'Faculty / Mentor',
    icon: <UserCircle2 size={16} />,
    path: '/faculty/dashboard',
    description: 'Dr. Rahul Satyakam · Computing',
  },
  {
    role: 'admin',
    label: 'Club Admin',
    icon: <Shield size={16} />,
    path: '/admin/dashboard',
    description: 'Aarav Mehta · Coordinator',
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
    navigate(path);
  }

  return (
    <div className="demo-switcher">
      {/* Panel */}
      {open && (
        <div className="demo-switcher-panel" style={{ marginBottom: 10 }}>
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-accent)', marginBottom: 4 }}>
              🎭 Demo Role Switcher
            </p>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
              Switch perspectives to evaluate the student, faculty, and administrator workflows.
            </p>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '0 0 12px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {roles.map((r) => (
              <button
                key={r.role}
                onClick={() => handleSwitch(r.role, r.path)}
                aria-pressed={currentRole === r.role}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'all 0.15s ease',
                  background: currentRole === r.role ? 'var(--color-primary-navy)' : 'transparent',
                  borderColor: currentRole === r.role ? 'var(--color-primary-navy)' : 'var(--color-border)',
                  color: currentRole === r.role ? '#ffffff' : 'var(--color-text)',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ opacity: 0.9 }}>{r.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{r.label}</p>
                  <p style={{ fontSize: 11, opacity: 0.75, margin: 0, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {r.description}
                  </p>
                </div>
                {currentRole === r.role && (
                  <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: 4 }}>
                    ACTIVE
                  </span>
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
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 16px 8px 10px',
          background: 'var(--color-primary-navy)',
          color: '#ffffff',
          borderRadius: 99,
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 4px 16px rgba(16,39,67,0.3)',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 13,
          fontWeight: 600,
          transition: 'all 0.18s ease',
        }}
      >
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'var(--color-accent)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {getInitials(currentUser.name)}
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.15 }}>
          <span style={{ fontSize: 12, fontWeight: 700 }}>{activeRoleConfig.label}</span>
          <span style={{ fontSize: 10, opacity: 0.75 }}>{currentUser.name.split(' ')[0]}</span>
        </span>
        <ChevronUp
          size={14}
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            opacity: 0.8,
          }}
        />
      </button>
    </div>
  );
}
