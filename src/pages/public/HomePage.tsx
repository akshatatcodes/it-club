import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Lightbulb, Users, Trophy, Zap, BookOpen, Calendar, Rocket } from 'lucide-react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { PrimaryButton, SecondaryButton } from '../../components/ui/Button';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { EventCard } from '../../components/ui/EventCard';
import { ArticleCard } from '../../components/ui/ArticleCard';
import { mockProjects } from '../../data/projects';
import { mockEvents, mockBlogPosts } from '../../data/mock';
import { useDemoRole } from '../../hooks/useAppContext';

const stats = [
  { label: 'Active Projects', value: '48', icon: <Code2 size={22} /> },
  { label: 'Club Members', value: '320+', icon: <Users size={22} /> },
  { label: 'Events this Year', value: '24', icon: <Calendar size={22} /> },
  { label: 'Ideas Submitted', value: '120+', icon: <Lightbulb size={22} /> },
];

const features = [
  {
    icon: <FolderIcon />,
    title: 'Build Real Projects',
    description:
      'Team up with peers, get faculty mentorship, and build projects that solve real problems. The best ones get referred to Crieya Incubation.',
    color: '#3678B7',
  },
  {
    icon: <Lightbulb size={22} />,
    title: 'Submit & Vote on Ideas',
    description:
      'Have a brilliant idea? Share it. Browse and upvote ideas from your peers. Approved ideas get fast-tracked into official projects.',
    color: '#F59E0B',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'Learn & Grow',
    description:
      'Take curated quizzes, read articles written by seniors, and track your skills. Build a portfolio that impresses recruiters.',
    color: '#22C55E',
  },
  {
    icon: <Calendar size={22} />,
    title: 'Attend Events',
    description:
      "From hackathons to industry talks, workshops, and open-source sprints — there's always something happening at the club.",
    color: '#8B5CF6',
  },
];

function FolderIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function HomePage() {
  const { currentRole } = useDemoRole();

  const dashboardPath =
    currentRole === 'student'
      ? '/student/dashboard'
      : currentRole === 'faculty'
      ? '/faculty/dashboard'
      : '/admin/dashboard';

  const featuredProjects = mockProjects.filter((p) => p.status === 'in_progress').slice(0, 3);
  const upcomingEvents = mockEvents.slice(0, 3);
  const featuredArticles = mockBlogPosts.slice(0, 3);

  return (
    <PublicLayout>
      {/* ── Hero ── */}
      <section
        className="hero-gradient"
        style={{ padding: '80px 24px 96px' }}
      >
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 99,
              fontSize: 13,
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              marginBottom: 24,
            }}
          >
            <Zap size={14} />
            Now accepting project applications for Semester 6
          </div>

          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: 20,
              letterSpacing: '-0.5px',
            }}
          >
            Where Student Ideas<br />
            <span style={{ color: '#93C5FD' }}>Become Real Products</span>
          </h1>

          <p
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.65,
              maxWidth: 580,
              margin: '0 auto 36px',
            }}
          >
            Join the IT Club & Innovation Hub — discover projects, find teammates,
            learn from mentors, and build the portfolio that defines your career.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={dashboardPath}>
              <PrimaryButton
                size="lg"
                variant="accent"
                rightIcon={<ArrowRight size={16} />}
                style={{ background: '#fff', color: 'var(--color-primary)', borderColor: '#fff' }}
              >
                Go to Dashboard
              </PrimaryButton>
            </Link>
            <Link to="/projects">
              <SecondaryButton
                size="lg"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#ffffff',
                }}
              >
                Browse Projects
              </SecondaryButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            padding: '32px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '20px 24px',
                textAlign: 'center',
                borderRight: i < stats.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-accent)',
                  marginBottom: 8,
                }}
              >
                {stat.icon}
              </div>
              <p style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-text)', lineHeight: 1 }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: '72px 24px', background: 'var(--color-bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              Everything you need
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 700, color: 'var(--color-text)' }}>
              One platform. Endless possibilities.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 20,
            }}
          >
            {features.map((f) => (
              <div key={f.title} className="card" style={{ padding: 24 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${f.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: f.color,
                    marginBottom: 16,
                  }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Active Projects ── */}
      <section style={{ padding: '60px 24px', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 28,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700 }}>Active Projects</h2>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>
                Open for applications — join a team today
              </p>
            </div>
            <Link to="/projects">
              <GhostButton rightIcon={<ArrowRight size={14} />}>View all projects</GhostButton>
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} href={`/projects/${project.id}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section style={{ padding: '60px 24px', background: 'var(--color-bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 28,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700 }}>Upcoming Events</h2>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>
                Hackathons, workshops, and more
              </p>
            </div>
            <Link to="/events">
              <GhostButton rightIcon={<ArrowRight size={14} />}>View all events</GhostButton>
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} href={`/events/${event.id}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── From the Blog ── */}
      <section style={{ padding: '60px 24px', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 28,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700 }}>From the Blog</h2>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>
                Articles and tutorials from our members
              </p>
            </div>
            <Link to="/learn">
              <GhostButton rightIcon={<ArrowRight size={14} />}>Browse articles</GhostButton>
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {featuredArticles.map((post) => (
              <ArticleCard key={post.id} post={post} href={`/learn/${post.slug}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: '72px 24px',
          background: 'var(--color-primary)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <Rocket size={28} color="#fff" />
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: '#fff', marginBottom: 14 }}>
            Ready to build something great?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 32, lineHeight: 1.6 }}>
            Join hundreds of students who are learning, building, and growing together.
            Your next big project is one click away.
          </p>
          <Link to={dashboardPath}>
            <PrimaryButton
              size="lg"
              style={{ background: '#fff', color: 'var(--color-primary)', borderColor: '#fff' }}
              rightIcon={<ArrowRight size={16} />}
            >
              Get Started Now
            </PrimaryButton>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}

function GhostButton({ children, rightIcon, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { rightIcon?: React.ReactNode }) {
  return (
    <button className="btn btn-ghost" {...props} style={{ fontSize: 14, ...props.style }}>
      {children}
      {rightIcon}
    </button>
  );
}
