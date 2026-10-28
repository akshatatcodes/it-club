// ─── User & Auth ────────────────────────────────────────────────────────────

export type Role = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  department: string;
  year?: number; // for students
  bio?: string;
  skills?: string[];
  joinedAt: string;
  designation?: string;
  interests?: string;
  currentProject?: string;
}

// ─── Project ─────────────────────────────────────────────────────────────────

export type ProjectStatus =
  | 'idea'
  | 'in_progress'
  | 'review'
  | 'completed'
  | 'incubated';

export type ProjectCategory =
  | 'Web Development'
  | 'Mobile App'
  | 'AI / ML'
  | 'IoT'
  | 'Cybersecurity'
  | 'Data Science'
  | 'Blockchain'
  | 'Game Dev'
  | 'Open Source'
  | 'Other';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  tags: string[];
  leadId: string;
  mentorId?: string;
  memberIds: string[];
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
  problemStatement?: string;
  proposedSolution?: string;
  isDemoContent?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  isOpenForApplications: boolean;
  applicationCount: number;
  incubationReferred: boolean;
}

// ─── Idea ────────────────────────────────────────────────────────────────────

export type IdeaStatus = 'pending' | 'approved' | 'rejected' | 'converted';

export interface Idea {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  submittedBy: string;
  submittedAt: string;
  status: IdeaStatus;
  votes: number;
  votedBy: string[];
  reviewNote?: string;
  convertedProjectId?: string;
}

// ─── Project Application ─────────────────────────────────────────────────────

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export interface ProjectApplication {
  id: string;
  projectId: string;
  applicantId: string;
  message: string;
  skills: string[];
  appliedAt: string;
  status: ApplicationStatus;
}

// ─── Task ────────────────────────────────────────────────────────────────────

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  assigneeId?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
}

// ─── Blog / Article ──────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorId: string;
  tags: string[];
  category: string;
  publishedAt: string;
  readingTime: number; // minutes
  coverImage?: string;
  featured: boolean;
  views: number;
}

// ─── Quiz ────────────────────────────────────────────────────────────────────

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: QuizQuestion[];
  createdAt: string;
  authorId: string;
  estimatedMinutes: number;
}

// ─── Event ───────────────────────────────────────────────────────────────────

export type EventType = 'workshop' | 'hackathon' | 'talk' | 'meetup' | 'competition';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  startDate: string;
  endDate: string;
  location: string;
  isOnline: boolean;
  organizerId: string;
  registeredIds: string[];
  maxCapacity?: number;
  tags: string[];
  coverImage?: string;
  isIllustrative?: boolean;
  registrationDeadline?: string;
}

// ─── Session / Mentorship ────────────────────────────────────────────────────

export type SessionStatus = 'scheduled' | 'completed' | 'cancelled';

export interface Session {
  id: string;
  projectId: string;
  mentorId: string;
  studentIds: string[];
  title: string;
  scheduledAt: string;
  durationMinutes: number;
  status: SessionStatus;
  meetLink?: string;
  notes?: string;
}

// ─── Notification ────────────────────────────────────────────────────────────

export type NotificationType =
  | 'project_update'
  | 'application_received'
  | 'application_status'
  | 'idea_reviewed'
  | 'session_scheduled'
  | 'event_reminder'
  | 'task_assigned'
  | 'mention';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// ─── Chat Message ─────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  projectId: string;
  senderId: string;
  content: string;
  sentAt: string;
  readBy: string[];
}

// ─── UI Helpers ──────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  variant: ToastVariant;
  title: string;
  message?: string;
}
