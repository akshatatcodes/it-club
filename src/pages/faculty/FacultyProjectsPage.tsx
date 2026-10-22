import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { useDemoRole } from '../../hooks/useAppContext';
import { getProjectsByMentor } from '../../data/projects';
import { EmptyState } from '../../components/ui/EmptyState';
import { FolderKanban } from 'lucide-react';

export function FacultyProjectsPage() {
  const { currentUser } = useDemoRole();
  const projects = getProjectsByMentor(currentUser.id);
  return (
    <DashboardLayout title="Projects">
      <PageHeader title="Projects I'm Mentoring" subtitle="All projects assigned to you for mentorship." />
      {projects.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      ) : (
        <EmptyState icon={<FolderKanban size={24} />} title="No projects assigned" description="No projects have been assigned to you for mentorship yet." />
      )}
    </DashboardLayout>
  );
}
