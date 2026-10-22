import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { mockSessions } from '../../data/mock';
import { useDemoRole } from '../../hooks/useAppContext';
import { formatDateTime } from '../../utils';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getUserById } from '../../data/users';
import { getInitials } from '../../utils';
import { Video } from 'lucide-react';

export function StudentSessionsPage() {
  const { currentUser } = useDemoRole();
  const mySessions = mockSessions.filter((s) => s.studentIds.includes(currentUser.id));

  return (
    <DashboardLayout title="Sessions">
      <PageHeader title="Mentorship Sessions" subtitle="Your scheduled and completed sessions with faculty mentors." />
      {mySessions.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mySessions.map((session) => {
            const mentor = getUserById(session.mentorId);
            const statusCfg = {
              scheduled: { label: 'Scheduled', color: 'var(--color-accent)', bg: 'var(--color-accent-light)' },
              completed: { label: 'Completed', color: 'var(--color-success)', bg: '#F0FDF4' },
              cancelled: { label: 'Cancelled', color: 'var(--color-error)', bg: '#FEF2F2' },
            }[session.status];

            return (
              <div key={session.id} className="card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600 }}>{session.title}</h3>
                  <StatusBadge {...statusCfg} size="sm" />
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 12, flexWrap: 'wrap' }}>
                  <span>📅 {formatDateTime(session.scheduledAt)}</span>
                  <span>⏱ {session.durationMinutes} min</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>
                      {mentor ? getInitials(mentor.name) : '?'}
                    </div>
                    {mentor?.name ?? 'Unknown Mentor'}
                  </span>
                </div>
                {session.notes && (
                  <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', background: 'var(--color-bg)', padding: '8px 12px', borderRadius: 8 }}>
                    <strong>Notes:</strong> {session.notes}
                  </p>
                )}
                {session.meetLink && session.status === 'scheduled' && (
                  <a href={session.meetLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 10 }}>
                    <button className="btn btn-primary btn-sm"><Video size={13} /> Join Meeting</button>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-secondary)' }}>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>No sessions yet</p>
          <p style={{ fontSize: 14 }}>Sessions will appear here once scheduled by your mentor.</p>
        </div>
      )}
    </DashboardLayout>
  );
}
