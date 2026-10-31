import Image from "next/image";
import { lobbyScreen } from "@/shared/assets";
import { gameServer, routes, siteConfig } from "@/shared/config";
import { ButtonAnchor, ButtonLink, Container, Frame, Panel, TitleOrnament } from "@/shared/ui";

export function Hero() {
  return (
    <section className="relative">
      <Container className="grid items-center gap-12 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-neon-cyan">Игровой сервер Minecraft</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Матчи, ранги и своё снаряжение на сервере <span className="text-gold">{siteConfig.name}</span>
          </h1>
          <TitleOrnament />
          <p className="mt-6 max-w-xl text-lg text-body">
            Заходите в лобби, находите матч или создавайте свой, следите за статистикой и рейтингом, выполняйте задания и
            собирайте коллекцию скинов оружия.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {gameServer.launcherUrl ? (
              <>
                <ButtonAnchor href={gameServer.launcherUrl} size="lg" icon="download">
                  Скачать лаунчер
                </ButtonAnchor>
                <ButtonLink href={routes.join} variant="secondary" size="lg" icon="target">
                  Как начать
                </ButtonLink>
              </>
            ) : (
              <>
                <ButtonLink href={routes.join} size="lg" icon="target">
                  Начать играть
                </ButtonLink>
                <ButtonLink href={routes.features} variant="secondary" size="lg" icon="list">
                  Что внутри
                </ButtonLink>
              </>
            )}
          </div>
          {gameServer.launcherUrl && gameServer.launcherNote ? (
            <p className="mt-3 text-xs text-muted">{gameServer.launcherNote}</p>
          ) : null}
          {gameServer.address ? (
            <Panel accent="green" bar="left" className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3">
              <span className="font-display text-sm font-medium text-muted">Адрес сервера</span>
              <span className="font-display text-base font-semibold text-white">{gameServer.address}</span>
              {gameServer.version ? <span className="text-sm text-muted">версия {gameServer.version}</span> : null}
            </Panel>
          ) : null}
        </div>

        <figure>
          <Frame>
            <Image
              src={lobbyScreen}
              alt={`Лобби игры ${siteConfig.name}: матчи, статистика, лидеры, снаряжение, задания и магазины в одном меню`}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 768px) 560px, 100vw"
              className="block h-auto w-full border border-line-strong"
            />
          </Frame>
          <figcaption className="mt-3 text-sm text-muted">Лобби игры: всё главное в одном меню.</figcaption>
        </figure>
      </Container>
    </section>
  );
}
