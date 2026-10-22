import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Role, User, ToastMessage, ToastVariant } from '../types';
import { demoStudentUser, demoFacultyUser, demoAdminUser } from '../data/users';

// ─── Demo Role Context ────────────────────────────────────────────────────────

interface DemoRoleContextType {
  currentUser: User;
  currentRole: Role;
  switchRole: (role: Role) => void;
}

const DemoRoleContext = createContext<DemoRoleContextType | null>(null);

export function DemoRoleProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<Role>('student');

  const userMap: Record<Role, User> = {
    student: demoStudentUser,
    faculty: demoFacultyUser,
    admin: demoAdminUser,
  };

  const switchRole = useCallback((role: Role) => {
    setCurrentRole(role);
  }, []);

  return (
    <DemoRoleContext.Provider
      value={{ currentUser: userMap[currentRole], currentRole, switchRole }}
    >
      {children}
    </DemoRoleContext.Provider>
  );
}

export function useDemoRole(): DemoRoleContextType {
  const ctx = useContext(DemoRoleContext);
  if (!ctx) throw new Error('useDemoRole must be used within DemoRoleProvider');
  return ctx;
}

// ─── Toast Context ────────────────────────────────────────────────────────────

interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (variant: ToastVariant, title: string, message?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (variant: ToastVariant, title: string, message?: string) => {
      const id = `toast-${Date.now()}`;
      setToasts((prev) => [...prev, { id, variant, title, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
