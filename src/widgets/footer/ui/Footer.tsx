import Link from "next/link";
import { CurrencyIcon } from "@/entities/currency-pack";
import { routes, siteConfig } from "@/shared/config";
import { Container } from "@/shared/ui";

const documents = [
  { href: routes.offer, label: "Публичная оферта" },
  { href: routes.privacy, label: "Политика конфиденциальности" },
  { href: routes.delivery, label: "Получение заказа" },
  { href: routes.contacts, label: "Контакты и реквизиты" },
] as const;

export function Footer() {
  const { seller, disclaimer } = siteConfig;

  return (
    <footer className="mt-20 border-t border-line bg-surface/60">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <CurrencyIcon className="h-8 w-8" />
            <span className="font-pixel text-xs text-fg">{siteConfig.name}</span>
          </div>
          <p className="mt-4 text-sm text-muted">Донат-магазин игрового сервера. Внутриигровая валюта для тем, скинов, бустеров и слотов.</p>
          <p className="mt-4 text-xs text-muted">{disclaimer.ru}</p>
          <p className="mt-2 text-[10px] uppercase tracking-wide text-muted/70">{disclaimer.en}</p>
        </div>

        <nav aria-label="Документы">
          <h2 className="font-pixel text-[10px] uppercase tracking-widest text-neon-cyan">Документы</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
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
          <h2 className="font-pixel text-[10px] uppercase tracking-widest text-neon-cyan">Исполнитель</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
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
