import React, { useState } from 'react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { EventCard } from '../../components/ui/EventCard';
import { SearchInput } from '../../components/ui/SearchInput';
import { FilterBar } from '../../components/ui/FilterBar';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { mockEvents } from '../../data/mock';
import { Calendar } from 'lucide-react';

const typeOptions = [
  { value: 'all', label: 'All Events' },
  { value: 'hackathon', label: 'Hackathons' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'talk', label: 'Talks' },
  { value: 'meetup', label: 'Meetups' },
];

const modeOptions = [
  { value: 'all', label: 'All Modes' },
  { value: 'online', label: 'Online' },
  { value: 'offline', label: 'In-person' },
];

export function EventsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');

  const filtered = mockEvents.filter((e) => {
    const matchSearch =
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || e.type === typeFilter;
    const matchMode =
      modeFilter === 'all' ||
      (modeFilter === 'online' && e.isOnline) ||
      (modeFilter === 'offline' && !e.isOnline);
    return matchSearch && matchType && matchMode;
  });

  return (
    <PublicLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <PageHeader
          title="Events"
          subtitle="Hackathons, workshops, talks, and meetups — stay in the loop."
        />

        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events…"
            style={{ width: 260 }}
          />
          <FilterBar options={typeOptions} selected={typeFilter} onChange={setTypeFilter} />
          <FilterBar options={modeOptions} selected={modeFilter} onChange={setModeFilter} />
        </div>

        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} href={`/events/${event.id}`} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Calendar size={24} />}
            title="No events found"
            description="Check back soon or adjust your filters."
          />
        )}
      </div>
    </PublicLayout>
  );
}
