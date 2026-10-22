import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { FilterBar } from '../../components/ui/FilterBar';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ideaStatusConfig, timeAgo, getInitials } from '../../utils';
import { getUserById } from '../../data/users';
import { ThumbsUp, Lightbulb, Plus } from 'lucide-react';
import { useDemoRole } from '../../hooks/useAppContext';
import { useToast } from '../../hooks/useAppContext';
import { useAppStore } from '../../hooks/useAppStore';

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'converted', label: 'Converted' },
];

export function IdeasPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const { currentUser } = useDemoRole();
  const { addToast } = useToast();
  const { ideas, voteIdea } = useAppStore();

  const filtered = ideas.filter(
    (i) => statusFilter === 'all' || i.status === statusFilter
  );

  const sortedFiltered = [...filtered].sort((a, b) => b.votes - a.votes);

  function handleVote(id: string) {
    voteIdea(id, currentUser.id);
    const idea = ideas.find((i) => i.id === id);
    const hasVoted = idea?.votedBy.includes(currentUser.id);
    addToast(hasVoted ? 'info' : 'success', hasVoted ? 'Vote removed' : 'Upvoted!', hasVoted ? '' : 'Your vote has been recorded.');
  }

  return (
    <PublicLayout>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          <PageHeader
            title="Ideas Board"
            subtitle="Browse community ideas, upvote your favourites, and see which ones become real projects."
          />
          <Link to="/ideas/submit">
            <button className="btn btn-primary" style={{ gap: 6 }}>
              <Plus size={15} /> Submit an Idea
            </button>
          </Link>
        </div>

        <FilterBar options={statusOptions} selected={statusFilter} onChange={setStatusFilter} />

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sortedFiltered.length > 0 ? (
            sortedFiltered.map((idea) => {
              const author = getUserById(idea.submittedBy);
              const cfg = ideaStatusConfig[idea.status];

              return (
                <div key={idea.id} className="card" style={{ padding: 20, display: 'flex', gap: 16 }}>
                  {/* Vote */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    <button
                      onClick={() => handleVote(idea.id)}
                      aria-label={idea.votedBy.includes(currentUser.id) ? 'Remove vote' : 'Upvote idea'}
                      style={{
                        background: idea.votedBy.includes(currentUser.id) ? 'var(--color-accent-light)' : 'var(--color-bg)',
                        border: `1px solid ${idea.votedBy.includes(currentUser.id) ? 'var(--color-accent)' : 'var(--color-border)'}`,
                        borderRadius: 8,
                        padding: '8px 10px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        color: idea.votedBy.includes(currentUser.id) ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                        transition: 'all 0.15s ease',
                        minWidth: 44,
                      }}
                    >
                      <ThumbsUp size={16} />
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{idea.votes}</span>
                    </button>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)' }}>
                        {idea.title}
                      </h3>
                      <StatusBadge {...cfg} size="sm" />
                    </div>

                    <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>
                      {idea.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: 'var(--color-text-secondary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: 'var(--color-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 9,
                            fontWeight: 700,
                            color: '#fff',
                          }}
                        >
                          {author ? getInitials(author.name) : '?'}
                        </div>
                        {author?.name ?? 'Unknown'}
                      </span>
                      <span>{timeAgo(idea.submittedAt)}</span>
                      <span
                        style={{
                          background: 'var(--color-bg)',
                          border: '1px solid var(--color-border)',
                          padding: '1px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                        }}
                      >
                        {idea.category}
                      </span>
                    </div>

                    {idea.reviewNote && (
                      <div
                        style={{
                          marginTop: 10,
                          padding: '8px 12px',
                          background: idea.status === 'rejected' ? '#FEF2F2' : 'var(--color-accent-light)',
                          borderRadius: 6,
                          fontSize: 13,
                          color: idea.status === 'rejected' ? 'var(--color-error)' : 'var(--color-accent)',
                          borderLeft: `3px solid ${idea.status === 'rejected' ? 'var(--color-error)' : 'var(--color-accent)'}`,
                        }}
                      >
                        <strong>Reviewer note:</strong> {idea.reviewNote}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState
              icon={<Lightbulb size={24} />}
              title="No ideas found"
              description="Be the first to submit an idea!"
            />
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
