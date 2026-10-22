import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { StatCard } from '../../components/ui/StatCard';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useDemoRole } from '../../hooks/useAppContext';
import { getProjectsByMentor } from '../../data/projects';
import { mockSessions, mockIdeas } from '../../data/mock';
import { ideaStatusConfig, formatDateTime } from '../../utils';
import { getUserById } from '../../data/users';
import { getInitials } from '../../utils';
import {
  FolderKanban, Calendar, Lightbulb, UserCheck, ArrowRight, Video
} from 'lucide-react';

export function FacultyDashboard() {
  const { currentUser } = useDemoRole();
  const myProjects = getProjectsByMentor(currentUser.id);
  const mySessions = mockSessions.filter((s) => s.mentorId === currentUser.id);
  const pendingIdeas = mockIdeas.filter((i) => i.status === 'pending');

  const upcomingSession = mySessions.find((s) => s.status === 'scheduled');

  return (
    <DashboardLayout title="Faculty Dashboard">
      <PageHeader
        title={`Hello, ${currentUser.name.split(' ')[0]}! 👋`}
        subtitle={`${currentUser.department} · Faculty Mentor`}
      />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard label="Projects Mentoring" value={myProjects.length} icon={<FolderKanban size={20} />} color="var(--color-accent)" />
        <StatCard label="Sessions" value={mySessions.length} icon={<Calendar size={20} />} color="var(--color-success)" description={`${mySessions.filter(s => s.status === 'scheduled').length} upcoming`} />
        <StatCard label="Pending Reviews" value={pendingIdeas.length} icon={<Lightbulb size={20} />} color="var(--color-warning)" />
        <StatCard label="Total Students" value={myProjects.reduce((sum, p) => sum + p.memberIds.length, 0)} icon={<UserCheck size={20} />} color="var(--color-incubated)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Mentored Projects */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Projects I'm Mentoring</h2>
              <Link to="/faculty/projects">
                <button className="btn btn-ghost btn-sm" style={{ gap: 4 }}>All <ArrowRight size={13} /></button>
              </Link>
            </div>
            {myProjects.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {myProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} compact href={`/faculty/projects/${p.id}`} />
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>No projects assigned yet.</p>
            )}
          </div>

          {/* Pending Idea Reviews */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Ideas Pending Review</h2>
              <Link to="/faculty/ideas">
                <button className="btn btn-ghost btn-sm" style={{ gap: 4 }}>Review <ArrowRight size={13} /></button>
              </Link>
            </div>
            {pendingIdeas.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {pendingIdeas.map((idea) => {
                  const author = getUserById(idea.submittedBy);
                  return (
                    <div key={idea.id} style={{ padding: '12px', background: 'var(--color-bg)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>{idea.title}</p>
                        <StatusBadge {...ideaStatusConfig['pending']} size="sm" />
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                        By {author?.name} · {idea.votes} votes
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>No ideas pending review.</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Next Session */}
          {upcomingSession && (
            <div className="card" style={{ padding: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Next Session</h2>
              <div style={{ background: 'var(--color-accent-light)', borderRadius: 10, padding: 14 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6 }}>
                  {upcomingSession.title}
                </p>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 10 }}>
                  📅 {formatDateTime(upcomingSession.scheduledAt)}<br />
                  ⏱ {upcomingSession.durationMinutes} minutes
                </p>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
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
                          background: 'var(--color-primary)',
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
                  <a href={upcomingSession.meetLink} target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-primary btn-sm" style={{ gap: 6 }}>
                      <Video size={13} /> Join Meeting
                    </button>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* All Sessions */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Sessions</h2>
              <Link to="/faculty/sessions">
                <button className="btn btn-ghost btn-sm">View all</button>
              </Link>
            </div>
            {mySessions.map((s) => (
              <div key={s.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text)', marginBottom: 3 }}>{s.title}</p>
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
    </DashboardLayout>
  );
}
