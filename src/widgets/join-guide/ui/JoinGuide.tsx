import type { ReactNode } from "react";
import { gameServer, siteConfig } from "@/shared/config";
import { ButtonAnchor, Container, SectionHeading, Steps } from "@/shared/ui";
import type { StepItem } from "@/shared/ui";

function Code({ children }: { children: string }) {
  return (
    <code className="block break-all border border-line-strong bg-surface px-3 py-2 font-mono text-sm text-white">{children}</code>
  );
}

function buildSteps(): StepItem[] {
  const { accountsUrl, authServerUrl, address, platform, communityUrl, communityLabel, launcherUrl, launcherNote } = gameServer;

  const accountExtra: ReactNode = accountsUrl ? (
    <ButtonAnchor href={accountsUrl} target="_blank" rel="noopener noreferrer" variant="secondary" icon="user">
      Создать аккаунт
    </ButtonAnchor>
  ) : null;

  const launcherStep: StepItem = launcherUrl
    ? {
        title: "Скачайте лаунчер",
        text: "Установите лаунчер и войдите в него аккаунтом, созданным на первом шаге.",
        extra: (
          <div className="space-y-4">
            <ButtonAnchor href={launcherUrl} icon="download">
              Скачать лаунчер
            </ButtonAnchor>
            {launcherNote ? <p className="text-xs text-muted">{launcherNote}</p> : null}
            {authServerUrl ? (
              <div className="border-t border-line pt-4">
                <p className="text-xs text-muted">Свой лаунчер с поддержкой authlib-injector? Адрес сервера авторизации:</p>
                <code className="mt-2 block break-all font-mono text-xs text-body">{authServerUrl}</code>
              </div>
            ) : null}
          </div>
        ),
      }
    : {
        title: "Добавьте аккаунт в лаунчер",
        text: authServerUrl
          ? "Подойдёт лаунчер с поддержкой authlib-injector, например HMCL. Укажите адрес сервера авторизации:"
          : "Подойдёт лаунчер с поддержкой authlib-injector, например HMCL. Адрес сервера авторизации уточняйте в сообществе.",
        extra: authServerUrl ? <Code>{authServerUrl}</Code> : null,
      };

  return [
    {
      title: "Создайте аккаунт",
      text: `Аккаунт создаётся на сервере авторизации ${siteConfig.name}. Он же открывает вход на этот сайт.`,
      extra: accountExtra,
    },
    launcherStep,
    {
      title: "Зайдите на сервер",
      text: address
        ? "Добавьте сервер в список и подключитесь по адресу:"
        : "Добавьте сервер в список и подключитесь. Адрес и версию игры уточняйте в сообществе.",
      extra: (
        <div className="space-y-4">
          {address ? <Code>{address}</Code> : null}
          <p className="text-xs text-muted">{platform}</p>
          {communityUrl ? (
            <ButtonAnchor href={communityUrl} target="_blank" rel="noopener noreferrer" variant="secondary" icon="list">
              {communityLabel}
            </ButtonAnchor>
          ) : null}
        </div>
      ),
    },
  ];
}

export function JoinGuide() {
  return (
    <section id="join" className="scroll-mt-24 border-t border-line">
      <Container className="py-12 md:py-20">
        <SectionHeading
          title="Как начать"
          description="Нужен только аккаунт на нашем сервере авторизации и лаунчер, который его поддерживает."
        />
        <div className="mt-10">
          <Steps items={buildSteps()} />
        </div>
      </Container>
    </section>
  );
}
