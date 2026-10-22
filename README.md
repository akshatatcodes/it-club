# 🚀 IT Club & Innovation Hub

> A polished, fully-interactive **frontend prototype** for a College IT Club platform — built to demonstrate a proposed digital hub where students can submit ideas, discover projects, find teammates, attend events, take quizzes, and get mentored by faculty. Exceptional projects may be referred to the **Crieya Incubation Center**.

---

## 📸 Demo Roles

The platform supports **three role-based demo views** accessible via the **Demo Mode** switcher:

| Role | Entry Point | Key Features |
|------|-------------|--------------|
| 👨‍🎓 **Student** | `/student/dashboard` | Submit ideas, join projects, find teammates, take quizzes, project chat |
| 👩‍🏫 **Faculty** | `/faculty/dashboard` | Review & approve ideas, mentor projects, schedule sessions |
| 🛡️ **Admin** | `/admin/dashboard` | Platform analytics, manage users/projects/events, post announcements |

---

## ✨ Features

### 🌐 Public Pages
- **Home** — Hero section, platform overview, feature highlights
- **Projects** — Browse & filter all student projects
- **Project Detail** — Full view with tech stack, milestones, team, and join application
- **Events** — Hackathons, workshops, talks with full detail & registration modal
- **Learn** — Articles & quizzes with full interactive quiz player
- **Ideas Board** — Community idea voting + submit your own
- **Workflow** — 10-step visual idea-to-incubation timeline
- **Incubation** — Crieya Incubation Center showcase

### 👨‍🎓 Student Portal
- Dashboard with live stats (projects, applications, events, tasks)
- My Projects, My Ideas with faculty feedback display
- Application tracker with status history
- **Find Teammates** — Browse students by skill and connect
- **Project Chat** — Group messaging demo for project teams
- Learn Hub with quiz retry & score history
- Event registration with capacity tracking
- Mentorship session schedule

### 👩‍🏫 Faculty Portal
- Dashboard with mentored projects and pending idea queue
- **Idea Review** — Approve/reject ideas with reviewer feedback notes
- Mentorship sessions management
- Student progress tracker

### 🛡️ Admin Panel
- Platform analytics with charts (Recharts)
- User, project, event management
- **Announcements** — Broadcast to students, faculty, or all
- Ideas moderation queue

### 🔧 Technical Highlights
- **Global reactive store** (`useAppStore`) persisted to `localStorage` — ideas, applications, notifications, registrations, and quiz results stay in sync across all pages
- Live notification bell with **mark-as-read** and **mark-all-read**
- Multi-step idea submission form with validation and draft saving
- Interactive quiz player with timer, option reveal, explanations, and score ring
- Responsive layouts for all screen sizes

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Icons | Lucide React |
| State | React Context + `localStorage` |

---

## 📦 Installation & Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher → [Download](https://nodejs.org/)
- **npm** v9 or higher (comes with Node.js)
- **Git** → [Download](https://git-scm.com/)

Verify your versions:
```bash
node --version   # should be v18+
npm --version    # should be v9+
```

---

### 1. Clone the Repository

```bash
git clone https://github.com/akshatatcodes/it-club.git
cd it-club
```

---

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`, including React, Vite, Tailwind, Recharts, and Lucide.

---

### 3. Start the Development Server

```bash
npm run dev
```

The app will start at:

```
http://localhost:5173
```

Open this URL in your browser. The page hot-reloads automatically when you edit files.

---

### 4. Build for Production (Optional)

To create an optimised production build:

```bash
npm run build
```

The output will be in the `dist/` folder. To preview the production build locally:

```bash
npm run preview
```

---

## 🗂️ Project Structure

```
it-club/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components (Card, Modal, Badge, etc.)
│   │   └── DemoRoleSwitcher.tsx
│   ├── data/
│   │   ├── mock.ts          # All mock data (ideas, events, quizzes, etc.)
│   │   ├── projects.ts      # Project mock data + helpers
│   │   └── users.ts         # User mock data + helpers
│   ├── hooks/
│   │   ├── useAppContext.tsx # DemoRole + Toast context
│   │   └── useAppStore.tsx  # Global reactive demo store
│   ├── layouts/
│   │   ├── PublicLayout.tsx  # Nav + footer for public pages
│   │   └── DashboardLayout.tsx # Sidebar + header for role portals
│   ├── pages/
│   │   ├── public/          # Home, Projects, Events, Learn, Ideas, Workflow, Incubation
│   │   ├── student/         # Student dashboard + all sub-pages
│   │   ├── faculty/         # Faculty dashboard + sub-pages
│   │   └── admin/           # Admin dashboard + sub-pages
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── utils/
│   │   └── index.ts         # Formatters, status configs, helpers
│   ├── App.tsx              # Root router with all routes
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles + Tailwind + design tokens
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🎮 How to Navigate the Demo

1. **Open** `http://localhost:5173`
2. **Click "Enter Demo"** on the homepage — or navigate to `/demo`
3. **Select a role** (Student / Faculty / Admin) to enter the respective portal
4. Use the **floating role switcher** (bottom-right corner) to switch roles at any time
5. All interactions (voting, applying, registering, quiz scores, notifications) **persist across page reloads** via `localStorage`

### Key Demo Flows

| Flow | Steps |
|------|-------|
| Submit Idea | Ideas Board → Submit an Idea → Fill multi-step form → Submit |
| Join a Project | Projects → Select project → Request to Join → Fill application |
| Take a Quiz | Learn → Quizzes tab → Start Quiz → Answer questions → View score |
| Review as Faculty | Switch to Faculty → Review Ideas → Approve/Reject with feedback |
| Post Announcement | Switch to Admin → Announcements → New Announcement |

---

## 🔐 Important Notes

> ⚠️ **This is a frontend-only prototype.** There is no backend, database, real authentication, or payment system. All data is mock/static and stored in browser `localStorage`.

- No login credentials are required — just select a role in Demo Mode
- Resetting `localStorage` in browser DevTools will restore all data to defaults
- The platform is designed as a **faculty approval showcase**, not a production application

---

## 📄 License

This project is for educational and demonstration purposes only.

---

## 🤝 Built By

**Akshat** — IT Club & Innovation Hub Frontend Prototype  
College project for faculty approval presentation.
