const requestLog = new Map<string, number[]>();
const LIMIT = 5;
const WINDOW_MS = 60_000;

export function rateLimit(ip: string) {
  const now = Date.now();
  const history = requestLog.get(ip) ?? [];
  const filtered = history.filter((t) => now - t < WINDOW_MS);

  if (filtered.length >= LIMIT) return false;

  filtered.push(now);
  requestLog.set(ip, filtered);
  return true;
}
