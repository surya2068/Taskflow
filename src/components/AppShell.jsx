import { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatsRow from "./StatsRow";
import TaskModal from "./TaskModal";
import Toasts from "./Toasts";
import BoardView from "../views/BoardView";
import ListView from "../views/ListView";
import AnalyticsView from "../views/AnalyticsView";
import SettingsView from "../views/SettingsView";
import { useTasks } from "../hooks/useTasks";
import { useTaskFilters } from "../hooks/useTaskFilters";
import { useToast } from "../contexts/ToastContext";
import { STATUS_CONFIG, PRIORITY_CONFIG } from "../utils/constants";

/**
 * AppShell — Top-level layout and routing controller.
 * Demonstrates:
 *   - SPA route management (board / list / analytics / settings)
 *   - Prop drilling vs context decisions
 *   - Conditional rendering per route
 *   - Async task operations with loading/error states
 */
export default function AppShell() {
  const { toast } = useToast();

  // Central task state via custom hook
  const { tasks, loading, error, createTask, updateTask, updateStatus } = useTasks();

  // Filtering state
  const {
    search, setSearch,
    priority, setPriority,
    filtered,
    hasActiveFilters,
    clearFilters,
  } = useTaskFilters(tasks);

  // SPA routing state
  const [route, setRoute] = useState("board");

  // Modal state: null | "new" | Task (edit)
  const [modal, setModal] = useState(null);

  const openNew  = useCallback(() => setModal("new"), []);
  const openEdit = useCallback((task) => setModal(task), []);
  const closeModal = useCallback(() => setModal(null), []);

  const handleSave = useCallback(async (formData) => {
    const isNew = !modal || modal === "new";
    if (isNew) {
      await createTask(formData);
      toast("Task created successfully");
    } else {
      await updateTask({ ...modal, ...formData });
      toast("Task updated");
    }
  }, [modal, createTask, updateTask, toast]);

  const handleStatusChange = useCallback((id, status) => {
    updateStatus(id, status);
    toast(`Status → ${STATUS_CONFIG[status]?.label ?? status}`);
  }, [updateStatus, toast]);

  const showStats   = route !== "settings";
  const showFilters = route === "board" || route === "list";

  return (
    <div className="app">
      <Sidebar route={route} onNavigate={setRoute} />

      <main className="main">
        <Topbar route={route} onNewTask={openNew} />

        <div className="page">
          {/* Loading state */}
          {loading && (
            <div className="loading-state" aria-live="polite">
              <div className="spinner" />
              <div className="loading-text">// loading workspace data...</div>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="empty-state">
              <div className="empty-icon">⚠</div>
              <div className="empty-text">{error}</div>
            </div>
          )}

          {/* Main content (conditional rendering per route) */}
          {!loading && !error && (
            <>
              {/* Stats strip */}
              {showStats && <StatsRow tasks={tasks} />}

              {/* Filters bar — shown on board and list */}
              {showFilters && (
                <div className="filters-bar" role="search">
                  <input
                    className="search-input"
                    placeholder="🔍  Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search tasks"
                  />
                  {["", "high", "medium", "low"].map((p) => (
                    <span
                      key={p}
                      className={`filter-chip ${priority === p ? "active" : ""}`}
                      onClick={() => setPriority(p)}
                      role="button"
                      aria-pressed={priority === p}
                    >
                      {p === "" ? "All" : PRIORITY_CONFIG[p].label}
                    </span>
                  ))}
                  {hasActiveFilters && (
                    <span className="filter-chip" onClick={clearFilters} role="button">
                      Clear ✕
                    </span>
                  )}
                </div>
              )}

              {/* Route views */}
              {route === "board"     && <BoardView    tasks={filtered} onTaskClick={openEdit} />}
              {route === "list"      && <ListView     tasks={filtered} onStatusChange={handleStatusChange} onTaskClick={openEdit} />}
              {route === "analytics" && <AnalyticsView tasks={tasks} />}
              {route === "settings"  && <SettingsView />}
            </>
          )}
        </div>
      </main>

      {/* Modal — conditional rendering */}
      {modal && (
        <TaskModal
          task={modal === "new" ? null : modal}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {/* Toast notifications */}
      <Toasts />
    </div>
  );
}
