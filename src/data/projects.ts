import type { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Campus Smart Attendance System',
    description:
      'An IoT-based attendance system using facial recognition and RFID to automate classroom attendance tracking.',
    longDescription:
      'A comprehensive attendance management solution combining facial recognition AI with RFID card scanning. The system integrates with the college ERP, sends real-time alerts to parents for absentees, and generates detailed analytics for faculty.',
    category: 'IoT',
    status: 'in_progress',
    tags: ['IoT', 'Computer Vision', 'RFID', 'Python', 'React'],
    leadId: 'u1',
    mentorId: 'u4',
    memberIds: ['u1', 'u2', 'u7'],
    createdAt: '2025-09-01',
    updatedAt: '2026-10-10',
    isOpenForApplications: true,
    applicationCount: 5,
    incubationReferred: false,
    githubUrl: 'https://github.com/example/smart-attendance',
  },
  {
    id: 'p2',
    title: 'AI Study Buddy',
    description:
      'A personalized learning assistant that adapts to individual learning styles and provides targeted practice questions.',
    longDescription:
      'Leveraging LLMs to create a conversational study partner. Students can ask questions, get explanations, take adaptive quizzes, and track their progress over time. Integrates with the college course syllabus.',
    category: 'AI / ML',
    status: 'review',
    tags: ['AI', 'LLM', 'Education', 'React', 'FastAPI'],
    leadId: 'u3',
    mentorId: 'u4',
    memberIds: ['u3', 'u1'],
    createdAt: '2025-07-15',
    updatedAt: '2026-10-15',
    isOpenForApplications: false,
    applicationCount: 12,
    incubationReferred: true,
    demoUrl: 'https://ai-buddy.demo.example.com',
    githubUrl: 'https://github.com/example/ai-study-buddy',
  },
  {
    id: 'p3',
    title: 'CampusConnect App',
    description:
      'A mobile-first platform for students to find clubs, events, study groups, and connect with peers.',
    longDescription:
      'A React Native app solving the fragmentation problem in campus communication. Features club discovery, event registration, real-time group chats, and a peer-to-peer skill exchange marketplace.',
    category: 'Mobile App',
    status: 'in_progress',
    tags: ['React Native', 'Firebase', 'Mobile', 'Community'],
    leadId: 'u7',
    mentorId: 'u5',
    memberIds: ['u7', 'u8', 'u2'],
    createdAt: '2025-10-01',
    updatedAt: '2026-10-18',
    isOpenForApplications: true,
    applicationCount: 8,
    incubationReferred: false,
  },
  {
    id: 'p4',
    title: 'SecureVault — Password Manager',
    description:
      'An end-to-end encrypted password manager with zero-knowledge architecture built as an open-source project.',
    category: 'Cybersecurity',
    status: 'completed',
    tags: ['Cybersecurity', 'Encryption', 'Open Source', 'Rust', 'WebAssembly'],
    leadId: 'u3',
    memberIds: ['u3'],
    createdAt: '2024-11-01',
    updatedAt: '2025-06-20',
    isOpenForApplications: false,
    applicationCount: 3,
    incubationReferred: false,
    githubUrl: 'https://github.com/example/securevault',
    demoUrl: 'https://securevault.demo.example.com',
  },
  {
    id: 'p5',
    title: 'AgriSense — Precision Farming IoT',
    description:
      'Low-cost sensor networks for small farmers to monitor soil health, moisture, and weather patterns in real-time.',
    category: 'IoT',
    status: 'incubated',
    tags: ['IoT', 'Agriculture', 'LoRa', 'Data Science', 'Embedded'],
    leadId: 'u8',
    mentorId: 'u5',
    memberIds: ['u8', 'u2'],
    createdAt: '2024-06-01',
    updatedAt: '2026-09-30',
    isOpenForApplications: false,
    applicationCount: 15,
    incubationReferred: true,
  },
  {
    id: 'p6',
    title: 'OpenLMS — Learning Management System',
    description:
      'A free, open-source LMS tailored for Indian colleges with offline-first support and regional language UI.',
    category: 'Web Development',
    status: 'idea',
    tags: ['LMS', 'Education', 'Open Source', 'PWA', 'Offline'],
    leadId: 'u1',
    memberIds: ['u1'],
    createdAt: '2026-10-05',
    updatedAt: '2026-10-05',
    isOpenForApplications: true,
    applicationCount: 0,
    incubationReferred: false,
  },
];

export const getProjectById = (id: string): Project | undefined =>
  mockProjects.find((p) => p.id === id);

export const getProjectsByLead = (leadId: string): Project[] =>
  mockProjects.filter((p) => p.leadId === leadId);

export const getProjectsByMember = (userId: string): Project[] =>
  mockProjects.filter((p) => p.memberIds.includes(userId));

export const getProjectsByMentor = (mentorId: string): Project[] =>
  mockProjects.filter((p) => p.mentorId === mentorId);
