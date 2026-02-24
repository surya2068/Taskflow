import { useState } from "react";
import { STATUS_CONFIG, PRIORITY_CONFIG, TEAM_MEMBERS } from "../utils/constants";
import { simulateDelay } from "../utils/async";

/**
 * TaskModal — Controlled form for task creation and editing.
 * Demonstrates: controlled inputs, async save with loading state, prop contracts.
 *
 * Props:
 *   task    : Task | null   (null = new task)
 *   onClose : () => void
 *   onSave  : (task) => Promise<void>
 */
export default function TaskModal({ task, onClose, onSave }) {
  const isNew = !task;

  const [form, setForm] = useState({
    title:       task?.title       ?? "",
    description: task?.description ?? "",
    status:      task?.status      ?? "todo",
    priority:    task?.priority    ?? "medium",
    assignee:    task?.assignee    ?? "Alex",
    tags:        task?.tags        ?? [],
  });

  const [saving,   setSaving]   = useState(false);
  const [tagInput, setTagInput] = useState("");

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
    onClose();
  };

  const handleAddTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
      if (!form.tags.includes(newTag)) {
        set("tags", [...form.tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag) => set("tags", form.tags.filter((t) => t !== tag));

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label={isNew ? "Create task" : "Edit task"}>
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <span className="modal-title">{isNew ? "Create Task" : "Edit Task"}</span>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="field">
            <label htmlFor="task-title">Title</label>
            <input
              id="task-title"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Task title..."
              autoFocus
            />
          </div>

          <div className="field">
            <label htmlFor="task-desc">Description</label>
            <textarea
              id="task-desc"
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe the task..."
            />
          </div>

          <div className="modal-row">
            <div className="field">
              <label htmlFor="task-status">Status</label>
              <select id="task-status" value={form.status} onChange={(e) => set("status", e.target.value)}>
                {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="task-priority">Priority</label>
              <select id="task-priority" value={form.priority} onChange={(e) => set("priority", e.target.value)}>
                {Object.entries(PRIORITY_CONFIG).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="task-assignee">Assignee</label>
            <select id="task-assignee" value={form.assignee} onChange={(e) => set("assignee", e.target.value)}>
              {TEAM_MEMBERS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="task-tags">Tags (press Enter to add)</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {form.tags.map((tag) => (
                <span key={tag} className="tag" style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}
                  onClick={() => removeTag(tag)}>
                  #{tag} ✕
                </span>
              ))}
            </div>
            <input
              id="task-tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="type tag + Enter..."
            />
          </div>

          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button
              className="btn btn-primary"
              style={{ width: "auto" }}
              onClick={handleSave}
              disabled={saving || !form.title.trim()}
            >
              {saving ? "Saving..." : isNew ? "Create Task" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
