export const STATUS_CONFIG = {
  "todo":        { label: "To Do",       color: "#64748b", bg: "rgba(100,116,139,0.15)", icon: "○" },
  "in-progress": { label: "In Progress", color: "#f59e0b", bg: "rgba(245,158,11,0.15)",  icon: "◑" },
  "review":      { label: "Review",      color: "#8b5cf6", bg: "rgba(139,92,246,0.15)",  icon: "◕" },
  "done":        { label: "Done",        color: "#10b981", bg: "rgba(16,185,129,0.15)",  icon: "●" },
};

export const PRIORITY_CONFIG = {
  "high":   { color: "#ef4444", label: "High" },
  "medium": { color: "#f59e0b", label: "Med"  },
  "low":    { color: "#10b981", label: "Low"  },
};

export const INITIAL_TASKS = [
  { id: 1, title: "Doing Project", description: "Plan the project and complete", status: "done", priority: "high", assignee: "Surya", tags: ["design", "architecture"], createdAt: "2025-01-10" },
  { id: 2, title: "Implement GATES", description: "Login to logism", status: "in-progress", priority: "high", assignee: "Bhargav", tags: ["auth", "security"], createdAt: "2025-01-12" },
  { id: 3, title: "Build Website", description: "Button, Input, Card, Modal, Badge", status: "in-progress", priority: "medium", assignee: "Charan", tags: ["components", "ui"], createdAt: "2025-01-14" },
  { id: 4, title: "Weather", description: "Connect frontend to backend endpoints", status: "todo", priority: "high", assignee: "Bhargav", tags: ["api", "backend"], createdAt: "2025-01-15" },
  { id: 5, title: "Write unit tests", description: "Cover critical components and utilities", status: "todo", priority: "medium", assignee: "Ram charan", tags: ["testing"], createdAt: "2025-01-16" },
  { id: 6, title: "Performance optimization", description: "Memoization, lazy loading, code splitting", status: "todo", priority: "low", assignee: "Ram charan", tags: ["performance"], createdAt: "2025-01-17" },
  { id: 7, title: "Maths Work", description: "complete the work", status: "review", priority: "medium", assignee: "Bhargav", tags: ["a11y"], createdAt: "2025-01-18" },
  { id: 8, title: "Documentation", description: "Component docs and API references", status: "review", priority: "low", assignee: "Surya", tags: ["docs"], createdAt: "2025-01-19" },
  { id: 9, title: "Push into github", description: "Configure GitHub Actions for deployment", status: "todo", priority: "Bhargav", assignee: "Jordan", tags: ["devops"], createdAt: "2025-01-20" },
  { id: 10, title: "Database and design", description: "Define tables, relations and indexes", status: "done", priority: "Charan", assignee: "Alex", tags: ["database", "backend"], createdAt: "2025-01-08" },
];

export const NAV_ITEMS = [
  { id: "board",     label: "Board",     icon: "⊞" },
  { id: "list",      label: "List",      icon: "≡" },
  { id: "analytics", label: "Analytics", icon: "◎" },
  { id: "settings",  label: "Settings",  icon: "⚙" },
];

export const PAGE_TITLES = {
  board:     "Task Board",
  list:      "Task List",
  analytics: "Analytics",
  settings:  "Settings",
};

export const TEAM_MEMBERS = ["Surya", "Bhargav", "Ram Charan"];
