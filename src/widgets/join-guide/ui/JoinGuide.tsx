import type { ReactNode } from "react";
import { gameServer, siteConfig } from "@/shared/config";
import { ButtonLink, Container, Panel, SectionHeading } from "@/shared/ui";
import type { Accent } from "@/shared/ui";

type Step = {
  title: string;
  text: string;
  accent: Accent;
  code?: string | null;
  meta?: string | null;
  action?: ReactNode;
};

function buildSteps(): Step[] {
  const { accountsUrl, authServerUrl, address, version, communityUrl, communityLabel } = gameServer;

  return [
    {
      title: "Создайте аккаунт",
      text: `Аккаунт создаётся на сервере авторизации ${siteConfig.name}. Он же открывает вход на этот сайт.`,
      accent: "blue",
      action: accountsUrl ? (
        <ButtonLink href={accountsUrl} target="_blank" rel="noopener noreferrer" variant="secondary" icon="user">
          Создать аккаунт
        </ButtonLink>
      ) : null,
    },
    {
      title: "Добавьте аккаунт в лаунчер",
      text: authServerUrl
        ? "Подойдёт лаунчер с поддержкой authlib-injector, например HMCL. Укажите адрес сервера авторизации:"
        : "Подойдёт лаунчер с поддержкой authlib-injector, например HMCL. Адрес сервера авторизации уточняйте в сообществе.",
      accent: "purple",
      code: authServerUrl,
    },
    {
      title: "Зайдите на сервер",
      text: address
        ? "Добавьте сервер в список и подключитесь по адресу:"
        : "Добавьте сервер в список и подключитесь. Адрес и версию игры уточняйте в сообществе.",
      accent: "green",
      code: address,
      meta: version ? `Версия игры: ${version}` : null,
      action: communityUrl ? (
        <ButtonLink href={communityUrl} target="_blank" rel="noopener noreferrer" variant="secondary" icon="list">
          {communityLabel}
        </ButtonLink>
      ) : null,
    },
  ];
}

export function JoinGuide() {
  const steps = buildSteps();

  return (
    <section id="join" className="scroll-mt-24 py-16 md:py-20">
      <Container>
        <SectionHeading
          kicker="Как начать"
          title="Три шага до первого матча"
          description="Нужен только аккаунт на нашем сервере авторизации и лаунчер, который его поддерживает."
        />
        <ol className="mt-10 grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Panel key={step.title} as="li" accent={step.accent} bar="top" className="flex flex-col p-5">
              <span className="hud-icon-box">{index + 1}</span>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-body">{step.text}</p>
              {step.code ? (
                <code className="mt-3 block break-all border border-line-strong bg-ink/70 px-3 py-2 font-mono text-sm text-white">
                  {step.code}
                </code>
              ) : null}
              {step.meta ? <p className="mt-2 text-xs text-muted">{step.meta}</p> : null}
              {step.action ? <div className="mt-4">{step.action}</div> : null}
            </Panel>
          ))}
        </ol>
      </Container>
    </section>
  );
}
