import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { mockUsers, getUserById } from '../../data/users';
import { mockProjects } from '../../data/projects';
import { Modal } from '../../components/ui/Modal';
import { FormField } from '../../components/ui/FormField';
import { useAppStore } from '../../hooks/useAppStore';
import { useDemoRole } from '../../hooks/useAppContext';
import { useToast } from '../../hooks/useAppContext';
import { getInitials } from '../../utils';
import { Search, Filter, UserPlus, Code2, Star } from 'lucide-react';
import type { ProjectApplication } from '../../types';

const allStudents = mockUsers.filter((u) => u.role === 'student');

export function FindTeammatesPage() {
  const { currentUser } = useDemoRole();
  const { submitApplication } = useAppStore();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [contactTarget, setContactTarget] = useState<typeof allStudents[0] | null>(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const skills = Array.from(new Set(allStudents.flatMap((u) => u.skills ?? []))).sort();

  const filtered = allStudents.filter((u) => {
    if (u.id === currentUser.id) return false;
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase()) ||
      (u.skills ?? []).some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchSkill = !filterSkill || (u.skills ?? []).includes(filterSkill);
    return matchSearch && matchSkill;
  });

  // Find open projects for connecting
  const openProjects = mockProjects.filter((p) => p.isOpenForApplications);

  function handleConnect() {
    if (!contactTarget || !message.trim()) {
      addToast('error', 'Message required', 'Please write a message before sending.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      addToast('success', 'Connection Request Sent!', `Your message has been sent to ${contactTarget.name}.`);
      setContactTarget(null);
      setMessage('');
      setSubmitting(false);
    }, 700);
  }

  return (
    <DashboardLayout title="Find Teammates">
      <div style={{ maxWidth: 900, marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text)', marginBottom: 6 }}>Find Teammates</h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
          Connect with students who have the skills your project needs.
        </p>
      </div>

      {/* Open Projects */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>
          🔓 Projects Looking for Members
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {openProjects.map((p) => (
            <Link key={p.id} to={`/projects/${p.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '8px 14px', background: 'var(--color-accent-light)', border: '1px solid var(--color-accent)', borderRadius: 10, fontSize: 13, color: 'var(--color-accent)', fontWeight: 500 }}>
                {p.title} <span style={{ opacity: 0.7 }}>({p.applicationCount} applicants)</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
          <input
            className="input"
            style={{ paddingLeft: 36 }}
            placeholder="Search by name, department, or skill…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <Filter size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
          <select
            className="input"
            style={{ paddingLeft: 30, width: 180 }}
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
          >
            <option value="">All Skills</option>
            {skills.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Student Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {filtered.map((student) => (
          <div key={student.id} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                {getInitials(student.name)}
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{student.name}</p>
                <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{student.department} {student.year ? `· Year ${student.year}` : ''}</p>
              </div>
            </div>
            {student.bio && (
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.55, marginBottom: 12 }}>{student.bio}</p>
            )}
            {(student.skills ?? []).length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {(student.skills ?? []).slice(0, 5).map((skill) => (
                  <span key={skill} style={{ padding: '3px 8px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 6, fontSize: 11, color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    {skill}
                  </span>
                ))}
              </div>
            )}
            {/* Open projects they're in */}
            {mockProjects.filter((p) => p.memberIds.includes(student.id)).length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--color-accent)', marginBottom: 14 }}>
                <Code2 size={11} />
                {mockProjects.filter((p) => p.memberIds.includes(student.id)).length} active project(s)
              </div>
            )}
            <button
              className="btn btn-sm btn-primary"
              style={{ width: '100%', gap: 6 }}
              onClick={() => { setContactTarget(student); setMessage(''); }}
            >
              <UserPlus size={13} /> Connect
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 40, color: 'var(--color-text-secondary)' }}>
            No students match your search. Try adjusting your filters.
          </div>
        )}
      </div>

      {/* Connect Modal */}
      <Modal open={!!contactTarget} onClose={() => setContactTarget(null)} title={`Connect with ${contactTarget?.name}`} size="sm">
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 16 }}>
          Send a message explaining why you'd like to connect or collaborate with {contactTarget?.name}.
        </p>
        <FormField label="Your Message" required>
          <textarea
            className="input"
            rows={4}
            placeholder="Hi! I'm working on a project that needs your skills in..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ resize: 'vertical' }}
          />
        </FormField>
        <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={() => setContactTarget(null)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleConnect} disabled={submitting || !message.trim()}>
            {submitting ? 'Sending…' : 'Send Message'}
          </button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
