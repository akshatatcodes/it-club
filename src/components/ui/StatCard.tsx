import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { value: number; label: string };
  color?: string;
  description?: string;
}

export function StatCard({ label, value, icon, trend, color = 'var(--color-accent)', description }: StatCardProps) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', fontWeight: 500, marginBottom: 6 }}>
            {label}
          </p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.1 }}>
            {value}
          </p>
          {description && (
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>
              {description}
            </p>
          )}
          {trend && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                marginTop: 8,
                fontSize: 12,
                color: trend.value >= 0 ? 'var(--color-success)' : 'var(--color-error)',
                fontWeight: 500,
              }}
            >
              {trend.value >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              <span>{Math.abs(trend.value)}% {trend.label}</span>
            </div>
          )}
        </div>
        {icon && (
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              background: `${color}18`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color,
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
