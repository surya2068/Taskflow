import { memo } from "react";
import { STATUS_CONFIG, PRIORITY_CONFIG } from "../utils/constants";

/**
 * ListView — Table/list representation of tasks.
 * Demonstrates: controlled select inputs for inline status change.
 */
const ListView = memo(function ListView({ tasks, onStatusChange, onTaskClick }) {
  return (
    <div className="task-table" role="table" aria-label="Task list">
      {/* Head */}
      <div className="task-table-head" role="row">
        <span className="th" role="columnheader">Task</span>
        <span className="th" role="columnheader">Status</span>
        <span className="th" role="columnheader">Priority</span>
        <span className="th" role="columnheader">Assignee</span>
        <span className="th" role="columnheader">Created</span>
      </div>

      {/* Rows */}
      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-text">No tasks match your filters</div>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onClick={onTaskClick}
          />
        ))
      )}
    </div>
  );
});

/** Individual list row — memoized */
const TaskRow = memo(function TaskRow({ task, onStatusChange, onClick }) {
  const sc = STATUS_CONFIG[task.status]     ?? STATUS_CONFIG["todo"];
  const pc = PRIORITY_CONFIG[task.priority] ?? PRIORITY_CONFIG["medium"];

  const handleStatusChange = (e) => {
    e.stopPropagation();
    onStatusChange(task.id, e.target.value);
  };

  return (
    <div
      className="task-row"
      role="row"
      onClick={() => onClick(task)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(task)}
      aria-label={`Task: ${task.title}`}
    >
      {/* Title + description */}
      <div className="td" role="cell">
        <div className="td-title">{task.title}</div>
        <div className="td-sub">{task.description.slice(0, 45)}…</div>
      </div>

      {/* Status — controlled select for inline update */}
      <div className="td" role="cell">
        <span className="status-pill" style={{ background: sc.bg, color: sc.color }}>
          <span aria-hidden="true">{sc.icon}</span>
          <select
            className="status-select"
            style={{ color: sc.color }}
            value={task.status}
            onChange={handleStatusChange}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Change status of ${task.title}`}
          >
            {Object.entries(STATUS_CONFIG).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </span>
      </div>

      {/* Priority */}
      <div className="td" role="cell">
        <span
          className="priority-badge"
          style={{ background: `${pc.color}22`, color: pc.color }}
        >
          {pc.label}
        </span>
      </div>

      {/* Assignee */}
      <div className="td td-assignee" role="cell">
        <span className="task-assignee" aria-hidden="true">{task.assignee[0]}</span>
        <span className="td-assignee-name">{task.assignee}</span>
      </div>

      {/* Date */}
      <div className="td td-date" role="cell">{task.createdAt}</div>
    </div>
  );
});

export default ListView;
