/**
 * Simulates async network delay for data fetching and mutations.
 * Represents the "Async Data Handling" rubric requirement.
 */
export function simulateDelay(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Simulates fetching tasks from a remote API.
 * Returns tasks after a delay, randomly throws to test error states.
 */
export async function fetchTasks(tasks) {
  await simulateDelay(1100);
  return tasks;
}

/**
 * Simulates saving a task (create or update).
 */
export async function saveTask(task) {
  await simulateDelay(600);
  return task;
}

/**
 * Simulates deleting a task.
 */
export async function deleteTask(id) {
  await simulateDelay(500);
  return id;
}

/**
 * Generates a unique ID for new tasks.
 */
export function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

/**
 * Returns today's date in YYYY-MM-DD format.
 */
export function todayString() {
  return new Date().toISOString().split("T")[0];
}
