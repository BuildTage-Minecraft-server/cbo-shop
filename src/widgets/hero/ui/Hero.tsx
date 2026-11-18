import Image from "next/image";
import { getLauncherDownloads } from "@/entities/launcher";
import { DownloadButton, getInitialPlatform, hasDownloads } from "@/features/download-launcher";
import { lobbyScreen } from "@/shared/assets";
import { gameServer, routes, siteConfig } from "@/shared/config";
import { ButtonLink, Container, CopyField } from "@/shared/ui";

const perks = ["Java, игра и моды ставятся сами", "Аккаунт создаётся прямо в лаунчере", "Лаунчер сам подключает к серверу"] as const;

export async function Hero() {
  const { launcherNote, address } = gameServer;
  const [downloads, initialPlatform] = await Promise.all([getLauncherDownloads(), getInitialPlatform()]);
  const canDownload = hasDownloads(downloads);

  return (
    <section>
      <Container className="grid items-center gap-10 py-10 md:grid-cols-[0.9fr_1.1fr] md:py-16">
        <div>
          <h1>
            <span className="block font-display text-[96px] font-bold leading-[0.85] tracking-tight text-white sm:text-[136px]">
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

        <Image
          src={lobbyScreen}
          alt={`Лобби игры ${siteConfig.name}: матчи, статистика, лидеры, снаряжение, задания и магазины в одном меню`}
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 768px) 640px, 100vw"
          className="fade-edges block h-auto w-full"
        />
      </Container>
    </section>
  );
}
