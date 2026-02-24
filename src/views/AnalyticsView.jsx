import { memo, useMemo } from "react";
import { STATUS_CONFIG, PRIORITY_CONFIG, TEAM_MEMBERS } from "../utils/constants";

/**
 * AnalyticsView — Data visualizations using SVG and CSS.
 * Demonstrates: derived/computed state, memoized transformations.
 */
const AnalyticsView = memo(function AnalyticsView({ tasks }) {
  const total = tasks.length || 1;

  const byStatus = useMemo(() =>
    Object.entries(STATUS_CONFIG).map(([key, cfg]) => ({
      key, label: cfg.label, color: cfg.color,
      count: tasks.filter((t) => t.status === key).length,
    })),
    [tasks]
  );

  const byPriority = useMemo(() =>
    Object.entries(PRIORITY_CONFIG).map(([key, cfg]) => ({
      key, label: cfg.label, color: cfg.color,
      count: tasks.filter((t) => t.priority === key).length,
    })),
    [tasks]
  );

  const byAssignee = useMemo(() =>
    TEAM_MEMBERS.map((name) => ({
      name,
      total: tasks.filter((t) => t.assignee === name).length,
      done:  tasks.filter((t) => t.assignee === name && t.status === "done").length,
    })),
    [tasks]
  );

  const maxStatusCount = Math.max(...byStatus.map((s) => s.count), 1);

  // Donut chart math
  const r = 60, cx = 70, cy = 70;
  const circ = 2 * Math.PI * r;
  let runningOffset = 0;
  const slices = byStatus.map((s) => {
    const pct = s.count / total;
    const slice = { ...s, pct, offset: runningOffset };
    runningOffset += pct;
    return slice;
  });

  return (
    <div className="analytics-grid" role="main" aria-label="Analytics">
      {/* Bar Chart — Status */}
      <div className="chart-card">
        <div className="chart-title">Tasks by Status</div>
        <div className="bar-chart" role="img" aria-label="Bar chart of tasks by status">
          {byStatus.map((s) => (
            <div key={s.key} className="bar-wrap">
              <span className="bar-val" style={{ color: s.color }}>{s.count}</span>
              <div
                className="bar"
                style={{ height: `${(s.count / maxStatusCount) * 120}px`, background: s.color, minHeight: 4 }}
                title={`${s.label}: ${s.count}`}
              />
              <span className="bar-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Donut Chart — Distribution */}
      <div className="chart-card">
        <div className="chart-title">Status Distribution</div>
        <div className="donut-wrap">
          <svg width="140" height="140" viewBox="0 0 140 140" aria-label="Donut chart of status distribution" role="img">
            {slices.map((s) => (
              <circle
                key={s.key}
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={s.color}
                strokeWidth="20"
                strokeDasharray={`${s.pct * circ} ${circ}`}
                strokeDashoffset={-s.offset * circ + circ * 0.25}
                style={{ transition: "stroke-dasharray 0.6s ease" }}
                aria-label={`${s.label}: ${s.count}`}
              />
            ))}
            <text x={cx} y={cy - 4} textAnchor="middle" fill="var(--text)" fontSize="20" fontWeight="800" fontFamily="Syne">
              {tasks.length}
            </text>
            <text x={cx} y={cy + 14} textAnchor="middle" fill="var(--text2)" fontSize="10" fontFamily="DM Mono">
              total
            </text>
          </svg>
          <div className="donut-legend">
            {byStatus.map((s) => (
              <div key={s.key} className="donut-legend-item">
                <div className="donut-dot" style={{ background: s.color }} aria-hidden="true" />
                {s.label}:&nbsp;<strong style={{ color: "var(--text)" }}>{s.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="chart-card">
        <div className="chart-title">Priority Breakdown</div>
        {byPriority.map((p) => (
          <div key={p.key} className="progress-bar-wrap">
            <div className="progress-bar-header">
              <span style={{ color: p.color }}>{p.label}</span>
              <span className="progress-bar-count">{p.count} task{p.count !== 1 ? "s" : ""}</span>
            </div>
            <div className="progress-bar-track" role="progressbar" aria-valuenow={p.count} aria-valuemax={tasks.length}>
              <div
                className="progress-bar-fill"
                style={{ width: `${(p.count / total) * 100}%`, background: p.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Team Workload */}
      <div className="chart-card">
        <div className="chart-title">Team Workload</div>
        {byAssignee.map((a) => (
          <div key={a.name} className="workload-row">
            <div className="workload-avatar" aria-hidden="true">{a.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12, fontWeight: 600, fontFamily: "var(--font-mono)" }}>
                <span>{a.name}</span>
                <span style={{ color: "var(--text2)" }}>{a.done}/{a.total} done</span>
              </div>
              <div className="progress-bar-track" role="progressbar" aria-valuenow={a.done} aria-valuemax={a.total || 1} aria-label={`${a.name} completion`}>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${a.total ? (a.done / a.total) * 100 : 0}%`, background: "var(--accent)" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default AnalyticsView;
