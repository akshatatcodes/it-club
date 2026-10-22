import React, { useState } from 'react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { SearchInput } from '../../components/ui/SearchInput';
import { FilterBar } from '../../components/ui/FilterBar';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { mockProjects } from '../../data/projects';
import { FolderKanban } from 'lucide-react';
import type { ProjectStatus, ProjectCategory } from '../../types';

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'in_progress', label: 'Active' },
  { value: 'idea', label: 'Idea Stage' },
  { value: 'review', label: 'Under Review' },
  { value: 'completed', label: 'Completed' },
  { value: 'incubated', label: 'Incubated' },
];

const openOptions = [
  { value: 'all', label: 'All Projects' },
  { value: 'open', label: 'Open for Applications' },
];

export function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openFilter, setOpenFilter] = useState('all');

  const filtered = mockProjects.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchOpen = openFilter === 'all' || (openFilter === 'open' && p.isOpenForApplications);

    return matchSearch && matchStatus && matchOpen;
  });

  return (
    <PublicLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <PageHeader
          title="Projects"
          subtitle="Discover what our members are building. Find your next team or project to contribute to."
        />

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, tags…"
            style={{ width: 280 }}
          />
          <FilterBar options={statusOptions} selected={statusFilter} onChange={setStatusFilter} />
          <FilterBar options={openOptions} selected={openFilter} onChange={setOpenFilter} />
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16 }}>
              Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 16,
              }}
            >
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} href={`/projects/${project.id}`} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={<FolderKanban size={24} />}
            title="No projects found"
            description="Try adjusting your search or filters to find what you're looking for."
          />
        )}
      </div>
    </PublicLayout>
  );
}
