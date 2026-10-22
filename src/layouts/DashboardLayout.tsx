import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, Lightbulb, Calendar, BookOpen,
  Users, Bell, Menu, Code2, MessageSquare, UserSearch,
  ClipboardList, UserCheck, BarChart3, GraduationCap, Megaphone
} from 'lucide-react';
import { useDemoRole } from '../hooks/useAppContext';
import { useAppStore } from '../hooks/useAppStore';
import { getInitials, timeAgo } from '../utils';

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const studentNavItems: NavItem[] = [
  { href: '/student/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { href: '/student/projects', label: 'My Projects', icon: <FolderKanban size={18} /> },
  { href: '/student/ideas', label: 'Ideas', icon: <Lightbulb size={18} /> },
  { href: '/student/applications', label: 'Applications', icon: <ClipboardList size={18} /> },
  { href: '/student/teammates', label: 'Find Teammates', icon: <UserSearch size={18} /> },
  { href: '/student/chat', label: 'Project Chat', icon: <MessageSquare size={18} /> },
  { href: '/student/events', label: 'Events', icon: <Calendar size={18} /> },
  { href: '/student/learn', label: 'Learn', icon: <BookOpen size={18} /> },
  { href: '/student/sessions', label: 'Sessions', icon: <UserCheck size={18} /> },
];

const facultyNavItems: NavItem[] = [
  { href: '/faculty/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { href: '/faculty/projects', label: 'Projects', icon: <FolderKanban size={18} /> },
  { href: '/faculty/sessions', label: 'Sessions', icon: <UserCheck size={18} /> },
  { href: '/faculty/ideas', label: 'Review Ideas', icon: <Lightbulb size={18} /> },
  { href: '/faculty/students', label: 'My Students', icon: <GraduationCap size={18} /> },
];

const adminNavItems: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { href: '/admin/users', label: 'Users', icon: <Users size={18} /> },
  { href: '/admin/projects', label: 'Projects', icon: <FolderKanban size={18} /> },
  { href: '/admin/ideas', label: 'Ideas', icon: <Lightbulb size={18} /> },
  { href: '/admin/events', label: 'Events', icon: <Calendar size={18} /> },
  { href: '/admin/analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  { href: '/admin/announcements', label: 'Announcements', icon: <Megaphone size={18} /> },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { currentUser, currentRole } = useDemoRole();
  const { notifications, markNotificationRead, markAllRead } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const navItems =
    currentRole === 'student'
      ? studentNavItems
      : currentRole === 'faculty'
      ? facultyNavItems
      : adminNavItems;

  const roleLabel =
    currentRole === 'student'
      ? 'Student Portal'
      : currentRole === 'faculty'
      ? 'Faculty Portal'
      : 'Admin Panel';

  const userNotifs = notifications.filter((n) => n.userId === currentUser.id);
  const unreadCount = userNotifs.filter((n) => !n.read).length;

  return (
    <div className="dashboard-layout">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(16,39,67,0.4)',
            zIndex: 49,
            display: 'none',
          }}
          className="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        aria-label="Sidebar navigation"
      >
        {/* Logo */}
        <div
          style={{
            padding: '20px 20px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Code2 size={18} color="#fff" />
            </div>
            <div>
              <p style={{ fontWeight: 700, color: '#fff', fontSize: 14, margin: 0, lineHeight: 1.2 }}>
                IT Club
              </p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{roleLabel}</p>
            </div>
          </Link>
        </div>

        {/* User info */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {getInitials(currentUser.name)}
            </div>
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#fff',
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {currentUser.name}
              </p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                {currentUser.department}
              </p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav
          aria-label="Dashboard navigation"
          style={{ flex: 1, padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
                background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              })}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div
          style={{
            padding: '12px 12px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: 13,
              color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <Code2 size={18} />
            Public Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="main-content">
        {/* Top Bar */}
        <header
          style={{
            height: 60,
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            gap: 16,
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          {/* Mobile sidebar toggle */}
          <button
            className="btn btn-ghost btn-sm sidebar-toggle"
            onClick={() => setSidebarOpen((p) => !p)}
            aria-label="Toggle sidebar"
            style={{ display: 'none' }}
          >
            <Menu size={20} />
          </button>

          <div style={{ flex: 1, minWidth: 0 }}>
            {title && (
              <h1 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>
                {title}
              </h1>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setNotifOpen((p) => !p)}
                aria-label={`Notifications (${unreadCount} unread)`}
                style={{ position: 'relative', padding: 8 }}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      minWidth: 16,
                      height: 16,
                      borderRadius: 99,
                      background: 'var(--color-error)',
                      border: '2px solid var(--color-surface)',
                      fontSize: 9,
                      fontWeight: 700,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <>
                  <div
                    style={{ position: 'fixed', inset: 0, zIndex: 28 }}
                    onClick={() => setNotifOpen(false)}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 8px)',
                      width: 360,
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-elevated)',
                      zIndex: 29,
                      animation: 'scaleIn 0.15s ease',
                      transformOrigin: 'top right',
                    }}
                  >
                    <div
                      style={{
                        padding: '14px 16px',
                        borderBottom: '1px solid var(--color-border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <p style={{ fontWeight: 600, fontSize: 14 }}>Notifications</p>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {unreadCount > 0 && (
                          <>
                            <span style={{ fontSize: 11, background: 'var(--color-error)', color: '#fff', padding: '2px 7px', borderRadius: 99 }}>
                              {unreadCount} new
                            </span>
                            <button
                              onClick={markAllRead}
                              style={{ fontSize: 11, color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
                            >
                              Mark all read
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div style={{ maxHeight: 340, overflowY: 'auto' }}>
                      {userNotifs.slice(0, 6).map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          style={{
                            padding: '12px 16px',
                            borderBottom: '1px solid var(--color-border)',
                            background: notif.read ? 'transparent' : 'var(--color-accent-light)',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease',
                          }}
                        >
                          <p style={{ fontSize: 13, fontWeight: notif.read ? 400 : 600, color: 'var(--color-text)', marginBottom: 2 }}>
                            {!notif.read && <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)', marginRight: 6, marginBottom: 1 }} />}
                            {notif.title}
                          </p>
                          <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                            {notif.message}
                          </p>
                          <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 4 }}>
                            {timeAgo(notif.createdAt)}
                          </p>
                        </div>
                      ))}
                      {userNotifs.length === 0 && (
                        <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: 13 }}>
                          🔔 No notifications yet
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User avatar */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: '#fff',
                cursor: 'pointer',
              }}
              title={currentUser.name}
            >
              {getInitials(currentUser.name)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '28px 28px', background: 'var(--color-bg)' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sidebar-toggle { display: flex !important; }
          .sidebar-overlay { display: block !important; }
        }
      `}</style>
    </div>
  );
}
