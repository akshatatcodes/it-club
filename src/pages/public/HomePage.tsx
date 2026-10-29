import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Lightbulb,
  Users,
  Trophy,
  BookOpen,
  Rocket,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  GraduationCap,
  Shield,
  FolderKanban,
  Target,
  ArrowUpRight,
  UserCheck,
  Building2,
  Info
} from 'lucide-react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { PrimaryButton, SecondaryButton } from '../../components/ui/Button';
import { EventCard } from '../../components/ui/EventCard';
import { mockProjects } from '../../data/projects';
import { mockEvents } from '../../data/mock';
import { facultyShowcase, studentShowcase, getUserById } from '../../data/users';
import { campusAssets } from '../../data/images';
import { getInitials } from '../../utils';

export function HomePage() {
  // 5 featured demonstration projects
  const featuredProjects = mockProjects.slice(0, 5);
  // Upcoming events
  const upcomingEvents = mockEvents.slice(0, 3);

  // Innovation Journey Stages
  const journeyStages = [
    {
      num: '01',
      title: 'IDEA',
      desc: 'A student identifies a campus or real-world problem and articulates a proposed technological solution.',
      icon: <Lightbulb size={20} />,
      tag: 'Submission',
    },
    {
      num: '02',
      title: 'TEAM',
      desc: 'Interested students with complementary skill sets connect, establish roles, and form a project squad.',
      icon: <Users size={20} />,
      tag: 'Collaboration',
    },
    {
      num: '03',
      title: 'PLAN',
      desc: 'The team defines technical architecture, tool stacks, task breakdowns, and semester milestones.',
      icon: <Target size={20} />,
      tag: 'Roadmap',
    },
    {
      num: '04',
      title: 'MENTORSHIP',
      desc: 'Faculty mentors provide guidance, review technical design choices, and validate progress milestones.',
      icon: <GraduationCap size={20} />,
      tag: 'Faculty Guidance',
    },
    {
      num: '05',
      title: 'BUILD',
      desc: 'Students develop prototypes, run test cases, conduct peer code reviews, and refine deliverables.',
      icon: <Code2 size={20} />,
      tag: 'Engineering',
    },
    {
      num: '06',
      title: 'SHOWCASE',
      desc: 'Teams demonstrate their functioning project at campus showcases and receive evaluation feedback.',
      icon: <Trophy size={20} />,
      tag: 'Presentation',
    },
    {
      num: '07',
      title: 'INCUBATION',
      desc: 'Eligible projects may be considered for referral to Crieya, subject to institutional process and evaluation.',
      icon: <Rocket size={20} />,
      tag: 'Crieya Opportunity',
    },
  ];

  // What Students Actually Do (6 Features)
  const studentFeatures = [
    {
      icon: <Lightbulb size={24} />,
      title: 'Share an Idea',
      description: 'Propose problems worth solving. Students can articulate ideas, receive peer upvotes, and attract enthusiastic collaborators.',
      badge: 'Ideation',
      color: '#3678B7',
    },
    {
      icon: <Users size={24} />,
      title: 'Find Your Team',
      description: 'Discover peers with complementary capabilities across web, AI, IoT, and design without traditional department barriers.',
      badge: 'Teammates',
      color: '#102743',
    },
    {
      icon: <FolderKanban size={24} />,
      title: 'Build Real Projects',
      description: 'Work on structured milestones with task tracking, version control, and faculty reviews to create deployable systems.',
      badge: 'Execution',
      color: '#22C55E',
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Learn Together',
      description: 'Access curated technical articles, practice quizzes, and workshops authored by senior students and faculty members.',
      badge: 'Knowledge',
      color: '#F59E0B',
    },
    {
      icon: <GraduationCap size={24} />,
      title: 'Learn from Faculty',
      description: 'Receive experienced guidance on system architecture, research methodology, and preparation for technical publications.',
      badge: 'Mentorship',
      color: '#17365D',
    },
    {
      icon: <Rocket size={24} />,
      title: 'Explore Incubation',
      description: 'Eligible, high-potential projects can prepare documentation for evaluation and referral to the Crieya incubation pipeline.',
      badge: 'Pre-Incubation',
      color: '#8B5CF6',
    },
  ];

  return (
    <PublicLayout>
      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 1: HIGH-ENERGY MITCOM TECH HERO (RESPONSIVE & CLEAN)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${campusAssets.hero.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 14%',
          overflow: 'hidden',
        }}
      >
        {/* Smooth Clean Cinematic Backdrop Overlay */}
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

        {/* Ambient Cyan & Indigo Glows */}
        <div className="hero-subtle-glow" style={{ zIndex: 2 }} />
        <div className="hero-glow-secondary" style={{ zIndex: 2 }} />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: 1060,
            width: '100%',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Main Headline */}
          <h1 className="hero-title">
            Where Code Meets Leadership. <br />
            <span className="text-gradient-cyan" style={{ display: 'inline-block' }}>
              MITCOM IT Club & Innovation Hub
            </span>
          </h1>

          {/* Supporting Copy explicitly stating MITCOM and Department of Computer Applications */}
          <p className="hero-description" style={{ marginBottom: 36 }}>
            The official student-faculty technology club of <strong style={{ color: '#ffffff' }}>MIT College of Management (MITCOM)</strong>, <strong style={{ color: '#93C5FD' }}>Department of Computer Applications</strong> at MIT-ADT University, Pune. Empowering BCA & MCA innovators to architect production-grade software, win national hackathons, and launch pre-incubated ventures under faculty mentorship.
          </p>

          {/* Action CTAs */}
          <div className="hero-cta-group">
            <Link to="/demo" style={{ textDecoration: 'none' }}>
              <PrimaryButton
                size="lg"
                style={{
                  background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
                  color: '#ffffff',
                  borderColor: '#38BDF8',
                  fontWeight: 700,
                  boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4), 0 0 16px rgba(56, 189, 248, 0.3)',
                  padding: '14px 30px',
                }}
                rightIcon={<ArrowRight size={18} />}
              >
                Explore Innovation Hub
              </PrimaryButton>
            </Link>

            <a href="#vision" style={{ textDecoration: 'none' }}>
              <SecondaryButton
                size="lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  borderColor: 'rgba(255, 255, 255, 0.35)',
                  color: '#ffffff',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                  padding: '14px 28px',
                }}
              >
                Discover the IT Club
              </SecondaryButton>
            </a>
          </div>

          {/* 4 Interactive High-Tech Glass Stat Cards */}
          <div className="hero-stat-grid">
            <div className="glass-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ padding: 6, borderRadius: 8, background: 'rgba(56, 189, 248, 0.2)' }}>
                  <Users size={18} color="#38BDF8" />
                </div>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#ffffff' }}>500+</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#93C5FD' }}>BCA & MCA Members</div>
              <div style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.65)' }}>Active student tech community</div>
            </div>

            <div className="glass-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ padding: 6, borderRadius: 8, background: 'rgba(34, 197, 94, 0.2)' }}>
                  <Code2 size={18} color="#4ADE80" />
                </div>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#ffffff' }}>40+</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#86EFAC' }}>Live Deployments</div>
              <div style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.65)' }}>Full-stack web, AI & mobile apps</div>
            </div>

            <div className="glass-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ padding: 6, borderRadius: 8, background: 'rgba(245, 158, 11, 0.2)' }}>
                  <Trophy size={18} color="#FBBF24" />
                </div>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#ffffff' }}>15+</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#FDE68A' }}>Hackathons & Quizzes</div>
              <div style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.65)' }}>State & national tech awards</div>
            </div>

            <div className="glass-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ padding: 6, borderRadius: 8, background: 'rgba(139, 92, 246, 0.2)' }}>
                  <Rocket size={18} color="#C084FC" />
                </div>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#ffffff' }}>Crieya</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#E9D5FF' }}>Pre-Incubation</div>
              <div style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.65)' }}>Campus venture accelerator pathway</div>
            </div>
          </div>

          {/* Scroll Down Visual Cue */}
          <a
            href="#vision"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 12,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
          >
            <span style={{ letterSpacing: '0.08em', fontWeight: 600 }}>DISCOVER MITCOM VISION</span>
            <ChevronDown size={18} style={{ animation: 'floatGentle 2s infinite ease-in-out' }} />
          </a>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 2: THE VISION OF THE CLUB (Editorial 2-Column)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="vision"
        style={{
          padding: '96px 24px',
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          {/* Top 2-Column Overview */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 48,
              alignItems: 'center',
            }}
          >
            {/* Left Column: Vision Context */}
            <div>
              <span className="section-eyebrow">MITCOM · DEPARTMENT OF COMPUTER APPLICATIONS</span>
              <h2
                style={{
                  fontSize: 'clamp(30px, 3.8vw, 44px)',
                  fontWeight: 800,
                  color: 'var(--color-primary-navy)',
                  lineHeight: 1.2,
                  marginBottom: 20,
                }}
              >
                Fostering Next-Gen Tech Leaders <br />
                <span style={{ color: 'var(--color-accent)' }}>at MIT College of Management.</span>
              </h2>

              <p
                style={{
                  fontSize: 17,
                  color: 'var(--color-text)',
                  lineHeight: 1.7,
                  marginBottom: 20,
                  fontWeight: 400,
                }}
              >
                The <strong>MITCOM IT Club & Innovation Hub</strong> is established under the <strong>Department of Computer Applications</strong> at <strong>MIT-ADT University, Pune</strong>. It serves as a specialized high-impact incubator where BCA and MCA scholars turn theoretical computer science into production software systems.
              </p>

              <p
                style={{
                  fontSize: 15,
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: 32,
                }}
              >
                Rather than keeping classroom learning in isolation, this platform provides a structured, supportive framework where students across Computer Applications collaborate side-by-side on projects that solve genuine campus challenges, engage in hackathons, publish technical research, and prepare for Crieya pre-incubation.
              </p>

              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <Link to="/demo" style={{ textDecoration: 'none' }}>
                  <PrimaryButton size="md" rightIcon={<ArrowRight size={16} />}>
                    Discover the Platform
                  </PrimaryButton>
                </Link>
                <Link to="/workflow" style={{ textDecoration: 'none' }}>
                  <SecondaryButton size="md">View 7-Step Workflow</SecondaryButton>
                </Link>
              </div>
            </div>

            {/* Right Column: High Quality Photographic Composition */}
            <div className="img-zoom-container" style={{ borderRadius: 20, boxShadow: 'var(--shadow-elevated)', overflow: 'hidden' }}>
              <img
                src={campusAssets.visionCollab.src}
                alt={campusAssets.visionCollab.alt}
                className="img-zoom"
                style={{
                  width: '100%',
                  height: 460,
                  objectFit: 'cover',
                  display: 'block',
                  borderRadius: 20,
                }}
              />
            </div>
          </div>

          {/* Institutional Breakdown: MITCOM, Dept of Computer Applications, & IT Club */}
          <div style={{ marginTop: 72, paddingTop: 52, borderTop: '1px solid var(--color-border)' }}>
            <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 44px' }}>
              <span className="section-eyebrow">INSTITUTIONAL FOUNDATION · MIT-ADT UNIVERSITY</span>
              <h3
                style={{
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 800,
                  color: 'var(--color-primary-navy)',
                  marginBottom: 12,
                }}
              >
                About MITCOM & The IT Club
              </h3>
              <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                Rooted in the prestigious academic ecosystem of MIT Art, Design and Technology University, Pune, combining industry-aligned computer application programs with a high-impact student technology society.
              </p>
            </div>

            {/* 3 Comprehensive Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 28,
              }}
            >
              {/* Card 1: MITCOM */}
              <div
                className="card card-hover"
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: 18,
                  padding: 32,
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      background: 'rgba(56, 189, 248, 0.12)',
                      color: '#0284C7',
                      padding: '4px 10px',
                      borderRadius: 6,
                      letterSpacing: '0.04em',
                    }}
                  >
                    ESTD. 2007 · MIT-ADT
                  </span>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--color-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
                    <Building2 size={20} />
                  </div>
                </div>

                <h4 style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: 12 }}>
                  MIT College of Management
                </h4>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                  Founded in 2007 on the scenic 125-acre Rajbaug Campus in Pune, MITCOM is a flagship constituent institute of MIT-ADT University. It is dedicated to delivering practice-based education blending managerial leadership, case-study pedagogy, and technological innovation.
                </p>

                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--color-border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--color-text)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                    <span>Lush 125-acre green Rajbaug University Campus</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--color-text)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                    <span>Central Digital Library (EBSCO, DELNET, J-Gate)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--color-text)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                    <span>Smart air-conditioned ICT classrooms & seminar halls</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--color-text)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                    <span>Dedicated corporate placement & industry interface cell</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Department of Computer Applications */}
              <div
                className="card card-hover"
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: 18,
                  padding: 32,
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      background: 'rgba(34, 197, 94, 0.12)',
                      color: '#16A34A',
                      padding: '4px 10px',
                      borderRadius: 6,
                      letterSpacing: '0.04em',
                    }}
                  >
                    BCA & MCA DEGREES
                  </span>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(34, 197, 94, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
                    <GraduationCap size={20} />
                  </div>
                </div>

                <h4 style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: 12 }}>
                  Dept. of Computer Applications
                </h4>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                  Empowering students with industry-relevant computational thinking, modern software engineering stacks, and algorithmic problem-solving across specialized undergraduate and postgraduate degree programs.
                </p>

                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--color-border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--color-text)' }}>
                    <CheckCircle2 size={16} color="#16A34A" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span><strong>MCA (2 Years):</strong> Advanced Full-Stack Systems, Cloud Computing, AI/ML, and Enterprise Architecture</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--color-text)' }}>
                    <CheckCircle2 size={16} color="#16A34A" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span><strong>BCA (3 Years):</strong> Foundations in Software Engineering, Web Technologies, Database Systems, and DSA</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--color-text)' }}>
                    <CheckCircle2 size={16} color="#16A34A" style={{ flexShrink: 0 }} />
                    <span>Modern computing labs with high-speed internet & cloud sandboxes</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--color-text)' }}>
                    <CheckCircle2 size={16} color="#16A34A" style={{ flexShrink: 0 }} />
                    <span>Mock coding interviews, hackathons, and corporate internships</span>
                  </div>
                </div>
              </div>

              {/* Card 3: The IT Club & Innovation Chapter */}
              <div
                className="card card-hover"
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: 18,
                  padding: 32,
                  border: '1.5px solid rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 8px 24px rgba(16, 39, 67, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #0284C7 0%, #2563EB 100%)',
                      color: '#ffffff',
                      padding: '4px 10px',
                      borderRadius: 6,
                      letterSpacing: '0.04em',
                    }}
                  >
                    OFFICIAL STUDENT TECH SOCIETY
                  </span>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                    <Code2 size={20} />
                  </div>
                </div>

                <h4 style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: 12 }}>
                  The MITCOM IT Club
                </h4>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                  The premier student-led technical chapter uniting BCA and MCA engineers. We turn theoretical computer science into production software, publish faculty-guided research, and launch startups through Crieya incubation.
                </p>

                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--color-border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--color-text)' }}>
                    <CheckCircle2 size={16} color="#2563EB" style={{ flexShrink: 0 }} />
                    <span>Bi-weekly hackathons, coding sprints, and debugging contests</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--color-text)' }}>
                    <CheckCircle2 size={16} color="#2563EB" style={{ flexShrink: 0 }} />
                    <span>Direct pathway into Crieya Pre-Incubation at MIT-ADT</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--color-text)' }}>
                    <CheckCircle2 size={16} color="#2563EB" style={{ flexShrink: 0 }} />
                    <span>Faculty mentorship on research papers and software patents</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--color-text)' }}>
                    <CheckCircle2 size={16} color="#2563EB" style={{ flexShrink: 0 }} />
                    <span>Real-world campus automation & open-source software deployments</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick 4-Fact MIT-ADT Strip */}
            <div
              style={{
                marginTop: 36,
                padding: '20px 24px',
                borderRadius: 14,
                background: 'linear-gradient(135deg, rgba(16, 39, 67, 0.03) 0%, rgba(56, 189, 248, 0.06) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 20,
              }}
            >
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Institutional Heritage
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-primary-navy)', marginTop: 2 }}>
                  MIT-ADT University, Pune
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  UGC recognized multidisciplinary world-class campus
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Campus Location
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-primary-navy)', marginTop: 2 }}>
                  Rajbaug, Loni Kalbhor
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  Scenic 125-acre riverside educational complex
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Pedagogical Focus
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-primary-navy)', marginTop: 2 }}>
                  Practice-Based Learning
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  Live projects, case studies, and corporate conclaves
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Innovation Ecosystem
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-primary-navy)', marginTop: 2 }}>
                  Crieya Incubation Centre
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  Venture acceleration and patent filing guidance
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 3: SHOW THE CAMPUS AND COMMUNITY (Asymmetric 5-Photo Grid)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '96px 24px',
          background: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 52px' }}>
            <span className="section-eyebrow">CAMPUS & COMMUNITY</span>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                fontWeight: 800,
                color: 'var(--color-primary-navy)',
                marginBottom: 14,
              }}
            >
              Inspired by Campus. Driven by Innovation.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Experience the vibrant environment at MIT-ADT University's Rajbaug campus, where modern
              architecture, lush green spaces, and focused computing labs come together.
            </p>
          </div>

          {/* Asymmetric Photography Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gridAutoRows: '260px',
              gap: 20,
            }}
          >
            {/* Card 1: Campus Life (Wide Span 7) */}
            <div
              className="card img-zoom-container"
              style={{
                gridColumn: 'span 7',
                borderRadius: 18,
                position: 'relative',
              }}
            >
              <img
                src={campusAssets.gallery[0].src}
                alt={campusAssets.gallery[0].alt}
                className="img-zoom"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(16,39,67,0.1) 0%, rgba(16,39,67,0.85) 100%)',
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: '#fff',
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 4, width: 'fit-content', marginBottom: 6 }}>
                  {campusAssets.gallery[0].tag}
                </span>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                  {campusAssets.gallery[0].title}
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', margin: 0, maxWidth: 500 }}>
                  {campusAssets.gallery[0].description}
                </p>
              </div>
            </div>

            {/* Card 2: Learning Together (Span 5) */}
            <div
              className="card img-zoom-container"
              style={{
                gridColumn: 'span 5',
                borderRadius: 18,
                position: 'relative',
              }}
            >
              <img
                src={campusAssets.gallery[1].src}
                alt={campusAssets.gallery[1].alt}
                className="img-zoom"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(16,39,67,0.1) 0%, rgba(16,39,67,0.85) 100%)',
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: '#fff',
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 4, width: 'fit-content', marginBottom: 6 }}>
                  {campusAssets.gallery[1].tag}
                </span>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                  {campusAssets.gallery[1].title}
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                  {campusAssets.gallery[1].description}
                </p>
              </div>
            </div>

            {/* Card 3: Faculty Mentorship (Span 4) */}
            <div
              className="card img-zoom-container"
              style={{
                gridColumn: 'span 4',
                borderRadius: 18,
                position: 'relative',
              }}
            >
              <img
                src={campusAssets.gallery[2].src}
                alt={campusAssets.gallery[2].alt}
                className="img-zoom"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(16,39,67,0.1) 0%, rgba(16,39,67,0.88) 100%)',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: '#fff',
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 4, width: 'fit-content', marginBottom: 6 }}>
                  {campusAssets.gallery[2].tag}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                  {campusAssets.gallery[2].title}
                </h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                  {campusAssets.gallery[2].description}
                </p>
              </div>
            </div>

            {/* Card 4: Building Projects (Span 4) */}
            <div
              className="card img-zoom-container"
              style={{
                gridColumn: 'span 4',
                borderRadius: 18,
                position: 'relative',
              }}
            >
              <img
                src={campusAssets.gallery[3].src}
                alt={campusAssets.gallery[3].alt}
                className="img-zoom"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(16,39,67,0.1) 0%, rgba(16,39,67,0.88) 100%)',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: '#fff',
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 4, width: 'fit-content', marginBottom: 6 }}>
                  {campusAssets.gallery[3].tag}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                  {campusAssets.gallery[3].title}
                </h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                  {campusAssets.gallery[3].description}
                </p>
              </div>
            </div>

            {/* Card 5: Innovation in Action (Span 4) */}
            <div
              className="card img-zoom-container"
              style={{
                gridColumn: 'span 4',
                borderRadius: 18,
                position: 'relative',
              }}
            >
              <img
                src={campusAssets.gallery[4].src}
                alt={campusAssets.gallery[4].alt}
                className="img-zoom"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(16,39,67,0.1) 0%, rgba(16,39,67,0.88) 100%)',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: '#fff',
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 4, width: 'fit-content', marginBottom: 6 }}>
                  {campusAssets.gallery[4].tag}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                  {campusAssets.gallery[4].title}
                </h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                  {campusAssets.gallery[4].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 4: FACULTY AND MENTORSHIP
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '96px 24px',
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 52px' }}>
            <span className="section-eyebrow">ACADEMIC LEADERSHIP</span>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                fontWeight: 800,
                color: 'var(--color-primary-navy)',
                marginBottom: 14,
              }}
            >
              Guided by Experience. Empowering the Next Generation.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Faculty mentorship can help students refine ideas, develop project plans, build technical
              confidence, and evaluate outcomes.
            </p>
          </div>

          {/* 3 Requested Faculty Profiles */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 28,
            }}
          >
            {facultyShowcase.map((faculty) => (
              <div
                key={faculty.title}
                className="card card-hover"
                style={{
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 18,
                  border: '1px solid var(--color-border)',
                }}
              >
                {/* Portrait Area (Polished Initials-Based Avatar Fallback) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 16,
                      background: 'linear-gradient(135deg, #102743 0%, #17365D 100%)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                      fontWeight: 800,
                      flexShrink: 0,
                      border: '2px solid rgba(16, 39, 67, 0.1)',
                      boxShadow: '0 4px 12px rgba(16, 39, 67, 0.15)',
                    }}
                  >
                    {getInitials(faculty.title.replace('Dr. ', '').replace('Prof. ', ''))}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: 2 }}>
                      {faculty.title}
                    </h3>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-accent)', margin: 0 }}>
                      {faculty.designation}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: 0, marginTop: 2 }}>
                      {faculty.department}
                    </p>
                  </div>
                </div>

                {/* Expertise Tag */}
                <div
                  style={{
                    padding: '8px 12px',
                    background: 'var(--color-accent-light)',
                    borderRadius: 8,
                    marginBottom: 16,
                    border: '1px solid #D1E5F8',
                  }}
                >
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0, marginBottom: 2 }}>
                    Focus & Areas of Expertise
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--color-primary-navy)', fontWeight: 600, margin: 0 }}>
                    {faculty.expertise}
                  </p>
                </div>

                {/* Short Verified Professional Description */}
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, flex: 1, margin: 0 }}>
                  {faculty.bio}
                </p>

                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    🏛️ MIT-ADT Faculty Mentor
                  </span>
                  <Link to="/faculty/dashboard" style={{ textDecoration: 'none' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-accent)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      View Portal <ArrowUpRight size={14} />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 5: FACULTY FACILITATING STUDENTS
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '96px 24px',
          background: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 48,
              alignItems: 'center',
            }}
          >
            {/* Left Column: Visual Composition with 3 Photos */}
            <div>
              {/* 1 Large Workshop Photograph */}
              <div className="img-zoom-container" style={{ borderRadius: 16, marginBottom: 16, boxShadow: 'var(--shadow-card)' }}>
                <img
                  src={campusAssets.facultyFacilitation.main.src}
                  alt={campusAssets.facultyFacilitation.main.alt}
                  className="img-zoom"
                  style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block', borderRadius: 16 }}
                />
              </div>

              {/* 2 Smaller Supporting Photographs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="img-zoom-container" style={{ borderRadius: 12, boxShadow: 'var(--shadow-card)' }}>
                  <img
                    src={campusAssets.facultyFacilitation.secondary1.src}
                    alt={campusAssets.facultyFacilitation.secondary1.alt}
                    className="img-zoom"
                    style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block', borderRadius: 12 }}
                  />
                </div>
                <div className="img-zoom-container" style={{ borderRadius: 12, boxShadow: 'var(--shadow-card)' }}>
                  <img
                    src={campusAssets.facultyFacilitation.secondary2.src}
                    alt={campusAssets.facultyFacilitation.secondary2.alt}
                    className="img-zoom"
                    style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block', borderRadius: 12 }}
                  />
                </div>
              </div>

              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--color-text-secondary)' }}>
                <Info size={13} />
                <span>Illustrative session photography · Official campus photographs can be uploaded directly.</span>
              </div>
            </div>

            {/* Right Column: Editorial Text & Proposed Activities */}
            <div>
              <span className="section-eyebrow">FACILITATED INNOVATION</span>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.5vw, 40px)',
                  fontWeight: 800,
                  color: 'var(--color-primary-navy)',
                  lineHeight: 1.2,
                  marginBottom: 16,
                }}
              >
                Great Ideas Grow with the Right Guidance.
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: 'var(--color-text)',
                  lineHeight: 1.65,
                  marginBottom: 28,
                }}
              >
                Through collaborative sessions, project discussions, and mentorship, students can turn
                curiosity into structured, meaningful work. Faculty guidance bridges the gap between conceptual
                curiosity and industry-standard execution.
              </p>

              {/* Proposed Activities Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                {[
                  {
                    title: 'Idea Discussions',
                    desc: 'Weekly open forums to critique and shape project problem statements.',
                  },
                  {
                    title: 'Project Reviews',
                    desc: 'Milestone checks ensuring code quality, security, and architectural rigor.',
                  },
                  {
                    title: 'Technical Workshops',
                    desc: 'Deep dives on cloud deployments, AI algorithms, and embedded systems.',
                  },
                  {
                    title: 'Mentoring Sessions',
                    desc: 'One-on-one advisory connecting student teams with research literature.',
                  },
                ].map((act) => (
                  <div
                    key={act.title}
                    style={{
                      padding: 16,
                      background: 'var(--color-surface)',
                      borderRadius: 12,
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <CheckCircle2 size={16} color="var(--color-accent)" />
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-primary-navy)' }}>
                        {act.title}
                      </h4>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                      {act.desc}
                    </p>
                  </div>
                ))}
              </div>

              <Link to="/workflow" style={{ textDecoration: 'none' }}>
                <PrimaryButton size="md" rightIcon={<ArrowRight size={16} />}>
                  Explore Mentorship Workflow
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 6: STUDENT COMMUNITY
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '96px 24px',
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 52px' }}>
            <span className="section-eyebrow">STUDENT INNOVATORS</span>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                fontWeight: 800,
                color: 'var(--color-primary-navy)',
                marginBottom: 12,
              }}
            >
              Different Skills. Shared Curiosity. One Innovation Community.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Meet student builders from Information Technology and Computer Science exploring technologies,
              leading squads, and prototyping solutions for college and community challenges.
            </p>
          </div>

          {/* 4 Requested Student Innovators */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
            }}
          >
            {studentShowcase.map((student) => (
              <div
                key={student.id}
                className="card card-hover"
                style={{
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 16,
                  border: '1px solid var(--color-border)',
                }}
              >
                {/* Profile Avatar & Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: 'linear-gradient(135deg, #3678B7 0%, #17365D 100%)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(student.name)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: 2 }}>
                      {student.name}
                    </h3>
                    <p style={{ fontSize: 12, color: 'var(--color-accent)', fontWeight: 600, margin: 0 }}>
                      {student.designation || 'Student Innovator'}
                    </p>
                  </div>
                </div>

                {/* Technology Interests */}
                <div style={{ marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-secondary)' }}>
                    Core Interests:
                  </span>
                  <p style={{ fontSize: 13, color: 'var(--color-text)', fontWeight: 600, margin: '4px 0 0' }}>
                    {student.interests || 'Software Engineering & Web'}
                  </p>
                </div>

                {/* Current Project */}
                <div
                  style={{
                    padding: '8px 12px',
                    background: 'var(--color-bg)',
                    borderRadius: 8,
                    marginBottom: 16,
                  }}
                >
                  <span style={{ fontSize: 11, color: 'var(--color-text-secondary)', display: 'block' }}>
                    Active Project:
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-primary-navy)' }}>
                    {student.currentProject || 'Campus Project Initiative'}
                  </span>
                </div>

                {/* Skills tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20, flex: 1 }}>
                  {student.skills?.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: 11,
                        background: 'var(--color-accent-light)',
                        color: 'var(--color-accent)',
                        padding: '3px 8px',
                        borderRadius: 4,
                        fontWeight: 600,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* View Profile Action */}
                <Link to="/student/dashboard" style={{ textDecoration: 'none' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'space-between', fontWeight: 600 }}
                  >
                    <span>View Student Profile</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 7: WHAT WILL STUDENTS ACTUALLY DO? (6 Distinct Features)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '96px 24px',
          background: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 52px' }}>
            <span className="section-eyebrow">PRACTICAL CLUB VALUE</span>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                fontWeight: 800,
                color: 'var(--color-primary-navy)',
                marginBottom: 14,
              }}
            >
              From Curiosity to Creation.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              A clear, accessible path for any university student to get involved, contribute their talents,
              and build practical confidence without unnecessary technical friction.
            </p>
          </div>

          {/* 6 Visually Distinct Feature Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {studentFeatures.map((feat) => (
              <div
                key={feat.title}
                className="card card-hover"
                style={{
                  padding: 28,
                  borderRadius: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 12,
                      background: 'var(--color-accent-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: feat.color,
                    }}
                  >
                    {feat.icon}
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--color-text-secondary)',
                      background: 'var(--color-bg)',
                      padding: '4px 10px',
                      borderRadius: 99,
                    }}
                  >
                    {feat.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: 10 }}>
                  {feat.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 8: THE INNOVATION JOURNEY (01 to 07 Horizontal Timeline)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '96px 24px',
          background: 'var(--color-primary-navy)',
          color: '#ffffff',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 56px' }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#93C5FD',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 8,
                display: 'inline-block',
              }}
            >
              STRUCTURED PROJECT EVOLUTION
            </span>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: 14,
              }}
            >
              Every Great Project Starts with an Idea.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
              From initial spark to potential incubation evaluation — how students navigate a transparent,
              guided progression.
            </p>
          </div>

          {/* Timeline Grid (Horizontal on Desktop, Stacked on Mobile) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 16,
              marginBottom: 40,
            }}
          >
            {journeyStages.map((stage) => (
              <div
                key={stage.num}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 14,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: '#93C5FD', letterSpacing: '0.04em' }}>
                    {stage.num}
                  </span>
                  <div style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {stage.icon}
                  </div>
                </div>

                <h4 style={{ fontSize: 15, fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
                  {stage.title}
                </h4>

                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, margin: 0, flex: 1 }}>
                  {stage.desc}
                </p>

                <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#93C5FD', textTransform: 'uppercase' }}>
                    {stage.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Crieya Disclaimer & Transparency Note */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 12,
              padding: '14px 20px',
              textAlign: 'center',
              maxWidth: 820,
              margin: '0 auto',
            }}
          >
            <p style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.72)', margin: 0, lineHeight: 1.5 }}>
              * Stage 07 indicates eligibility for referral to Crieya (Incubation Center), which remains subject to
              independent institutional review, technical diligence, and official university incubation procedures.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 9: PROJECT SHOWCASE (Featured Demo Projects)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '96px 24px',
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 48,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <span className="section-eyebrow">PORTFOLIO & PROTOTYPES</span>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.5vw, 40px)',
                  fontWeight: 800,
                  color: 'var(--color-primary-navy)',
                  marginBottom: 6,
                }}
              >
                Imagine What We Can Build Together.
              </h2>
              <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', margin: 0 }}>
                Explore demonstration initiatives designed to address student collaboration, research, and campus infrastructure.
              </p>
            </div>

            <Link to="/projects" style={{ textDecoration: 'none' }}>
              <SecondaryButton size="md" rightIcon={<ArrowRight size={15} />}>
                View All Projects
              </SecondaryButton>
            </Link>
          </div>

          {/* 5 Demonstration Projects */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 28,
            }}
          >
            {featuredProjects.map((project) => {
              const leadUser = getUserById(project.leadId);
              const mentorUser = project.mentorId ? getUserById(project.mentorId) : undefined;

              return (
                <div
                  key={project.id}
                  className="card card-hover"
                  style={{
                    borderRadius: 18,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {/* Project Cover Image */}
                  <div className="img-zoom-container" style={{ height: 200, position: 'relative' }}>
                    <img
                      src={project.thumbnail || campusAssets.projects.campusConnect.src}
                      alt={project.title}
                      className="img-zoom"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        background: 'rgba(16, 39, 67, 0.85)',
                        backdropFilter: 'blur(6px)',
                        color: '#fff',
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: 99,
                        letterSpacing: '0.04em',
                      }}
                    >
                      PROTOTYPE
                    </div>
                  </div>

                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-accent)' }}>
                        {project.category}
                      </span>
                      {project.incubationReferred && (
                        <span style={{ fontSize: 10, fontWeight: 700, background: '#EDE9FE', color: '#6D28D9', padding: '2px 8px', borderRadius: 4 }}>
                          Crieya Track
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: 8 }}>
                      {project.title}
                    </h3>

                    {/* Problem & Solution in plain language */}
                    <div style={{ marginBottom: 16 }}>
                      <p style={{ fontSize: 13, color: 'var(--color-text)', lineHeight: 1.55, marginBottom: 8 }}>
                        <strong>Challenge:</strong> {project.problemStatement || project.description}
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                        <strong>Approach:</strong> {project.proposedSolution || project.longDescription?.slice(0, 140)}...
                      </p>
                    </div>

                    {/* Tech Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                      {project.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 11,
                            background: 'var(--color-bg)',
                            color: 'var(--color-text)',
                            padding: '3px 8px',
                            borderRadius: 4,
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Lead & Mentor info */}
                    <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                        <span>Lead: <strong>{leadUser?.name || 'Student Lead'}</strong></span>
                        {mentorUser && <span style={{ display: 'block', fontSize: 11, color: 'var(--color-accent)' }}>Mentor: {mentorUser.name}</span>}
                      </div>

                      <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                        <button className="btn btn-ghost btn-sm" style={{ fontWeight: 600 }}>
                          <span>Details</span>
                          <ArrowRight size={13} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 10: EVENTS, WORKSHOPS AND CAMPUS ACTIVITIES
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '96px 24px',
          background: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 48,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <span className="section-eyebrow">CAMPUS ENGAGEMENT</span>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.5vw, 40px)',
                  fontWeight: 800,
                  color: 'var(--color-primary-navy)',
                  marginBottom: 6,
                }}
              >
                Workshops, Hackathons & Technical Sprints.
              </h2>
              <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', margin: 0 }}>
                Hands-on sessions designed to sharpen skills, prototype under deadlines, and connect with mentors.
              </p>
            </div>

            <Link to="/events" style={{ textDecoration: 'none' }}>
              <SecondaryButton size="md" rightIcon={<ArrowRight size={15} />}>
                Explore Club Activities
              </SecondaryButton>
            </Link>
          </div>

          {/* Photographic Event Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} href={`/events/${event.id}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 11: LEARNING AND INNOVATION PLATFORM (3 Workspaces)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '96px 24px',
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 52px' }}>
            <span className="section-eyebrow">PLATFORM ARCHITECTURE</span>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                fontWeight: 800,
                color: 'var(--color-primary-navy)',
                marginBottom: 14,
              }}
            >
              Everything Students Need to Move Forward.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              A single unified environment connecting student initiative, faculty mentorship, and club governance.
            </p>
          </div>

          {/* 3 Feature Panels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 40 }}>
            {/* Student Workspace */}
            <div
              className="card card-hover"
              style={{
                padding: 32,
                borderRadius: 18,
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: 'var(--color-accent-light)',
                  color: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <GraduationCap size={26} />
              </div>

              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                STUDENT WORKSPACE
              </span>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-primary-navy)', margin: '6px 0 12px' }}>
                Build, Collaborate & Learn
              </h3>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                Students can manage ideas, projects, teammate applications, task boards, and track quiz learning activity.
              </p>

              <Link to="/student/dashboard" style={{ textDecoration: 'none' }}>
                <PrimaryButton size="sm" style={{ width: '100%', justifyContent: 'space-between' }}>
                  <span>Enter Student Portal</span>
                  <ArrowRight size={14} />
                </PrimaryButton>
              </Link>
            </div>

            {/* Faculty Workspace */}
            <div
              className="card card-hover"
              style={{
                padding: 32,
                borderRadius: 18,
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: 'rgba(23, 54, 93, 0.1)',
                  color: 'var(--color-secondary-navy)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <UserCheck size={26} />
              </div>

              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-secondary-navy)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                FACULTY WORKSPACE
              </span>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-primary-navy)', margin: '6px 0 12px' }}>
                Guide, Review & Mentorship
              </h3>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                Faculty can review student ideas, guide project teams, monitor sprint progress, and conduct structured review sessions.
              </p>

              <Link to="/faculty/dashboard" style={{ textDecoration: 'none' }}>
                <PrimaryButton size="sm" style={{ width: '100%', justifyContent: 'space-between', background: 'var(--color-secondary-navy)' }}>
                  <span>Enter Faculty Portal</span>
                  <ArrowRight size={14} />
                </PrimaryButton>
              </Link>
            </div>

            {/* Club Management */}
            <div
              className="card card-hover"
              style={{
                padding: 32,
                borderRadius: 18,
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: 'rgba(16, 39, 67, 0.1)',
                  color: 'var(--color-primary-navy)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <Shield size={26} />
              </div>

              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-primary-navy)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                CLUB MANAGEMENT
              </span>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-primary-navy)', margin: '6px 0 12px' }}>
                Operations & Analytics
              </h3>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                Club administrators coordinate campus activities, manage demonstration records, and review illustrative participation reports.
              </p>

              <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}>
                <PrimaryButton size="sm" style={{ width: '100%', justifyContent: 'space-between', background: 'var(--color-primary-navy)' }}>
                  <span>Enter Admin Portal</span>
                  <ArrowRight size={14} />
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 12: DEMO ROLE SELECTION SECTION
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '80px 24px',
          background: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div
            className="card"
            style={{
              padding: '36px 40px',
              borderRadius: 20,
              background: 'linear-gradient(135deg, #102743 0%, #17365D 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            <div style={{ maxWidth: 640 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#93C5FD', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                DIRECTOR PRESENTATION MODE
              </span>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: '#ffffff', margin: '8px 0 10px' }}>
                Ready to Review the Full Platform Experience?
              </h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: 0 }}>
                Jump directly into Akshat Jain (Student), Dr. Rahul Satyakam (Faculty), or Aarav Mehta (Admin)
                workflows to test interactive forms, dashboards, and project features.
              </p>
            </div>

            <Link to="/demo" style={{ textDecoration: 'none' }}>
              <PrimaryButton
                size="lg"
                style={{
                  background: '#ffffff',
                  color: 'var(--color-primary-navy)',
                  borderColor: '#ffffff',
                  fontWeight: 700,
                }}
                rightIcon={<ArrowRight size={16} />}
              >
                Launch Role Selector
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 13: FINAL CALL TO ACTION
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          padding: '120px 24px',
          backgroundImage: `url(${campusAssets.eveningCta.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Navy Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(16, 39, 67, 0.88) 0%, rgba(16, 39, 67, 0.94) 100%)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 760, margin: '0 auto' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <Sparkles size={26} color="#93C5FD" />
          </div>

          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            The Next Big Idea Could Start Here.
          </h2>

          <p
            style={{
              fontSize: 18,
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: 40,
              lineHeight: 1.6,
              maxWidth: 620,
              margin: '0 auto 40px',
            }}
          >
            Join a community built around learning, collaboration, mentorship, and innovation at MIT-ADT University.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/projects" style={{ textDecoration: 'none' }}>
              <PrimaryButton
                size="lg"
                style={{ background: '#fff', color: 'var(--color-primary-navy)', borderColor: '#fff', fontWeight: 700 }}
              >
                Explore the IT Club
              </PrimaryButton>
            </Link>

            <Link to="/demo" style={{ textDecoration: 'none' }}>
              <SecondaryButton
                size="lg"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  fontWeight: 600,
                }}
                rightIcon={<ArrowRight size={16} />}
              >
                Explore the Platform
              </SecondaryButton>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
