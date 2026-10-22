import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Modal } from '../../components/ui/Modal';
import { FormField } from '../../components/ui/FormField';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { mockEvents } from '../../data/mock';
import { eventTypeConfig, formatDateTime, getDaysUntil, getInitials } from '../../utils';
import { useAppStore } from '../../hooks/useAppStore';
import { useDemoRole } from '../../hooks/useAppContext';
import { useToast } from '../../hooks/useAppContext';
import { NotFoundPage } from '../NotFoundPage';
import {
  Calendar, MapPin, Users, Clock, ChevronRight, Globe, Wifi,
  CheckCircle2, UserPlus
} from 'lucide-react';
import { getUserById } from '../../data/users';

const eventAgendas: Record<string, { time: string; title: string; speaker?: string }[]> = {
  e1: [
    { time: '9:00 AM', title: 'Inauguration & Team Registration' },
    { time: '10:00 AM', title: 'Problem Statement Reveal' },
    { time: '10:30 AM', title: 'Hacking Begins!' },
    { time: '1:00 PM', title: 'Lunch & Networking' },
    { time: '6:00 PM', title: 'Mid-point Check-in by Mentors' },
    { time: 'Day 2 9:00 AM', title: 'Final Submissions' },
    { time: 'Day 2 12:00 PM', title: 'Project Demos & Judging' },
    { time: 'Day 2 3:00 PM', title: 'Closing Ceremony & Prize Distribution' },
  ],
  e2: [
    { time: '2:00 PM', title: 'Introduction to Blockchain & Solidity', speaker: 'Prof. Anil Kumar' },
    { time: '2:45 PM', title: 'Writing Your First Smart Contract' },
    { time: '3:30 PM', title: 'Deploying to Testnet — Live Demo' },
    { time: '4:15 PM', title: 'DeFi Concepts & DApp Architecture', speaker: 'Rahul Mehta, Polygon' },
    { time: '5:00 PM', title: 'Q&A and Resources' },
  ],
  e3: [
    { time: '4:00 PM', title: 'Welcome & Introduction' },
    { time: '4:10 PM', title: 'Career Paths in AI: Research vs. Engineering', speaker: 'Dr. Ananya Rao, Google DeepMind' },
    { time: '5:00 PM', title: 'Live Q&A Session' },
    { time: '5:45 PM', title: 'Portfolio Review & Resource Sharing' },
  ],
  e4: [
    { time: '10:00 AM', title: 'Welcome & GitHub Workflow Refresher' },
    { time: '10:30 AM', title: 'Open Contribution Sessions Begin' },
    { time: '1:00 PM', title: 'Lunch Break' },
    { time: '2:00 PM', title: 'Afternoon Contribution Sessions' },
    { time: '4:30 PM', title: 'Demo of Contributions + Wrap-up' },
  ],
};

export function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const event = mockEvents.find((e) => e.id === id);
  const { registeredEventIds, registerEvent, unregisterEvent } = useAppStore();
  const { currentUser } = useDemoRole();
  const { addToast } = useToast();

  const [regOpen, setRegOpen] = useState(false);
  const [regForm, setRegForm] = useState({ name: currentUser.name, email: currentUser.email, dietary: '' });
  const [submitting, setSubmitting] = useState(false);

  if (!event) return <NotFoundPage />;

  const cfg = eventTypeConfig[event.type];
  const daysUntil = getDaysUntil(event.startDate);
  const isPast = daysUntil < 0;
  const isRegistered = registeredEventIds.has(event.id);
  const spotsLeft = event.maxCapacity ? event.maxCapacity - event.registeredIds.length : null;
  const agenda = eventAgendas[event.id] ?? [];
  const organizer = getUserById(event.organizerId);

  function handleRegister() {
    setSubmitting(true);
    setTimeout(() => {
      registerEvent(event!.id);
      setSubmitting(false);
      setRegOpen(false);
      addToast('success', 'Registered!', `You are now registered for ${event!.title}.`);
    }, 800);
  }

  function handleUnregister() {
    unregisterEvent(event!.id);
    addToast('info', 'Unregistered', `You have been removed from ${event!.title}.`);
  }

  return (
    <PublicLayout>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
          <Link to="/events" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Events</Link>
          <ChevronRight size={14} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Header */}
            <div className="card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
                <StatusBadge label={cfg.label} color={cfg.color} bg={cfg.bg} />
                {isPast && <StatusBadge label="Past Event" color="#667085" bg="#F2F4F7" />}
                {!isPast && daysUntil <= 7 && <StatusBadge label={`${daysUntil}d to go`} color="#EF4444" bg="#FEF2F2" />}
                {event.isOnline && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-accent)', background: 'var(--color-accent-light)', padding: '3px 10px', borderRadius: 99 }}>
                    <Wifi size={11} /> Online
                  </span>
                )}
              </div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--color-text)', marginBottom: 12 }}>{event.title}</h1>
              <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{event.description}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                {event.tags.map((t) => <span key={t} className="badge">{t}</span>)}
              </div>
            </div>

            {/* Agenda */}
            {agenda.length > 0 && (
              <div className="card" style={{ padding: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Calendar size={18} style={{ color: 'var(--color-accent)' }} /> Agenda
                </h2>
                {agenda.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: '1px solid var(--color-border)', alignItems: 'flex-start' }}>
                    <div style={{ minWidth: 90, fontSize: 12, fontWeight: 600, color: 'var(--color-accent)', paddingTop: 2 }}>{item.time}</div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)' }}>{item.title}</p>
                      {item.speaker && <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>👤 {item.speaker}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Registration CTA */}
            <div className="card" style={{ padding: 20 }}>
              {isRegistered ? (
                <>
                  <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '12px 16px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle2 size={18} style={{ color: '#22C55E' }} />
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#15803D' }}>You're registered!</p>
                  </div>
                  {!isPast && (
                    <button className="btn btn-ghost btn-sm" style={{ width: '100%', color: 'var(--color-error)' }} onClick={handleUnregister}>
                      Cancel Registration
                    </button>
                  )}
                </>
              ) : isPast ? (
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', textAlign: 'center' }}>This event has ended.</p>
              ) : (
                <>
                  {spotsLeft !== null && spotsLeft < 20 && spotsLeft > 0 && (
                    <p style={{ fontSize: 12, color: '#EF4444', fontWeight: 600, marginBottom: 10 }}>⚠️ Only {spotsLeft} spots remaining!</p>
                  )}
                  <button className="btn btn-primary" style={{ width: '100%', gap: 8 }} onClick={() => setRegOpen(true)}>
                    <UserPlus size={15} /> Register Now
                  </button>
                </>
              )}
            </div>

            {/* Event Details */}
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Event Details</h3>
              {[
                { icon: <Calendar size={15} />, label: formatDateTime(event.startDate) },
                { icon: <Clock size={15} />, label: `Until ${formatDateTime(event.endDate)}` },
                { icon: event.isOnline ? <Globe size={15} /> : <MapPin size={15} />, label: event.location },
                { icon: <Users size={15} />, label: `${event.registeredIds.length}${event.maxCapacity ? `/${event.maxCapacity}` : '+'} registered` },
              ].map(({ icon, label }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--color-border)', fontSize: 13, color: 'var(--color-text)' }}>
                  <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>{icon}</span>
                  {label}
                </div>
              ))}
              {event.registrationDeadline && (
                <div style={{ marginTop: 12, padding: '10px 14px', background: '#FFFBEB', borderRadius: 8, fontSize: 13, color: '#92400E' }}>
                  📅 Registration closes: <strong>{formatDateTime(event.registrationDeadline)}</strong>
                </div>
              )}
            </div>

            {/* Organizer */}
            {organizer && (
              <div className="card" style={{ padding: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Organized by</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                    {getInitials(organizer.name)}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{organizer.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{organizer.department}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <Modal open={regOpen} onClose={() => setRegOpen(false)} title={`Register for ${event.title}`} size="sm">
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 20 }}>
          Confirm your details to register for this event. You'll receive a reminder notification.
        </p>
        <FormField label="Full Name">
          <input className="input" value={regForm.name} onChange={(e) => setRegForm((f) => ({ ...f, name: e.target.value }))} />
        </FormField>
        <FormField label="Email">
          <input className="input" value={regForm.email} onChange={(e) => setRegForm((f) => ({ ...f, email: e.target.value }))} type="email" />
        </FormField>
        {!event.isOnline && (
          <FormField label="Dietary preference (optional)">
            <input className="input" value={regForm.dietary} onChange={(e) => setRegForm((f) => ({ ...f, dietary: e.target.value }))} placeholder="e.g. Vegetarian, No restrictions" />
          </FormField>
        )}
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={() => setRegOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleRegister} disabled={submitting}>
            {submitting ? 'Registering…' : 'Confirm Registration'}
          </button>
        </div>
      </Modal>
    </PublicLayout>
  );
}
