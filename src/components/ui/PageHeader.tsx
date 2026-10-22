import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}

export function PageHeader({ title, subtitle, action, breadcrumb }: PageHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 24,
        flexWrap: 'wrap',
      }}
    >
      <div>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" style={{ marginBottom: 6 }}>
            <ol
              style={{
                display: 'flex',
                gap: 6,
                alignItems: 'center',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {breadcrumb.map((item, i) => (
                <li
                  key={i}
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  {i > 0 && (
                    <span style={{ color: 'var(--color-border)', fontSize: 13 }}>›</span>
                  )}
                  <span
                    style={{
                      fontSize: 13,
                      color: item.href ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                      cursor: item.href ? 'pointer' : 'default',
                    }}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text)' }}>{title}</h1>
        {subtitle && (
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  );
}
