import Link from "next/link";
import { CurrencyIcon } from "@/entities/currency-pack";
import { getSession } from "@/entities/session";
import { LogoutButton } from "@/features/auth-by-drasl";
import { routes, siteConfig } from "@/shared/config";
import { ButtonLink, Container, Panel, PixelIcon } from "@/shared/ui";

const navigation = [
  { href: routes.shop, label: "Магазин" },
  { href: routes.delivery, label: "Получение" },
  { href: routes.offer, label: "Оферта" },
  { href: routes.contacts, label: "Контакты" },
] as const;

function NavLinks() {
  return (
    <>
      {navigation.map((item) => (
        <Link key={item.href} href={item.href} className="hud-link">
          {item.label}
        </Link>
      ))}
    </>
  );
}

export async function Header() {
  const session = await getSession();

  return (
    <header className="hud-header sticky top-0 z-40 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href={routes.home} className="flex items-center gap-3" aria-label={`${siteConfig.name}: на главную`}>
          <CurrencyIcon className="h-8 w-8" />
          <span className="font-display text-3xl font-bold leading-none tracking-tight text-white">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-1 md:flex">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Panel accent="cyan" bar="left" className="hidden h-10 items-center gap-2 px-4 sm:flex">
                <PixelIcon name="user" className="text-neon-cyan" />
                <span className="max-w-40 truncate font-display text-base font-medium text-white">{session.name}</span>
              </Panel>
              <LogoutButton />
            </>
          ) : (
            <ButtonLink href={routes.login} variant="secondary" icon="user">
              Войти
            </ButtonLink>
          )}
        </div>
      </Container>

      <nav
        aria-label="Мобильная навигация"
        className="flex gap-1 overflow-x-auto border-t border-line px-3 py-2 md:hidden"
      >
        <NavLinks />
      </nav>
    </header>
  );
}
