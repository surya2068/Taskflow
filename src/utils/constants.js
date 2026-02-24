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
  { id: 1, title: "Design system architecture", description: "Plan component hierarchy and data flow", status: "done", priority: "high", assignee: "Alex", tags: ["design", "architecture"], createdAt: "2025-01-10" },
  { id: 2, title: "Implement authentication flow", description: "Login, logout, and session management", status: "in-progress", priority: "high", assignee: "Sam", tags: ["auth", "security"], createdAt: "2025-01-12" },
  { id: 3, title: "Build reusable components", description: "Button, Input, Card, Modal, Badge", status: "in-progress", priority: "medium", assignee: "Jordan", tags: ["components", "ui"], createdAt: "2025-01-14" },
  { id: 4, title: "API integration", description: "Connect frontend to backend endpoints", status: "todo", priority: "high", assignee: "Alex", tags: ["api", "backend"], createdAt: "2025-01-15" },
  { id: 5, title: "Write unit tests", description: "Cover critical components and utilities", status: "todo", priority: "medium", assignee: "Sam", tags: ["testing"], createdAt: "2025-01-16" },
  { id: 6, title: "Performance optimization", description: "Memoization, lazy loading, code splitting", status: "todo", priority: "low", assignee: "Jordan", tags: ["performance"], createdAt: "2025-01-17" },
  { id: 7, title: "Accessibility audit", description: "WCAG 2.1 compliance check", status: "review", priority: "medium", assignee: "Alex", tags: ["a11y"], createdAt: "2025-01-18" },
  { id: 8, title: "Documentation", description: "Component docs and API references", status: "review", priority: "low", assignee: "Sam", tags: ["docs"], createdAt: "2025-01-19" },
  { id: 9, title: "CI/CD pipeline setup", description: "Configure GitHub Actions for deployment", status: "todo", priority: "medium", assignee: "Jordan", tags: ["devops"], createdAt: "2025-01-20" },
  { id: 10, title: "Database schema design", description: "Define tables, relations and indexes", status: "done", priority: "high", assignee: "Alex", tags: ["database", "backend"], createdAt: "2025-01-08" },
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
