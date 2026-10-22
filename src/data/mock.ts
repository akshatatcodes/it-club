import type { Idea, ProjectApplication, Event, BlogPost, Quiz, Session, Notification, Task } from '../types';

// ─── Ideas ───────────────────────────────────────────────────────────────────

export const mockIdeas: Idea[] = [
  {
    id: 'i1',
    title: 'Campus Carpooling App',
    description:
      'A mobile app to help students coordinate rides to college, reducing traffic and carbon footprint.',
    category: 'Mobile App',
    submittedBy: 'u2',
    submittedAt: '2026-10-01',
    status: 'approved',
    votes: 34,
    votedBy: ['u1', 'u3', 'u7', 'u8'],
  },
  {
    id: 'i2',
    title: 'Library Book Recommendation Engine',
    description:
      'AI-powered system to recommend books based on courses enrolled, reading history, and peer preferences.',
    category: 'AI / ML',
    submittedBy: 'u1',
    submittedAt: '2026-09-20',
    status: 'converted',
    votes: 28,
    votedBy: ['u2', 'u3', 'u7'],
    convertedProjectId: 'p2',
  },
  {
    id: 'i3',
    title: 'Blockchain-based Certificate Verification',
    description:
      'Issue tamper-proof digital certificates for courses, events, and achievements stored on blockchain.',
    category: 'Blockchain',
    submittedBy: 'u3',
    submittedAt: '2026-10-10',
    status: 'pending',
    votes: 19,
    votedBy: ['u1', 'u8'],
  },
  {
    id: 'i4',
    title: 'Mental Health Support Chatbot',
    description:
      'An anonymous, empathetic AI chatbot to provide first-level mental health support and guide students to resources.',
    category: 'AI / ML',
    submittedBy: 'u7',
    submittedAt: '2026-10-15',
    status: 'pending',
    votes: 47,
    votedBy: ['u1', 'u2', 'u3', 'u8'],
  },
  {
    id: 'i5',
    title: 'Exam Stress Analytics Dashboard',
    description:
      'Aggregate anonymized data about student study patterns around exams to provide institution-level insights.',
    category: 'Data Science',
    submittedBy: 'u8',
    submittedAt: '2026-10-18',
    status: 'rejected',
    votes: 5,
    votedBy: ['u1'],
    reviewNote: 'Privacy concerns need to be addressed before this can be approved.',
  },
];

// ─── Applications ────────────────────────────────────────────────────────────

export const mockApplications: ProjectApplication[] = [
  {
    id: 'a1',
    projectId: 'p1',
    applicantId: 'u8',
    message:
      'I have experience with embedded systems and Arduino. I can contribute to the hardware side of the attendance system.',
    skills: ['Arduino', 'C++', 'RFID'],
    appliedAt: '2026-10-12',
    status: 'pending',
  },
  {
    id: 'a2',
    projectId: 'p1',
    applicantId: 'u3',
    message:
      'I can help with the backend security and authentication layer for this system.',
    skills: ['Python', 'Cybersecurity', 'Networking'],
    appliedAt: '2026-10-11',
    status: 'accepted',
  },
  {
    id: 'a3',
    projectId: 'p3',
    applicantId: 'u1',
    message:
      'I have React Native experience and would love to contribute to the frontend of CampusConnect.',
    skills: ['React Native', 'React', 'TypeScript'],
    appliedAt: '2026-10-20',
    status: 'pending',
  },
];

// ─── Events ──────────────────────────────────────────────────────────────────

export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'InnoHack 2026 — 36-Hour Hackathon',
    description:
      'Our flagship annual hackathon where teams of 2-4 build innovative solutions to real-world problems. Prizes worth ₹2 Lakhs!',
    type: 'hackathon',
    startDate: '2026-11-15T09:00:00',
    endDate: '2026-11-16T21:00:00',
    location: 'Main Auditorium & Computer Labs',
    isOnline: false,
    organizerId: 'u6',
    registeredIds: ['u1', 'u2', 'u3', 'u7', 'u8'],
    maxCapacity: 200,
    tags: ['Hackathon', 'Competition', 'Innovation', 'Prize'],
    registrationDeadline: '2026-11-10T23:59:00',
  },
  {
    id: 'e2',
    title: 'Web3 & Blockchain Workshop',
    description:
      'Hands-on workshop covering Solidity smart contracts, DeFi concepts, and building your first DApp on Ethereum.',
    type: 'workshop',
    startDate: '2026-10-28T14:00:00',
    endDate: '2026-10-28T18:00:00',
    location: 'Lab 301',
    isOnline: false,
    organizerId: 'u6',
    registeredIds: ['u1', 'u3'],
    maxCapacity: 40,
    tags: ['Blockchain', 'Web3', 'Solidity', 'Workshop'],
    registrationDeadline: '2026-10-26T23:59:00',
  },
  {
    id: 'e3',
    title: 'AI/ML Career Talk by Industry Expert',
    description:
      'Guest lecture by a senior engineer from Google DeepMind on building a career in AI research and engineering.',
    type: 'talk',
    startDate: '2026-11-05T16:00:00',
    endDate: '2026-11-05T18:00:00',
    location: 'Online (Google Meet)',
    isOnline: true,
    organizerId: 'u6',
    registeredIds: ['u1', 'u2', 'u3', 'u7', 'u8'],
    tags: ['AI', 'Career', 'Industry', 'Talk'],
    registrationDeadline: '2026-11-04T23:59:00',
  },
  {
    id: 'e4',
    title: 'Open Source Contribution Day',
    description:
      'A full-day collaborative session where students contribute to open-source projects. Mentors available throughout.',
    type: 'meetup',
    startDate: '2026-11-22T10:00:00',
    endDate: '2026-11-22T17:00:00',
    location: 'Innovation Lab',
    isOnline: false,
    organizerId: 'u6',
    registeredIds: ['u1', 'u7'],
    maxCapacity: 60,
    tags: ['Open Source', 'Contribution', 'GitHub', 'Community'],
    registrationDeadline: '2026-11-20T23:59:00',
  },
];

// ─── Blog Posts ──────────────────────────────────────────────────────────────

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'Getting Started with Large Language Models: A Practical Guide',
    slug: 'getting-started-with-llms',
    excerpt:
      'Demystifying LLMs for college students — from understanding transformers to building your first chatbot with the OpenAI API.',
    content: '## Introduction\n\nLarge Language Models (LLMs) have taken the world by storm...',
    authorId: 'u4',
    tags: ['AI', 'LLM', 'Python', 'Beginner'],
    category: 'AI / ML',
    publishedAt: '2026-10-10',
    readingTime: 8,
    featured: true,
    views: 1247,
  },
  {
    id: 'b2',
    title: 'How We Built a Smart Attendance System in 60 Days',
    slug: 'smart-attendance-system-case-study',
    excerpt:
      'A behind-the-scenes case study of our IoT project — from ideation and prototyping to the challenges we faced.',
    content: '## The Problem\n\nManual attendance was taking 10 minutes of every class...',
    authorId: 'u1',
    tags: ['IoT', 'Case Study', 'Project', 'Python'],
    category: 'IoT',
    publishedAt: '2026-10-05',
    readingTime: 12,
    featured: true,
    views: 894,
  },
  {
    id: 'b3',
    title: 'Top 10 Open Source Projects to Contribute to as a Beginner',
    slug: 'top-open-source-projects-beginners',
    excerpt:
      'Breaking into open-source can be daunting. Here are 10 beginner-friendly projects with great communities.',
    content: '## Why Open Source?\n\nContributing to open source is one of the best...',
    authorId: 'u3',
    tags: ['Open Source', 'GitHub', 'Beginner', 'Career'],
    category: 'Open Source',
    publishedAt: '2026-09-28',
    readingTime: 6,
    featured: false,
    views: 2103,
  },
  {
    id: 'b4',
    title: 'React 19 Features You Should Start Using Today',
    slug: 'react-19-features',
    excerpt:
      'An overview of the most impactful React 19 features including Server Components, new hooks, and the React Compiler.',
    content: '## React 19 is here\n\nAfter years of anticipation, React 19 brings...',
    authorId: 'u7',
    tags: ['React', 'JavaScript', 'Frontend', 'Web Dev'],
    category: 'Web Development',
    publishedAt: '2026-10-18',
    readingTime: 7,
    featured: false,
    views: 1568,
  },
];

// ─── Quizzes ─────────────────────────────────────────────────────────────────

export const mockQuizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'Python Fundamentals',
    description: 'Test your knowledge of Python basics — data types, control flow, and functions.',
    category: 'Programming',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    createdAt: '2026-09-01',
    authorId: 'u4',
    questions: [
      {
        id: 'q1-1',
        question: 'What is the output of `print(type([]))`?',
        options: [
          { id: 'o1', text: "<class 'list'>" },
          { id: 'o2', text: "<class 'array'>" },
          { id: 'o3', text: "<class 'tuple'>" },
          { id: 'o4', text: 'None' },
        ],
        correctOptionId: 'o1',
        explanation: 'In Python, [] creates a list, and type() returns the class of the object.',
      },
      {
        id: 'q1-2',
        question: 'Which keyword is used to define a function in Python?',
        options: [
          { id: 'o1', text: 'function' },
          { id: 'o2', text: 'def' },
          { id: 'o3', text: 'fn' },
          { id: 'o4', text: 'lambda' },
        ],
        correctOptionId: 'o2',
        explanation: 'The `def` keyword is used to define functions in Python.',
      },
    ],
  },
  {
    id: 'q2',
    title: 'React Hooks Deep Dive',
    description: 'Advanced quiz on React hooks — useState, useEffect, useContext, and custom hooks.',
    category: 'Web Development',
    difficulty: 'intermediate',
    estimatedMinutes: 15,
    createdAt: '2026-10-01',
    authorId: 'u7',
    questions: [
      {
        id: 'q2-1',
        question: 'Which hook should you use to run a side effect after every render?',
        options: [
          { id: 'o1', text: 'useState' },
          { id: 'o2', text: 'useCallback' },
          { id: 'o3', text: 'useEffect' },
          { id: 'o4', text: 'useMemo' },
        ],
        correctOptionId: 'o3',
        explanation: 'useEffect runs after render and is used for side effects like data fetching.',
      },
    ],
  },
];

// ─── Sessions ────────────────────────────────────────────────────────────────

export const mockSessions: Session[] = [
  {
    id: 's1',
    projectId: 'p1',
    mentorId: 'u4',
    studentIds: ['u1', 'u2', 'u7'],
    title: 'Sprint 3 Review & AI Model Evaluation',
    scheduledAt: '2026-10-25T15:00:00',
    durationMinutes: 60,
    status: 'scheduled',
    meetLink: 'https://meet.google.com/demo-link',
  },
  {
    id: 's2',
    projectId: 'p2',
    mentorId: 'u4',
    studentIds: ['u3', 'u1'],
    title: 'Architecture Review for AI Study Buddy',
    scheduledAt: '2026-10-18T14:00:00',
    durationMinutes: 90,
    status: 'completed',
    notes: 'Discussed prompt engineering strategies. Students to implement RAG by next session.',
  },
];

// ─── Notifications ────────────────────────────────────────────────────────────

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: 'u1',
    type: 'application_received',
    title: 'New Application',
    message: 'Karan Singh applied to join Campus Smart Attendance System.',
    read: false,
    createdAt: '2026-10-22T10:30:00',
    actionUrl: '/student/projects/p1',
  },
  {
    id: 'n2',
    userId: 'u1',
    type: 'session_scheduled',
    title: 'Mentorship Session Scheduled',
    message: 'Dr. Meena Iyer scheduled a session for Oct 25 at 3:00 PM.',
    read: false,
    createdAt: '2026-10-21T16:00:00',
    actionUrl: '/student/sessions',
  },
  {
    id: 'n3',
    userId: 'u1',
    type: 'event_reminder',
    title: 'InnoHack 2026 in 24 Days!',
    message: "Don't forget to finalize your team for the hackathon.",
    read: true,
    createdAt: '2026-10-20T09:00:00',
    actionUrl: '/events/e1',
  },
  {
    id: 'n4',
    userId: 'u4',
    type: 'project_update',
    title: 'Project Update',
    message: 'Campus Smart Attendance System has been updated with new progress notes.',
    read: false,
    createdAt: '2026-10-22T08:00:00',
    actionUrl: '/faculty/projects/p1',
  },
];

// ─── Tasks ────────────────────────────────────────────────────────────────────

export const mockTasks: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Set up OpenCV for facial detection',
    description: 'Install and configure OpenCV on the Raspberry Pi. Write initial detection script.',
    assigneeId: 'u1',
    status: 'done',
    priority: 'high',
    dueDate: '2026-10-15',
    createdAt: '2026-10-01',
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Integrate RFID reader with backend',
    assigneeId: 'u2',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-10-28',
    createdAt: '2026-10-05',
  },
  {
    id: 't3',
    projectId: 'p1',
    title: 'Build attendance dashboard UI',
    assigneeId: 'u7',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '2026-11-05',
    createdAt: '2026-10-08',
  },
  {
    id: 't4',
    projectId: 'p1',
    title: 'Write unit tests for attendance API',
    status: 'todo',
    priority: 'low',
    dueDate: '2026-11-15',
    createdAt: '2026-10-10',
  },
];
