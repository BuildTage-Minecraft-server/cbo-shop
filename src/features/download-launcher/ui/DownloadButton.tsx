"use client";

import type { LauncherDownloads } from "@/entities/launcher";
import type { DetectedPlatform } from "../lib/platform";
import { DownloadAction } from "./DownloadAction";
import { usePlatform } from "./use-platform";

type Props = {
  downloads: LauncherDownloads;
  initialPlatform: DetectedPlatform;
  size?: "md" | "lg";
  short?: boolean;
  withNote?: boolean;
  className?: string;
};

export function DownloadButton({ downloads, initialPlatform, size, short, withNote, className }: Props) {
  const platform = usePlatform(initialPlatform);

  return (
    <DownloadAction
      downloads={downloads}
      platform={platform}
      size={size}
      short={short}
      withNote={withNote}
      showOthers={withNote}
      className={className}
    />
  );
}
