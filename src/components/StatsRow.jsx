import { useMemo } from "react";
import { STATUS_CONFIG } from "../utils/constants";

export default function StatsRow({ tasks }) {
  const stats = useMemo(() =>
    Object.entries(STATUS_CONFIG).map(([key, cfg]) => ({
      key,
      label: cfg.label,
      color: cfg.color,
      icon:  cfg.icon,
      count: tasks.filter((t) => t.status === key).length,
    })),
    [tasks]
  );

  return (
    <div className="stats-row" role="region" aria-label="Task statistics">
      {stats.map((s, i) => (
        <div
          key={s.key}
          className="stat-card"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <span className="stat-icon" aria-hidden="true">{s.icon}</span>
          <div className="stat-num" style={{ color: s.color }}>{s.count}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
