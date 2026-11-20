import Link from "next/link";
import type { LauncherDownloads } from "@/entities/launcher";
import { ButtonAnchor, ButtonLink } from "@/shared/ui";
import type { DetectedPlatform } from "../lib/platform";
import { resolveTarget } from "../lib/resolve";

type Props = {
  downloads: LauncherDownloads;
  platform: DetectedPlatform;
  size?: "md" | "lg";
  short?: boolean;
  withNote?: boolean;
  showOthers?: boolean;
  className?: string;
};

const noteClass = "mt-3 space-y-1 text-xs leading-5 text-muted";
const linkClass = "text-accent underline-offset-2 hover:underline";

export function DownloadAction({ downloads, platform, size = "md", short = false, withNote = false, showOthers = false, className }: Props) {
  const target = resolveTarget(downloads, platform, short);

  const button = target.internal ? (
    <ButtonLink href={target.href} size={size} icon="download" className={className}>
      {target.label}
    </ButtonLink>
  ) : (
    <ButtonAnchor href={target.href} size={size} icon="download" className={className}>
      {target.label}
    </ButtonAnchor>
  );

  if (!withNote) return button;

  const sibling =
    platform === "mac-arm64"
      ? downloads.builds.find((item) => item.platform === "mac-x64")
      : platform === "mac-x64"
        ? downloads.builds.find((item) => item.platform === "mac-arm64")
        : undefined;

  return (
    <div>
      <div className="flex">{button}</div>
      <div className={noteClass}>
        {platform === "mobile" ? (
          <p>Лаунчер устанавливается на компьютер (Windows, macOS или Linux). Откройте эту страницу на компьютере.</p>
        ) : null}
        {sibling ? (
          <p>
            {platform === "mac-arm64" ? "Для Mac с чипом M1 и новее. " : "Для Mac с процессором Intel. "}
            <a href={sibling.url} className={linkClass}>
              {platform === "mac-arm64" ? "Mac с Intel? Скачать для Intel" : "Mac с чипом M1 и новее? Скачать для Apple Silicon"}
            </a>
          </p>
        ) : null}
        {showOthers && downloads.builds.length > 1 ? (
          <p>
            <Link href="/#download" className={linkClass}>
              Другие системы
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
