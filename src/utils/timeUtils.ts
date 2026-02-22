export function formatTimeRemaining(ms: number): string {
  if (ms <= 0) return "00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function getTimerColor(ms: number): string {
  const minutes = ms / 60000;
  if (minutes > 30) return "hsl(160, 84%, 39%)";
  if (minutes > 10) return "hsl(38, 92%, 50%)";
  if (minutes > 5) return "hsl(25, 95%, 53%)";
  return "hsl(0, 84%, 60%)";
}

export function getTimerUrgency(ms: number): "calm" | "warning" | "urgent" | "critical" {
  const minutes = ms / 60000;
  if (minutes > 30) return "calm";
  if (minutes > 10) return "warning";
  if (minutes > 5) return "urgent";
  return "critical";
}

export function relativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}
