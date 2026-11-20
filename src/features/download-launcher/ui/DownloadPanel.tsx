"use client";

import type { LauncherDownloads } from "@/entities/launcher";
import { formatMegabytes } from "@/shared/lib";
import { fileKinds, platformLabels } from "../lib/platform";
import type { DetectedPlatform } from "../lib/platform";
import { hasDownloads } from "../lib/resolve";
import { DownloadAction } from "./DownloadAction";
import { usePlatform } from "./use-platform";

export function DownloadPanel({ downloads, initialPlatform }: { downloads: LauncherDownloads; initialPlatform: DetectedPlatform }) {
  const platform = usePlatform(initialPlatform);

  if (!hasDownloads(downloads)) {
    return (
      <p id="download" className="scroll-mt-28 text-sm leading-6 text-muted">
        Ссылки на лаунчер сейчас недоступны. Обновите страницу чуть позже.
      </p>
    );
  }

  const others = downloads.builds.filter((build) => build.platform !== platform);

  return (
    <div id="download" className="scroll-mt-28 space-y-5">
      <DownloadAction downloads={downloads} platform={platform} withNote />

      {others.length > 0 ? (
        <details className="group border-y border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm text-body transition hover:text-white [&::-webkit-details-marker]:hidden">
            Другие системы
            <span aria-hidden="true" className="font-display text-2xl font-normal leading-none text-accent transition group-open:rotate-45">
              +
            </span>
          </summary>
          <ul className="divide-y divide-line border-t border-line text-sm">
            {others.map((build) => (
              <li key={build.platform}>
                <a href={build.url} className="flex items-center justify-between gap-3 py-2 text-body transition hover:text-white">
                  <span>{platformLabels[build.platform]}</span>
                  <span className="text-xs text-muted">
                    {fileKinds[build.platform]}
                    {build.size ? ` · ${formatMegabytes(build.size)}` : ""}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}
