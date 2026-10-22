import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { getProjectById } from '../../data/projects';
import { mockUsers, getUserById } from '../../data/users';
import { useDemoRole } from '../../hooks/useAppContext';
import { getInitials, formatDateTime } from '../../utils';
import { Send, Pin, Users, Hash } from 'lucide-react';
import type { ChatMessage } from '../../types';

const initialMessages: ChatMessage[] = [
  { id: 'c1', projectId: 'p1', senderId: 'u2', content: 'Hey team! I just pushed the RFID integration to the dev branch. Can someone review?', sentAt: '2026-10-22T08:15:00', readBy: ['u1', 'u7'] },
  { id: 'c2', projectId: 'p1', senderId: 'u7', content: 'On it! Will take a look after my morning class 🙌', sentAt: '2026-10-22T08:32:00', readBy: ['u1', 'u2'] },
  { id: 'c3', projectId: 'p1', senderId: 'u1', content: 'Reviewed and merged. Great work Priya! The RFID is reading cards consistently now.', sentAt: '2026-10-22T10:00:00', readBy: ['u2', 'u7'] },
  { id: 'c4', projectId: 'p1', senderId: 'u2', content: 'Thanks! Next up: connecting it to the backend API. ETA end of week.', sentAt: '2026-10-22T10:05:00', readBy: ['u1'] },
  { id: 'c5', projectId: 'p1', senderId: 'u7', content: 'Dashboard UI is 60% done. Should be ready for the demo on Friday.', sentAt: '2026-10-22T11:30:00', readBy: ['u1', 'u2'] },
  { id: 'c6', projectId: 'p1', senderId: 'u1', content: 'Perfect. Mentor session is tomorrow at 3 PM. Please prepare your progress slides.', sentAt: '2026-10-22T12:00:00', readBy: ['u2', 'u7'] },
];

const pinnedMessage = '📌 Next mentor session: Oct 25, 3:00 PM. Join via Google Meet. Prepare progress updates!';

export function StudentChatPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const pid = projectId ?? 'p1';
  const project = getProjectById(pid);
  const { currentUser } = useDemoRole();

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages.filter((m) => m.projectId === 'p1'));
  const [input, setInput] = useState('');
  const [showMembers, setShowMembers] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    const msg: ChatMessage = {
      id: `c-${Date.now()}`,
      projectId: pid,
      senderId: currentUser.id,
      content: text,
      sentAt: new Date().toISOString(),
      readBy: [],
    };
    setMessages((prev) => [...prev, msg]);
    setInput('');
  }

  const members = project ? project.memberIds.map((id) => getUserById(id)).filter(Boolean) : [];

  return (
    <DashboardLayout title="Project Chat">
      <div style={{ display: 'flex', gap: 20, height: 'calc(100vh - 160px)', alignItems: 'stretch' }}>
        {/* Chat Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 14, overflow: 'hidden' }}>
          {/* Chat Header */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Hash size={18} color="#fff" />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)' }}>{project?.title ?? 'Project Chat'}</p>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{members.length} members</p>
            </div>
            <button
              onClick={() => setShowMembers((p) => !p)}
              className="btn btn-ghost btn-sm"
              style={{ marginLeft: 'auto', gap: 6 }}
            >
              <Users size={14} /> Members
            </button>
          </div>

          {/* Pinned Message */}
          <div style={{ padding: '8px 20px', background: '#FFFBEB', borderBottom: '1px solid #FDE68A', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Pin size={13} style={{ color: '#F59E0B', flexShrink: 0 }} />
            <p style={{ fontSize: 12, color: '#92400E' }}>{pinnedMessage}</p>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages.map((msg, i) => {
              const sender = getUserById(msg.senderId);
              const isMe = msg.senderId === currentUser.id;
              const prevMsg = messages[i - 1];
              const showSender = !prevMsg || prevMsg.senderId !== msg.senderId;

              return (
                <div key={msg.id} style={{ display: 'flex', gap: 10, flexDirection: isMe ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                  {!isMe && showSender && (
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                      {sender ? getInitials(sender.name) : '?'}
                    </div>
                  )}
                  {!isMe && !showSender && <div style={{ width: 30, flexShrink: 0 }} />}
                  <div style={{ maxWidth: '65%' }}>
                    {showSender && !isMe && (
                      <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
                        {sender?.name ?? 'Unknown'}
                      </p>
                    )}
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: isMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                      background: isMe ? 'var(--color-primary)' : 'var(--color-bg)',
                      border: isMe ? 'none' : '1px solid var(--color-border)',
                      color: isMe ? '#fff' : 'var(--color-text)',
                      fontSize: 14,
                      lineHeight: 1.55,
                    }}>
                      {msg.content}
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 4, textAlign: isMe ? 'right' : 'left' }}>
                      {new Date(msg.sentAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 10 }}>
            <input
              className="input"
              style={{ flex: 1 }}
              placeholder="Type a message… (press Enter to send)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            />
            <button
              className="btn btn-primary"
              onClick={handleSend}
              disabled={!input.trim()}
              style={{ gap: 6, flexShrink: 0 }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>

        {/* Members Panel */}
        {showMembers && (
          <div style={{ width: 220, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: 16, flexShrink: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 14 }}>Members</p>
            {members.map((user) => (
              user && (
                <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: user.id === project?.leadId ? 'var(--color-accent)' : 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>
                    {getInitials(user.name)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</p>
                    <p style={{ fontSize: 11, color: user.id === project?.leadId ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}>
                      {user.id === project?.leadId ? 'Lead' : user.role}
                    </p>
                  </div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', marginLeft: 'auto', flexShrink: 0 }} />
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
