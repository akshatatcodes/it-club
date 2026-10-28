import type { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Akshat Jain',
    email: 'akshat.jain@mituniversity.edu.in',
    role: 'student',
    department: 'Information Technology',
    year: 3,
    designation: 'Student Innovator & Tech Lead',
    interests: 'Cybersecurity, Web Development, and Innovation',
    currentProject: 'Campus Connect & CyberShield Lab',
    bio: 'Passionate student builder focusing on secure web architectures, modern cloud solutions, and student collaboration.',
    skills: ['Cybersecurity', 'Web Development', 'React', 'TypeScript', 'Cloud Architecture'],
    joinedAt: '2024-08-01',
  },
  {
    id: 'u2',
    name: 'Prachi Kumari',
    email: 'prachi.kumari@mituniversity.edu.in',
    role: 'student',
    department: 'Information Technology',
    year: 3,
    designation: 'Research Lead & Full-Stack Developer',
    interests: 'Software Development and Research',
    currentProject: 'Student Research Explorer',
    bio: 'Focused on software engineering rigor, academic research in computing, and building data-driven tools.',
    skills: ['Software Engineering', 'Research', 'Python', 'Algorithms', 'FastAPI'],
    joinedAt: '2024-08-01',
  },
  {
    id: 'u3',
    name: 'Roshan Bagale',
    email: 'roshan.bagale@mituniversity.edu.in',
    role: 'student',
    department: 'Computer Science',
    year: 2,
    designation: 'AI / ML Developer',
    interests: 'AI, Data Science, and Project Development',
    currentProject: 'Smart Campus Assistant',
    bio: 'Exploring applied machine learning, conversational agents, and data science for university infrastructure.',
    skills: ['AI / ML', 'Data Science', 'Python', 'PyTorch', 'Data Visualization'],
    joinedAt: '2025-08-01',
  },
  {
    id: 'u4',
    name: 'Dr. Rahul Satyakam',
    email: 'rahul.satyakam@mituniversity.edu.in',
    role: 'faculty',
    department: 'School of Computing, MIT-ADT University',
    designation: 'Associate Professor & Faculty Mentor',
    bio: 'Distinguished researcher and academic mentor specializing in Cloud Computing, Fog architectures, and IoT. Mentoring student innovation teams since 2018.',
    skills: ['Cloud Computing', 'Fog Computing', 'IoT Systems', 'Student Mentorship'],
    joinedAt: '2018-06-01',
  },
  {
    id: 'u5',
    name: 'Prof. Harshit Kumar',
    email: 'harshit.kumar@mituniversity.edu.in',
    role: 'faculty',
    department: 'Information Technology, MIT-ADT University',
    designation: 'Assistant Professor & Technical Advisor',
    bio: 'Specialist in modern web infrastructure, distributed databases, and software engineering practices. Actively guiding team project sprints and architecture reviews.',
    skills: ['Web Infrastructure', 'Database Systems', 'Software Engineering', 'System Architecture'],
    joinedAt: '2020-07-01',
  },
  {
    id: 'u6',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@mituniversity.edu.in',
    role: 'admin',
    department: 'IT Club Administration, MIT-ADT University',
    designation: 'Club Coordinator & Platform Admin',
    bio: 'Platform administrator and student operations coordinator ensuring seamless execution of hackathons, workshops, and project reviews.',
    skills: ['Operations', 'Technical Coordination', 'Event Planning', 'Community Building'],
    joinedAt: '2023-01-01',
  },
  {
    id: 'u7',
    name: 'Ziya Shaikh',
    email: 'ziya.shaikh@mituniversity.edu.in',
    role: 'student',
    department: 'Computer Science & Design',
    year: 2,
    designation: 'UI/UX & Frontend Specialist',
    interests: 'UI/UX, Web Technologies, and Creative Problem-Solving',
    currentProject: 'Green Campus Initiative',
    bio: 'Dedicated to human-centered design, accessible design systems, and crafting responsive frontend experiences.',
    skills: ['UI/UX Design', 'Figma', 'Web Technologies', 'Tailwind CSS', 'User Research'],
    joinedAt: '2025-08-01',
  },
  {
    id: 'u8',
    name: 'Prof. Dharmendra Singh',
    email: 'dharmendra.singh@mituniversity.edu.in',
    role: 'faculty',
    department: 'Information Technology, MIT-ADT University',
    designation: 'Assistant Professor & Research Coordinator',
    bio: 'Researches sustainable information systems, green computing paradigms, and algorithmic optimization. Mentors multidisciplinary research groups.',
    skills: ['Green Computing', 'AI Frameworks', 'Information Systems', 'Research Mentorship'],
    joinedAt: '2019-06-01',
  },
];

export const demoStudentUser = mockUsers[0]; // Akshat Jain
export const demoFacultyUser = mockUsers[3]; // Dr. Rahul Satyakam
export const demoAdminUser = mockUsers[5];   // Aarav Mehta

export const facultyShowcase = [
  {
    user: mockUsers[3], // Dr. Rahul Satyakam
    title: 'Dr. Rahul Satyakam',
    designation: 'Associate Professor & Faculty Mentor',
    department: 'School of Computing, MIT-ADT University',
    expertise: 'Cloud Computing, Fog Architectures, IoT & Distributed Systems',
    bio: 'Guides students through architectural decisions, performance evaluation, and preparation for technical publication and incubation review.',
    image: '/images/faculty/rahul_satyakam.jpg',
  },
  {
    user: mockUsers[4], // Prof. Harshit Kumar
    title: 'Prof. Harshit Kumar',
    designation: 'Assistant Professor & Technical Advisor',
    department: 'Department of Information Technology, MIT-ADT University',
    expertise: 'Web Infrastructure, Database Engineering, Full-Stack Architecture',
    bio: 'Conducts weekly code reviews, advises on cloud deployment pipelines, and helps students bridge the gap between classroom theory and industry practice.',
    image: '/images/faculty/harshit_kumar.jpg',
  },
  {
    user: mockUsers[7], // Prof. Dharmendra Singh
    title: 'Prof. Dharmendra Singh',
    designation: 'Assistant Professor & Research Coordinator',
    department: 'Department of Information Technology, MIT-ADT University',
    expertise: 'AI Frameworks, Green Computing, Information Systems',
    bio: 'Assists student teams in problem formulation, algorithmic efficiency, and connecting technology projects with social and campus impact.',
    image: '/images/faculty/dharmendra_singh.jpg',
  },
];

export const studentShowcase = [
  mockUsers[0], // Akshat Jain
  mockUsers[1], // Prachi Kumari
  mockUsers[2], // Roshan Bagale
  mockUsers[6], // Ziya Shaikh
];

export const getUserById = (id: string): User | undefined =>
  mockUsers.find((u) => u.id === id);
