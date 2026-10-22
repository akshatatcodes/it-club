import React from 'react';
import { cn } from '../../utils';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterBarProps {
  options: FilterOption[];
  selected: string;
  onChange: (value: string) => void;
  label?: string;
}

export function FilterBar({ options, selected, onChange, label }: FilterBarProps) {
  return (
    <div
      role="group"
      aria-label={label ?? 'Filter options'}
      style={{
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          aria-pressed={selected === opt.value}
          style={{
            padding: '6px 14px',
            borderRadius: 99,
            fontSize: 13,
            fontWeight: 500,
            border: '1px solid',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.15s ease',
            background:
              selected === opt.value ? 'var(--color-primary)' : 'var(--color-surface)',
            color:
              selected === opt.value ? '#ffffff' : 'var(--color-text-secondary)',
            borderColor:
              selected === opt.value ? 'var(--color-primary)' : 'var(--color-border)',
          }}
        >
          {opt.label}
          {opt.count !== undefined && (
            <span
              style={{
                fontSize: 11,
                padding: '1px 6px',
                borderRadius: 99,
                background:
                  selected === opt.value ? 'rgba(255,255,255,0.2)' : 'var(--color-bg)',
                color:
                  selected === opt.value ? '#ffffff' : 'var(--color-text-secondary)',
                fontWeight: 600,
              }}
            >
              {opt.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
