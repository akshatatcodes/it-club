import React from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, Users, ExternalLink, Bookmark } from 'lucide-react';
import type { Project } from '../../types';
import { StatusBadge } from './StatusBadge';
import { projectStatusConfig } from '../../utils';
import { getUserById } from '../../data/users';
import { getInitials } from '../../utils';

interface ProjectCardProps {
  project: Project;
  href?: string;
  compact?: boolean;
}

export function ProjectCard({ project, href, compact = false }: ProjectCardProps) {
  const statusCfg = projectStatusConfig[project.status];
  const lead = getUserById(project.leadId);

  const content = (
    <div
      className="card card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 16,
      }}
    >
      {/* Thumbnail if present and not compact */}
      {!compact && project.thumbnail && (
        <div className="img-zoom-container" style={{ height: 160, position: 'relative' }}>
          <img
            src={project.thumbnail}
            alt={project.title}
            className="img-zoom"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <StatusBadge {...statusCfg} size="sm" />
          </div>
          {project.incubationReferred && (
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(139, 92, 246, 0.9)',
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 4,
                backdropFilter: 'blur(4px)',
              }}
            >
              Crieya Track
            </div>
          )}
        </div>
      )}

      <div
        style={{
          padding: compact ? 16 : 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          flex: 1,
        }}
      >
        {/* Header row when no thumbnail or compact */}
        {(compact || !project.thumbnail) && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, justifyContent: 'space-between' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                <StatusBadge {...statusCfg} size="sm" />
                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--color-text-secondary)',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 4,
                    padding: '1px 7px',
                  }}
                >
                  {project.category}
                </span>
              </div>
            </div>
            {project.incubationReferred && (
              <span title="Incubated at Crieya" style={{ color: '#8B5CF6', flexShrink: 0 }}>
                <Bookmark size={16} fill="#8B5CF6" />
              </span>
            )}
          </div>
        )}

        <h3
          style={{
            fontSize: compact ? 14 : 16,
            fontWeight: 700,
            color: 'var(--color-primary-navy)',
            lineHeight: 1.35,
            margin: 0,
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        {!compact && (
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.55, margin: 0, flex: 1 }}>
            {project.description.length > 120
              ? project.description.slice(0, 120) + '…'
              : project.description}
          </p>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                color: 'var(--color-accent)',
                background: 'var(--color-accent-light)',
                borderRadius: 4,
                padding: '2px 8px',
                fontWeight: 600,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: 12,
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'var(--color-primary-navy)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {lead ? getInitials(lead.name) : '?'}
            </div>
            <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              {lead?.name ?? 'Unknown'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-secondary)' }}
            >
              <Users size={12} />
              {project.memberIds.length}
            </span>
            {project.githubUrl && (
              <span style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-secondary)' }}>
                <GitBranch size={12} />
              </span>
            )}
            {project.isOpenForApplications && (
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--color-success)',
                  background: '#F0FDF4',
                  borderRadius: 4,
                  padding: '2px 7px',
                  fontWeight: 600,
                }}
              >
                Hiring
              </span>
            )}
          </div>
        </div>
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
