import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { useAppStore } from '../../hooks/useAppStore';
import { useDemoRole } from '../../hooks/useAppContext';
import { ideaStatusConfig, formatDate } from '../../utils';
import { Lightbulb, Plus, ThumbsUp, ArrowRight } from 'lucide-react';

export function StudentIdeasPage() {
  const { currentUser } = useDemoRole();
  const { ideas } = useAppStore();

  const myIdeas = ideas.filter((i) => i.submittedBy === currentUser.id);

  const statusSummary = {
    pending: myIdeas.filter((i) => i.status === 'pending').length,
    approved: myIdeas.filter((i) => i.status === 'approved' || i.status === 'converted').length,
    rejected: myIdeas.filter((i) => i.status === 'rejected').length,
  };

  return (
    <DashboardLayout title="My Ideas">
      <div style={{ maxWidth: 760 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text)', marginBottom: 4 }}>My Ideas</h1>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
              Track ideas you've submitted for faculty review.
            </p>
          </div>
          <Link to="/ideas/submit">
            <button className="btn btn-primary" style={{ gap: 6 }}>
              <Plus size={15} /> Submit New Idea
            </button>
          </Link>
        </div>

        {/* Summary */}
        {myIdeas.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
            {[
              { label: 'Pending Review', count: statusSummary.pending, color: '#F59E0B', bg: '#FFFBEB' },
              { label: 'Approved', count: statusSummary.approved, color: '#22C55E', bg: '#F0FDF4' },
              { label: 'Rejected', count: statusSummary.rejected, color: '#EF4444', bg: '#FEF2F2' },
            ].map((s) => (
              <div key={s.label} className="card" style={{ padding: '14px 18px', borderLeft: `4px solid ${s.color}` }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.count}</p>
                <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Ideas List */}
        {myIdeas.length === 0 ? (
          <EmptyState
            icon={<Lightbulb size={28} />}
            title="No ideas submitted yet"
            description="Have a great idea? Share it with the club and get faculty feedback."
            action={
              <Link to="/ideas/submit">
                <button className="btn btn-primary" style={{ gap: 6 }}>
                  <Plus size={15} /> Submit Your First Idea
                </button>
              </Link>
            }
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myIdeas.map((idea) => {
              const cfg = ideaStatusConfig[idea.status];
              return (
                <div key={idea.id} className="card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <StatusBadge {...cfg} />
                    <span className="badge">{idea.category}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-secondary)' }}>
                      <ThumbsUp size={11} /> {idea.votes} votes
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginLeft: 'auto' }}>
                      {formatDate(idea.submittedAt)}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 6 }}>{idea.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    {idea.description.slice(0, 160)}{idea.description.length > 160 ? '…' : ''}
                  </p>
                  {idea.reviewNote && (
                    <div style={{
                      marginTop: 12,
                      padding: '10px 14px',
                      background: idea.status === 'rejected' ? '#FEF2F2' : 'var(--color-accent-light)',
                      borderRadius: 8,
                      borderLeft: `3px solid ${idea.status === 'rejected' ? '#EF4444' : 'var(--color-accent)'}`,
                    }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: idea.status === 'rejected' ? '#DC2626' : 'var(--color-accent)', marginBottom: 4 }}>
                        Faculty Feedback
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--color-text)', lineHeight: 1.5 }}>{idea.reviewNote}</p>
                    </div>
                  )}
                  {idea.status === 'approved' && (
                    <div style={{ marginTop: 12 }}>
                      <Link to="/student/teammates">
                        <button className="btn btn-sm btn-primary" style={{ gap: 6 }}>
                          Find Teammates <ArrowRight size={13} />
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Browse All Ideas */}
        <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>See what other students are building</p>
          <Link to="/ideas">
            <button className="btn btn-ghost btn-sm" style={{ gap: 6 }}>Browse All Ideas <ArrowRight size={13} /></button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
