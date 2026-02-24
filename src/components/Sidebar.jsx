import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { NAV_ITEMS } from "../utils/constants";

export default function Sidebar({ route, onNavigate }) {
  const { user, logout }       = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-inner">
          <div className="sidebar-logo-icon">⟐</div>
          <span className="sidebar-logo-text">TaskFlow</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">Navigation</div>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${route === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
            role="button"
            aria-current={route === item.id ? "page" : undefined}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      {/* Bottom — user & controls */}
      <div className="sidebar-bottom">
        <div className="user-card">
          <div className="user-avatar" aria-hidden="true">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="user-info">
            <div className="user-name">{user?.name ?? "User"}</div>
            <div className="user-role">{user?.role ?? "Member"}</div>
          </div>
        </div>

        <div className="sidebar-actions">
          <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={logout}>
            Sign out
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </aside>
  );
}
