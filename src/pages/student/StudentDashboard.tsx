import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { StatCard } from '../../components/ui/StatCard';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useDemoRole } from '../../hooks/useAppContext';
import { useAppStore } from '../../hooks/useAppStore';
import { getProjectsByMember } from '../../data/projects';
import { getProjectById } from '../../data/projects';
import { mockEvents } from '../../data/mock';
import { applicationStatusConfig, eventTypeConfig, formatDate, getDaysUntil, taskStatusConfig } from '../../utils';
import {
  FolderKanban, ClipboardList, Calendar, CheckSquare,
  ArrowRight, Lightbulb, Trophy, Users, MessageSquare
} from 'lucide-react';

export function StudentDashboard() {
  const { currentUser } = useDemoRole();
  const { applications, tasks, registeredEventIds } = useAppStore();
  const myProjects = getProjectsByMember(currentUser.id);
  const myApplications = applications.filter((a) => a.applicantId === currentUser.id);
  const upcomingEvents = mockEvents.filter((e) => getDaysUntil(e.startDate) > 0).slice(0, 3);
  const myTasks = tasks.filter((t) => t.assigneeId === currentUser.id);

  return (
    <DashboardLayout title="Dashboard">
      <PageHeader
        title={`Welcome back, ${currentUser.name.split(' ')[0]}! 👋`}
        subtitle={`${currentUser.department} · ${currentUser.year ? `Year ${currentUser.year}` : ''}`}
      />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard
          label="My Projects"
          value={myProjects.length}
          icon={<FolderKanban size={20} />}
          color="var(--color-accent)"
        />
        <StatCard
          label="Applications"
          value={myApplications.length}
          icon={<ClipboardList size={20} />}
          color="var(--color-warning)"
          description={`${myApplications.filter(a => a.status === 'accepted').length} accepted`}
        />
        <StatCard
          label="Events Registered"
          value={registeredEventIds.size}
          icon={<Calendar size={20} />}
          color="var(--color-success)"
        />
        <StatCard
          label="Tasks Assigned"
          value={myTasks.length}
          icon={<CheckSquare size={20} />}
          color="var(--color-incubated)"
          description={`${myTasks.filter(t => t.status === 'done').length} completed`}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* My Projects */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>My Projects</h2>
              <Link to="/student/projects">
                <button className="btn btn-ghost btn-sm" style={{ gap: 4 }}>
                  View all <ArrowRight size={13} />
                </button>
              </Link>
            </div>
            {myProjects.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {myProjects.slice(0, 2).map((p) => (
                  <ProjectCard key={p.id} project={p} compact href={`/student/projects/${p.id}`} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>
                You haven't joined any projects yet.{' '}
                <Link to="/projects" style={{ color: 'var(--color-accent)' }}>
                  Browse projects
                </Link>
              </p>
            )}
          </div>

          {/* My Tasks */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>My Tasks</h2>
            </div>
            {myTasks.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {myTasks.map((task) => {
                  const cfg = taskStatusConfig[task.status];
                  return (
                    <div
                      key={task.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 0',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      <StatusBadge {...cfg} size="sm" />
                      <span style={{ flex: 1, fontSize: 14, color: 'var(--color-text)' }}>{task.title}</span>
                      {task.dueDate && (
                        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', flexShrink: 0 }}>
                          Due {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>No tasks assigned to you.</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Applications */}
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Applications</h2>
            {myApplications.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {myApplications.map((app) => {
                  const cfg = applicationStatusConfig[app.status];
                  const proj = getProjectById(app.projectId);
                  return (
                    <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, color: 'var(--color-text)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {proj?.title ?? app.projectId}
                      </span>
                      <StatusBadge {...cfg} size="sm" dot={false} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
                No applications yet.
              </p>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Upcoming Events</h2>
              <Link to="/student/events">
                <button className="btn btn-ghost btn-sm" style={{ gap: 4 }}>
                  All <ArrowRight size={13} />
                </button>
              </Link>
            </div>
            {upcomingEvents.map((event) => {
              const cfg = eventTypeConfig[event.type];
              return (
                <div
                  key={event.id}
                  style={{
                    padding: '10px 0',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: cfg.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Calendar size={16} style={{ color: cfg.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {event.title}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                      {formatDate(event.startDate)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Links */}
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { to: '/projects', label: 'Browse & Join Projects', icon: <FolderKanban size={14} /> },
                { to: '/ideas/submit', label: 'Submit an Idea', icon: <Lightbulb size={14} /> },
                { to: '/student/teammates', label: 'Find Teammates', icon: <Users size={14} /> },
                { to: '/student/chat', label: 'Project Chat', icon: <MessageSquare size={14} /> },
                { to: '/student/learn', label: 'Take a Quiz', icon: <Trophy size={14} /> },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 12px',
                    borderRadius: 8,
                    fontSize: 13,
                    color: 'var(--color-text)',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ color: 'var(--color-accent)' }}>{link.icon}</span>
                  {link.label}
                  <ArrowRight size={12} style={{ marginLeft: 'auto', color: 'var(--color-text-secondary)' }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dashboard-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </DashboardLayout>
  );
}
