import React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, error, required, hint, children }: FormFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor={htmlFor} className="form-label">
        {label}
        {required && <span style={{ color: 'var(--color-error)', marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {hint && !error && (
        <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{hint}</p>
      )}
      {error && (
        <p style={{ fontSize: 12, color: 'var(--color-error)' }}>{error}</p>
      )}
    </div>
  );
}
