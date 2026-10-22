import type { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@college.edu',
    role: 'student',
    department: 'Computer Science',
    year: 3,
    bio: 'Passionate full-stack developer interested in AI and open-source contributions.',
    skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
    joinedAt: '2024-08-01',
  },
  {
    id: 'u2',
    name: 'Priya Nair',
    email: 'priya.nair@college.edu',
    role: 'student',
    department: 'Electronics & Communication',
    year: 2,
    bio: 'IoT enthusiast and hardware hacker. Love building things that talk to each other.',
    skills: ['Arduino', 'Raspberry Pi', 'C++', 'MQTT'],
    joinedAt: '2025-08-01',
  },
  {
    id: 'u3',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@college.edu',
    role: 'student',
    department: 'Information Technology',
    year: 4,
    bio: 'Final year student focusing on cybersecurity and ethical hacking.',
    skills: ['Cybersecurity', 'Networking', 'Python', 'Linux'],
    joinedAt: '2023-08-01',
  },
  {
    id: 'u4',
    name: 'Dr. Meena Iyer',
    email: 'meena.iyer@college.edu',
    role: 'faculty',
    department: 'Computer Science',
    bio: 'Associate Professor specializing in AI/ML. PhD from IIT Bombay. Mentoring student projects since 2018.',
    skills: ['Machine Learning', 'Deep Learning', 'Python', 'Research'],
    joinedAt: '2018-06-01',
  },
  {
    id: 'u5',
    name: 'Prof. Suresh Patel',
    email: 'suresh.patel@college.edu',
    role: 'faculty',
    department: 'Information Technology',
    bio: 'Professor of IT with expertise in distributed systems and cloud computing.',
    skills: ['Cloud Computing', 'Distributed Systems', 'Java', 'Docker'],
    joinedAt: '2015-06-01',
  },
  {
    id: 'u6',
    name: 'Aditya Kumar',
    email: 'aditya.kumar@college.edu',
    role: 'admin',
    department: 'IT Club Administration',
    bio: 'Club coordinator and platform administrator. Ensuring smooth operations of the IT Club.',
    skills: ['Management', 'Communication', 'Administration'],
    joinedAt: '2022-01-01',
  },
  {
    id: 'u7',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@college.edu',
    role: 'student',
    department: 'Computer Science',
    year: 2,
    bio: 'UI/UX designer and frontend developer passionate about creating beautiful, accessible interfaces.',
    skills: ['Figma', 'React', 'CSS', 'Accessibility'],
    joinedAt: '2025-08-01',
  },
  {
    id: 'u8',
    name: 'Karan Singh',
    email: 'karan.singh@college.edu',
    role: 'student',
    department: 'Mechanical Engineering',
    year: 3,
    bio: 'Mechatronics enthusiast bridging the gap between hardware and software.',
    skills: ['CAD', 'Arduino', 'Python', '3D Printing'],
    joinedAt: '2024-08-01',
  },
];

export const demoStudentUser = mockUsers[0];
export const demoFacultyUser = mockUsers[3];
export const demoAdminUser = mockUsers[5];

export const getUserById = (id: string): User | undefined =>
  mockUsers.find((u) => u.id === id);
