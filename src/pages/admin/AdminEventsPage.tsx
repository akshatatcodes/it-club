import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { mockEvents } from '../../data/mock';
import { EventCard } from '../../components/ui/EventCard';
import { Plus } from 'lucide-react';
import { useToast } from '../../hooks/useAppContext';

export function AdminEventsPage() {
  const { addToast } = useToast();
  return (
    <DashboardLayout title="Events">
      <PageHeader
        title="Event Management"
        subtitle={`${mockEvents.length} events this semester.`}
        action={
          <button className="btn btn-primary btn-sm" onClick={() => addToast('info', 'Coming Soon', 'Event creation coming in Phase 2.')}>
            <Plus size={15} /> Create Event
          </button>
        }
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {mockEvents.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </DashboardLayout>
  );
}
