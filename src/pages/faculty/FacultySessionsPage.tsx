import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { mockSessions } from '../../data/mock';
import { useDemoRole } from '../../hooks/useAppContext';
import { formatDateTime } from '../../utils';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Video, Plus } from 'lucide-react';
import { useToast } from '../../hooks/useAppContext';

export function FacultySessionsPage() {
  const { currentUser } = useDemoRole();
  const { addToast } = useToast();
  const mySessions = mockSessions.filter((s) => s.mentorId === currentUser.id);
  return (
    <DashboardLayout title="Sessions">
      <PageHeader
        title="Mentorship Sessions"
        subtitle="Manage your scheduled and completed sessions."
        action={
          <button className="btn btn-primary btn-sm" onClick={() => addToast('info', 'Coming Soon', 'Session scheduling will be available in Phase 2.')}>
            <Plus size={15} /> Schedule Session
          </button>
        }
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {mySessions.map((session) => {
          const statusCfg = {
            scheduled: { label: 'Scheduled', color: 'var(--color-accent)', bg: 'var(--color-accent-light)' },
            completed: { label: 'Completed', color: 'var(--color-success)', bg: '#F0FDF4' },
            cancelled: { label: 'Cancelled', color: 'var(--color-error)', bg: '#FEF2F2' },
          }[session.status];
          return (
            <div key={session.id} className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600 }}>{session.title}</h3>
                <StatusBadge {...statusCfg} size="sm" />
              </div>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 10 }}>
                📅 {formatDateTime(session.scheduledAt)} · ⏱ {session.durationMinutes} min
              </p>
              {session.notes && <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', background: 'var(--color-bg)', padding: '8px 12px', borderRadius: 8, marginBottom: 10 }}>{session.notes}</p>}
              {session.meetLink && session.status === 'scheduled' && (
                <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-primary btn-sm"><Video size={13} /> Join Meeting</button>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
