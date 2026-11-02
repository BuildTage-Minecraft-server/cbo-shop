import Link from "next/link";
import { routes, seller, siteConfig } from "@/shared/config";
import { Container, Logo } from "@/shared/ui";

const documents = [
  { href: routes.offer, label: "Публичная оферта" },
  { href: routes.privacy, label: "Политика конфиденциальности" },
  { href: routes.delivery, label: "Получение заказа" },
  { href: routes.contacts, label: "Контакты и реквизиты" },
] as const;

const headingClass = "font-display text-base font-semibold uppercase tracking-[0.12em] text-white";

export function Footer() {
  const { disclaimer } = siteConfig;

  return (
    <footer className="mt-12 border-t border-line">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo name={siteConfig.name} />
          <p className="mt-4 max-w-sm text-sm leading-6 text-body">
            Игровой сервер {siteConfig.name}. Внутриигровую валюту для донат-шопа можно пополнить в магазине на сайте.
          </p>
          <p className="mt-4 max-w-sm text-xs leading-5 text-muted">{disclaimer.ru}</p>
          <p className="mt-2 max-w-sm text-[10px] uppercase tracking-wide text-muted/70">{disclaimer.en}</p>
        </div>

        <nav aria-label="Документы">
          <h2 className={headingClass}>Документы</h2>
          <ul className="mt-4 space-y-2 text-sm text-body">
            {documents.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic">
          <h2 className={headingClass}>Исполнитель</h2>
          <ul className="mt-4 space-y-2 text-sm text-body">
            <li>{seller.fullName}</li>
            <li>{seller.status}</li>
            <li>ИНН {seller.inn}</li>
            <li>
              <a href={`mailto:${seller.email}`} className="transition hover:text-white">
                {seller.email}
              </a>
            </li>
            <li>{seller.phone}</li>
          </ul>
        </address>
      </Container>

      <div className="border-t border-line py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteConfig.name}. Оплата принимается через {siteConfig.paymentProvider}.
      </div>
    </footer>
  );
}
