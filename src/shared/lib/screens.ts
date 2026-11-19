import "server-only";
import { access, readdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "screens");
const EXTENSIONS = [".webp", ".avif", ".png", ".jpg", ".jpeg"];
const SAFE_SLOT = /^[a-z0-9][a-z0-9/_-]*$/i;

export async function findScreen(slot: string): Promise<string | null> {
  if (!SAFE_SLOT.test(slot) || slot.includes("..")) return null;

  for (const extension of EXTENSIONS) {
    try {
      await access(path.join(ROOT, `${slot}${extension}`));
      return `/screens/${slot}${extension}`;
    } catch {
      continue;
    }
  }

  return null;
}

export async function listScreens(folder: string): Promise<string[]> {
  if (!SAFE_SLOT.test(folder) || folder.includes("..")) return [];

  try {
    const names = await readdir(path.join(ROOT, folder));
    return names
      .filter((name) => EXTENSIONS.includes(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
      .map((name) => `/screens/${folder}/${name}`);
  } catch {
    return [];
  }
}
