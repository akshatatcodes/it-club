import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { useDemoRole } from '../../hooks/useAppContext';
import { getProjectsByMember } from '../../data/projects';
import { FolderKanban, Plus } from 'lucide-react';
import { useToast } from '../../hooks/useAppContext';

export function StudentProjectsPage() {
  const { currentUser } = useDemoRole();
  const { addToast } = useToast();
  const myProjects = getProjectsByMember(currentUser.id);

  return (
    <DashboardLayout title="My Projects">
      <PageHeader
        title="My Projects"
        subtitle="Projects you lead or are a member of."
        action={
          <button
            className="btn btn-primary btn-sm"
            onClick={() => addToast('info', 'Coming Soon', 'Project creation will be available in Phase 2.')}
          >
            <Plus size={15} /> New Project
          </button>
        }
      />
      {myProjects.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {myProjects.map((p) => (
            <ProjectCard key={p.id} project={p} href={`/student/projects/${p.id}`} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FolderKanban size={24} />}
          title="No projects yet"
          description="Join an existing project or create a new one to get started."
          action={<a href="/projects" className="btn btn-primary btn-sm">Browse Projects</a>}
        />
      )}
    </DashboardLayout>
  );
}
