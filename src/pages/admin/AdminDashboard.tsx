import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { StatCard } from '../../components/ui/StatCard';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { mockProjects } from '../../data/projects';
import { mockUsers } from '../../data/users';
import { mockIdeas, mockEvents } from '../../data/mock';
import { projectStatusConfig, ideaStatusConfig, formatDate } from '../../utils';
import {
  Users, FolderKanban, Lightbulb, Calendar,
  TrendingUp, Shield, CheckCircle, Clock, Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

const recentActivity = [
  { id: 1, text: 'Arjun Sharma submitted a new project: "Campus Smart Attendance"', time: '2h ago', type: 'project' },
  { id: 2, text: 'Priya Nair submitted a new idea: "Campus Carpooling App"', time: '5h ago', type: 'idea' },
  { id: 3, text: 'InnoHack 2026 now has 5 registered teams', time: '1d ago', type: 'event' },
  { id: 4, text: 'Dr. Meena Iyer approved AI Study Buddy for incubation review', time: '2d ago', type: 'review' },
  { id: 5, text: 'New member Sneha Reddy joined the platform', time: '3d ago', type: 'user' },
];

const activityColors: Record<string, string> = {
  project: 'var(--color-accent)',
  idea: 'var(--color-warning)',
  event: 'var(--color-success)',
  review: 'var(--color-incubated)',
  user: 'var(--color-text-secondary)',
};

export function AdminDashboard() {
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
    <DashboardLayout title="Admin Dashboard">
      <PageHeader
        title="Platform Overview"
        subtitle="Monitor and manage the IT Club & Innovation Hub platform."
      />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Users" value={totalUsers} icon={<Users size={20} />} color="var(--color-accent)" trend={{ value: 12, label: 'this month' }} />
        <StatCard label="Total Projects" value={totalProjects} icon={<FolderKanban size={20} />} color="var(--color-primary)" trend={{ value: 8, label: 'this semester' }} />
        <StatCard label="Pending Ideas" value={pendingIdeas} icon={<Lightbulb size={20} />} color="var(--color-warning)" description="Awaiting review" />
        <StatCard label="Events" value={upcomingEvents} icon={<Calendar size={20} />} color="var(--color-success)" description="This semester" />
        <StatCard label="Incubated Projects" value={mockProjects.filter(p => p.incubationReferred).length} icon={<TrendingUp size={20} />} color="var(--color-incubated)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 320px', gap: 20, alignItems: 'start' }}>
        {/* Recent Activity */}
        <div className="card" style={{ padding: 20, gridColumn: 'span 2' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {recentActivity.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '12px 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: activityColors[item.type],
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, color: 'var(--color-text)' }}>{item.text}</p>
                  <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Project Breakdown */}
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Projects by Status</h2>
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
                    padding: '7px 0',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  <StatusBadge {...cfg} size="sm" />
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>{count}</span>
                </div>
              );
            })}
          </div>

          {/* User Breakdown */}
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>User Breakdown</h2>
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
                <span style={{ fontSize: 14, color: 'var(--color-text)' }}>{r.role}</span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: r.color,
                    background: `${r.color}18`,
                    padding: '2px 10px',
                    borderRadius: 99,
                  }}
                >
                  {r.count}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Admin Actions</h2>
            {[
              { to: '/admin/users', label: 'Manage Users', icon: <Users size={14} /> },
              { to: '/admin/projects', label: 'Review Projects', icon: <FolderKanban size={14} /> },
              { to: '/admin/ideas', label: 'Approve Ideas', icon: <Lightbulb size={14} /> },
              { to: '/admin/events', label: 'Manage Events', icon: <Calendar size={14} /> },
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
                  marginBottom: 8,
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{ color: 'var(--color-accent)' }}>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
