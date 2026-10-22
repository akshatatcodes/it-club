import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { mockUsers } from '../../data/users';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getInitials, formatDate } from '../../utils';
import { Plus, Shield, GraduationCap, UserCircle2 } from 'lucide-react';
import { useToast } from '../../hooks/useAppContext';
import type { Role } from '../../types';

const roleConfig: Record<Role, { label: string; color: string; bg: string }> = {
  student: { label: 'Student', color: 'var(--color-accent)', bg: 'var(--color-accent-light)' },
  faculty: { label: 'Faculty', color: 'var(--color-success)', bg: '#F0FDF4' },
  admin: { label: 'Admin', color: 'var(--color-incubated)', bg: '#F5F3FF' },
};

export function AdminUsersPage() {
  const { addToast } = useToast();
  return (
    <DashboardLayout title="Users">
      <PageHeader
        title="User Management"
        subtitle={`${mockUsers.length} total users on the platform.`}
        action={
          <button className="btn btn-primary btn-sm" onClick={() => addToast('info', 'Coming Soon', 'User invite feature coming in Phase 2.')}>
            <Plus size={15} /> Invite User
          </button>
        }
      />
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Department</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => {
              const roleCfg = roleConfig[user.role];
              return (
                <tr key={user.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)' }}>{user.name}</p>
                        <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td><StatusBadge label={roleCfg.label} color={roleCfg.color} bg={roleCfg.bg} size="sm" /></td>
                  <td style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{user.department}</td>
                  <td style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{formatDate(user.joinedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
