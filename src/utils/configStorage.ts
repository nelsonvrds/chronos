import type { TaskStateModel } from "../models/TaskStateModel";

const STORAGE_KEY = "chronos-pomodoro-config";

const defaultConfig: TaskStateModel["config"] = {
  workTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
};

export function loadConfigFromStorage(): TaskStateModel["config"] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultConfig;
    const parsed = JSON.parse(stored);
    if (
      typeof parsed?.workTime === "number" &&
      typeof parsed?.shortBreakTime === "number" &&
      typeof parsed?.longBreakTime === "number"
    ) {
      return {
        workTime: Math.max(1, Math.min(120, Math.round(parsed.workTime))),
        shortBreakTime: Math.max(1, Math.min(60, Math.round(parsed.shortBreakTime))),
        longBreakTime: Math.max(1, Math.min(120, Math.round(parsed.longBreakTime))),
      };
    }
  } catch {
    // ignore
  }
  return defaultConfig;
}

export function saveConfigToStorage(config: TaskStateModel["config"]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignore
  }
}
