import { useState, useCallback, useMemo, useEffect } from "react";
import { INITIAL_TASKS } from "../utils/constants";
import { fetchTasks, saveTask, generateId, todayString } from "../utils/async";

/**
 * useTasks - Central state management hook for all task operations.
 * Demonstrates: controlled state, async operations, immutable updates.
 */
export function useTasks() {
  const [tasks, setTasks]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // Simulate initial async data fetch
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchTasks(INITIAL_TASKS)
      .then((data) => {
        if (!cancelled) {
          setTasks(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Failed to load tasks");
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  // Create a new task (async save simulation)
  const createTask = useCallback(async (taskData) => {
    const newTask = {
      ...taskData,
      id: generateId(),
      createdAt: todayString(),
      tags: taskData.tags || [],
    };
    const saved = await saveTask(newTask);
    setTasks((prev) => [...prev, saved]);
    return saved;
  }, []);

  // Update an existing task (async save simulation)
  const updateTask = useCallback(async (taskData) => {
    const saved = await saveTask(taskData);
    setTasks((prev) => prev.map((t) => (t.id === saved.id ? saved : t)));
    return saved;
  }, []);

  // Quick status update (inline, no full modal)
  const updateStatus = useCallback((id, status) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  }, []);

  // Delete a task
  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Computed stats (memoized to avoid recalculation on unrelated renders)
  const stats = useMemo(() => ({
    total:      tasks.length,
    todo:       tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    review:     tasks.filter((t) => t.status === "review").length,
    done:       tasks.filter((t) => t.status === "done").length,
  }), [tasks]);

  return { tasks, loading, error, stats, createTask, updateTask, updateStatus, removeTask };
}
