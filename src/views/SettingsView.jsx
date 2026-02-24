import { memo, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

/**
 * SettingsView — App settings and preferences.
 * Demonstrates: local controlled state for toggles, conditional rendering by tab.
 */
const SettingsView = memo(function SettingsView() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");

  const [notifications, setNotifications] = useState({
    email: true, push: false, slack: true,
  });
  const [performance, setPerformance] = useState({
    memoize: true, lazyLoad: true, virtualize: false,
  });

  const tabs = [
    { id: "general",      label: "General"      },
    { id: "notifications",label: "Notifications"},
    { id: "performance",  label: "Performance"  },
    { id: "about",        label: "About"        },
  ];

  const toggleNotif = (key) =>
    setNotifications((p) => ({ ...p, [key]: !p[key] }));

  const togglePerf = (key) =>
    setPerformance((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="settings-grid">
      {/* Sidebar nav */}
      <nav className="settings-nav" aria-label="Settings sections">
        {tabs.map((t) => (
          <div
            key={t.id}
            className={`settings-nav-item ${activeTab === t.id ? "active" : ""}`}
            onClick={() => setActiveTab(t.id)}
            role="button"
            aria-current={activeTab === t.id ? "page" : undefined}
          >
            {t.label}
          </div>
        ))}
      </nav>

      {/* Panel */}
      <div className="settings-panel">
        {/* General */}
        {activeTab === "general" && (
          <div className="settings-section">
            <h3>Appearance</h3>
            <p>// customize the visual experience</p>
            <ToggleRow
              label="Dark Mode"
              sub="Toggle between dark and light theme"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <ToggleRow
              label="Compact Layout"
              sub="Reduce spacing for denser information display"
              checked={false}
              onChange={() => {}}
            />
          </div>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <div className="settings-section">
            <h3>Notifications</h3>
            <p>// choose how you receive updates</p>
            {Object.entries(notifications).map(([key, val]) => (
              <ToggleRow
                key={key}
                label={`${key.charAt(0).toUpperCase() + key.slice(1)} Notifications`}
                sub={`Receive ${key} alerts for task updates and mentions`}
                checked={val}
                onChange={() => toggleNotif(key)}
              />
            ))}
          </div>
        )}

        {/* Performance */}
        {activeTab === "performance" && (
          <div className="settings-section">
            <h3>Performance</h3>
            <p>// rendering and optimization settings</p>
            {Object.entries(performance).map(([key, val]) => (
              <ToggleRow
                key={key}
                label={key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                sub={`Enable ${key} for improved rendering performance`}
                checked={val}
                onChange={() => togglePerf(key)}
              />
            ))}
          </div>
        )}

        {/* About */}
        {activeTab === "about" && (
          <div className="settings-section">
            <h3>TaskFlow Portal</h3>
            <p>// task workflow and status management system</p>
            <div className="settings-info-box">
              <div>Version:      <span>2.0.0</span></div>
              <div>Architecture: <span>React SPA</span></div>
              <div>State:        <span>useState + Context + useMemo</span></div>
              <div>Routing:      <span>Client-side SPA routing</span></div>
              <div>Optimization: <span>React.memo + memoization</span></div>
              <div>Async:        <span>Simulated fetch with loading/error states</span></div>
              <div>Accessibility:<span>ARIA roles + keyboard navigation</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

/** Reusable toggle row */
function ToggleRow({ label, sub, checked, onChange }) {
  return (
    <div className="toggle-row">
      <div>
        <div className="toggle-label">{label}</div>
        <div className="toggle-sub">{sub}</div>
      </div>
      <div
        className={`toggle-switch ${checked ? "on" : ""}`}
        onClick={onChange}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onChange()}
      />
    </div>
  );
}

export default SettingsView;
