import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { StatCard } from '../../components/ui/StatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { mockProjects } from '../../data/projects';
import { mockUsers } from '../../data/users';
import { mockIdeas, mockEvents } from '../../data/mock';
import { projectStatusConfig, ideaStatusConfig, formatDate, getInitials } from '../../utils';
import { useDemoRole } from '../../hooks/useAppContext';
import {
  Users, FolderKanban, Lightbulb, Calendar,
  TrendingUp, Shield, CheckCircle, Clock, Eye, Sparkles, Megaphone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const recentActivity = [
  { id: 1, text: 'Akshat Jain updated sprint milestone for "Campus Connect"', time: '1h ago', type: 'project' },
  { id: 2, text: 'Roshan Bagale submitted a new idea: "Smart Campus Assistant"', time: '4h ago', type: 'idea' },
  { id: 3, text: 'InnoHack 2026 reached 48 registered student teams across campus', time: '1d ago', type: 'event' },
  { id: 4, text: 'Dr. Rahul Satyakam completed architecture review for CyberShield Lab', time: '2d ago', type: 'review' },
  { id: 5, text: 'Ziya Shaikh joined Green Campus Initiative as UI/UX Lead', time: '3d ago', type: 'user' },
];

const activityColors: Record<string, string> = {
  project: 'var(--color-accent)',
  idea: 'var(--color-warning)',
  event: 'var(--color-success)',
  review: 'var(--color-incubated)',
  user: 'var(--color-text-secondary)',
};

export function AdminDashboard() {
  const { currentUser } = useDemoRole();
  const totalProjects = mockProjects.length;
  const totalUsers = mockUsers.length;
  const pendingIdeas = mockIdeas.filter((i) => i.status === 'pending').length;
  const upcomingEvents = mockEvents.length;

  const projectsByStatus = Object.entries(
    mockProjects.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  );

  const roleBreakdown = [
    { role: 'Students', count: mockUsers.filter((u) => u.role === 'student').length, color: 'var(--color-accent)' },
    { role: 'Faculty', count: mockUsers.filter((u) => u.role === 'faculty').length, color: 'var(--color-success)' },
    { role: 'Admins', count: mockUsers.filter((u) => u.role === 'admin').length, color: 'var(--color-incubated)' },
  ];

  return (
    <DashboardLayout title="Club Administration">
      {/* Admin Header Card */}
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
                {currentUser.name} — Club Operations 👋
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
                ADMINISTRATOR
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
              IT Club & Innovation Hub · MIT-ADT University Rajbaug Campus, Pune
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/admin/announcements" style={{ textDecoration: 'none' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{
                background: '#ffffff',
                color: 'var(--color-primary-navy)',
                borderColor: '#ffffff',
                fontWeight: 700,
              }}
            >
              <Megaphone size={14} color="var(--color-accent)" />
              <span>Broadcast Alert</span>
            </button>
          </Link>
          <Link to="/admin/analytics" style={{ textDecoration: 'none' }}>
            <button
              className="btn btn-ghost btn-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                fontWeight: 600,
              }}
            >
              <span>View Analytics</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard label="Registered Members" value={totalUsers} icon={<Users size={20} />} color="var(--color-accent)" trend={{ value: 14, label: 'this semester' }} />
        <StatCard label="Active Projects" value={totalProjects} icon={<FolderKanban size={20} />} color="var(--color-primary-navy)" trend={{ value: 9, label: 'in sprint' }} />
        <StatCard label="Pending Ideas" value={pendingIdeas} icon={<Lightbulb size={20} />} color="var(--color-warning)" description="Requires faculty triage" />
        <StatCard label="Campus Events" value={upcomingEvents} icon={<Calendar size={20} />} color="var(--color-success)" description="Hackathons & talks" />
        <StatCard label="Crieya Referrals" value={mockProjects.filter(p => p.incubationReferred).length} icon={<TrendingUp size={20} />} color="var(--color-incubated)" description="Pre-incubation" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }} className="dashboard-grid">
        {/* Recent Activity */}
        <div className="card" style={{ padding: 24, borderRadius: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-primary-navy)' }}>
                Live Platform Feed
              </h2>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
                Recent student submissions, reviews, and event participation across campus
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {recentActivity.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  padding: '14px 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: activityColors[item.type],
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, color: 'var(--color-text)', fontWeight: 500, margin: 0 }}>
                    {item.text}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 3 }}>
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Projects by Status */}
          <div className="card" style={{ padding: 20, borderRadius: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: 14 }}>
              Projects by Status
            </h2>
            {projectsByStatus.map(([status, count]) => {
              const cfg = projectStatusConfig[status as keyof typeof projectStatusConfig];
              if (!cfg) return null;
              return (
                <div
                  key={status}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  <StatusBadge {...cfg} size="sm" />
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-primary-navy)' }}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          {/* User Breakdown */}
          <div className="card" style={{ padding: 20, borderRadius: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: 14 }}>
              Community Roster
            </h2>
            {roleBreakdown.map((r) => (
              <div
                key={r.role}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <span style={{ fontSize: 13, color: 'var(--color-text)', fontWeight: 500 }}>{r.role}</span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: r.color,
                    background: `${r.color}15`,
                    padding: '2px 10px',
                    borderRadius: 99,
                  }}
                >
                  {r.count} members
                </span>
              </div>
            ))}
          </div>

          {/* Admin Actions */}
          <div className="card" style={{ padding: 20, borderRadius: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: 12 }}>
              Administrative Actions
            </h2>
            {[
              { to: '/admin/users', label: 'Manage Member Profiles', icon: <Users size={14} /> },
              { to: '/admin/projects', label: 'Audit Project Portfolios', icon: <FolderKanban size={14} /> },
              { to: '/admin/ideas', label: 'Triage Student Ideas', icon: <Lightbulb size={14} /> },
              { to: '/admin/events', label: 'Publish Campus Events', icon: <Calendar size={14} /> },
              { to: '/admin/announcements', label: 'Broadcast Notices', icon: <Megaphone size={14} /> },
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
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: 'var(--color-accent)' }}>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
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
