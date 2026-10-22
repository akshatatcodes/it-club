import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: number;
  size?: 'sm' | 'md' | 'lg';
  footer?: React.ReactNode;
}

const sizeMap: Record<string, number> = { sm: 440, md: 560, lg: 720 };

export function Modal({ open, onClose, title, children, maxWidth, size, footer }: ModalProps) {
  const resolvedMax = maxWidth ?? (size ? sizeMap[size] : 540);
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Prevent scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modal-content" style={{ maxWidth: resolvedMax }}>
        {/* Header */}
        {title && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px 16px',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 600 }}>{title}</h2>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm"
              aria-label="Close dialog"
              style={{ padding: 6 }}
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Body */}
        <div style={{ padding: '20px 24px' }}>{children}</div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              padding: '16px 24px 20px',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              gap: 10,
              justifyContent: 'flex-end',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
