import type { TaskModel } from "../models/Taskmodel";

const STORAGE_KEY = "chronos-pomodoro-tasks";

function isFinished(task: TaskModel): boolean {
  return task.completedDate !== null || task.interruptedDate !== null;
}

export function loadTasksFromStorage(): TaskModel[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTasksToStorage(tasks: TaskModel[]): void {
  const finishedTasks = tasks.filter(isFinished);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finishedTasks));
  } catch {
    // Ignore storage errors (quota, private mode, etc.)
  }
}
