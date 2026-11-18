export type LauncherPlatform = "windows" | "mac-arm64" | "mac-x64" | "linux-x64" | "linux-arm64";

export type LauncherBuild = {
  platform: LauncherPlatform;
  version: string;
  fileName: string;
  url: string;
  size: number | null;
};

export type LauncherDownloads = {
  builds: readonly LauncherBuild[];
  fallbackUrl: string | null;
};
