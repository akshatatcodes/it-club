import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { BarChart3, TrendingUp, Users, FolderKanban } from 'lucide-react';
import { mockProjects } from '../../data/projects';
import { mockUsers } from '../../data/users';
import { mockEvents, mockIdeas } from '../../data/mock';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const projectsByCategory = Object.entries(
  mockProjects.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
).map(([name, value]) => ({ name: name.replace(' / ', '/'), value }));

const usersByRole = [
  { name: 'Students', value: mockUsers.filter((u) => u.role === 'student').length },
  { name: 'Faculty', value: mockUsers.filter((u) => u.role === 'faculty').length },
  { name: 'Admins', value: mockUsers.filter((u) => u.role === 'admin').length },
];

const COLORS = ['#3678B7', '#22C55E', '#8B5CF6', '#F59E0B', '#EF4444'];

export function AdminAnalyticsPage() {
  return (
    <DashboardLayout title="Analytics">
      <PageHeader title="Analytics" subtitle="Platform usage metrics and insights." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Users" value={mockUsers.length} icon={<Users size={20} />} color="var(--color-accent)" trend={{ value: 12, label: 'this month' }} />
        <StatCard label="Total Projects" value={mockProjects.length} icon={<FolderKanban size={20} />} color="var(--color-primary)" trend={{ value: 8, label: 'this semester' }} />
        <StatCard label="Ideas Submitted" value={mockIdeas.length} icon={<TrendingUp size={20} />} color="var(--color-warning)" />
        <StatCard label="Events Held" value={mockEvents.length} icon={<BarChart3 size={20} />} color="var(--color-success)" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Projects by Category</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={projectsByCategory} margin={{ top: 0, right: 0, bottom: 20, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} angle={-30} textAnchor="end" />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} />
              <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 13 }} />
              <Bar dataKey="value" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Users by Role</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={usersByRole} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {usersByRole.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 13 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
