import { getLauncherDownloads } from "@/entities/launcher";
import { DownloadButton, getInitialPlatform, hasDownloads } from "@/features/download-launcher";
import { gameServer, routes, siteConfig } from "@/shared/config";
import { ButtonLink, Container, CopyField } from "@/shared/ui";
import { MediaSlot } from "@/shared/ui/MediaSlot";

const perks = ["Всё устанавливается автоматически", "Регистрация прямо в лаунчере", "Лаунчер сам заходит на сервер"] as const;
const badges = [gameServer.platform, "Windows, macOS, Linux"] as const;

export async function Hero() {
  const { launcherNote, address } = gameServer;
  const [downloads, initialPlatform] = await Promise.all([getLauncherDownloads(), getInitialPlatform()]);
  const canDownload = hasDownloads(downloads);

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
            <span className="block bg-gradient-to-b from-white via-[#ffe3d0] to-accent bg-clip-text font-display text-[96px] font-bold leading-[1] pb-[0.08em] -mb-[0.23em] tracking-tight text-transparent sm:text-[136px]">
              {siteConfig.name}
            </span>
            <span className="mt-5 block font-display text-2xl font-medium uppercase tracking-[0.12em] text-accent sm:text-3xl">
              Тактический PvP-шутер в Minecraft
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-body">
            Стрельба с обвесами, командные матчи и рейтинги. Нажмите «Найти матч», и в бой.
          </p>

          <div className="mt-8 flex flex-wrap items-start gap-4">
            {canDownload ? (
              <DownloadButton downloads={downloads} initialPlatform={initialPlatform} size="lg" withNote />
            ) : (
              <ButtonLink href={routes.join} size="lg" icon="target">
                Начать играть
              </ButtonLink>
            )}
            <ButtonLink href="/#how" variant="secondary" size="lg">
              Подробнее
            </ButtonLink>
          </div>
          {canDownload && launcherNote ? <p className="mt-3 text-xs text-muted">{launcherNote}</p> : null}

          {canDownload ? (
            <ul className="mt-8 space-y-2">
              {perks.map((perk) => (
                <li key={perk} className="flex gap-3 text-sm text-body">
                  <span aria-hidden="true" className="motion-blink mt-1.5 h-2 w-2 shrink-0 bg-accent" />
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

        <div className="motion-float relative">
          <div aria-hidden="true" className="absolute -inset-6 -z-10 bg-gradient-to-tr from-brand/25 via-transparent to-accent/20 blur-3xl" />
          <MediaSlot
            slot="hero"
            alt={`Игра ${siteConfig.name}: тактический PvP-шутер в Minecraft`}
            label="Главный кадр: бой или лобби"
            sizes="(min-width: 768px) 640px, 100vw"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
