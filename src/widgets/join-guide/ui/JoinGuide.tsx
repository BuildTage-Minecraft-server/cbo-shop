import type { ReactNode } from "react";
import { getLauncherDownloads } from "@/entities/launcher";
import { DownloadPanel, getInitialPlatform } from "@/features/download-launcher";
import { gameServer, routes } from "@/shared/config";
import { ButtonAnchor, ButtonLink, Container, SectionHeading, Steps } from "@/shared/ui";
import type { StepItem } from "@/shared/ui";

function Code({ children }: { children: string }) {
  return (
    <code className="block break-all border border-line-strong bg-surface px-3 py-2 font-mono text-sm text-white">{children}</code>
  );
}

function accountAction(): ReactNode {
  const { registrationEnabled, accountsUrl } = gameServer;

  if (registrationEnabled) {
    return (
      <ButtonLink href={routes.register} variant="secondary" icon="user">
        Создать аккаунт на сайте
      </ButtonLink>
    );
  }

  if (accountsUrl) {
    return (
      <ButtonAnchor href={accountsUrl} target="_blank" rel="noopener noreferrer" variant="secondary" icon="user">
        Создать аккаунт на сайте
      </ButtonAnchor>
    );
  }

  return null;
}

export async function JoinGuide() {
  const { address, platform, communityUrl, communityLabel, authServerUrl } = gameServer;
  const [downloads, initialPlatform] = await Promise.all([getLauncherDownloads(), getInitialPlatform()]);

  const steps: StepItem[] = [
    {
      title: "Скачайте лаунчер",
      text: "Установите его, как любую программу. Он сам загрузит Java, игру и все моды сервера.",
      extra: <DownloadPanel downloads={downloads} initialPlatform={initialPlatform} />,
    },
    {
      title: "Создайте аккаунт",
      text: "В окне лаунчера нажмите «Регистрация», придумайте ник и пароль. Тот же аккаунт подходит для сайта и магазина.",
      extra: accountAction(),
    },
    {
      title: "Нажмите «Играть»",
      text: "При первом запуске лаунчер скачает игру и моды, а затем сам подключит вас к серверу. В лобби нажмите «Найти матч».",
      extra: communityUrl ? (
        <ButtonAnchor href={communityUrl} target="_blank" rel="noopener noreferrer" variant="secondary" icon="list">
          {communityLabel}
        </ButtonAnchor>
      ) : null,
    },
  ];

  return (
    <section id="join" className="scroll-mt-24 border-t border-line">
      <Container className="py-12 md:py-20">
        <SectionHeading title="Как начать" description="Всего три шага, остальное лаунчер сделает сам." />
        <div className="mt-10">
          <Steps items={steps} />
        </div>

        <details className="group mt-12 max-w-3xl border border-line bg-surface">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 font-semibold text-white [&::-webkit-details-marker]:hidden">
            Играете через другой лаунчер?
            <span aria-hidden="true" className="font-display text-3xl font-normal leading-none text-accent transition group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="space-y-4 border-t border-line px-5 py-5 text-sm leading-6 text-body">
            <p>
              Подойдёт любой лаунчер с поддержкой authlib-injector, например HMCL. Мы советуем наш: в другом Forge и все моды сервера
              придётся устанавливать самостоятельно.
            </p>
            {authServerUrl ? (
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted">Адрес сервера авторизации</p>
                <Code>{authServerUrl}</Code>
              </div>
            ) : null}
            {address ? (
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted">Адрес сервера, {platform}</p>
                <Code>{address}</Code>
              </div>
            ) : (
              <p className="text-xs text-muted">{platform}. Адрес сервера уточняйте в сообществе.</p>
            )}
          </div>
        </details>
      </Container>
    </section>
  );
}
