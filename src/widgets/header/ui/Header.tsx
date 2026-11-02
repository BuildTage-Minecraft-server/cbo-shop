import Link from "next/link";
import { getSession } from "@/entities/session";
import { LogoutButton } from "@/features/auth-by-drasl";
import { gameServer, routes, siteConfig } from "@/shared/config";
import { ButtonAnchor, ButtonLink, Container, Logo } from "@/shared/ui";

const navigation = [
  { href: routes.home, label: "Сервер" },
  { href: routes.join, label: "Как начать" },
  { href: routes.shop, label: "Магазин" },
  { href: routes.contacts, label: "Контакты" },
] as const;

function NavLinks() {
  return (
    <>
      {navigation.map((item) => (
        <Link key={item.href} href={item.href} className="nav-link">
          {item.label}
        </Link>
      ))}
    </>
  );
}

export async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href={routes.home} aria-label={`${siteConfig.name}: на главную`}>
          <Logo name={siteConfig.name} />
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-8 md:flex">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-3">
          {gameServer.launcherUrl ? (
            <ButtonAnchor href={gameServer.launcherUrl} icon="download" className="hidden sm:inline-flex">
              Скачать
            </ButtonAnchor>
          ) : null}
          {session ? (
            <>
              <span className="hidden max-w-40 truncate font-display text-lg tracking-wide text-white sm:inline">
                {session.name}
              </span>
              <LogoutButton />
            </>
          ) : (
            <ButtonLink href={routes.login} variant="secondary" icon="user">
              Войти
            </ButtonLink>
          )}
        </div>
      </Container>

      <nav aria-label="Мобильная навигация" className="flex gap-6 overflow-x-auto border-t border-line px-5 py-3 md:hidden">
        <NavLinks />
      </nav>
    </header>
  );
}
