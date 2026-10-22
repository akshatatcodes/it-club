import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToast } from '../../hooks/useAppContext';
import type { ToastVariant } from '../../types';

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle size={18} color="var(--color-success)" />,
  error: <XCircle size={18} color="var(--color-error)" />,
  warning: <AlertTriangle size={18} color="var(--color-warning)" />,
  info: <Info size={18} color="var(--color-accent)" />,
};

const colors: Record<ToastVariant, string> = {
  success: 'var(--color-success)',
  error: 'var(--color-error)',
  warning: 'var(--color-warning)',
  info: 'var(--color-accent)',
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast animate-slide-in"
          role="alert"
          aria-live="assertive"
          style={{ borderLeft: `3px solid ${colors[toast.variant]}` }}
        >
          <span style={{ display: 'flex', flexShrink: 0, marginTop: 1 }}>
            {icons[toast.variant]}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>
              {toast.title}
            </p>
            {toast.message && (
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                {toast.message}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
            style={{ background: 'none', border: 'none', padding: 4, color: 'var(--color-text-secondary)', cursor: 'pointer', flexShrink: 0 }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
