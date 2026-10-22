import type { ProjectStatus, IdeaStatus, ApplicationStatus, TaskStatus, EventType } from '../types';

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateStr);
}

export function getDaysUntil(dateStr: string): number {
  const now = new Date();
  const date = new Date(dateStr);
  return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export const projectStatusConfig: Record<
  ProjectStatus,
  { label: string; color: string; bg: string }
> = {
  idea: { label: 'Idea', color: '#667085', bg: '#F2F4F7' },
  in_progress: { label: 'In Progress', color: '#3678B7', bg: '#EFF6FF' },
  review: { label: 'Under Review', color: '#F59E0B', bg: '#FFFBEB' },
  completed: { label: 'Completed', color: '#22C55E', bg: '#F0FDF4' },
  incubated: { label: 'Incubated', color: '#8B5CF6', bg: '#F5F3FF' },
};

export const ideaStatusConfig: Record<
  IdeaStatus,
  { label: string; color: string; bg: string }
> = {
  pending: { label: 'Pending', color: '#F59E0B', bg: '#FFFBEB' },
  approved: { label: 'Approved', color: '#22C55E', bg: '#F0FDF4' },
  rejected: { label: 'Rejected', color: '#EF4444', bg: '#FEF2F2' },
  converted: { label: 'Converted to Project', color: '#8B5CF6', bg: '#F5F3FF' },
};

export const applicationStatusConfig: Record<
  ApplicationStatus,
  { label: string; color: string; bg: string }
> = {
  pending: { label: 'Pending', color: '#F59E0B', bg: '#FFFBEB' },
  accepted: { label: 'Accepted', color: '#22C55E', bg: '#F0FDF4' },
  rejected: { label: 'Rejected', color: '#EF4444', bg: '#FEF2F2' },
};

export const taskStatusConfig: Record<
  TaskStatus,
  { label: string; color: string; bg: string }
> = {
  todo: { label: 'To Do', color: '#667085', bg: '#F2F4F7' },
  in_progress: { label: 'In Progress', color: '#3678B7', bg: '#EFF6FF' },
  done: { label: 'Done', color: '#22C55E', bg: '#F0FDF4' },
};

export const eventTypeConfig: Record<
  EventType,
  { label: string; color: string; bg: string }
> = {
  workshop: { label: 'Workshop', color: '#3678B7', bg: '#EFF6FF' },
  hackathon: { label: 'Hackathon', color: '#8B5CF6', bg: '#F5F3FF' },
  talk: { label: 'Talk', color: '#F59E0B', bg: '#FFFBEB' },
  meetup: { label: 'Meetup', color: '#22C55E', bg: '#F0FDF4' },
  competition: { label: 'Competition', color: '#EF4444', bg: '#FEF2F2' },
};

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '…';
}
