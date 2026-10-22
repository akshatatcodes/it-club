import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { FormField } from '../../components/ui/FormField';
import { useAppStore } from '../../hooks/useAppStore';
import { useDemoRole } from '../../hooks/useAppContext';
import { useToast } from '../../hooks/useAppContext';
import type { Idea, ProjectCategory } from '../../types';
import { CheckCircle2, ChevronRight, ChevronLeft, Save, Send, Lightbulb } from 'lucide-react';

const CATEGORIES: ProjectCategory[] = [
  'Web Development', 'Mobile App', 'AI / ML', 'IoT', 'Cybersecurity',
  'Data Science', 'Blockchain', 'Game Dev', 'Open Source', 'Other',
];

const STEPS = ['Basic Info', 'Problem & Solution', 'Team & Skills', 'Review & Submit'];

interface IdeaFormData {
  title: string;
  category: ProjectCategory;
  problemStatement: string;
  proposedSolution: string;
  targetUsers: string;
  expectedBenefit: string;
  skillsRequired: string;
  teamPreference: 'individual' | 'team';
}

const EMPTY: IdeaFormData = {
  title: '',
  category: 'Web Development',
  problemStatement: '',
  proposedSolution: '',
  targetUsers: '',
  expectedBenefit: '',
  skillsRequired: '',
  teamPreference: 'team',
};

function Step1({ form, set }: { form: IdeaFormData; set: (f: IdeaFormData) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FormField label="Idea Title" required>
        <input
          className="input"
          placeholder="e.g. Smart Campus Parking System"
          value={form.title}
          onChange={(e) => set({ ...form, title: e.target.value })}
          maxLength={80}
        />
        <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>{form.title.length}/80 characters</p>
      </FormField>
      <FormField label="Category" required>
        <select
          className="input"
          value={form.category}
          onChange={(e) => set({ ...form, category: e.target.value as ProjectCategory })}
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </FormField>
    </div>
  );
}

function Step2({ form, set }: { form: IdeaFormData; set: (f: IdeaFormData) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FormField label="Problem Statement" required hint="What specific problem does your idea address? Be as specific as possible.">
        <textarea
          className="input"
          rows={4}
          placeholder="Describe the problem clearly. Who faces it? How often? What are its consequences?"
          value={form.problemStatement}
          onChange={(e) => set({ ...form, problemStatement: e.target.value })}
          style={{ resize: 'vertical' }}
        />
      </FormField>
      <FormField label="Proposed Solution" required hint="How does your idea solve the problem?">
        <textarea
          className="input"
          rows={4}
          placeholder="Describe your proposed solution. What will it do? How will it work?"
          value={form.proposedSolution}
          onChange={(e) => set({ ...form, proposedSolution: e.target.value })}
          style={{ resize: 'vertical' }}
        />
      </FormField>
      <FormField label="Target Users" required>
        <input
          className="input"
          placeholder="e.g. College students, Faculty members, Campus administration"
          value={form.targetUsers}
          onChange={(e) => set({ ...form, targetUsers: e.target.value })}
        />
      </FormField>
      <FormField label="Expected Benefit">
        <textarea
          className="input"
          rows={3}
          placeholder="What positive impact will this have? Quantify if possible."
          value={form.expectedBenefit}
          onChange={(e) => set({ ...form, expectedBenefit: e.target.value })}
          style={{ resize: 'vertical' }}
        />
      </FormField>
    </div>
  );
}

function Step3({ form, set }: { form: IdeaFormData; set: (f: IdeaFormData) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FormField label="Skills Required" hint="What technical or domain skills would be needed to build this?">
        <input
          className="input"
          placeholder="e.g. React, Python, Machine Learning, UI Design"
          value={form.skillsRequired}
          onChange={(e) => set({ ...form, skillsRequired: e.target.value })}
        />
      </FormField>
      <FormField label="Team Preference" required>
        <div style={{ display: 'flex', gap: 12 }}>
          {(['individual', 'team'] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => set({ ...form, teamPreference: opt })}
              style={{
                flex: 1,
                padding: '12px 20px',
                borderRadius: 10,
                border: `2px solid ${form.teamPreference === opt ? 'var(--color-accent)' : 'var(--color-border)'}`,
                background: form.teamPreference === opt ? 'var(--color-accent-light)' : 'var(--color-surface)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: form.teamPreference === opt ? 600 : 400,
                color: form.teamPreference === opt ? 'var(--color-accent)' : 'var(--color-text)',
                transition: 'all 0.15s ease',
              }}
            >
              {opt === 'individual' ? '👤 Individual' : '👥 Team (2-5 members)'}
            </button>
          ))}
        </div>
      </FormField>
    </div>
  );
}

function ReviewStep({ form }: { form: IdeaFormData }) {
  const fields = [
    { label: 'Title', value: form.title },
    { label: 'Category', value: form.category },
    { label: 'Problem Statement', value: form.problemStatement },
    { label: 'Proposed Solution', value: form.proposedSolution },
    { label: 'Target Users', value: form.targetUsers },
    { label: 'Expected Benefit', value: form.expectedBenefit || '—' },
    { label: 'Skills Required', value: form.skillsRequired || '—' },
    { label: 'Team Preference', value: form.teamPreference === 'individual' ? 'Individual' : 'Team (2-5 members)' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {fields.map(({ label, value }) => (
        <div key={label} style={{ padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
          <p style={{ fontSize: 14, color: 'var(--color-text)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{value}</p>
        </div>
      ))}
    </div>
  );
}

export function IdeaSubmitPage() {
  const navigate = useNavigate();
  const { submitIdea } = useAppStore();
  const { currentUser } = useDemoRole();
  const { addToast } = useToast();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<IdeaFormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function validateStep(): string | null {
    if (step === 0) {
      if (!form.title.trim()) return 'Please enter an idea title.';
    }
    if (step === 1) {
      if (!form.problemStatement.trim()) return 'Please describe the problem.';
      if (!form.proposedSolution.trim()) return 'Please describe your solution.';
      if (!form.targetUsers.trim()) return 'Please specify target users.';
    }
    return null;
  }

  function handleNext() {
    const err = validateStep();
    if (err) { addToast('error', 'Validation Error', err); return; }
    setStep((s) => s + 1);
  }

  function handleSaveDraft() {
    addToast('info', 'Draft Saved', 'Your idea has been saved as a draft locally.');
    try { localStorage.setItem('itclub_idea_draft', JSON.stringify(form)); } catch {}
  }

  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => {
      const idea: Idea = {
        id: `i-${Date.now()}`,
        title: form.title,
        description: `${form.problemStatement}\n\nSolution: ${form.proposedSolution}`,
        category: form.category,
        submittedBy: currentUser.id,
        submittedAt: new Date().toISOString(),
        status: 'pending',
        votes: 0,
        votedBy: [],
      };
      submitIdea(idea);
      setSubmitting(false);
      setSubmitted(true);
      addToast('success', 'Idea Submitted!', 'Your idea is now in the faculty review queue.');
      try { localStorage.removeItem('itclub_idea_draft'); } catch {}
    }, 1000);
  }

  if (submitted) {
    return (
      <PublicLayout>
        <div style={{ maxWidth: 600, margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>🎉</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-text)', marginBottom: 12 }}>Idea Submitted!</h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 32 }}>
            <strong>"{form.title}"</strong> has been submitted for faculty review. You'll receive a notification once it's reviewed. In the meantime, you can vote on other ideas!
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('/student/ideas')}>View My Ideas</button>
            <button className="btn btn-ghost" onClick={() => navigate('/ideas')}>Browse All Ideas</button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--color-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
            <Lightbulb size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text)' }}>Submit an Idea</h1>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>Share your innovation with the club — great ideas become real projects.</p>
          </div>
        </div>

        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
          {STEPS.map((label, i) => (
            <React.Fragment key={label}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: i < STEPS.length - 1 ? 'none' : 1 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: i < step ? 'var(--color-success)' : i === step ? 'var(--color-accent)' : 'var(--color-border)',
                  color: i <= step ? '#fff' : 'var(--color-text-secondary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700,
                  transition: 'all 0.2s ease',
                }}>
                  {i < step ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <span style={{ fontSize: 11, color: i === step ? 'var(--color-accent)' : 'var(--color-text-secondary)', marginTop: 4, textAlign: 'center', fontWeight: i === step ? 600 : 400 }}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 2, background: i < step ? 'var(--color-success)' : 'var(--color-border)', margin: '0 4px', marginBottom: 20, transition: 'background 0.3s ease' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Card */}
        <div className="card" style={{ padding: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 20 }}>{STEPS[step]}</h2>
          {step === 0 && <Step1 form={form} set={setForm} />}
          {step === 1 && <Step2 form={form} set={setForm} />}
          {step === 2 && <Step3 form={form} set={setForm} />}
          {step === 3 && <ReviewStep form={form} />}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setStep((s) => s - 1)} disabled={step === 0} style={{ gap: 6 }}>
                <ChevronLeft size={14} /> Previous
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm" onClick={handleSaveDraft} style={{ gap: 6 }}>
                <Save size={14} /> Save Draft
              </button>
              {step < STEPS.length - 1 ? (
                <button className="btn btn-primary btn-sm" onClick={handleNext} style={{ gap: 6 }}>
                  Next <ChevronRight size={14} />
                </button>
              ) : (
                <button className="btn btn-primary btn-sm" onClick={handleSubmit} disabled={submitting} style={{ gap: 6 }}>
                  <Send size={14} /> {submitting ? 'Submitting…' : 'Submit for Review'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
