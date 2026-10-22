import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { useAppStore } from '../../hooks/useAppStore';
import { useDemoRole } from '../../hooks/useAppContext';
import { getProjectById } from '../../data/projects';
import { applicationStatusConfig, formatDate } from '../../utils';
import { ClipboardList, ArrowRight } from 'lucide-react';

export function StudentApplicationsPage() {
  const { currentUser } = useDemoRole();
  const { applications } = useAppStore();

  const myApplications = applications.filter((a) => a.applicantId === currentUser.id);

  return (
    <DashboardLayout title="My Applications">
      <div style={{ maxWidth: 760 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text)', marginBottom: 4 }}>My Applications</h1>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
            Track your project join requests and their status.
          </p>
        </div>

        {/* Summary Bar */}
        {myApplications.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
            {[
              { label: 'Pending', count: myApplications.filter((a) => a.status === 'pending').length, color: '#F59E0B', bg: '#FFFBEB' },
              { label: 'Accepted', count: myApplications.filter((a) => a.status === 'accepted').length, color: '#22C55E', bg: '#F0FDF4' },
              { label: 'Rejected', count: myApplications.filter((a) => a.status === 'rejected').length, color: '#EF4444', bg: '#FEF2F2' },
            ].map((s) => (
              <div key={s.label} className="card" style={{ padding: '14px 18px', borderLeft: `4px solid ${s.color}` }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.count}</p>
                <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {myApplications.length === 0 ? (
          <EmptyState
            icon={<ClipboardList size={28} />}
            title="No applications yet"
            description="Find projects you're interested in and apply to join the team."
            action={
              <Link to="/projects">
                <button className="btn btn-primary" style={{ gap: 6 }}>Browse Projects <ArrowRight size={14} /></button>
              </Link>
            }
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myApplications.map((app) => {
              const project = getProjectById(app.projectId);
              const cfg = applicationStatusConfig[app.status];
              return (
                <div key={app.id} className="card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>
                        {project?.title ?? 'Unknown Project'}
                      </h3>
                      <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                        Applied {formatDate(app.appliedAt)}
                      </p>
                    </div>
                    <StatusBadge {...cfg} />
                  </div>

                  <div style={{ background: 'var(--color-bg)', borderRadius: 8, padding: '10px 14px', marginBottom: 10 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 4 }}>Your Message</p>
                    <p style={{ fontSize: 13, color: 'var(--color-text)', lineHeight: 1.55 }}>{app.message}</p>
                  </div>

                  {app.skills.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                      {app.skills.map((skill) => (
                        <span key={skill} className="badge">{skill}</span>
                      ))}
                    </div>
                  )}

                  {app.status === 'accepted' && project && (
                    <Link to={`/projects/${project.id}`}>
                      <button className="btn btn-sm btn-primary" style={{ gap: 6 }}>
                        Go to Project <ArrowRight size={13} />
                      </button>
                    </Link>
                  )}

                  {app.status === 'rejected' && (
                    <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                      Keep exploring other projects — the right team is out there!
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>Looking for new opportunities?</p>
          <Link to="/projects">
            <button className="btn btn-ghost btn-sm" style={{ gap: 6 }}>Browse Open Projects <ArrowRight size={13} /></button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
