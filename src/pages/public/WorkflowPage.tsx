import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { CheckCircle2, Circle, ArrowRight, Lightbulb, Users, Code2, Star, Rocket, Building } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: <Lightbulb size={22} />,
    color: '#F59E0B',
    bg: '#FFFBEB',
    title: 'Idea Submission',
    description: 'A student submits an idea through the platform, describing the problem, proposed solution, target users, and required skills. The idea becomes publicly visible for community voting.',
    sampleProject: 'Arjun submits "Smart Campus Parking System" — a mobile-based parking slot finder for the college campus.',
    status: 'Submitted',
    statusColor: '#3678B7',
    actor: 'Student',
  },
  {
    id: 2,
    icon: <Star size={22} />,
    color: '#8B5CF6',
    bg: '#F5F3FF',
    title: 'Community Voting',
    description: 'All club members can browse and upvote ideas. High-voted ideas are surfaced to faculty for faster review. Ideas must cross a minimum threshold of 10 votes.',
    sampleProject: 'The parking idea receives 28 upvotes from fellow students within a week.',
    status: 'Voted',
    statusColor: '#8B5CF6',
    actor: 'Community',
  },
  {
    id: 3,
    icon: <CheckCircle2 size={22} />,
    color: '#22C55E',
    bg: '#F0FDF4',
    title: 'Faculty Review',
    description: 'A faculty mentor reviews the idea, assesses feasibility, originality, and alignment with college goals. They can Approve, Request Changes, or Reject with feedback.',
    sampleProject: 'Dr. Meena Iyer reviews the idea and approves it with a note: "Strong problem statement. Ensure CCTV privacy compliance."',
    status: 'Approved',
    statusColor: '#22C55E',
    actor: 'Faculty',
  },
  {
    id: 4,
    icon: <Users size={22} />,
    color: '#3678B7',
    bg: '#EFF6FF',
    title: 'Team Formation',
    description: 'The approved idea is listed as an open project. The original submitter becomes the project lead and can accept applications from other students to form their team.',
    sampleProject: 'Arjun\'s project opens for applications. Priya (UI Design) and Karan (Backend) join the team.',
    status: 'Team Formed',
    statusColor: '#3678B7',
    actor: 'Student',
  },
  {
    id: 5,
    icon: <Code2 size={22} />,
    color: '#17365D',
    bg: '#EFF6FF',
    title: 'Project Planning',
    description: 'The team prepares a project charter with milestones, technology stack, and division of responsibilities. The faculty mentor reviews and approves the plan.',
    sampleProject: 'Team creates a 6-month plan: Prototype → Backend → App → Testing → Deployment. Mentor approves.',
    status: 'Planned',
    statusColor: '#17365D',
    actor: 'Team + Faculty',
  },
  {
    id: 6,
    icon: <Code2 size={22} />,
    color: '#3678B7',
    bg: '#EFF6FF',
    title: 'Active Development',
    description: 'The team works on the project with regular mentor sessions. Progress is tracked through milestones on the platform. Tasks are assigned and updated in real-time.',
    sampleProject: 'Team completes prototype and backend over 3 months. Regular sessions with Dr. Iyer every 2 weeks.',
    status: 'In Progress',
    statusColor: '#3678B7',
    actor: 'Team',
  },
  {
    id: 7,
    icon: <CheckCircle2 size={22} />,
    color: '#22C55E',
    bg: '#F0FDF4',
    title: 'Faculty Evaluation',
    description: 'On project completion, the faculty mentor evaluates the final deliverables against the original plan and sets a completion verdict with detailed feedback.',
    sampleProject: 'Dr. Iyer evaluates: "Fully functional, exceeds scope. Strong technical implementation." — Marked Completed.',
    status: 'Completed',
    statusColor: '#22C55E',
    actor: 'Faculty',
  },
  {
    id: 8,
    icon: <Rocket size={22} />,
    color: '#EF4444',
    bg: '#FEF2F2',
    title: 'Incubation Referral',
    description: 'Exceptional projects that demonstrate real-world impact may be referred to the Crieya Incubation Center by the faculty mentor. This referral is not guaranteed and is at faculty discretion.',
    sampleProject: 'Based on the project\'s quality and market potential, Dr. Iyer nominates it for a Crieya referral.',
    status: 'Referred',
    statusColor: '#EF4444',
    actor: 'Faculty',
    note: 'Referral does not guarantee incubation. Crieya makes its own independent decision.',
  },
  {
    id: 9,
    icon: <Building size={22} />,
    color: '#8B5CF6',
    bg: '#F5F3FF',
    title: 'Crieya Independent Review',
    description: 'The Crieya Incubation Center independently evaluates the referred project based on their own criteria — innovation, scalability, and market fit. This is entirely separate from the club process.',
    sampleProject: 'Crieya evaluates the Smart Parking System against their incubation criteria.',
    status: 'Under Review',
    statusColor: '#8B5CF6',
    actor: 'Crieya',
    note: 'The IT Club & Innovation Hub facilitates the referral. The incubation decision belongs solely to Crieya.',
  },
  {
    id: 10,
    icon: <Star size={22} />,
    color: '#F59E0B',
    bg: '#FFFBEB',
    title: 'Incubation Decision',
    description: 'Crieya communicates their decision. An accepted project receives incubation support — mentorship, funding access, legal aid, and market development resources.',
    sampleProject: 'Crieya accepts the project: "Smart Parking System has clear commercial viability and a strong team."',
    status: 'Accepted',
    statusColor: '#F59E0B',
    actor: 'Crieya',
    note: 'The outcome shown here is illustrative. Actual decisions depend on Crieya\'s independent evaluation.',
  },
];

export function WorkflowPage() {
  return (
    <PublicLayout>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 14px', background: 'var(--color-accent-light)', borderRadius: 99, marginBottom: 16 }}>
            <Lightbulb size={13} style={{ color: 'var(--color-accent)' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent)' }}>Proposed Process</span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-text)', marginBottom: 12 }}>Idea to Innovation — The Complete Workflow</h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.65, maxWidth: 600, margin: '0 auto' }}>
            From the spark of an idea to potential incubation, here is how the IT Club & Innovation Hub proposes to support student projects through every stage.
          </p>
          <div style={{ marginTop: 16, padding: '10px 20px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 10, display: 'inline-block', maxWidth: 600 }}>
            <p style={{ fontSize: 13, color: '#92400E', margin: 0 }}>
              ⚠️ <strong>Note:</strong> This workflow is a proposed framework for the platform demo. Formal adoption is subject to institutional approval.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 28, top: 0, bottom: 0, width: 2, background: 'var(--color-border)', zIndex: 0 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((step, i) => (
              <div key={step.id} style={{ display: 'flex', gap: 20, paddingBottom: 32, position: 'relative', zIndex: 1 }}>
                {/* Icon node */}
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'var(--color-surface)',
                    border: `3px solid ${step.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: step.color,
                    boxShadow: '0 0 0 4px var(--color-bg)',
                  }}>
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)' }}>STEP {step.id}</span>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', flex: 1 }}>{step.title}</h2>
                    <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 99, background: `${step.statusColor}18`, color: step.statusColor, fontWeight: 600 }}>
                      {step.status}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', padding: '2px 8px', borderRadius: 6 }}>
                      {step.actor}
                    </span>
                  </div>

                  <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: 12 }}>
                    {step.description}
                  </p>

                  {/* Sample */}
                  <div style={{ background: step.bg, border: `1px solid ${step.color}33`, borderRadius: 10, padding: '10px 14px', marginBottom: step.note ? 10 : 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: step.color, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sample</p>
                    <p style={{ fontSize: 13, color: 'var(--color-text)', lineHeight: 1.55 }}>{step.sampleProject}</p>
                  </div>

                  {step.note && (
                    <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '8px 12px', marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: '#92400E', margin: 0 }}>📋 {step.note}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--color-primary)', borderRadius: 16, padding: 32, textAlign: 'center', marginTop: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Ready to Start Your Journey?</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', marginBottom: 24 }}>
            Submit your idea today and take the first step toward building something impactful.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/ideas/submit">
              <button className="btn" style={{ background: '#fff', color: 'var(--color-primary)', border: 'none', padding: '10px 24px', gap: 8, fontWeight: 600 }}>
                <Lightbulb size={16} /> Submit an Idea
              </button>
            </Link>
            <Link to="/incubation">
              <button className="btn btn-ghost" style={{ color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.3)', gap: 8 }}>
                Learn About Incubation <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
