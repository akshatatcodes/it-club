import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { ArticleCard } from '../../components/ui/ArticleCard';
import { mockBlogPosts, mockQuizzes } from '../../data/mock';
import { FilterBar } from '../../components/ui/FilterBar';
import { useState } from 'react';
import { Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../hooks/useAppStore';

const tabs = [
  { value: 'articles', label: 'Articles' },
  { value: 'quizzes', label: 'Quizzes' },
];

const difficultyColors = {
  beginner: { color: '#22C55E', bg: '#F0FDF4' },
  intermediate: { color: '#F59E0B', bg: '#FFFBEB' },
  advanced: { color: '#EF4444', bg: '#FEF2F2' },
};

export function StudentLearnPage() {
  const [tab, setTab] = useState('articles');
  const { quizResults } = useAppStore();

  return (
    <DashboardLayout title="Learn">
      <PageHeader title="Learn" subtitle="Grow your skills with curated articles and quizzes." />
      <div style={{ marginBottom: 20 }}>
        <FilterBar options={tabs} selected={tab} onChange={setTab} />
      </div>
      {tab === 'articles' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {mockBlogPosts.map((post) => (
            <ArticleCard key={post.id} post={post} href={`/learn/${post.slug}`} />
          ))}
        </div>
      )}
      {tab === 'quizzes' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {mockQuizzes.map((quiz) => {
            const diff = difficultyColors[quiz.difficulty];
            const prevResult = quizResults.find((r) => r.quizId === quiz.id);
            return (
              <div key={quiz.id} className="card card-hover" style={{ padding: 20 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <span className="badge" style={{ color: diff.color, background: diff.bg }}>{quiz.difficulty}</span>
                  <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', alignSelf: 'center' }}>{quiz.category}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{quiz.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 12, lineHeight: 1.55 }}>{quiz.description}</p>
                {prevResult && (
                  <div style={{ padding: '6px 10px', background: 'var(--color-accent-light)', borderRadius: 6, fontSize: 12, color: 'var(--color-accent)', marginBottom: 12, fontWeight: 500 }}>
                    Last score: {prevResult.score}/{prevResult.total} ({Math.round((prevResult.score / prevResult.total) * 100)}%) ✓
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Zap size={12} /> {quiz.questions.length} questions</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {quiz.estimatedMinutes} min</span>
                  </div>
                  <Link to={`/student/quiz/${quiz.id}`}>
                    <button className="btn btn-primary btn-sm">{prevResult ? 'Retry' : 'Start Quiz'}</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
