import { memo, useMemo } from "react";
import TaskCard from "../components/TaskCard";
import { STATUS_CONFIG } from "../utils/constants";

/**
 * BoardView — Kanban board grouped by status.
 * Demonstrates: SPA route view, component composition, memoized filtering.
 */
const BoardView = memo(function BoardView({ tasks, onTaskClick }) {
  return (
    <div className="board" role="main" aria-label="Kanban board">
      {Object.entries(STATUS_CONFIG).map(([status, cfg]) => (
        <Column
          key={status}
          status={status}
          config={cfg}
          tasks={tasks.filter((t) => t.status === status)}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  );
});

/** Single kanban column — also memoized */
const Column = memo(function Column({ status, config, tasks, onTaskClick }) {
  return (
    <section
      className="column"
      aria-label={`${config.label} column`}
    >
      <div className="column-head">
        <div
          className="column-status-dot"
          style={{ background: config.color }}
          aria-hidden="true"
        />
        <span className="column-label">{config.label}</span>
        <span className="column-count" aria-label={`${tasks.length} tasks`}>
          {tasks.length}
        </span>
      </div>

      <div className="column-body">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon" aria-hidden="true">{config.icon}</div>
            <div className="empty-text">No tasks here</div>
          </div>
        ) : (
          tasks.map((task, i) => (
            <div key={task.id} style={{ animationDelay: `${i * 50}ms` }}>
              <TaskCard task={task} onClick={onTaskClick} />
            </div>
          ))
        )}
      </div>
    </section>
  );
});

export default BoardView;
