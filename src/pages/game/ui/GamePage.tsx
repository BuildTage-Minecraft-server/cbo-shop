import { gameServer, siteConfig } from "@/shared/config";
import { Container } from "@/shared/ui";
import { GameSections } from "@/widgets/game-sections";
import { JoinGuide } from "@/widgets/join-guide";
import { ServerMods } from "@/widgets/server-mods";

export function GamePage() {
  return (
    <>
      <Container className="py-12 md:py-16">
        <h1 className="font-display text-5xl font-bold uppercase leading-tight tracking-wide text-white sm:text-6xl">Об игре</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-body">
          {siteConfig.name}: сервер {gameServer.platform} с соревновательным шутером внутри. Лобби с поиском матчей, отдельные
          арены, ранги, рейтинги и магазин. Всё построено на собственном моде LobbyShooter.
        </p>
      </Container>
      <GameSections />
      <ServerMods />
      <JoinGuide />
    </>
  );
}
