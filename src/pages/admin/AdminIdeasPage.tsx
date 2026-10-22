import React, { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { mockIdeas } from '../../data/mock';
import { ideaStatusConfig, timeAgo } from '../../utils';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getUserById } from '../../data/users';
import { ThumbsUp, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '../../hooks/useAppContext';

export function AdminIdeasPage() {
  const { addToast } = useToast();
  const [ideas, setIdeas] = useState(mockIdeas);

  function handleApprove(id: string) {
    setIdeas((prev) => prev.map((i) => i.id === id ? { ...i, status: 'approved' as const } : i));
    addToast('success', 'Idea Approved');
  }
  function handleReject(id: string) {
    setIdeas((prev) => prev.map((i) => i.id === id ? { ...i, status: 'rejected' as const } : i));
    addToast('warning', 'Idea Rejected');
  }

  return (
    <DashboardLayout title="Ideas">
      <PageHeader title="Idea Management" subtitle={`${ideas.length} total ideas.`} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ideas.map((idea) => {
          const author = getUserById(idea.submittedBy);
          const cfg = ideaStatusConfig[idea.status];
          return (
            <div key={idea.id} className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600 }}>{idea.title}</h3>
                <StatusBadge {...cfg} size="sm" />
              </div>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 12 }}>{idea.description}</p>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: idea.status === 'pending' ? 14 : 0 }}>
                <span>By {author?.name ?? 'Unknown'}</span>
                <span>{timeAgo(idea.submittedAt)}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><ThumbsUp size={12} /> {idea.votes}</span>
              </div>
              {idea.status === 'pending' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-sm" style={{ background: '#F0FDF4', color: 'var(--color-success)', border: '1px solid #BBF7D0', gap: 6 }} onClick={() => handleApprove(idea.id)}>
                    <CheckCircle size={13} /> Approve
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleReject(idea.id)}>
                    <XCircle size={13} /> Reject
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
