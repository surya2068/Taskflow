import { useState, useMemo, useCallback } from "react";

/**
 * useTaskFilters - Manages search and filter state for task views.
 * Demonstrates: derived state, memoized filtering, controlled inputs.
 */
export function useTaskFilters(tasks) {
  const [search,   setSearch]   = useState("");
  const [priority, setPriority] = useState(""); // "" | "high" | "medium" | "low"
  const [assignee, setAssignee] = useState(""); // "" | "Alex" | "Sam" | "Jordan"

  const clearFilters = useCallback(() => {
    setSearch("");
    setPriority("");
    setAssignee("");
  }, []);

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const matchSearch =
        !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

      const matchPriority = !priority || t.priority === priority;
      const matchAssignee = !assignee || t.assignee === assignee;

      return matchSearch && matchPriority && matchAssignee;
    });
  }, [tasks, search, priority, assignee]);

  const hasActiveFilters = !!(search || priority || assignee);

  return {
    search,    setSearch,
    priority,  setPriority,
    assignee,  setAssignee,
    filtered,
    hasActiveFilters,
    clearFilters,
  };
}
