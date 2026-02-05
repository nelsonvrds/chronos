const NOTIFICATION_TITLE = "Chronos Pomodoro";

export function isNotificationSupported(): boolean {
  return "Notification" in window;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) return "denied";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return Notification.requestPermission();
}

export function notifyTaskStarted(taskName: string, durationMinutes: number): void {
  if (!isNotificationSupported() || Notification.permission !== "granted") return;

  new Notification(NOTIFICATION_TITLE, {
    body: `Tarefa "${taskName}" iniciada! ⏱️ ${durationMinutes} min`,
    icon: "/vite.svg",
  });
}

export function notifyTaskInterrupted(taskName: string): void {
  if (!isNotificationSupported() || Notification.permission !== "granted") return;

  new Notification(NOTIFICATION_TITLE, {
    body: `🛑 Tarefa "${taskName}" interrompida`,
    icon: "/vite.svg",
  });
}
