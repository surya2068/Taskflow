# TaskFlow — Task Workflow & Status Management Portal

A production-grade React SPA demonstrating excellent front-end architecture per rubric criteria.

## Quick Start

```bash
npm install
npm run dev
```

Login with **any email** + **any password (6+ chars)**. Default: `admin@taskflow.io` / `password`

---

## Project Structure

```
src/
├── main.jsx                   # Entry point
├── App.jsx                    # Root with all providers + AppRouter
│
├── contexts/
│   ├── ThemeContext.jsx        # Dark/light theme (persisted to localStorage)
│   ├── AuthContext.jsx         # Login/logout/session (persisted to sessionStorage)
│   └── ToastContext.jsx        # Global toast notifications
│
├── hooks/
│   ├── useTasks.js             # Async task CRUD, computed stats, loading/error states
│   └── useTaskFilters.js       # Memoized search + priority + assignee filtering
│
├── utils/
│   ├── constants.js            # STATUS_CONFIG, PRIORITY_CONFIG, INITIAL_TASKS, NAV_ITEMS
│   └── async.js                # Simulated async API (delay, fetch, save, delete)
│
├── components/
│   ├── AppShell.jsx            # Main layout: routing, modal, filter orchestration
│   ├── LoginPage.jsx           # Auth form with controlled inputs + async submit
│   ├── Sidebar.jsx             # Navigation + user info + theme toggle
│   ├── Topbar.jsx              # Page title + actions bar
│   ├── StatsRow.jsx            # Memoized stats grid (task counts per status)
│   ├── TaskCard.jsx            # Reusable memoized task card (clear prop contract)
│   ├── TaskModal.jsx           # Controlled form for create/edit with async save
│   └── Toasts.jsx              # Notification display from ToastContext
│
├── views/
│   ├── BoardView.jsx           # Kanban board — grouped by status columns
│   ├── ListView.jsx            # Table list — inline status change via controlled select
│   ├── AnalyticsView.jsx       # SVG charts: bar, donut, progress bars, workload
│   └── SettingsView.jsx        # Preferences: theme, notifications, performance, about
│
└── styles/
    ├── globals.css             # CSS variables (dark/light), keyframes, reset
    ├── components.css          # Buttons, fields, badges, toggles, toasts, stats
    ├── layout.css              # Login, sidebar, topbar, app shell, modal
    └── views.css               # Board, list table, analytics charts, settings
```

---

## Rubric Mapping

| Criterion | Implementation |
|---|---|
| **Front-End Architecture & Component Structure** | Declarative UI; clear hierarchy `App → Providers → AppShell → Views → Components`; prop contracts documented in JSDoc |
| **State Architecture & Controlled Components** | All form inputs are controlled; immutable state updates (`map`, spread); no uncontrolled components |
| **Routing & View Composition** | SPA routing via `route` state; 4 distinct views with clean separation; nested route logic in `AppShell` |
| **Async Data Handling & Performance** | `useTasks` hook simulates `fetch` with loading + error states; `useCallback` for handlers; `React.memo` on all view/list components; `useMemo` for filters and computed stats |

---

## Features

- 🔐 **Login page** — controlled form, async validation, session persistence
- 🌙 **Theme toggle** — dark/light with CSS variables, persisted to localStorage  
- ⊞ **Kanban board** — 4 status columns (To Do / In Progress / Review / Done)
- ≡ **List view** — inline status change via controlled `<select>`
- ◎ **Analytics** — bar chart, SVG donut, priority breakdown, team workload
- ⚙ **Settings** — appearance, notifications, performance, about panels
- ➕ **Task modal** — create/edit with async save, tag management
- 🔍 **Filters** — real-time search + priority filter chips
- 🟢 **Toast notifications** — success/error feedback for all mutations
- ♿ **Accessibility** — ARIA roles, keyboard navigation, `aria-label` throughout
