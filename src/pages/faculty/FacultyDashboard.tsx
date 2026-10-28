import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { StatCard } from '../../components/ui/StatCard';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useDemoRole } from '../../hooks/useAppContext';
import { getProjectsByMentor } from '../../data/projects';
import { mockSessions, mockIdeas } from '../../data/mock';
import { ideaStatusConfig, formatDateTime } from '../../utils';
import { getUserById } from '../../data/users';
import { getInitials } from '../../utils';
import {
  FolderKanban, Calendar, Lightbulb, UserCheck, ArrowRight, Video,
  CheckCircle2, Clock, Award
} from 'lucide-react';

export function FacultyDashboard() {
  const { currentUser } = useDemoRole();
  const myProjects = getProjectsByMentor(currentUser.id);
  const mySessions = mockSessions.filter((s) => s.mentorId === currentUser.id);
  const pendingIdeas = mockIdeas.filter((i) => i.status === 'pending');
  const upcomingSession = mySessions.find((s) => s.status === 'scheduled');

  return (
    <DashboardLayout title="Faculty Portal">
      {/* Faculty Welcome Card */}
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
              fontSize: 22,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {getInitials(currentUser.name)}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Welcome, {currentUser.name}! 👋
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
                FACULTY MENTOR
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
              {currentUser.designation || 'Associate Professor & Faculty Mentor'} · {currentUser.department}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/faculty/ideas" style={{ textDecoration: 'none' }}>
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
              <span>Review Ideas ({pendingIdeas.length})</span>
            </button>
          </Link>
          <Link to="/faculty/sessions" style={{ textDecoration: 'none' }}>
            <button
              className="btn btn-ghost btn-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                fontWeight: 600,
              }}
            >
              <span>Schedule Session</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard
          label="Projects Mentoring"
          value={myProjects.length}
          icon={<FolderKanban size={20} />}
          color="var(--color-accent)"
          description="Active student squads"
        />
        <StatCard
          label="Mentoring Sessions"
          value={mySessions.length}
          icon={<Calendar size={20} />}
          color="var(--color-success)"
          description={`${mySessions.filter(s => s.status === 'scheduled').length} upcoming`}
        />
        <StatCard
          label="Ideas Pending Review"
          value={pendingIdeas.length}
          icon={<Lightbulb size={20} />}
          color="var(--color-warning)"
          description="Awaiting evaluation"
        />
        <StatCard
          label="Guided Students"
          value={myProjects.reduce((sum, p) => sum + p.memberIds.length, 0)}
          icon={<UserCheck size={20} />}
          color="var(--color-incubated)"
          description="Across departments"
        />
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }} className="dashboard-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Mentored Projects */}
          <div className="card" style={{ padding: 24, borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-primary-navy)' }}>
                  Projects Under Mentorship
                </h2>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
                  Student initiatives assigned to your advisory portfolio
                </p>
              </div>
              <Link to="/faculty/projects">
                <button className="btn btn-ghost btn-sm" style={{ gap: 4, fontWeight: 600 }}>
                  All <ArrowRight size={13} />
                </button>
              </Link>
            </div>

            {myProjects.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {myProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} compact href={`/faculty/projects/${p.id}`} />
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0 }}>
                No active projects assigned yet.
              </p>
            )}
          </div>

          {/* Pending Idea Reviews */}
          <div className="card" style={{ padding: 24, borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-primary-navy)' }}>
                  Student Ideas Awaiting Review
                </h2>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
                  Evaluate problem feasibility, technical scope, and approve for squad recruitment
                </p>
              </div>
              <Link to="/faculty/ideas">
                <button className="btn btn-ghost btn-sm" style={{ gap: 4, fontWeight: 600 }}>
                  Review All <ArrowRight size={13} />
                </button>
              </Link>
            </div>

            {pendingIdeas.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {pendingIdeas.map((idea) => {
                  const author = getUserById(idea.submittedBy);
                  return (
                    <div
                      key={idea.id}
                      style={{
                        padding: '14px 16px',
                        background: 'var(--color-bg)',
                        borderRadius: 10,
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-primary-navy)', margin: 0 }}>
                          {idea.title}
                        </p>
                        <StatusBadge {...ideaStatusConfig['pending']} size="sm" />
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                        Proposed by <strong>{author?.name ?? 'Student'}</strong> ({author?.department}) · {idea.votes} peer upvotes
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0 }}>
                No ideas currently pending evaluation.
              </p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Next Session */}
          {upcomingSession && (
            <div className="card" style={{ padding: 20, borderRadius: 16 }}>
              <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: 12 }}>
                Upcoming Mentoring Session
              </h2>
              <div style={{ background: 'var(--color-accent-light)', borderRadius: 12, padding: 16, border: '1px solid #D1E5F8' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: 6 }}>
                  {upcomingSession.title}
                </p>
                <p style={{ fontSize: 13, color: 'var(--color-text)', marginBottom: 10, lineHeight: 1.5 }}>
                  📅 {formatDateTime(upcomingSession.scheduledAt)}<br />
                  ⏱ {upcomingSession.durationMinutes} minutes
                </p>
                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  {upcomingSession.studentIds.map((sid) => {
                    const u = getUserById(sid);
                    return u ? (
                      <div
                        key={sid}
                        title={u.name}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: 'var(--color-primary-navy)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                      >
                        {getInitials(u.name)}
                      </div>
                    ) : null;
                  })}
                </div>
                {upcomingSession.meetLink && (
                  <a href={upcomingSession.meetLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <button className="btn btn-primary btn-sm" style={{ width: '100%', gap: 6, fontWeight: 600 }}>
                      <Video size={14} /> Join Video Conference
                    </button>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* All Scheduled Sessions */}
          <div className="card" style={{ padding: 20, borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-primary-navy)' }}>
                Session Schedule
              </h2>
              <Link to="/faculty/sessions">
                <button className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>View all</button>
              </Link>
            </div>
            {mySessions.map((s) => (
              <div key={s.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 3 }}>{s.title}</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <StatusBadge
                    label={s.status}
                    color={s.status === 'scheduled' ? 'var(--color-accent)' : s.status === 'completed' ? 'var(--color-success)' : 'var(--color-error)'}
                    bg={s.status === 'scheduled' ? 'var(--color-accent-light)' : s.status === 'completed' ? '#F0FDF4' : '#FEF2F2'}
                    size="sm"
                  />
                  <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    {formatDateTime(s.scheduledAt)}
                  </span>
                </div>
              </div>
            ))}
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
