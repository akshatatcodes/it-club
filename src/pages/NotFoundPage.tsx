import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { Construction } from 'lucide-react';

interface ComingSoonPageProps {
  title: string;
  description?: string;
}

export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <PublicLayout>
      <div
        style={{
          maxWidth: 500,
          margin: '80px auto',
          padding: '0 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'var(--color-accent-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-accent)',
          }}
        >
          <Construction size={32} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text)' }}>{title}</h1>
        <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          {description ??
            'This page is under construction and will be available in a future phase of development.'}
        </p>
        <Link to="/">
          <button className="btn btn-primary" style={{ marginTop: 8 }}>
            ← Back to Home
          </button>
        </Link>
      </div>
    </PublicLayout>
  );
}

export function NotFoundPage() {
  return (
    <PublicLayout>
      <div
        style={{
          maxWidth: 500,
          margin: '80px auto',
          padding: '0 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: 'var(--color-border)',
            lineHeight: 1,
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)' }}>
          Page Not Found
        </h1>
        <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          The page you're looking for doesn't exist or has been moved. Double-check the URL or head
          back home.
        </p>
        <Link to="/">
          <button className="btn btn-primary" style={{ marginTop: 8 }}>
            ← Go Home
          </button>
        </Link>
      </div>
    </PublicLayout>
  );
}
