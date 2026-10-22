import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { mockProjects } from '../../data/projects';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { projectStatusConfig } from '../../utils';
import { FilterBar } from '../../components/ui/FilterBar';
import { useState } from 'react';

const statusOpts = [
  { value: 'all', label: 'All' },
  { value: 'idea', label: 'Idea' },
  { value: 'in_progress', label: 'Active' },
  { value: 'review', label: 'Review' },
  { value: 'completed', label: 'Completed' },
  { value: 'incubated', label: 'Incubated' },
];

export function AdminProjectsPage() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? mockProjects : mockProjects.filter(p => p.status === filter);
  return (
    <DashboardLayout title="Projects">
      <PageHeader title="Project Management" subtitle={`${mockProjects.length} total projects.`} />
      <div style={{ marginBottom: 20 }}>
        <FilterBar options={statusOpts} selected={filter} onChange={setFilter} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </DashboardLayout>
  );
}
