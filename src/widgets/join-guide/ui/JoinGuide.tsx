import type { ReactNode } from "react";
import { getLauncherDownloads } from "@/entities/launcher";
import { DownloadPanel, getInitialPlatform } from "@/features/download-launcher";
import { gameServer, routes } from "@/shared/config";
import { ButtonAnchor, ButtonLink, Container, SectionHeading, Steps } from "@/shared/ui";
import type { StepItem } from "@/shared/ui";

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
  const { communityUrl, communityLabel } = gameServer;
  const [downloads, initialPlatform] = await Promise.all([getLauncherDownloads(), getInitialPlatform()]);

  const steps: StepItem[] = [
    {
      title: "Скачайте лаунчер",
      text: "Он сам загрузит Java, игру и моды.",
      extra: <DownloadPanel downloads={downloads} initialPlatform={initialPlatform} />,
    },
    {
      title: "Создайте аккаунт",
      text: "Нажмите «Регистрация» в окне лаунчера.",
      extra: accountAction(),
    },
    {
      title: "Нажмите «Играть»",
      text: "Лаунчер подключит вас к серверу.",
      extra: communityUrl ? (
        <ButtonAnchor href={communityUrl} target="_blank" rel="noopener noreferrer" variant="secondary" icon="list">
          {communityLabel}
        </ButtonAnchor>
      ) : null,
    },
  ];

  return (
    <section id="join" className="border-t border-line">
      <Container className="py-12 md:py-20">
        <SectionHeading title="Как начать" />
        <div className="mt-10">
          <Steps items={steps} />
        </div>
      </Container>
    </section>
  );
}
