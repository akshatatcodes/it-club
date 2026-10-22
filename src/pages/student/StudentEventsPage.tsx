import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { EventCard } from '../../components/ui/EventCard';
import { mockEvents } from '../../data/mock';
import { useDemoRole } from '../../hooks/useAppContext';
import { FilterBar } from '../../components/ui/FilterBar';
import { useState } from 'react';
import { getDaysUntil } from '../../utils';

const tabs = [
  { value: 'all', label: 'All Events' },
  { value: 'registered', label: 'Registered' },
  { value: 'upcoming', label: 'Upcoming' },
];

export function StudentEventsPage() {
  const { currentUser } = useDemoRole();
  const [tab, setTab] = useState('all');

  const filtered = mockEvents.filter((e) => {
    if (tab === 'registered') return e.registeredIds.includes(currentUser.id);
    if (tab === 'upcoming') return getDaysUntil(e.startDate) > 0;
    return true;
  });

  return (
    <DashboardLayout title="Events">
      <PageHeader title="Events" subtitle="Hackathons, workshops, and more." />
      <div style={{ marginBottom: 20 }}>
        <FilterBar options={tabs} selected={tab} onChange={setTab} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {filtered.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            registered={event.registeredIds.includes(currentUser.id)}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
