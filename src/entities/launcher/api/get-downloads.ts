import "server-only";
import { cache } from "react";
import { gameServer } from "@/shared/config";
import { classifyFile, compareVersions, parseManifest } from "../lib/parse-manifest";
import type { Manifest } from "../lib/parse-manifest";
import type { LauncherBuild, LauncherDownloads, LauncherPlatform } from "../model/types";

const MANIFESTS = ["latest.yml", "latest-mac.yml", "latest-linux.yml", "latest-linux-arm64.yml"] as const;
const PLATFORM_ORDER: readonly LauncherPlatform[] = ["windows", "mac-arm64", "mac-x64", "linux-x64", "linux-arm64"];
const REVALIDATE_SECONDS = 300;
const TIMEOUT_MS = 4000;

const lastKnown = new Map<LauncherPlatform, LauncherBuild>();

async function loadManifest(baseUrl: string, name: string): Promise<Manifest | null> {
  try {
    const response = await fetch(`${baseUrl}${name}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return null;
    return parseManifest(await response.text());
  } catch {
    return null;
  }
}

function toBuilds(baseUrl: string, manifest: Manifest): LauncherBuild[] {
  return manifest.files.flatMap((file) => {
    const platform = classifyFile(file.name);
    if (!platform) return [];
    return [
      {
        platform,
        version: manifest.version,
        fileName: file.name,
        url: `${baseUrl}${encodeURIComponent(file.name)}`,
        size: file.size,
      },
    ];
  });
}

export const getLauncherDownloads = cache(async (): Promise<LauncherDownloads> => {
  const baseUrl = `${gameServer.launcherCdnUrl}/`;
  const manifests = await Promise.all(MANIFESTS.map((name) => loadManifest(baseUrl, name)));

  for (const manifest of manifests) {
    if (!manifest) continue;
    for (const build of toBuilds(baseUrl, manifest)) {
      const known = lastKnown.get(build.platform);
      if (!known || compareVersions(build.version, known.version) >= 0) lastKnown.set(build.platform, build);
    }
  }

  const builds = PLATFORM_ORDER.flatMap((platform) => {
    const build = lastKnown.get(platform);
    return build ? [build] : [];
  });

  return { builds, fallbackUrl: gameServer.launcherUrl };
});
