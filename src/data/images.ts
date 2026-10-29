/**
 * Centralized Asset & Image Configuration for MIT-ADT IT Club & Innovation Hub
 *
 * All images are organized in /public/images/ with structured fallbacks.
 * To replace any photo with an official high-res shot, simply place the file in the designated path.
 */

export interface ImageAsset {
  src: string;
  fallback?: string;
  alt: string;
  caption?: string;
  isIllustrative?: boolean;
  credit?: string;
}

export const campusAssets = {
  hero: {
    src: '/images/campus/mit_adt_campus_hero.jpg',
    alt: 'MIT-ADT University Rajbaug Pune Iconic Academic Complex with Golden Dome',
    caption: 'MIT-ADT University · Rajbaug Campus, Loni Kalbhor, Pune',
    isIllustrative: false,
    credit: 'MIT-ADT University Rajbaug Campus',
  },
  visionCollab: {
    src: '/images/campus/mitcom_project_presentation_expo.png',
    alt: 'MIT-ADT University students presenting technical projects to faculty evaluator',
    caption: 'Student technology demonstration and project evaluation',
    isIllustrative: false,
  },
  eveningCta: {
    src: '/images/campus/campus_evening_lights.jpg',
    alt: 'MIT-ADT University grounds and collaborative innovation space',
    caption: 'Campus Innovation Center at Rajbaug',
    isIllustrative: true,
  },
  gallery: [
    {
      id: 'campus-life',
      title: 'Campus Life',
      description: 'Iconic golden dome academic building and lush 125-acre university grounds at Rajbaug, Pune.',
      src: '/images/campus/campus_building_dome.jpg',
      alt: 'MIT-ADT University Iconic Rajbaug Campus Academic Complex with Golden Dome',
      isIllustrative: false,
      tag: 'Rajbaug Campus',
    },
    {
      id: 'learning-together',
      title: 'Learning Together',
      description: 'Interactive classroom lectures, technical seminars, and student cohort sessions at MIT College of Management.',
      src: '/images/campus/students_classroom_lecture.png',
      alt: 'Students attending interactive technical lecture at MIT College of Management',
      isIllustrative: false,
      tag: 'Classroom & Labs',
    },
    {
      id: 'faculty-mentorship',
      title: 'Faculty Mentorship',
      description: 'Experienced professors guiding student teams through research problems, software design, and hardware prototypes.',
      src: '/images/workshops/mitcom_students_collaborative_lab.png',
      alt: 'Students collaborating on laptops and lab hardware under faculty guidance at MIT College of Management',
      isIllustrative: false,
      tag: 'Academic Guidance',
    },
    {
      id: 'building-projects',
      title: 'Building Real Projects',
      description: 'Translating whiteboard ideas into robust software and technological prototypes ready for evaluation.',
      src: '/images/workshops/mitcom_students_building_projects.png',
      alt: 'MITCOM IT Club student team reviewing codebase and project prototypes on laptop',
      isIllustrative: false,
      tag: 'Project Teams',
    },
    {
      id: 'innovation-action',
      title: 'Innovation in Action',
      description: 'Annual hackathons, project showcases, and student demonstrations before faculty and industry panels.',
      src: '/images/events/hackathon_demo_presentation.jpg',
      alt: 'Student teams demonstrating technological solutions to faculty reviewers',
      isIllustrative: true,
      tag: 'Showcase',
    },
  ],
  facultyFacilitation: {
    main: {
      src: '/images/workshops/tech_workshop_discussion.jpg',
      alt: 'Faculty mentor facilitating an interactive technical discussion and project review',
      caption: 'Interactive faculty-led project evaluation session',
      isIllustrative: true,
    },
    secondary1: {
      src: '/images/workshops/project_review_session.jpg',
      alt: 'Faculty and student team reviewing code architecture and project milestones',
      caption: 'Detailed architecture reviews',
      isIllustrative: true,
    },
    secondary2: {
      src: '/images/workshops/collaborative_lab_mentoring.jpg',
      alt: 'Mentoring session in computing lab focusing on problem solving',
      caption: 'Practical lab-based mentorship',
      isIllustrative: true,
    },
  },
  projects: {
    campusConnect: {
      src: '/images/projects/project_campus_connect.jpg',
      alt: 'Campus Connect Platform interface and collaborative ecosystem',
    },
    smartAssistant: {
      src: '/images/projects/project_smart_assistant.jpg',
      alt: 'AI-driven Smart Campus Assistant architecture and natural language interface',
    },
    cyberShield: {
      src: '/images/projects/project_cybershield.jpg',
      alt: 'CyberShield security simulation laboratory and threat analysis tools',
    },
    researchExplorer: {
      src: '/images/projects/project_research_explorer.jpg',
      alt: 'Student Research Explorer indexing academic papers and faculty publications',
    },
    greenCampus: {
      src: '/images/projects/project_green_campus.jpg',
      alt: 'Green Campus environmental monitoring sensors and IoT energy metrics',
    },
  },
  events: {
    hackathon: {
      src: '/images/events/event_annual_hackathon.jpg',
      alt: 'MIT-ADT University Annual Hackathon and coding challenge',
    },
    aiMasterclass: {
      src: '/images/events/event_ai_masterclass.jpg',
      alt: 'Faculty-led AI and deep learning practical masterclass',
    },
    pitchDay: {
      src: '/images/events/event_pitch_day.jpg',
      alt: 'Student project demonstration and Crieya incubation review day',
    },
  },
};

