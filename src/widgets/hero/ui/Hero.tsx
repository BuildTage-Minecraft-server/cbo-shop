import Image from "next/image";
import { lobbyScreen } from "@/shared/assets";
import { gameServer, routes, siteConfig } from "@/shared/config";
import { ButtonAnchor, ButtonLink, Container, CopyField } from "@/shared/ui";

export function Hero() {
  const { launcherUrl, launcherNote, address, version } = gameServer;

  return (
    <section>
      <Container className="grid items-center gap-10 py-10 md:grid-cols-[0.9fr_1.1fr] md:py-16">
        <div>
          <h1>
            <span className="block font-display text-[96px] font-bold leading-[0.85] tracking-tight text-white sm:text-[136px]">
              {siteConfig.name}
            </span>
            <span className="mt-5 block font-display text-2xl font-medium uppercase tracking-[0.12em] text-accent sm:text-3xl">
              Игровой сервер Minecraft
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-body">
            Матчи, ранги и своё снаряжение. Находите матч или создавайте свой, растите в рейтинге и собирайте коллекцию
            скинов оружия.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {launcherUrl ? (
              <>
                <ButtonAnchor href={launcherUrl} size="lg" icon="download">
                  Скачать лаунчер
                </ButtonAnchor>
                <ButtonLink href={routes.join} variant="secondary" size="lg">
                  Как начать
                </ButtonLink>
              </>
            ) : (
              <>
                <ButtonLink href={routes.join} size="lg" icon="target">
                  Начать играть
                </ButtonLink>
                <ButtonLink href={routes.features} variant="secondary" size="lg">
                  Что внутри
                </ButtonLink>
              </>
            )}
          </div>
          {launcherUrl && launcherNote ? <p className="mt-3 text-xs text-muted">{launcherNote}</p> : null}

          {address ? (
            <div className="mt-8">
              <CopyField label={version ? `Адрес сервера, версия ${version}` : "Адрес сервера"} value={address} />
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
