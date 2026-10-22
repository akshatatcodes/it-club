import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { mockUsers } from '../../data/users';
import { getInitials } from '../../utils';
import { useDemoRole } from '../../hooks/useAppContext';

export function FacultyStudentsPage() {
  const { currentUser } = useDemoRole();
  const students = mockUsers.filter((u) => u.role === 'student');
  return (
    <DashboardLayout title="My Students">
      <PageHeader title="My Students" subtitle="Students currently under your mentorship." />
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Department</th>
              <th>Year</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                      {getInitials(student.name)}
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)' }}>{student.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{student.email}</p>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{student.department}</td>
                <td style={{ fontSize: 13 }}>{student.year ? `Year ${student.year}` : '—'}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {(student.skills ?? []).slice(0, 3).map((s) => (
                      <span key={s} style={{ fontSize: 11, padding: '2px 7px', background: 'var(--color-accent-light)', color: 'var(--color-accent)', borderRadius: 4 }}>{s}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
