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
    purpose: 'Demonstrate students working together in a university computing environment',
    currentFile: '/images/campus/students_collaborating_lab.jpg',
    type: 'Illustrative Lab/Collab',
    recommendedSpec: '1200x800, Landscape, Students collaborating in MIT-ADT computing lab',
    sourceOrAttribution: 'Curated university lab photography (Educational use)',
    replacementTarget: 'public/images/campus/students_collaborating_lab.jpg',
  },
  {
    key: 'campus_life_gallery',
    section: 'Section 3 — Campus & Community Grid (1/5)',
    purpose: 'Campus greenery, walkways, and modern building exterior',
    currentFile: '/images/campus/campus_walkway.jpg',
    type: 'Authentic Campus',
    recommendedSpec: '1000x800, Rajbaug riverside walkways or academic courtyard',
    sourceOrAttribution: 'MIT-ADT Vishwarajbaug green campus',
    replacementTarget: 'public/images/campus/campus_walkway.jpg',
  },
  {
    key: 'learning_together_gallery',
    section: 'Section 3 — Campus & Community Grid (2/5)',
    purpose: 'Students engaged in group technical study and idea discussion',
    currentFile: '/images/campus/students_study_group.jpg',
    type: 'Illustrative Lab/Collab',
    recommendedSpec: '1000x800, Students studying in library or innovation commons',
    sourceOrAttribution: 'Collaborative student study setting',
    replacementTarget: 'public/images/campus/students_study_group.jpg',
  },
  {
    key: 'faculty_mentorship_gallery',
    section: 'Section 3 — Campus & Community Grid (3/5)',
    purpose: 'Faculty member guiding engineering students in technical discussion',
    currentFile: '/images/workshops/faculty_mentorship_illustrative.jpg',
    type: 'Illustrative Lab/Collab',
    recommendedSpec: '1000x800, Official faculty guiding project team in classroom/lab',
    sourceOrAttribution: 'Illustrative faculty-student interaction',
    replacementTarget: 'public/images/workshops/faculty_mentorship_illustrative.jpg',
  },
  {
    key: 'building_projects_gallery',
    section: 'Section 3 — Campus & Community Grid (4/5)',
    purpose: 'Hardware/software prototyping in laboratory',
    currentFile: '/images/workshops/students_building_hardware.jpg',
    type: 'Illustrative Lab/Collab',
    recommendedSpec: '1000x800, Students in IoT/Embedded/Software lab building solutions',
    sourceOrAttribution: 'Student laboratory development',
    replacementTarget: 'public/images/workshops/students_building_hardware.jpg',
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

