import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { mockQuizzes } from '../../data/mock';
import { useAppStore } from '../../hooks/useAppStore';
import { useDemoRole } from '../../hooks/useAppContext';
import { useToast } from '../../hooks/useAppContext';
import { NotFoundPage } from '../NotFoundPage';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw, Trophy, Clock } from 'lucide-react';

type QuizState = 'intro' | 'playing' | 'result';

export function QuizPlayerPage() {
  const { id } = useParams<{ id: string }>();
  const quiz = mockQuizzes.find((q) => q.id === id);
  const { saveQuizResult, quizResults } = useAppStore();
  const { currentUser } = useDemoRole();
  const { addToast } = useToast();

  const [phase, setPhase] = useState<QuizState>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>({}); // questionId -> optionId
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prevResult = quizResults.find((r) => r.quizId === id);

  useEffect(() => {
    if (phase !== 'playing') return;
    if (!quiz) return;
    setTimeLeft((quiz.estimatedMinutes ?? 5) * 60);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [phase]);

  if (!quiz) return <NotFoundPage />;

  // quiz is defined from here on
  const q2 = quiz;

  function finishQuiz() {
    if (timerRef.current) clearInterval(timerRef.current);
    const score = quiz!.questions.filter((q) => selected[q.id] === q.correctOptionId).length;
    saveQuizResult({ quizId: quiz!.id, score, total: quiz!.questions.length, completedAt: new Date().toISOString() });
    setPhase('result');
    const pct = Math.round((score / quiz!.questions.length) * 100);
    addToast(pct >= 70 ? 'success' : 'info', `Quiz Complete — ${pct}%`, `You scored ${score}/${quiz!.questions.length}`);
  }

  function handleSelect(qId: string, optionId: string) {
    if (revealed.has(qId)) return;
    setSelected((prev) => ({ ...prev, [qId]: optionId }));
    setRevealed((prev) => new Set([...prev, qId]));
  }

  function handleNext() {
    if (currentQ < quiz!.questions.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      finishQuiz();
    }
  }

  const q = quiz.questions[currentQ];
  const score = quiz.questions.filter((q) => selected[q.id] === q.correctOptionId).length;
  const pct = Math.round((score / quiz.questions.length) * 100);
  const diffColors = { beginner: { color: '#22C55E', bg: '#F0FDF4' }, intermediate: { color: '#F59E0B', bg: '#FFFBEB' }, advanced: { color: '#EF4444', bg: '#FEF2F2' } };
  const diff = diffColors[quiz.difficulty];

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <PublicLayout>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px' }}>
        {/* Intro */}
        {phase === 'intro' && (
          <div className="card" style={{ padding: 40, textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: diff.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: diff.color }}>
              <Trophy size={30} />
            </div>
            <span className="badge" style={{ color: diff.color, background: diff.bg, marginBottom: 12, display: 'inline-block' }}>{quiz.difficulty}</span>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--color-text)', marginBottom: 10 }}>{quiz.title}</h1>
            <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>{quiz.description}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 28 }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text)' }}>{quiz.questions.length}</p>
                <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Questions</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text)' }}>{quiz.estimatedMinutes}</p>
                <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Minutes</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text)' }}>{quiz.category}</p>
                <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Topic</p>
              </div>
            </div>
            {prevResult && (
              <div style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-accent)', borderRadius: 10, padding: '10px 16px', marginBottom: 20, fontSize: 14, color: 'var(--color-accent)' }}>
                Your last score: <strong>{prevResult.score}/{prevResult.total}</strong> ({Math.round((prevResult.score / prevResult.total) * 100)}%)
              </div>
            )}
            <button className="btn btn-primary" style={{ fontSize: 15, padding: '12px 32px', gap: 8 }} onClick={() => { setPhase('playing'); setCurrentQ(0); setSelected({}); setRevealed(new Set()); }}>
              Start Quiz <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Playing */}
        {phase === 'playing' && (
          <div>
            {/* Progress & Timer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ flex: 1, marginRight: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
                  <span>Question {currentQ + 1} of {quiz.questions.length}</span>
                  <span>{Math.round(((currentQ + (revealed.has(q.id) ? 1 : 0)) / quiz.questions.length) * 100)}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--color-border)', borderRadius: 99 }}>
                  <div style={{ height: '100%', width: `${((currentQ) / quiz.questions.length) * 100}%`, background: 'var(--color-accent)', borderRadius: 99, transition: 'width 0.3s ease' }} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: timeLeft < 60 ? 'var(--color-error)' : 'var(--color-text-secondary)' }}>
                <Clock size={15} /> {minutes}:{seconds.toString().padStart(2, '0')}
              </div>
            </div>

            <div className="card" style={{ padding: 28 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', marginBottom: 24, lineHeight: 1.5 }}>
                {q.question}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {q.options.map((opt) => {
                  const isSelected = selected[q.id] === opt.id;
                  const isCorrect = opt.id === q.correctOptionId;
                  const isRevealed = revealed.has(q.id);
                  let bg = 'var(--color-bg)';
                  let border = 'var(--color-border)';
                  let color = 'var(--color-text)';

                  if (isRevealed) {
                    if (isCorrect) { bg = '#F0FDF4'; border = '#22C55E'; color = '#15803D'; }
                    else if (isSelected && !isCorrect) { bg = '#FEF2F2'; border = '#EF4444'; color = '#DC2626'; }
                  } else if (isSelected) {
                    bg = 'var(--color-accent-light)'; border = 'var(--color-accent)';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      disabled={isRevealed}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '12px 16px',
                        background: bg,
                        border: `1.5px solid ${border}`,
                        borderRadius: 10,
                        cursor: isRevealed ? 'default' : 'pointer',
                        textAlign: 'left',
                        fontSize: 14,
                        color,
                        fontFamily: 'inherit',
                        fontWeight: isRevealed && isCorrect ? 600 : 400,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {isRevealed && isCorrect && <CheckCircle2 size={16} style={{ color: '#22C55E', flexShrink: 0 }} />}
                      {isRevealed && isSelected && !isCorrect && <XCircle size={16} style={{ color: '#EF4444', flexShrink: 0 }} />}
                      {(!isRevealed || (!isCorrect && !isSelected)) && (
                        <span style={{ width: 22, height: 22, borderRadius: '50%', border: `1.5px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
                          {String.fromCharCode(65 + q.options.indexOf(opt))}
                        </span>
                      )}
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {revealed.has(q.id) && q.explanation && (
                <div style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-accent)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: 'var(--color-accent)' }}>
                  <strong>💡 Explanation:</strong> {q.explanation}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => setCurrentQ((q) => Math.max(0, q - 1))} disabled={currentQ === 0} style={{ gap: 6 }}>
                  <ArrowLeft size={14} /> Previous
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleNext}
                  disabled={!revealed.has(q.id)}
                  style={{ gap: 6 }}
                >
                  {currentQ === quiz.questions.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {phase === 'result' && (
          <div className="card" style={{ padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>
              {pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : '📚'}
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-text)', marginBottom: 8 }}>
              {pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good Job!' : 'Keep Practising!'}
            </h1>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
              You scored <strong>{score}/{quiz.questions.length}</strong> ({pct}%) on {quiz.title}
            </p>

            {/* Score Ring */}
            <div style={{ width: 120, height: 120, margin: '0 auto 28px', position: 'relative' }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-border)" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="50"
                  fill="none"
                  stroke={pct >= 80 ? '#22C55E' : pct >= 60 ? '#F59E0B' : '#EF4444'}
                  strokeWidth="10"
                  strokeDasharray={`${(pct / 100) * 314} 314`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                  style={{ transition: 'stroke-dasharray 0.8s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--color-text)' }}>{pct}%</span>
              </div>
            </div>

            {/* Answer Review */}
            <div style={{ textAlign: 'left', marginBottom: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Answer Review</h3>
              {quiz.questions.map((q, i) => {
                const correct = selected[q.id] === q.correctOptionId;
                return (
                  <div key={q.id} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--color-border)', alignItems: 'flex-start' }}>
                    {correct ? <CheckCircle2 size={16} style={{ color: '#22C55E', marginTop: 2, flexShrink: 0 }} /> : <XCircle size={16} style={{ color: '#EF4444', marginTop: 2, flexShrink: 0 }} />}
                    <div>
                      <p style={{ fontSize: 13, color: 'var(--color-text)', fontWeight: 500 }}>Q{i + 1}. {q.question}</p>
                      <p style={{ fontSize: 12, color: correct ? '#15803D' : '#DC2626' }}>
                        {correct ? '✓ Correct' : `✗ You chose: ${q.options.find(o => o.id === selected[q.id])?.text ?? 'No answer'}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-ghost"
                onClick={() => { setPhase('intro'); setSelected({}); setRevealed(new Set()); setCurrentQ(0); }}
                style={{ gap: 6 }}
              >
                <RotateCcw size={14} /> Try Again
              </button>
              <Link to="/learn">
                <button className="btn btn-primary" style={{ gap: 6 }}>Browse More Quizzes <ArrowRight size={14} /></button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
