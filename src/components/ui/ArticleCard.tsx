import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, User } from 'lucide-react';
import type { BlogPost } from '../../types';
import { formatDate } from '../../utils';
import { getUserById } from '../../data/users';

interface ArticleCardProps {
  post: BlogPost;
  href?: string;
  featured?: boolean;
}

export function ArticleCard({ post, href, featured = false }: ArticleCardProps) {
  const author = getUserById(post.authorId);

  const content = (
    <div
      className="card card-hover"
      style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        height: '100%',
      }}
    >
      {/* Category + Reading time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--color-accent)',
            background: 'var(--color-accent-light)',
            padding: '3px 10px',
            borderRadius: 99,
          }}
        >
          {post.category}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-text-secondary)', fontSize: 12 }}>
          <Clock size={12} />
          {post.readingTime} min read
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: featured ? 17 : 15,
          fontWeight: 600,
          color: 'var(--color-text)',
          lineHeight: 1.4,
          flex: featured ? 0 : 1,
        }}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.55, flex: 1 }}>
        {post.excerpt.length > 130 ? post.excerpt.slice(0, 130) + '…' : post.excerpt}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 11,
              color: 'var(--color-text-secondary)',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 4,
              padding: '2px 7px',
            }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 10,
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-text-secondary)' }}>
          <User size={12} />
          {author?.name ?? 'Unknown'}
          <span>·</span>
          {formatDate(post.publishedAt)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-secondary)' }}>
          <Eye size={12} />
          {post.views.toLocaleString()}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link to={href} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
}
