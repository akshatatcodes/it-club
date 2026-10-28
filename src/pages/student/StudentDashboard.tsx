import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { StatCard } from '../../components/ui/StatCard';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useDemoRole } from '../../hooks/useAppContext';
import { useAppStore } from '../../hooks/useAppStore';
import { getProjectsByMember, getProjectById } from '../../data/projects';
import { mockEvents } from '../../data/mock';
import { applicationStatusConfig, eventTypeConfig, formatDate, getDaysUntil, taskStatusConfig, getInitials } from '../../utils';
import {
  FolderKanban, ClipboardList, Calendar, CheckSquare,
  ArrowRight, Lightbulb, Trophy, Users, MessageSquare,
  Sparkles, CheckCircle2, Award, Clock
} from 'lucide-react';

export function StudentDashboard() {
  const { currentUser } = useDemoRole();
  const { applications, tasks, registeredEventIds } = useAppStore();
  const myProjects = getProjectsByMember(currentUser.id);
  const myApplications = applications.filter((a) => a.applicantId === currentUser.id);
  const upcomingEvents = mockEvents.filter((e) => getDaysUntil(e.startDate) > 0).slice(0, 3);
  const myTasks = tasks.filter((t) => t.assigneeId === currentUser.id);

  return (
    <DashboardLayout title="Student Workspace">
      {/* Student Welcome Header Card */}
      <div
        className="card"
        style={{
          padding: '28px 32px',
          background: 'linear-gradient(135deg, #102743 0%, #17365D 100%)',
          color: '#ffffff',
          borderRadius: 18,
          marginBottom: 28,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 20,
          boxShadow: '0 8px 24px rgba(16, 39, 67, 0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'rgba(255, 255, 255, 0.15)',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {getInitials(currentUser.name)}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Welcome back, {currentUser.name}! 👋
              </h1>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  background: 'rgba(147, 197, 253, 0.2)',
                  color: '#93C5FD',
                  border: '1px solid rgba(147, 197, 253, 0.4)',
                  padding: '2px 8px',
                  borderRadius: 4,
                  letterSpacing: '0.04em',
                }}
              >
                STUDENT INNOVATOR
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
              {currentUser.department} · {currentUser.year ? `Year ${currentUser.year}` : ''} · MIT-ADT University Rajbaug Campus
            </p>
          </div>
        </div>

        {/* Quick Action in Header */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/ideas/submit" style={{ textDecoration: 'none' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{
                background: '#ffffff',
                color: 'var(--color-primary-navy)',
                borderColor: '#ffffff',
                fontWeight: 700,
              }}
            >
              <Lightbulb size={14} color="var(--color-accent)" />
              <span>Propose Idea</span>
            </button>
          </Link>
          <Link to="/projects" style={{ textDecoration: 'none' }}>
            <button
              className="btn btn-ghost btn-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                fontWeight: 600,
              }}
            >
              <span>Explore Projects</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard
          label="Active Projects"
          value={myProjects.length}
          icon={<FolderKanban size={20} />}
          color="var(--color-accent)"
          description="In sprint execution"
        />
        <StatCard
          label="Project Applications"
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
          description="Hackathons & Talks"
        />
        <StatCard
          label="Sprint Tasks"
          value={myTasks.length}
          icon={<CheckSquare size={20} />}
          color="var(--color-incubated)"
          description={`${myTasks.filter(t => t.status === 'done').length} completed`}
        />
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }} className="dashboard-grid">
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* My Projects */}
          <div className="card" style={{ padding: 24, borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-primary-navy)' }}>
                  Active Collaborations
                </h2>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
                  Projects you are leading or contributing to this semester
                </p>
              </div>
              <Link to="/student/projects">
                <button className="btn btn-ghost btn-sm" style={{ gap: 4, fontWeight: 600 }}>
                  View all <ArrowRight size={13} />
                </button>
              </Link>
            </div>

            {myProjects.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {myProjects.slice(0, 2).map((p) => (
                  <ProjectCard key={p.id} project={p} compact href={`/student/projects/${p.id}`} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, margin: 0 }}>
                You haven't joined any projects yet.{' '}
                <Link to="/projects" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                  Browse open project squads
                </Link>
              </p>
            )}
          </div>

          {/* My Tasks with Progress Status */}
          <div className="card" style={{ padding: 24, borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-primary-navy)' }}>
                  Assigned Sprint Tasks
                </h2>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
                  Deliverables scheduled for upcoming faculty milestone review
                </p>
              </div>
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
                        padding: '12px 0',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      <StatusBadge {...cfg} size="sm" />
                      <span style={{ flex: 1, fontSize: 14, color: 'var(--color-text)', fontWeight: 500 }}>
                        {task.title}
                      </span>
                      {task.dueDate && (
                        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={12} />
                          Due {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, margin: 0 }}>
                All assigned sprint tasks are up to date!
              </p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Applications Status */}
          <div className="card" style={{ padding: 20, borderRadius: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: 14 }}>
              My Applications
            </h2>
            {myApplications.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {myApplications.map((app) => {
                  const cfg = applicationStatusConfig[app.status];
                  const proj = getProjectById(app.projectId);
                  return (
                    <div
                      key={app.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 0',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      <span style={{ fontSize: 13, color: 'var(--color-text)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {proj?.title ?? app.projectId}
                      </span>
                      <StatusBadge {...cfg} size="sm" dot={false} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
                No pending squad applications.
              </p>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="card" style={{ padding: 20, borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-primary-navy)' }}>
                Campus Activities
              </h2>
              <Link to="/student/events">
                <button className="btn btn-ghost btn-sm" style={{ gap: 4, fontSize: 12 }}>
                  All <ArrowRight size={12} />
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

          {/* Quick Actions */}
          <div className="card" style={{ padding: 20, borderRadius: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: 12 }}>
              Quick Actions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { to: '/projects', label: 'Browse & Join Projects', icon: <FolderKanban size={14} /> },
                { to: '/ideas/submit', label: 'Submit an Idea', icon: <Lightbulb size={14} /> },
                { to: '/student/teammates', label: 'Find Teammates', icon: <Users size={14} /> },
                { to: '/student/chat', label: 'Project Chat', icon: <MessageSquare size={14} /> },
                { to: '/student/learn', label: 'Technical Quizzes', icon: <Trophy size={14} /> },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 12px',
                    borderRadius: 8,
                    fontSize: 13,
                    color: 'var(--color-text)',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  <span style={{ color: 'var(--color-accent)' }}>{link.icon}</span>
                  <span>{link.label}</span>
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
