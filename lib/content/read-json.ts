import "server-only";

import fs from "fs";

const cache = new Map<string, unknown>();

export function readJsonFile<T>(filePath: string): T {
  const cached = cache.get(filePath);
  if (cached) return cached as T;

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw) as T;
  cache.set(filePath, parsed);
  return parsed;
}
