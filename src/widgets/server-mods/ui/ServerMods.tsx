import { gameServer } from "@/shared/config";
import { Container, Panel, SectionHeading } from "@/shared/ui";
import { modGroups } from "../model/mods";

export function ServerMods() {
  return (
    <section id="mods" className="scroll-mt-24 border-t border-line">
      <Container className="py-12 md:py-20">
        <SectionHeading
          title="На чём построен сервер"
          description={`${gameServer.platform}. В основе собственный мод LobbyShooter и оружейное ядро TACZ.`}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modGroups.map((group) => (
            <Panel key={group.title} as="article" className="p-5">
              <h3 className="font-display text-2xl font-semibold uppercase tracking-wide text-white">{group.title}</h3>
              {group.note ? <p className="mt-2 text-sm leading-6 text-muted">{group.note}</p> : null}
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="border border-line bg-surface-2 px-2.5 py-1 text-sm text-body">
                    {item}
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      </Container>
    </section>
  );
}
