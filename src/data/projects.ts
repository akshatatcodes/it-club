import type { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Campus Connect',
    description:
      'A unified digital hub connecting students across faculties to discover peer projects, technical study circles, and campus hackathons.',
    longDescription:
      'Campus Connect provides a central collaborative platform for MIT-ADT University students. It bridges communication gaps across different engineering and design departments, streamlining project discovery, peer-to-peer mentoring, and team formation for innovation competitions.',
    problemStatement:
      'Students across different schools (Engineering, Design, Film) struggle to discover interdisciplinary teammates and campus initiatives.',
    proposedSolution:
      'An intuitive cross-department collaborative portal featuring automated skill-matching, project boards, and faculty review integration.',
    category: 'Web Development',
    status: 'in_progress',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Collaboration'],
    leadId: 'u1', // Akshat Jain
    mentorId: 'u4', // Dr. Rahul Satyakam
    memberIds: ['u1', 'u2', 'u7'],
    createdAt: '2025-09-01',
    updatedAt: '2026-10-10',
    isOpenForApplications: true,
    applicationCount: 6,
    incubationReferred: false,
    thumbnail: '/images/projects/project_campus_connect.jpg',
    isDemoContent: true,
    githubUrl: 'https://github.com/mitadt-itclub/campus-connect',
  },
  {
    id: 'p2',
    title: 'Smart Campus Assistant',
    description:
      'An intelligent campus conversational assistant helping students navigate academic resources, lab schedules, and club activities.',
    longDescription:
      'A student-built AI assistant powered by natural language processing and retrieval-augmented generation. It provides immediate answers to questions about computer lab availability, library hours, upcoming technical workshops, and club project applications.',
    problemStatement:
      'Finding real-time answers about campus resources, lab access, and technical schedules is often fragmented across multiple notice boards.',
    proposedSolution:
      'A responsive conversational AI assistant trained on university verified student guidelines, calendar schedules, and club FAQs.',
    category: 'AI / ML',
    status: 'review',
    tags: ['AI / ML', 'Python', 'FastAPI', 'PyTorch', 'Vector DB'],
    leadId: 'u3', // Roshan Bagale
    mentorId: 'u4', // Dr. Rahul Satyakam
    memberIds: ['u3', 'u1'],
    createdAt: '2025-07-15',
    updatedAt: '2026-10-15',
    isOpenForApplications: false,
    applicationCount: 14,
    incubationReferred: true,
    thumbnail: '/images/projects/project_smart_assistant.jpg',
    isDemoContent: true,
    demoUrl: 'https://smart-campus.demo.example.com',
    githubUrl: 'https://github.com/mitadt-itclub/smart-campus-assistant',
  },
  {
    id: 'p3',
    title: 'CyberShield Learning Lab',
    description:
      'An interactive ethical hacking and cybersecurity laboratory providing sandbox challenges and defense exercises for students.',
    longDescription:
      'A hands-on cybersecurity simulation platform designed by students for practical defense training. Features structured labs covering web application security, network forensics, secure coding standards, and vulnerability assessment.',
    problemStatement:
      'Students need practical, secure sandboxes to practice real-world defensive cybersecurity techniques beyond textbook concepts.',
    proposedSolution:
      'Containerized learning environments with real-time feedback, capture-the-flag scenarios, and guided defense walkthroughs.',
    category: 'Cybersecurity',
    status: 'in_progress',
    tags: ['Cybersecurity', 'Docker', 'Linux', 'Network Security', 'TypeScript'],
    leadId: 'u1', // Akshat Jain
    mentorId: 'u5', // Prof. Harshit Kumar
    memberIds: ['u1', 'u3'],
    createdAt: '2025-10-01',
    updatedAt: '2026-10-18',
    isOpenForApplications: true,
    applicationCount: 9,
    incubationReferred: false,
    thumbnail: '/images/projects/project_cybershield.jpg',
    isDemoContent: true,
  },
  {
    id: 'p4',
    title: 'Student Research Explorer',
    description:
      'A knowledge discovery platform curating undergraduate research publications, datasets, and faculty-guided technical papers.',
    longDescription:
      'Designed to foster an early culture of research at MIT-ADT University. The platform catalogs student research papers, ongoing faculty projects, open research questions, and collaborative paper writing opportunities.',
    problemStatement:
      'Undergraduate research efforts often go unnoticed without a central repository to highlight publications and student findings.',
    proposedSolution:
      'A searchable publication showcase with citation analytics, faculty endorsement tags, and peer research collaboration tools.',
    category: 'Data Science',
    status: 'completed',
    tags: ['Research', 'Python', 'Information Retrieval', 'React', 'Data Science'],
    leadId: 'u2', // Prachi Kumari
    mentorId: 'u8', // Prof. Dharmendra Singh
    memberIds: ['u2', 'u7'],
    createdAt: '2024-11-01',
    updatedAt: '2025-06-20',
    isOpenForApplications: false,
    applicationCount: 5,
    incubationReferred: false,
    thumbnail: '/images/projects/project_research_explorer.jpg',
    isDemoContent: true,
    demoUrl: 'https://research-explorer.demo.example.com',
  },
  {
    id: 'p5',
    title: 'Green Campus Initiative',
    description:
      'An IoT sensor network and environmental analytics dashboard tracking energy usage and ambient metrics across Rajbaug campus.',
    longDescription:
      'Combining environmental IoT sensors with modern data visualization to monitor campus energy conservation, indoor air quality, and outdoor ambient temperature throughout the 125-acre Rajbaug campus.',
    problemStatement:
      'Understanding real-time resource consumption and environmental data across a sprawling campus requires modern telemetry.',
    proposedSolution:
      'Low-power sensor nodes linked to a central analytics dashboard that provides actionable conservation insights for the university.',
    category: 'IoT',
    status: 'incubated',
    tags: ['IoT', 'Sustainability', 'Green Computing', 'MQTT', 'Analytics'],
    leadId: 'u7', // Ziya Shaikh
    mentorId: 'u8', // Prof. Dharmendra Singh
    memberIds: ['u7', 'u2'],
    createdAt: '2024-06-01',
    updatedAt: '2026-09-30',
    isOpenForApplications: false,
    applicationCount: 16,
    incubationReferred: true,
    thumbnail: '/images/projects/project_green_campus.jpg',
    isDemoContent: true,
  },
  {
    id: 'p6',
    title: 'OpenLMS — Adaptive Learning Engine',
    description:
      'A modern student-first learning companion with interactive quizzes, revision schedules, and offline-first mobile support.',
    category: 'Web Development',
    status: 'idea',
    tags: ['PWA', 'Education', 'Offline First', 'TypeScript'],
    leadId: 'u1',
    memberIds: ['u1'],
    createdAt: '2026-10-05',
    updatedAt: '2026-10-05',
    isOpenForApplications: true,
    applicationCount: 0,
    incubationReferred: false,
    isDemoContent: true,
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
