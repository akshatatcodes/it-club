import React, { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Modal } from '../../components/ui/Modal';
import { FormField } from '../../components/ui/FormField';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useAppStore } from '../../hooks/useAppStore';
import { useDemoRole } from '../../hooks/useAppContext';
import { useToast } from '../../hooks/useAppContext';
import { getUserById } from '../../data/users';
import { ideaStatusConfig, formatDate } from '../../utils';
import { CheckCircle2, XCircle, Clock, RotateCcw, Eye, ThumbsUp, Filter } from 'lucide-react';
import type { Idea, IdeaStatus } from '../../types';

const DECISIONS: { value: IdeaStatus; label: string; icon: React.ReactNode; color: string; desc: string }[] = [
  { value: 'approved', label: 'Approve', icon: <CheckCircle2 size={16} />, color: '#22C55E', desc: 'This idea is feasible and aligned with club goals. The student may proceed to team formation.' },
  { value: 'pending', label: 'Request Changes', icon: <RotateCcw size={16} />, color: '#F59E0B', desc: 'The idea has potential but needs revision. Your feedback will be sent to the student.' },
  { value: 'rejected', label: 'Reject', icon: <XCircle size={16} />, color: '#EF4444', desc: 'This idea is not suitable in its current form. Provide constructive feedback.' },
];

export function FacultyIdeasPage() {
  const { ideas, updateIdeaStatus } = useAppStore();
  const { currentUser } = useDemoRole();
  const { addToast } = useToast();

  const [selected, setSelected] = useState<Idea | null>(null);
  const [decision, setDecision] = useState<IdeaStatus>('approved');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusFilter, setStatusFilter] = useState<IdeaStatus | 'all'>('all');

  const reviewableIdeas = ideas.filter((i) => i.status === 'pending' || i.status === 'approved' || i.status === 'rejected');
  const filtered = statusFilter === 'all' ? reviewableIdeas : reviewableIdeas.filter((i) => i.status === statusFilter);

  const pendingCount = ideas.filter((i) => i.status === 'pending').length;

  function handleSubmitDecision() {
    if (!selected) return;
    if (!comment.trim()) {
      addToast('error', 'Review comment required', 'Please add a review note for the student.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      updateIdeaStatus(selected.id, decision, comment);
      setSubmitting(false);
      setSelected(null);
      setComment('');
      const decisionCfg = DECISIONS.find((d) => d.value === decision);
      addToast('success', `Idea ${decisionCfg?.label}d`, `Your decision has been recorded and the student will be notified.`);
    }, 800);
  }

  return (
    <DashboardLayout title="Idea Review Queue">
      <div style={{ maxWidth: 880 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text)', marginBottom: 4 }}>Idea Review Queue</h1>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
              {pendingCount} idea{pendingCount !== 1 ? 's' : ''} awaiting your review
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={14} style={{ color: 'var(--color-text-secondary)' }} />
            <select className="input" style={{ width: 160 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as IdeaStatus | 'all')}>
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Summary Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Pending Review', value: ideas.filter((i) => i.status === 'pending').length, color: '#F59E0B', bg: '#FFFBEB' },
            { label: 'Approved', value: ideas.filter((i) => i.status === 'approved' || i.status === 'converted').length, color: '#22C55E', bg: '#F0FDF4' },
            { label: 'Rejected', value: ideas.filter((i) => i.status === 'rejected').length, color: '#EF4444', bg: '#FEF2F2' },
          ].map((stat) => (
            <div key={stat.label} className="card" style={{ padding: '16px 20px', borderLeft: `4px solid ${stat.color}` }}>
              <p style={{ fontSize: 24, fontWeight: 800, color: stat.color }}>{stat.value}</p>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Ideas List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((idea) => {
            const submitter = getUserById(idea.submittedBy);
            const cfg = ideaStatusConfig[idea.status];
            return (
              <div key={idea.id} className="card" style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <StatusBadge {...cfg} />
                    <span className="badge">{idea.category}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-secondary)' }}>
                      <ThumbsUp size={11} /> {idea.votes} votes
                    </span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 6 }}>{idea.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.55, marginBottom: 10 }}>
                    {idea.description.slice(0, 160)}{idea.description.length > 160 ? '…' : ''}
                  </p>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    <span>By <strong style={{ color: 'var(--color-text)' }}>{submitter?.name ?? 'Unknown'}</strong></span>
                    <span>·</span>
                    <span>{formatDate(idea.submittedAt)}</span>
                    {idea.reviewNote && (
                      <>
                        <span>·</span>
                        <span style={{ color: '#F59E0B' }}>📝 Has review note</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => { setSelected(idea); setDecision('approved'); setComment(idea.reviewNote ?? ''); }}
                  style={{ gap: 6, flexShrink: 0 }}
                >
                  <Eye size={13} /> Review
                </button>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-secondary)' }}>
              No ideas match the current filter.
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Review Idea" size="lg">
        {selected && (
          <>
            <div style={{ background: 'var(--color-bg)', borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>{selected.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{selected.description}</p>
              <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12, color: 'var(--color-text-secondary)' }}>
                <span>By: <strong>{getUserById(selected.submittedBy)?.name}</strong></span>
                <span>Category: <strong>{selected.category}</strong></span>
                <span>Votes: <strong>{selected.votes}</strong></span>
              </div>
            </div>

            {/* Decision Buttons */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 10 }}>Your Decision</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {DECISIONS.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setDecision(d.value)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: `2px solid ${decision === d.value ? d.color : 'var(--color-border)'}`,
                      background: decision === d.value ? `${d.color}18` : 'transparent',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      color: decision === d.value ? d.color : 'var(--color-text)',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span style={{ color: d.color }}>{d.icon}</span>
                    {d.label}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 10, padding: '10px 14px', background: 'var(--color-bg)', borderRadius: 8, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                {DECISIONS.find((d) => d.value === decision)?.desc}
              </div>
            </div>

            <FormField label="Review Comment" required hint="Your feedback will be visible to the student.">
              <textarea
                className="input"
                rows={4}
                placeholder="Provide constructive feedback about this idea..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </FormField>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmitDecision} disabled={submitting || !comment.trim()}>
                {submitting ? 'Submitting…' : 'Submit Decision'}
              </button>
            </div>
          </>
        )}
      </Modal>
    </DashboardLayout>
  );
}
