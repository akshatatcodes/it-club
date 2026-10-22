import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoRoleProvider, ToastProvider } from './hooks/useAppContext';
import { AppStoreProvider } from './hooks/useAppStore';
import { ToastContainer } from './components/ui/Toast';
import { DemoRoleSwitcher } from './components/DemoRoleSwitcher';

// ── Public Pages ─────────────────────────────────────────────────────────────
import { HomePage } from './pages/public/HomePage';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { ProjectDetailPage } from './pages/public/ProjectDetailPage';
import { EventsPage } from './pages/public/EventsPage';
import { EventDetailPage } from './pages/public/EventDetailPage';
import { LearnPage } from './pages/public/LearnPage';
import { ArticlePage } from './pages/public/ArticlePage';
import { IdeasPage } from './pages/public/IdeasPage';
import { IdeaSubmitPage } from './pages/public/IdeaSubmitPage';
import { WorkflowPage } from './pages/public/WorkflowPage';
import { IncubationPage } from './pages/public/IncubationPage';
import { DemoEntryPage } from './pages/DemoEntryPage';
import { NotFoundPage, ComingSoonPage } from './pages/NotFoundPage';

// ── Student Pages ─────────────────────────────────────────────────────────────
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProjectsPage } from './pages/student/StudentProjectsPage';
import { StudentApplicationsPage } from './pages/student/StudentApplicationsPage';
import { StudentEventsPage } from './pages/student/StudentEventsPage';
import { StudentIdeasPage } from './pages/student/StudentIdeasPage';
import { StudentSessionsPage } from './pages/student/StudentSessionsPage';
import { StudentLearnPage } from './pages/student/StudentLearnPage';
import { QuizPlayerPage } from './pages/student/QuizPlayerPage';
import { FindTeammatesPage } from './pages/student/FindTeammatesPage';
import { StudentChatPage } from './pages/student/StudentChatPage';

// ── Faculty Pages ─────────────────────────────────────────────────────────────
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { FacultyProjectsPage } from './pages/faculty/FacultyProjectsPage';
import { FacultySessionsPage } from './pages/faculty/FacultySessionsPage';
import { FacultyIdeasPage } from './pages/faculty/FacultyIdeasPage';
import { FacultyStudentsPage } from './pages/faculty/FacultyStudentsPage';

// ── Admin Pages ───────────────────────────────────────────────────────────────
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminIdeasPage } from './pages/admin/AdminIdeasPage';
import { AdminEventsPage } from './pages/admin/AdminEventsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminAnnouncementsPage } from './pages/admin/AdminAnnouncementsPage';

function AppInner() {
  return (
    <>
      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<DemoEntryPage />} />

        {/* Projects */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />

        {/* Events */}
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />

        {/* Learn */}
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/learn/:slug" element={<ArticlePage />} />
        <Route path="/learn/quiz/:id" element={<QuizPlayerPage />} />

        {/* Ideas */}
        <Route path="/ideas" element={<IdeasPage />} />
        <Route path="/ideas/submit" element={<IdeaSubmitPage />} />

        {/* Info Pages */}
        <Route path="/workflow" element={<WorkflowPage />} />
        <Route path="/incubation" element={<IncubationPage />} />

        {/* ── Student Routes ── */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/projects" element={<StudentProjectsPage />} />
        <Route path="/student/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/student/applications" element={<StudentApplicationsPage />} />
        <Route path="/student/events" element={<StudentEventsPage />} />
        <Route path="/student/ideas" element={<StudentIdeasPage />} />
        <Route path="/student/sessions" element={<StudentSessionsPage />} />
        <Route path="/student/learn" element={<StudentLearnPage />} />
        <Route path="/student/quiz/:id" element={<QuizPlayerPage />} />
        <Route path="/student/teammates" element={<FindTeammatesPage />} />
        <Route path="/student/chat/:projectId" element={<StudentChatPage />} />
        <Route path="/student/chat" element={<StudentChatPage />} />

        {/* ── Faculty Routes ── */}
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/projects" element={<FacultyProjectsPage />} />
        <Route path="/faculty/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/faculty/sessions" element={<FacultySessionsPage />} />
        <Route path="/faculty/ideas" element={<FacultyIdeasPage />} />
        <Route path="/faculty/students" element={<FacultyStudentsPage />} />

        {/* ── Admin Routes ── */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/projects" element={<AdminProjectsPage />} />
        <Route path="/admin/ideas" element={<AdminIdeasPage />} />
        <Route path="/admin/events" element={<AdminEventsPage />} />
        <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        <Route path="/admin/announcements" element={<AdminAnnouncementsPage />} />
        <Route path="/admin/reports" element={<AdminAnalyticsPage />} />

        {/* ── Fallbacks ── */}
        <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
        <Route path="/faculty" element={<Navigate to="/faculty/dashboard" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Global UI */}
      <DemoRoleSwitcher />
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <DemoRoleProvider>
          <AppStoreProvider>
            <AppInner />
          </AppStoreProvider>
        </DemoRoleProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
