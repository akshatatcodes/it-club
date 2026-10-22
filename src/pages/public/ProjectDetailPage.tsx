import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { FormField } from '../../components/ui/FormField';
import { getProjectById } from '../../data/projects';
import { mockUsers, getUserById } from '../../data/users';
import { mockSessions } from '../../data/mock';
import { projectStatusConfig, formatDate, getInitials } from '../../utils';
import { useAppStore } from '../../hooks/useAppStore';
import { useDemoRole } from '../../hooks/useAppContext';
import { useToast } from '../../hooks/useAppContext';
import {
  ExternalLink, Users, Calendar, CheckCircle2, Circle, Clock,
  UserPlus, ChevronRight, Briefcase, Target, Layers, Code
} from 'lucide-react';
import type { ProjectApplication } from '../../types';
import { NotFoundPage } from '../NotFoundPage';

const milestones = [
  { id: 'm1', label: 'Project Charter', done: true, date: '2025-09-15' },
  { id: 'm2', label: 'Architecture Design', done: true, date: '2025-10-01' },
  { id: 'm3', label: 'Hardware Prototype v1', done: true, date: '2025-12-01' },
  { id: 'm4', label: 'Backend API Integration', done: true, date: '2026-02-15' },
  { id: 'm5', label: 'Dashboard UI', done: false, date: '2026-11-10' },
  { id: 'm6', label: 'Testing & QA', done: false, date: '2026-12-01' },
  { id: 'm7', label: 'Deployment & Handover', done: false, date: '2027-01-15' },
];

const techStack: Record<string, string[]> = {
  p1: ['Python', 'OpenCV', 'Raspberry Pi', 'RFID', 'React', 'FastAPI', 'PostgreSQL'],
  p2: ['React', 'FastAPI', 'LangChain', 'OpenAI API', 'PostgreSQL', 'Redis'],
  p3: ['React Native', 'Expo', 'Firebase', 'TypeScript', 'Node.js'],
  p4: ['Rust', 'WebAssembly', 'React', 'TypeScript', 'SQLite'],
  p5: ['Arduino', 'LoRa', 'Python', 'InfluxDB', 'Grafana'],
  p6: ['React', 'Node.js', 'PostgreSQL', 'PWA', 'IndexedDB'],
};

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id ?? '');
  const { currentUser } = useDemoRole();
  const { submitApplication, applications } = useAppStore();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [joinOpen, setJoinOpen] = useState(false);
  const [joinForm, setJoinForm] = useState({ message: '', skills: '' });
  const [submitting, setSubmitting] = useState(false);

  if (!project) return <NotFoundPage />;

  const lead = getUserById(project!.leadId);
  const mentor = project!.mentorId ? getUserById(project!.mentorId) : undefined;
  const members = project!.memberIds.map((m) => getUserById(m)).filter(Boolean);
  const stack = techStack[project!.id] ?? project!.tags;
  const cfg = projectStatusConfig[project!.status];

  const alreadyApplied = applications.some(
    (a) => a.projectId === project.id && a.applicantId === currentUser.id
  );
  const isMember = project.memberIds.includes(currentUser.id);

  function handleJoin() {
    if (!joinForm.message.trim()) {
      addToast('error', 'Please add a message', 'Tell the team why you want to join.');
      return;
    }
    const pid = project!.id;
    setSubmitting(true);
    setTimeout(() => {
      const app: ProjectApplication = {
        id: `app-${Date.now()}`,
        projectId: pid,
        applicantId: currentUser.id,
        message: joinForm.message,
        skills: joinForm.skills.split(',').map((s) => s.trim()).filter(Boolean),
        appliedAt: new Date().toISOString(),
        status: 'pending',
      };
      submitApplication(app);
      setSubmitting(false);
      setJoinOpen(false);
      addToast('success', 'Application Submitted!', 'The project lead will review your request shortly.');
      setJoinForm({ message: '', skills: '' });
    }, 800);
  }

  const completedMilestones = milestones.filter((m) => m.done).length;
  const progress = Math.round((completedMilestones / milestones.length) * 100);

  return (
    <PublicLayout>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 20 }}>
          <Link to="/projects" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Projects</Link>
          <ChevronRight size={14} />
          <span>{project.title}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Header */}
            <div className="card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
                <StatusBadge {...cfg} />
                <span className="badge" style={{ background: 'var(--color-bg)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                  {project.category}
                </span>
              </div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--color-text)', marginBottom: 12 }}>{project.title}</h1>
              <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                {project.longDescription ?? project.description}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {project.tags.map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
              {(project!.githubUrl || project!.demoUrl) && (
                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                  {project!.githubUrl && (
                    <a href={project!.githubUrl} target="_blank" rel="noopener noreferrer">
                      <button className="btn btn-sm btn-ghost" style={{ gap: 6 }}><Code size={14} /> GitHub</button>
                    </a>
                  )}
                  {project!.demoUrl && (
                    <a href={project!.demoUrl} target="_blank" rel="noopener noreferrer">
                      <button className="btn btn-sm btn-ghost" style={{ gap: 6 }}><ExternalLink size={14} /> Live Demo</button>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Problem & Solution */}
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Target size={18} style={{ color: 'var(--color-accent)' }} /> Problem & Solution
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: '#FEF2F2', borderRadius: 10, padding: 16, borderLeft: '3px solid #EF4444' }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#EF4444', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Problem</p>
                  <p style={{ fontSize: 13, color: 'var(--color-text)', lineHeight: 1.6 }}>
                    {project.id === 'p1' && 'Manual attendance is unreliable, time-consuming, and prone to proxy marking. Faculty spend up to 10 minutes per class on roll calls.'}
                    {project.id === 'p2' && 'Students struggle with one-size-fits-all study materials that don\'t adapt to their learning pace, gaps, or style.'}
                    {project.id === 'p3' && 'Campus information is scattered across WhatsApp groups, notice boards, and emails with no unified discovery channel.'}
                    {project.id === 'p4' && 'Students reuse weak passwords across accounts due to the complexity of managing secure credentials.'}
                    {project.id === 'p5' && 'Small-scale farmers lack affordable tools to monitor soil health, leading to overuse of water and fertilizers.'}
                    {project.id === 'p6' && 'Existing LMS platforms are expensive, internet-dependent, and lack support for Indian regional languages.'}
                  </p>
                </div>
                <div style={{ background: '#F0FDF4', borderRadius: 10, padding: 16, borderLeft: '3px solid #22C55E' }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#22C55E', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Solution</p>
                  <p style={{ fontSize: 13, color: 'var(--color-text)', lineHeight: 1.6 }}>
                    {project.id === 'p1' && 'IoT-based system using facial recognition + RFID for seamless, automated attendance with real-time ERP integration and parent alerts.'}
                    {project.id === 'p2' && 'LLM-powered conversational study assistant that generates personalized quizzes, explains concepts, and adapts to the student\'s curriculum.'}
                    {project.id === 'p3' && 'A unified mobile platform for club discovery, event registration, peer networking, and skill exchange marketplace.'}
                    {project.id === 'p4' && 'Open-source, end-to-end encrypted password manager with zero-knowledge architecture — your data is always yours.'}
                    {project.id === 'p5' && 'Low-cost LoRa sensor networks providing real-time soil analytics with actionable recommendations, all accessible via SMS.'}
                    {project.id === 'p6' && 'Open-source, offline-first LMS with PWA support, regional language UI, and lightweight enough for basic smartphones.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Layers size={18} style={{ color: 'var(--color-accent)' }} /> Technology Stack
              </h2>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: '6px 14px',
                      background: 'var(--color-primary)',
                      color: '#fff',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Briefcase size={18} style={{ color: 'var(--color-accent)' }} /> Milestones
                </h2>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-accent)' }}>{progress}% complete</span>
              </div>
              <div style={{ height: 6, background: 'var(--color-border)', borderRadius: 99, marginBottom: 20, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-accent)', borderRadius: 99, transition: 'width 0.5s ease' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {milestones.map((m) => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
                    {m.done
                      ? <CheckCircle2 size={18} style={{ color: '#22C55E', flexShrink: 0 }} />
                      : <Circle size={18} style={{ color: 'var(--color-border)', flexShrink: 0 }} />}
                    <span style={{ flex: 1, fontSize: 14, color: m.done ? 'var(--color-text)' : 'var(--color-text-secondary)', textDecoration: m.done ? 'none' : 'none', fontWeight: m.done ? 500 : 400 }}>
                      {m.label}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={11} /> {formatDate(m.date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* CTA */}
            {project.isOpenForApplications && !isMember && (
              <div className="card" style={{ padding: 20, background: 'var(--color-accent-light)', border: '1.5px solid var(--color-accent)' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-accent)', marginBottom: 6 }}>
                  🔓 Open for Applications
                </p>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 14 }}>
                  {project.applicationCount} application{project.applicationCount !== 1 ? 's' : ''} received so far.
                </p>
                {alreadyApplied ? (
                  <div style={{ padding: '10px 14px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 8, fontSize: 13, color: '#15803D', fontWeight: 500 }}>
                    ✅ You have already applied
                  </div>
                ) : (
                  <button className="btn btn-primary" style={{ width: '100%', gap: 8 }} onClick={() => setJoinOpen(true)}>
                    <UserPlus size={15} /> Request to Join
                  </button>
                )}
              </div>
            )}
            {isMember && (
              <div className="card" style={{ padding: 16 }}>
                <p style={{ fontSize: 13, color: '#22C55E', fontWeight: 600 }}>✅ You are a member of this project.</p>
              </div>
            )}

            {/* Team */}
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users size={16} style={{ color: 'var(--color-accent)' }} /> Team ({members.length})
              </h3>
              {members.map((user) => (
                user && (
                  <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: user.id === project.leadId ? 'var(--color-accent)' : 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text)' }}>{user.name}</p>
                      <p style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
                        {user.id === project.leadId ? '⭐ Project Lead' : user.department}
                      </p>
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* Mentor */}
            {mentor && (
              <div className="card" style={{ padding: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Faculty Mentor</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-success)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>
                    {getInitials(mentor.name)}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{mentor.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{mentor.department}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Info */}
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Details</h3>
              {[
                { label: 'Created', value: formatDate(project.createdAt) },
                { label: 'Last Updated', value: formatDate(project.updatedAt) },
                { label: 'Applications', value: `${project.applicationCount} total` },
                { label: 'Incubation', value: project.incubationReferred ? 'Referred to Crieya' : 'Not referred' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--color-border)', fontSize: 13 }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
                  <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Join Modal */}
      <Modal open={joinOpen} onClose={() => setJoinOpen(false)} title={`Join "${project.title}"`} size="md">
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 20 }}>
          Tell the project lead why you want to join and what skills you bring.
        </p>
        <FormField label="Why do you want to join this project?" required>
          <textarea
            value={joinForm.message}
            onChange={(e) => setJoinForm((f) => ({ ...f, message: e.target.value }))}
            rows={4}
            className="input"
            placeholder="Describe your motivation and relevant experience..."
            style={{ resize: 'vertical', minHeight: 100 }}
          />
        </FormField>
        <FormField label="Your relevant skills (comma-separated)">
          <input
            value={joinForm.skills}
            onChange={(e) => setJoinForm((f) => ({ ...f, skills: e.target.value }))}
            className="input"
            placeholder="e.g. React, Python, UI Design"
          />
        </FormField>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={() => setJoinOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleJoin} disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Application'}
          </button>
        </div>
      </Modal>
    </PublicLayout>
  );
}
