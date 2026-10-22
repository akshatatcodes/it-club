import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { CheckCircle2, Clock, Circle, ArrowRight, Building, Rocket, Star, Shield, Lightbulb } from 'lucide-react';

const referralTimeline = [
  { label: 'Project Completed', status: 'done', date: 'Sept 2026', description: 'AgriSense IoT project successfully deployed and evaluated by faculty.' },
  { label: 'Faculty Evaluation', status: 'done', date: 'Oct 5, 2026', description: 'Dr. Ramesh Kumar evaluates the project — marks it as exceptional with strong impact potential.' },
  { label: 'Proposal Prepared', status: 'done', date: 'Oct 12, 2026', description: 'Team prepares a 20-page incubation proposal with technical specs, market analysis, and financial projections.' },
  { label: 'Referral Submitted', status: 'done', date: 'Oct 15, 2026', description: 'Club Admin formally submits the referral package to Crieya Incubation Center.' },
  { label: 'Crieya Review', status: 'active', date: 'Oct 22, 2026', description: 'Crieya team independently reviews the proposal and conducts due diligence.' },
  { label: 'Incubation Decision', status: 'pending', date: 'TBD', description: 'Crieya communicates their final incubation decision to the team and the college.' },
];

const checklist = [
  { label: 'Project is marked as Completed on the platform', done: true },
  { label: 'Faculty mentor evaluation submitted', done: true },
  { label: 'Incubation proposal document prepared', done: true },
  { label: 'Market analysis included', done: true },
  { label: 'Financial projections (Year 1–3)', done: false },
  { label: 'Team commitment letters signed', done: false },
  { label: 'IP ownership clarified', done: false },
];

const eligibilityPoints = [
  'Project is fully completed and evaluated by a faculty mentor',
  'Project demonstrates clear real-world impact or commercial potential',
  'A dedicated team of at least 2 members is committed to continue',
  'Faculty mentor recommendation is on record',
  'Project has not been referred to another incubator previously',
];

const feedbackQuotes = [
  { name: 'Dr. Ramesh Kumar', role: 'Faculty Mentor', text: '"The AgriSense project demonstrates exactly the kind of practical innovation we want to encourage. The team has shown exceptional dedication and technical depth." — Evaluation Report, Oct 2026' },
  { name: 'Crieya Incubation', role: 'Initial Assessment', text: '"We are currently reviewing the AgriSense referral. The solution addresses a critical gap in precision agriculture for small-scale farmers in India." — Preliminary Feedback' },
];

export function IncubationPage() {
  return (
    <PublicLayout>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>

        {/* Demo Warning */}
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: '12px 20px', marginBottom: 32 }}>
          <p style={{ fontSize: 13, color: '#92400E', margin: 0, lineHeight: 1.6 }}>
            🎭 <strong>Demonstration Only.</strong> The incubation showcase below uses fictional sample data to illustrate how the proposed referral process would work. Crieya Incubation Center makes all incubation decisions independently. This demo does not represent a real referral or formal approval.
          </p>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ width: 70, height: 70, borderRadius: 20, background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#8B5CF6' }}>
            <Building size={34} />
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-text)', marginBottom: 12 }}>
            Crieya Incubation Corner
          </h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.65, maxWidth: 580, margin: '0 auto' }}>
            Exceptional student projects from the IT Club & Innovation Hub may be referred to the Crieya Incubation Center — where the best ideas get the support to become real companies.
          </p>
        </div>

        {/* What is Crieya */}
        <div className="card" style={{ padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', marginBottom: 14 }}>What is Crieya?</h2>
          <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            The <strong>Crieya Incubation Center</strong> is the college's startup and innovation incubator, providing selected student ventures with mentorship, funding access, legal support, workspace, and industry connections. The IT Club & Innovation Hub proposes a formal referral pathway from completed club projects to Crieya for incubation consideration.
          </p>
          <div style={{ background: '#F5F3FF', borderRadius: 10, padding: '14px 18px', marginTop: 16 }}>
            <p style={{ fontSize: 13, color: '#6D28D9', margin: 0 }}>
              <strong>Important:</strong> The IT Club can only <em>refer</em> projects to Crieya. The incubation decision — including acceptance criteria, timelines, and support structure — is made entirely by Crieya based on their own independent evaluation.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {/* Eligibility */}
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={18} style={{ color: 'var(--color-accent)' }} /> Proposed Eligibility
            </h2>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 12 }}>
              Projects may be considered for referral if they meet the following proposed criteria (subject to institutional confirmation):
            </p>
            {eligibilityPoints.map((pt, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: '1px solid var(--color-border)', alignItems: 'flex-start' }}>
                <CheckCircle2 size={15} style={{ color: '#22C55E', flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 13, color: 'var(--color-text)', lineHeight: 1.5 }}>{pt}</p>
              </div>
            ))}
          </div>

          {/* Referral Process */}
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Rocket size={18} style={{ color: 'var(--color-accent)' }} /> Referral Process
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['Project Completed → Faculty Evaluation', 'Proposal Prepared', 'Club Admin submits to Crieya', 'Crieya Independent Review', 'Final Decision'].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--color-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ fontSize: 13, color: 'var(--color-text)', lineHeight: 1.5, paddingTop: 3 }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demo: Sample Project Referral */}
        <div className="card" style={{ padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 12px', background: '#F5F3FF', borderRadius: 99, marginBottom: 8 }}>
                <Lightbulb size={12} style={{ color: '#8B5CF6' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#8B5CF6' }}>SAMPLE REFERRAL — DEMO DATA</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)' }}>AgriSense — Precision Farming IoT</h2>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>Led by Karan Singh · Mentored by Dr. Ramesh Kumar</p>
            </div>
            <span style={{ padding: '6px 14px', background: '#F5F3FF', color: '#8B5CF6', borderRadius: 99, fontSize: 13, fontWeight: 600 }}>Under Crieya Review</span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
            Low-cost LoRa sensor networks for small farmers to monitor soil health, moisture, and weather patterns in real-time. The system provides SMS-based alerts and recommendations with no smartphone required.
          </p>

          {/* Checklist */}
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Proposal Preparation Checklist</h3>
          {checklist.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--color-border)', alignItems: 'center' }}>
              {item.done
                ? <CheckCircle2 size={16} style={{ color: '#22C55E', flexShrink: 0 }} />
                : <Circle size={16} style={{ color: 'var(--color-border)', flexShrink: 0 }} />}
              <span style={{ fontSize: 13, color: item.done ? 'var(--color-text)' : 'var(--color-text-secondary)' }}>{item.label}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: item.done ? '#22C55E' : 'var(--color-text-secondary)' }}>
                {item.done ? 'Complete' : 'Pending'}
              </span>
            </div>
          ))}
        </div>

        {/* Referral Timeline */}
        <div className="card" style={{ padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Referral Status Timeline</h2>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 16, top: 0, bottom: 0, width: 2, background: 'var(--color-border)' }} />
            {referralTimeline.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, paddingBottom: 20, position: 'relative' }}>
                <div style={{ flexShrink: 0, zIndex: 1 }}>
                  {item.status === 'done' && <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle2 size={16} color="#fff" /></div>}
                  {item.status === 'active' && <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={16} color="#fff" /></div>}
                  {item.status === 'pending' && <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Circle size={16} color="#aaa" /></div>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>{item.label}</p>
                    <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{item.date}</span>
                    {item.status === 'active' && <span style={{ fontSize: 11, padding: '2px 8px', background: '#F5F3FF', color: '#8B5CF6', borderRadius: 99, fontWeight: 600 }}>In Progress</span>}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div className="card" style={{ padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Illustrative Feedback (Demo)</h2>
          {feedbackQuotes.map((q, i) => (
            <div key={i} style={{ padding: '16px', background: 'var(--color-bg)', borderRadius: 10, border: '1px solid var(--color-border)', marginBottom: 12 }}>
              <p style={{ fontSize: 14, color: 'var(--color-text)', lineHeight: 1.65, marginBottom: 10, fontStyle: 'italic' }}>
                {q.text}
              </p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>
                  {q.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{q.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{q.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>Start Your Innovation Journey</h2>
          <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
            Every great startup starts with a problem worth solving. Submit your idea today.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/ideas/submit">
              <button className="btn btn-primary" style={{ gap: 8 }}><Lightbulb size={15} /> Submit an Idea</button>
            </Link>
            <Link to="/workflow">
              <button className="btn btn-ghost" style={{ gap: 8 }}>View Workflow <ArrowRight size={14} /></button>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
