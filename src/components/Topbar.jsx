import { PAGE_TITLES } from "../utils/constants";

export default function Topbar({ route, onNewTask }) {
  const showNewTask = route !== "settings" && route !== "analytics";

  return (
    <header className="topbar" role="banner">
      <h1 className="topbar-title">{PAGE_TITLES[route] ?? "TaskFlow"}</h1>

      <div className="topbar-actions">
        {showNewTask && (
          <button className="btn btn-primary btn-sm" onClick={onNewTask}>
            + New Task
          </button>
        )}
      </div>
    </header>
  );
}
