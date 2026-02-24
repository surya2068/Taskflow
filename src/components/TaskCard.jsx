import { memo } from "react";
import { STATUS_CONFIG, PRIORITY_CONFIG } from "../utils/constants";

/**
 * TaskCard — Reusable, memoized task display card.
 * Prop contract:
 *   task     : Task object
 *   onClick  : (task) => void
 */
const TaskCard = memo(function TaskCard({ task, onClick }) {
  const sc = STATUS_CONFIG[task.status]   ?? STATUS_CONFIG["todo"];
  const pc = PRIORITY_CONFIG[task.priority] ?? PRIORITY_CONFIG["medium"];

  return (
    <article
      className="task-card"
      onClick={() => onClick(task)}
      role="button"
      tabIndex={0}
      aria-label={`Task: ${task.title}`}
      onKeyDown={(e) => e.key === "Enter" && onClick(task)}
    >
      {/* Status accent bar */}
      <div className="status-bar" style={{ background: sc.color }} aria-hidden="true" />

      {/* Header */}
      <div className="task-card-top">
        <span className="task-title">{task.title}</span>
        <span
          className="priority-badge"
          style={{ background: `${pc.color}22`, color: pc.color }}
          aria-label={`Priority: ${pc.label}`}
        >
          {pc.label}
        </span>
      </div>

      {/* Description */}
      <p className="task-desc">{task.description}</p>

      {/* Footer */}
      <div className="task-meta">
        <div className="task-tags" aria-label="Tags">
          {task.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
        <span
          className="task-assignee"
          title={task.assignee}
          aria-label={`Assigned to ${task.assignee}`}
        >
          {task.assignee[0]}
        </span>
      </div>
    </article>
  );
});

export default TaskCard;
