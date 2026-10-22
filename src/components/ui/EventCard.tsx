import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Wifi } from 'lucide-react';
import type { Event } from '../../types';
import { eventTypeConfig, formatDate, getDaysUntil } from '../../utils';
import { StatusBadge } from './StatusBadge';

interface EventCardProps {
  event: Event;
  href?: string;
  registered?: boolean;
}

export function EventCard({ event, href, registered = false }: EventCardProps) {
  const typeCfg = eventTypeConfig[event.type];
  const daysUntil = getDaysUntil(event.startDate);
  const spotsLeft = event.maxCapacity
    ? event.maxCapacity - event.registeredIds.length
    : null;

  const content = (
    <div
      className="card card-hover"
      style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}
    >
      {/* Type badge + countdown */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <StatusBadge {...typeCfg} size="sm" dot={false} />
        {daysUntil > 0 ? (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: daysUntil <= 7 ? 'var(--color-error)' : 'var(--color-text-secondary)',
            }}
          >
            {daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
          </span>
        ) : daysUntil === 0 ? (
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-success)' }}>Today!</span>
        ) : (
          <span style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>Past event</span>
        )}
      </div>

      {/* Title */}
      <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.4 }}>
        {event.title}
      </h3>

      {/* Description */}
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.55, flex: 1 }}>
        {event.description.length > 110
          ? event.description.slice(0, 110) + '…'
          : event.description}
      </p>

      {/* Meta */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-text-secondary)' }}>
          <Calendar size={13} style={{ flexShrink: 0 }} />
          {formatDate(event.startDate)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-text-secondary)' }}>
          {event.isOnline ? <Wifi size={13} style={{ flexShrink: 0 }} /> : <MapPin size={13} style={{ flexShrink: 0 }} />}
          {event.location}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 10,
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-secondary)' }}>
          <Users size={12} />
          {event.registeredIds.length} registered
          {spotsLeft !== null && spotsLeft <= 10 && spotsLeft > 0 && (
            <span style={{ color: 'var(--color-warning)', fontWeight: 500, marginLeft: 4 }}>
              · {spotsLeft} spots left
            </span>
          )}
        </div>
        {registered && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--color-success)',
              background: '#F0FDF4',
              padding: '2px 8px',
              borderRadius: 4,
            }}
          >
            ✓ Registered
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link to={href} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
}
