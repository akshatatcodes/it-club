import React, { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { FormField } from '../../components/ui/FormField';
import { useAppStore } from '../../hooks/useAppStore';
import { useDemoRole } from '../../hooks/useAppContext';
import { useToast } from '../../hooks/useAppContext';
import { formatDateTime } from '../../utils';
import { Megaphone, Plus, Users, BookOpen, Bell, Send } from 'lucide-react';

const AUDIENCE_OPTIONS = ['all', 'students', 'faculty', 'admin'];

export function AdminAnnouncementsPage() {
  const { announcements, addAnnouncement } = useAppStore();
  const { currentUser } = useDemoRole();
  const { addToast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', body: '', audience: 'all' });
  const [submitting, setSubmitting] = useState(false);

  function handleCreate() {
    if (!form.title.trim() || !form.body.trim()) {
      addToast('error', 'Required fields missing', 'Please fill in the title and body.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      addAnnouncement(form);
      setForm({ title: '', body: '', audience: 'all' });
      setShowForm(false);
      setSubmitting(false);
      addToast('success', 'Announcement Posted!', 'All targeted members will see this in their notifications.');
    }, 700);
  }

  const audienceIcons: Record<string, React.ReactNode> = {
    all: <Bell size={14} />,
    students: <BookOpen size={14} />,
    faculty: <Users size={14} />,
    admin: <Megaphone size={14} />,
  };

  return (
    <DashboardLayout title="Announcements">
      <div style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text)', marginBottom: 4 }}>Announcements</h1>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
              Broadcast messages to students, faculty, or all members.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm((p) => !p)} style={{ gap: 6 }}>
            <Plus size={15} /> New Announcement
          </button>
        </div>

        {/* New Announcement Form */}
        {showForm && (
          <div className="card" style={{ padding: 24, marginBottom: 24, border: '2px solid var(--color-accent)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Megaphone size={18} style={{ color: 'var(--color-accent)' }} /> Create Announcement
            </h2>
            <FormField label="Title" required>
              <input className="input" placeholder="Announcement title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </FormField>
            <FormField label="Message Body" required>
              <textarea
                className="input"
                rows={4}
                placeholder="Write your announcement here..."
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                style={{ resize: 'vertical' }}
              />
            </FormField>
            <FormField label="Target Audience">
              <div style={{ display: 'flex', gap: 10 }}>
                {AUDIENCE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, audience: opt }))}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: `2px solid ${form.audience === opt ? 'var(--color-accent)' : 'var(--color-border)'}`,
                      background: form.audience === opt ? 'var(--color-accent-light)' : 'transparent',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: 12,
                      fontWeight: 600,
                      color: form.audience === opt ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      transition: 'all 0.15s ease',
                      textTransform: 'capitalize',
                    }}
                  >
                    {audienceIcons[opt]} {opt}
                  </button>
                ))}
              </div>
            </FormField>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreate} disabled={submitting} style={{ gap: 6 }}>
                <Send size={14} /> {submitting ? 'Posting…' : 'Post Announcement'}
              </button>
            </div>
          </div>
        )}

        {/* Announcements List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {announcements.map((ann) => (
            <div key={ann.id} className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text)' }}>{ann.title}</h3>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: 12 }}>
                  <span style={{ fontSize: 11, padding: '3px 10px', background: 'var(--color-accent-light)', color: 'var(--color-accent)', borderRadius: 99, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, textTransform: 'capitalize' }}>
                    {audienceIcons[ann.audience]} {ann.audience}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>{ann.body}</p>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                Posted {formatDateTime(ann.createdAt)}
              </p>
            </div>
          ))}
          {announcements.length === 0 && (
            <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-secondary)' }}>
              No announcements yet. Create your first one above.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
