"use client";

import type { LauncherDownloads } from "@/entities/launcher";
import { formatMegabytes } from "@/shared/lib";
import { fileKinds, platformLabels } from "../lib/platform";
import type { DetectedPlatform } from "../lib/platform";
import { hasDownloads } from "../lib/resolve";
import { DownloadAction } from "./DownloadAction";
import { usePlatform } from "./use-platform";

const hints = [
  {
    system: "Windows.",
    text: "У лаунчера пока нет платной подписи издателя, поэтому Windows может показать окно «Система Windows защитила ваш компьютер». Нажмите «Подробнее», затем «Выполнить в любом случае».",
  },
  {
    system: "macOS.",
    text: "Откройте образ и перетащите лаунчер в «Программы». Если система не даёт его открыть, нажмите на него правой кнопкой и выберите «Открыть».",
  },
  {
    system: "Linux.",
    text: "Сделайте файл исполняемым (в свойствах файла или командой chmod +x) и запустите его.",
  },
] as const;

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
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">Другие системы</p>
          <ul className="mt-2 divide-y divide-line border-y border-line text-sm">
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
        </div>
      ) : null}

      <details className="group border border-line bg-surface">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
          Что-то не запускается?
          <span aria-hidden="true" className="font-display text-2xl font-normal leading-none text-accent transition group-open:rotate-45">
            +
          </span>
        </summary>
        <ul className="space-y-3 border-t border-line px-4 py-3 text-xs leading-5 text-body">
          {hints.map((hint) => (
            <li key={hint.system}>
              <strong className="font-semibold text-white">{hint.system}</strong> {hint.text}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
