import type { LauncherBuild, LauncherDownloads } from "@/entities/launcher";
import { familyName } from "./platform";
import type { DetectedPlatform } from "./platform";

export type DownloadTarget = {
  href: string;
  label: string;
  internal: boolean;
  build: LauncherBuild | null;
};

export function hasDownloads(downloads: LauncherDownloads): boolean {
  return downloads.builds.length > 0 || downloads.fallbackUrl !== null;
}

export function resolveTarget(downloads: LauncherDownloads, platform: DetectedPlatform, short: boolean): DownloadTarget {
  const build = downloads.builds.find((item) => item.platform === platform) ?? null;

  if (build) {
    return { href: build.url, label: short ? "Скачать" : `Скачать для ${familyName(build.platform)}`, internal: false, build };
  }

  if (downloads.fallbackUrl) {
    const internal = downloads.fallbackUrl.startsWith("/");
    return { href: downloads.fallbackUrl, label: short ? "Скачать" : "Скачать лаунчер", internal, build: null };
  }

  return { href: "/#download", label: short ? "Скачать" : "Выбрать версию лаунчера", internal: true, build: null };
}
