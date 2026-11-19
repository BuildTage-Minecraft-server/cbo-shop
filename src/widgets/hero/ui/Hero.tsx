import Image from "next/image";
import { getLauncherDownloads } from "@/entities/launcher";
import { DownloadButton, getInitialPlatform, hasDownloads } from "@/features/download-launcher";
import { lobbyScreen } from "@/shared/assets";
import { gameServer, routes, siteConfig } from "@/shared/config";
import { findScreen } from "@/shared/lib/screens";
import { ButtonLink, Container, CopyField } from "@/shared/ui";

const perks = ["Java, игра и моды ставятся сами", "Аккаунт создаётся прямо в лаунчере", "Лаунчер сам подключает к серверу"] as const;
const badges = [gameServer.platform, "Windows, macOS, Linux"] as const;

export async function Hero() {
  const { launcherNote, address } = gameServer;
  const [downloads, initialPlatform, heroScreen] = await Promise.all([
    getLauncherDownloads(),
    getInitialPlatform(),
    findScreen("hero"),
  ]);
  const canDownload = hasDownloads(downloads);
  const alt = `Игра ${siteConfig.name}: тактический PvP-шутер в Minecraft`;

  return (
    <section className="hero-bg relative overflow-hidden">
      <div aria-hidden="true" className="pixel-grid pointer-events-none absolute inset-0" />
      <Container className="relative grid items-center gap-12 py-12 md:grid-cols-[0.9fr_1.1fr] md:py-20">
        <div>
          <ul className="mb-6 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <li
                key={badge}
                className="border border-line-strong bg-surface/80 px-3 py-1.5 font-display text-sm uppercase tracking-[0.14em] text-body backdrop-blur"
              >
                {badge}
              </li>
            ))}
          </ul>
          <h1>
            <span className="block bg-gradient-to-b from-white via-[#ffe3d0] to-accent bg-clip-text font-display text-[96px] font-bold leading-[0.85] tracking-tight text-transparent sm:text-[136px]">
              {siteConfig.name}
            </span>
            <span className="mt-5 block font-display text-2xl font-medium uppercase tracking-[0.12em] text-accent sm:text-3xl">
              Тактический PvP-шутер в Minecraft
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-body">
            Заходите в лобби, нажимайте «Найти матч» и играйте командой против команды. Своё снаряжение, прокачка, рейтинги и
            реплеи: всё внутри {gameServer.platform}.
          </p>

          <div className="mt-8 flex flex-wrap items-start gap-4">
            {canDownload ? (
              <DownloadButton downloads={downloads} initialPlatform={initialPlatform} size="lg" withNote />
            ) : (
              <ButtonLink href={routes.join} size="lg" icon="target">
                Начать играть
              </ButtonLink>
            )}
            <ButtonLink href={routes.game} variant="secondary" size="lg">
              Об игре
            </ButtonLink>
          </div>
          {canDownload && launcherNote ? <p className="mt-3 text-xs text-muted">{launcherNote}</p> : null}

          {canDownload ? (
            <ul className="mt-8 space-y-2">
              {perks.map((perk) => (
                <li key={perk} className="flex gap-3 text-sm text-body">
                  <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 bg-accent" />
                  {perk}
                </li>
              ))}
            </ul>
          ) : null}

          {address ? (
            <div className="mt-8">
              <CopyField label={`Адрес сервера, ${gameServer.platform}`} value={address} />
            </div>
          ) : null}
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute -inset-6 -z-10 bg-gradient-to-tr from-brand/25 via-transparent to-accent/20 blur-3xl" />
          <div className="frame-glow relative overflow-hidden border border-line-strong bg-surface">
            {heroScreen ? (
              <div className="relative aspect-video">
                <Image src={heroScreen} alt={alt} fill priority sizes="(min-width: 768px) 640px, 100vw" className="object-cover" />
              </div>
            ) : (
              <Image
                src={lobbyScreen}
                alt={`Лобби игры ${siteConfig.name}: матчи, статистика, лидеры, снаряжение, задания и магазины в одном меню`}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 768px) 640px, 100vw"
                className="block h-auto w-full"
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
