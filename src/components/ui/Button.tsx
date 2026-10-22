import React from 'react';
import { cn } from '../../utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

export function PrimaryButton({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
  }[variant];

  const sizeClass = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  }[size];

  return (
    <button
      className={cn('btn', variantClass, sizeClass, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span
          style={{
            width: 14,
            height: 14,
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
      ) : (
        leftIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{leftIcon}</span>
      )}
      {children}
      {rightIcon && !loading && (
        <span style={{ display: 'flex', alignItems: 'center' }}>{rightIcon}</span>
      )}
    </button>
  );
}

export function SecondaryButton(props: ButtonProps) {
  return <PrimaryButton variant="secondary" {...props} />;
}

export function GhostButton(props: ButtonProps) {
  return <PrimaryButton variant="ghost" {...props} />;
}
