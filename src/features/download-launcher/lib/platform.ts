import type { LauncherPlatform } from "@/entities/launcher";

export type DetectedPlatform = LauncherPlatform | "mobile" | "other";

export const platformLabels: Record<LauncherPlatform, string> = {
  windows: "Windows",
  "mac-arm64": "macOS (Apple Silicon)",
  "mac-x64": "macOS (Intel)",
  "linux-x64": "Linux (x64)",
  "linux-arm64": "Linux (ARM64)",
};

export const fileKinds: Record<LauncherPlatform, string> = {
  windows: "установщик",
  "mac-arm64": "образ диска",
  "mac-x64": "образ диска",
  "linux-x64": "AppImage",
  "linux-arm64": "AppImage",
};

export function familyName(platform: LauncherPlatform): string {
  if (platform === "windows") return "Windows";
  if (platform.startsWith("mac")) return "macOS";
  return "Linux";
}

export function detectPlatform(userAgent: string): DetectedPlatform {
  if (/Android|iPhone|iPad|iPod/i.test(userAgent)) return "mobile";
  if (/CrOS/.test(userAgent)) return "other";
  if (/Windows/i.test(userAgent)) return "windows";
  if (/Macintosh|Mac OS X/i.test(userAgent)) return "mac-arm64";
  if (/Linux|X11/i.test(userAgent)) return /aarch64|arm64/i.test(userAgent) ? "linux-arm64" : "linux-x64";
  return "other";
}

type UserAgentData = {
  getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }>;
};

export async function refinePlatform(current: DetectedPlatform): Promise<DetectedPlatform> {
  if (typeof navigator === "undefined") return current;

  const isMac = current === "mac-arm64" || current === "mac-x64";
  const isLinux = current === "linux-x64" || current === "linux-arm64";
  if (isMac && navigator.maxTouchPoints > 1) return "mobile";
  if (!isMac && !isLinux) return current;

  const data = (navigator as Navigator & { userAgentData?: UserAgentData }).userAgentData;
  if (!data?.getHighEntropyValues) return current;

  try {
    const { architecture } = await data.getHighEntropyValues(["architecture"]);
    if (isMac) {
      if (architecture === "arm") return "mac-arm64";
      if (architecture === "x86") return "mac-x64";
      return current;
    }
    if (architecture === "arm") return "linux-arm64";
    if (architecture === "x86") return "linux-x64";
    return current;
  } catch {
    return current;
  }
}
