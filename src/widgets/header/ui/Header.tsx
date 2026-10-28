import Link from "next/link";
import { CurrencyIcon } from "@/entities/currency-pack";
import { getSession } from "@/entities/session";
import { LogoutButton } from "@/features/auth-by-drasl";
import { routes, siteConfig } from "@/shared/config";
import { ButtonLink, Container } from "@/shared/ui";

const navigation = [
  { href: routes.shop, label: "Магазин" },
  { href: routes.delivery, label: "Получение заказа" },
  { href: routes.offer, label: "Оферта" },
  { href: routes.contacts, label: "Контакты" },
] as const;

function NavLinks() {
  return (
    <>
      {navigation.map((item) => (
        <Link key={item.href} href={item.href} className="whitespace-nowrap transition hover:text-white">
          {item.label}
        </Link>
      ))}
    </>
  );
}

export async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href={routes.home} className="flex items-center gap-3" aria-label={`${siteConfig.name}: на главную`}>
          <CurrencyIcon className="h-8 w-8" />
          <span className="font-pixel text-xs text-fg sm:text-sm">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-6 text-sm text-muted md:flex">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <span className="hidden max-w-40 truncate text-sm text-muted sm:inline">{session.name}</span>
              <LogoutButton />
            </>
          ) : (
            <ButtonLink href={routes.login} variant="secondary">
              Войти
            </ButtonLink>
          )}
        </div>
      </Container>

      <nav
        aria-label="Мобильная навигация"
        className="flex gap-5 overflow-x-auto border-t border-line px-5 py-2.5 text-sm text-muted md:hidden"
      >
        <NavLinks />
      </nav>
    </header>
  );
}
