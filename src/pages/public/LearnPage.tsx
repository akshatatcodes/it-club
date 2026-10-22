import React, { useState } from 'react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { ArticleCard } from '../../components/ui/ArticleCard';
import { SearchInput } from '../../components/ui/SearchInput';
import { FilterBar } from '../../components/ui/FilterBar';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { mockBlogPosts, mockQuizzes } from '../../data/mock';
import { BookOpen, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const difficultyColors = {
  beginner: { color: '#22C55E', bg: '#F0FDF4' },
  intermediate: { color: '#F59E0B', bg: '#FFFBEB' },
  advanced: { color: '#EF4444', bg: '#FEF2F2' },
};

export function LearnPage() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'articles' | 'quizzes'>('articles');

  const filteredArticles = mockBlogPosts.filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredQuizzes = mockQuizzes.filter(
    (q) =>
      !search ||
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PublicLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <PageHeader
          title="Learn"
          subtitle="Articles, tutorials, and quizzes curated by club members and faculty."
        />

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid var(--color-border)', paddingBottom: 0 }}>
          {(['articles', 'quizzes'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '8px 20px',
                fontSize: 14,
                fontWeight: tab === t ? 600 : 400,
                color: tab === t ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderBottom: tab === t ? '2px solid var(--color-accent)' : '2px solid transparent',
                marginBottom: -1,
                fontFamily: 'inherit',
                transition: 'all 0.15s ease',
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={tab === 'articles' ? 'Search articles…' : 'Search quizzes…'}
          style={{ width: 300, marginBottom: 24 }}
        />

        {tab === 'articles' && (
          filteredArticles.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {filteredArticles.map((post) => (
                <ArticleCard key={post.id} post={post} href={`/learn/${post.slug}`} />
              ))}
            </div>
          ) : (
            <EmptyState icon={<BookOpen size={24} />} title="No articles found" description="Try a different search term." />
          )
        )}

        {tab === 'quizzes' && (
          filteredQuizzes.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {filteredQuizzes.map((quiz) => {
                const diff = difficultyColors[quiz.difficulty];
                return (
                  <div key={quiz.id} className="card card-hover" style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <span className="badge" style={{ color: diff.color, background: diff.bg }}>
                        {quiz.difficulty}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                        {quiz.category}
                      </span>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: 'var(--color-text)' }}>
                      {quiz.title}
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16, lineHeight: 1.55 }}>
                      {quiz.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--color-text-secondary)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Zap size={12} /> {quiz.questions.length} questions
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={12} /> {quiz.estimatedMinutes} min
                        </span>
                      </div>
                      <Link to={`/learn/quiz/${quiz.id}`}>
                        <button className="btn btn-primary btn-sm">Start Quiz</button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState icon={<Zap size={24} />} title="No quizzes found" description="Try a different search term." />
          )
        )}
      </div>
    </PublicLayout>
  );
}
