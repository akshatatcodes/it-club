/**
 * Official MIT-ADT Campus Asset & Photography Manifest
 *
 * This manifest documents all visual assets currently used on the website,
 * their classification (Official Campus / Authentic / Curated Illustrative),
 * and exact instructions for the MIT-ADT University media/communications
 * team to supply official high-resolution photographs.
 */

export interface AssetManifestEntry {
  key: string;
  section: string;
  purpose: string;
  currentFile: string;
  type: 'Authentic Campus' | 'Illustrative Lab/Collab' | 'Profile Placeholder' | 'Project Graphic';
  recommendedSpec: string;
  sourceOrAttribution: string;
  replacementTarget: string;
}

export const assetManifest: AssetManifestEntry[] = [
  {
    key: 'campus_hero',
    section: 'Section 1 — Homepage Hero',
    purpose: 'Hero background establishing authentic university scale & architecture',
    currentFile: '/images/campus/campus_hero.jpg',
    type: 'Authentic Campus',
    recommendedSpec: '1920x1080 or 2560x1440, High-Res architectural view of MIT-ADT Rajbaug Campus',
    sourceOrAttribution: 'University architectural photography (Rajbaug Campus, Loni Kalbhor)',
    replacementTarget: 'public/images/campus/campus_hero.jpg',
  },
  {
    key: 'students_collaborating_lab',
    section: 'Section 2 — Vision of the Club',
    purpose: 'MIT-ADT University students presenting technical projects to faculty evaluator',
    currentFile: '/images/campus/mitcom_project_presentation_expo.png',
    type: 'Authentic Campus',
    recommendedSpec: '1200x800, Landscape, Students demonstrating project in grand dome expo hall',
    sourceOrAttribution: 'MIT-ADT University Academic Exhibition & Project Conclave',
    replacementTarget: 'public/images/campus/mitcom_project_presentation_expo.png',
  },
  {
    key: 'campus_life_gallery',
    section: 'Section 3 — Campus & Community Grid (1/5)',
    purpose: 'MIT-ADT University Iconic Rajbaug Campus Academic Complex with Golden Dome',
    currentFile: '/images/campus/campus_building_dome.jpg',
    type: 'Authentic Campus',
    recommendedSpec: '1000x800, Iconic Rajbaug academic complex with golden dome',
    sourceOrAttribution: 'MIT-ADT University Rajbaug Campus',
    replacementTarget: 'public/images/campus/campus_building_dome.jpg',
  },
  {
    key: 'learning_together_gallery',
    section: 'Section 3 — Campus & Community Grid (2/5)',
    purpose: 'Students attending interactive technical lecture at MIT College of Management',
    currentFile: '/images/campus/students_classroom_lecture.png',
    type: 'Authentic Campus',
    recommendedSpec: '1000x800, Interactive smart classroom and seminar sessions',
    sourceOrAttribution: 'MIT College of Management (MITCOM)',
    replacementTarget: 'public/images/campus/students_classroom_lecture.png',
  },
  {
    key: 'faculty_mentorship_gallery',
    section: 'Section 3 — Campus & Community Grid (3/5)',
    purpose: 'Students collaborating on laptops and lab hardware under faculty guidance',
    currentFile: '/images/workshops/mitcom_students_collaborative_lab.png',
    type: 'Authentic Campus',
    recommendedSpec: '1000x800, Collaborative project lab setting at MITCOM',
    sourceOrAttribution: 'MIT College of Management (MITCOM)',
    replacementTarget: 'public/images/workshops/mitcom_students_collaborative_lab.png',
  },
  {
    key: 'building_projects_gallery',
    section: 'Section 3 — Campus & Community Grid (4/5)',
    purpose: 'MITCOM IT Club student team reviewing codebase and project prototypes on laptop',
    currentFile: '/images/workshops/mitcom_students_building_projects.png',
    type: 'Authentic Campus',
    recommendedSpec: '1000x800, Students collaborating on laptop software prototypes',
    sourceOrAttribution: 'MIT College of Management (MITCOM)',
    replacementTarget: 'public/images/workshops/mitcom_students_building_projects.png',
  },
  {
    key: 'innovation_action_gallery',
    section: 'Section 3 — Campus & Community Grid (5/5)',
    purpose: 'Hackathon, project presentation, or technical demo',
    currentFile: '/images/events/hackathon_demo_presentation.jpg',
    type: 'Illustrative Lab/Collab',
    recommendedSpec: '1000x800, Student team pitching before jury/evaluators',
    sourceOrAttribution: 'Hackathon presentation showcase',
    replacementTarget: 'public/images/events/hackathon_demo_presentation.jpg',
  },
  {
    key: 'faculty_portraits',
    section: 'Section 4 — Faculty & Mentorship',
    purpose: 'Portraits for Dr. Rahul Satyakam, Prof. Harshit Kumar, Prof. Dharmendra Singh',
    currentFile: 'Initial-based official crest badges (Ready for genuine portrait drop-in)',
    type: 'Profile Placeholder',
    recommendedSpec: '800x800, Square, Formal academic portrait, Neutral backdrop',
    sourceOrAttribution: 'MIT-ADT University Department Directory (To be supplied by faculty)',
    replacementTarget: 'public/images/faculty/[name].jpg',
  },
  {
    key: 'faculty_facilitation_main',
    section: 'Section 5 — Faculty Facilitating Students',
    purpose: 'Hero photograph of collaborative workshop and guidance session',
    currentFile: '/images/workshops/tech_workshop_discussion.jpg',
    type: 'Illustrative Lab/Collab',
    recommendedSpec: '1200x800, Wide shot of faculty-led technical workshop in amphitheater/hall',
    sourceOrAttribution: 'Illustrative technical workshop (Tagged clearly in UI)',
    replacementTarget: 'public/images/workshops/tech_workshop_discussion.jpg',
  },
  {
    key: 'project_covers',
    section: 'Section 9 — Featured Project Showcase',
    purpose: 'Distinct cover graphics for the 5 demonstration projects',
    currentFile: '/images/projects/*.jpg',
    type: 'Project Graphic',
    recommendedSpec: '800x500, Thematic project graphic or UI preview',
    sourceOrAttribution: 'Curated technical project covers',
    replacementTarget: 'public/images/projects/*.jpg',
  },
  {
    key: 'campus_evening',
    section: 'Section 13 — Final Call to Action',
    purpose: 'Cinematic wide shot of university campus inspiring students to join',
    currentFile: '/images/campus/campus_evening_lights.jpg',
    type: 'Authentic Campus',
    recommendedSpec: '1600x900, Evening architectural illumination of campus',
    sourceOrAttribution: 'University campus architecture',
    replacementTarget: 'public/images/campus/campus_evening_lights.jpg',
  },
];

