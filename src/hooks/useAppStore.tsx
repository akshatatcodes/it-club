/**
 * useAppStore — Global reactive demo store
 * Manages ideas, applications, tasks, notifications, registrations, and quiz results
 * so interactions across pages stay in sync.
 */
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Idea, ProjectApplication, Task, Notification } from '../types';
import { mockIdeas } from '../data/mock';
import { mockApplications, mockTasks, mockNotifications } from '../data/mock';

interface QuizResult {
  quizId: string;
  score: number;
  total: number;
  completedAt: string;
}

interface AppStoreContextType {
  // Ideas
  ideas: Idea[];
  submitIdea: (idea: Idea) => void;
  updateIdeaStatus: (id: string, status: Idea['status'], reviewNote?: string) => void;
  voteIdea: (id: string, userId: string) => void;

  // Applications
  applications: ProjectApplication[];
  submitApplication: (app: ProjectApplication) => void;
  updateApplicationStatus: (id: string, status: ProjectApplication['status']) => void;

  // Tasks
  tasks: Task[];
  updateTaskStatus: (id: string, status: Task['status']) => void;

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  addNotification: (notif: Notification) => void;

  // Event registrations (set of event ids the current user has registered)
  registeredEventIds: Set<string>;
  registerEvent: (eventId: string) => void;
  unregisterEvent: (eventId: string) => void;

  // Quiz results
  quizResults: QuizResult[];
  saveQuizResult: (result: QuizResult) => void;

  // Announcements
  announcements: { id: string; title: string; body: string; createdAt: string; audience: string }[];
  addAnnouncement: (a: { title: string; body: string; audience: string }) => void;
}

const AppStoreContext = createContext<AppStoreContextType | null>(null);

const LS_KEY = 'itclub_demo_store';

function loadFromLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {}
  return fallback;
}

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [ideas, setIdeas] = useState<Idea[]>(() =>
    loadFromLS(`${LS_KEY}_ideas`, mockIdeas)
  );
  const [applications, setApplications] = useState<ProjectApplication[]>(() =>
    loadFromLS(`${LS_KEY}_apps`, mockApplications)
  );
  const [tasks, setTasks] = useState<Task[]>(() =>
    loadFromLS(`${LS_KEY}_tasks`, mockTasks)
  );
  const [notifications, setNotifications] = useState<Notification[]>(() =>
    loadFromLS(`${LS_KEY}_notifs`, mockNotifications)
  );
  const [registeredEventIds, setRegisteredEventIds] = useState<Set<string>>(
    () => new Set<string>(loadFromLS<string[]>(`${LS_KEY}_events`, ['e1', 'e3']))
  );
  const [quizResults, setQuizResults] = useState<QuizResult[]>(() =>
    loadFromLS(`${LS_KEY}_quizzes`, [])
  );
  const [announcements, setAnnouncements] = useState<
    { id: string; title: string; body: string; createdAt: string; audience: string }[]
  >(() =>
    loadFromLS(`${LS_KEY}_announcements`, [
      {
        id: 'ann1',
        title: 'InnoHack 2026 Registrations Open!',
        body: 'Teams of 2-4 can now register for InnoHack 2026. Last date: Nov 10. Prizes worth ₹2 Lakhs!',
        createdAt: '2026-10-20T10:00:00',
        audience: 'all',
      },
    ])
  );

  // Persist to localStorage on change
  useEffect(() => { try { localStorage.setItem(`${LS_KEY}_ideas`, JSON.stringify(ideas)); } catch {} }, [ideas]);
  useEffect(() => { try { localStorage.setItem(`${LS_KEY}_apps`, JSON.stringify(applications)); } catch {} }, [applications]);
  useEffect(() => { try { localStorage.setItem(`${LS_KEY}_tasks`, JSON.stringify(tasks)); } catch {} }, [tasks]);
  useEffect(() => { try { localStorage.setItem(`${LS_KEY}_notifs`, JSON.stringify(notifications)); } catch {} }, [notifications]);
  useEffect(() => { try { localStorage.setItem(`${LS_KEY}_events`, JSON.stringify([...registeredEventIds])); } catch {} }, [registeredEventIds]);
  useEffect(() => { try { localStorage.setItem(`${LS_KEY}_quizzes`, JSON.stringify(quizResults)); } catch {} }, [quizResults]);
  useEffect(() => { try { localStorage.setItem(`${LS_KEY}_announcements`, JSON.stringify(announcements)); } catch {} }, [announcements]);

  const submitIdea = useCallback((idea: Idea) => {
    setIdeas((prev) => [idea, ...prev]);
  }, []);

  const updateIdeaStatus = useCallback((id: string, status: Idea['status'], reviewNote?: string) => {
    setIdeas((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status, reviewNote: reviewNote ?? i.reviewNote } : i))
    );
  }, []);

  const voteIdea = useCallback((id: string, userId: string) => {
    setIdeas((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const hasVoted = i.votedBy.includes(userId);
        return {
          ...i,
          votes: hasVoted ? i.votes - 1 : i.votes + 1,
          votedBy: hasVoted ? i.votedBy.filter((v) => v !== userId) : [...i.votedBy, userId],
        };
      })
    );
  }, []);

  const submitApplication = useCallback((app: ProjectApplication) => {
    setApplications((prev) => [app, ...prev]);
  }, []);

  const updateApplicationStatus = useCallback((id: string, status: ProjectApplication['status']) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }, []);

  const updateTaskStatus = useCallback((id: string, status: Task['status']) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addNotification = useCallback((notif: Notification) => {
    setNotifications((prev) => [notif, ...prev]);
  }, []);

  const registerEvent = useCallback((eventId: string) => {
    setRegisteredEventIds((prev) => new Set([...prev, eventId]));
  }, []);

  const unregisterEvent = useCallback((eventId: string) => {
    setRegisteredEventIds((prev) => {
      const next = new Set(prev);
      next.delete(eventId);
      return next;
    });
  }, []);

  const saveQuizResult = useCallback((result: QuizResult) => {
    setQuizResults((prev) => [result, ...prev.filter((r) => r.quizId !== result.quizId)]);
  }, []);

  const addAnnouncement = useCallback((a: { title: string; body: string; audience: string }) => {
    const newAnn = { ...a, id: `ann${Date.now()}`, createdAt: new Date().toISOString() };
    setAnnouncements((prev) => [newAnn, ...prev]);
  }, []);

  return (
    <AppStoreContext.Provider
      value={{
        ideas, submitIdea, updateIdeaStatus, voteIdea,
        applications, submitApplication, updateApplicationStatus,
        tasks, updateTaskStatus,
        notifications, markNotificationRead, markAllRead, addNotification,
        registeredEventIds, registerEvent, unregisterEvent,
        quizResults, saveQuizResult,
        announcements, addAnnouncement,
      }}
    >
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore(): AppStoreContextType {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider');
  return ctx;
}
