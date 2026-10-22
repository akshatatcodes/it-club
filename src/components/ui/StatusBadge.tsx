import React from 'react';

interface StatusBadgeProps {
  label: string;
  color: string;
  bg: string;
  dot?: boolean;
  size?: 'sm' | 'md';
}

export function StatusBadge({ label, color, bg, dot = true, size = 'md' }: StatusBadgeProps) {
  return (
    <span
      className="badge"
      style={{
        color,
        backgroundColor: bg,
        fontSize: size === 'sm' ? '11px' : '12px',
        padding: size === 'sm' ? '2px 8px' : '3px 10px',
      }}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: color,
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
      )}
      {label}
    </span>
  );
}
