import type { LauncherPlatform } from "../model/types";

export type ManifestFile = { name: string; size: number | null };
export type Manifest = { version: string; files: ManifestFile[] };

const VERSION = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const FILE_NAME = /^[0-9A-Za-z][0-9A-Za-z._ -]*$/;

function unquote(value: string): string {
  const text = value.trim();
  const quote = text[0];
  if ((quote === "'" || quote === '"') && text.length >= 2 && text.endsWith(quote)) return text.slice(1, -1);
  return text;
}

export function parseManifest(text: string): Manifest | null {
  let version: string | null = null;
  let path: string | null = null;
  let inFiles = false;
  const files: ManifestFile[] = [];

  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;

    const key = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (key) {
      inFiles = key[1] === "files";
      if (key[1] === "version") version = unquote(key[2]);
      if (key[1] === "path") path = unquote(key[2]);
      continue;
    }

    if (!inFiles) continue;

    const entry = /^\s*-\s*url:\s*(.+)$/.exec(line);
    if (entry) {
      files.push({ name: unquote(entry[1]), size: null });
      continue;
    }

    const size = /^\s+size:\s*(\d+)\s*$/.exec(line);
    const current = files[files.length - 1];
    if (size && current) current.size = Number(size[1]);
  }

  if (!version || !VERSION.test(version)) return null;
  if (path && !files.some((file) => file.name === path)) files.push({ name: path, size: null });

  const safe = files.filter((file) => FILE_NAME.test(file.name));
  return safe.length > 0 ? { version, files: safe } : null;
}

export function classifyFile(fileName: string): LauncherPlatform | null {
  const name = fileName.toLowerCase();
  if (name.endsWith(".exe")) return "windows";
  if (name.endsWith(".dmg")) return name.includes("arm64") ? "mac-arm64" : "mac-x64";
  if (name.endsWith(".appimage")) return name.includes("arm64") ? "linux-arm64" : "linux-x64";
  return null;
}

export function compareVersions(a: string, b: string): number {
  const left = a.split("-")[0].split(".").map(Number);
  const right = b.split("-")[0].split(".").map(Number);
  for (let index = 0; index < 3; index += 1) {
    const diff = (left[index] ?? 0) - (right[index] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}
