import { notFound } from "next/navigation";
import { findPartnerByPlayer, getPartnerDashboard, referralPath } from "@/entities/partner";
import type { Partner, PartnerDashboard as DashboardData } from "@/entities/partner";
import { getSession } from "@/entities/session";
import { BecomePartnerForm } from "@/features/become-partner";
import { partnerProgram, routes } from "@/shared/config";
import { siteUrl } from "@/shared/config/site-url";
import { ButtonLink, Container, Panel } from "@/shared/ui";
import { PartnerDashboard } from "@/widgets/partner-dashboard";
import { PartnerIntro } from "@/widgets/partner-intro";

type Loaded = { partner: Partner; dashboard: DashboardData } | { partner: null };

async function load(playerUuid: string): Promise<Loaded> {
  const partner = await findPartnerByPlayer(playerUuid);
  if (!partner) return { partner: null };
  return { partner, dashboard: await getPartnerDashboard(partner) };
}

export async function PartnerPage() {
  if (!partnerProgram.enabled) notFound();

  const session = await getSession();
  const origin = siteUrl();

  let loaded: Loaded | null = null;
  let failed = false;
  if (session) {
    try {
      loaded = await load(session.uuid);
    } catch (error) {
      console.error("Failed to load the partner cabinet", error);
      failed = true;
    }
  }

  const next = encodeURIComponent(routes.partner);

  return (
    <>
      <PartnerIntro />
      <section id="cabinet" className="border-t border-line">
        <Container className="py-12 md:py-16">
          {!session ? (
            <Panel accent="cyan" className="max-w-xl p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-white">Подключиться</h2>
              <p className="mt-3 leading-7 text-body">
                Войдите с аккаунтом игрового сервера, чтобы получить партнёрскую ссылку.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <ButtonLink href={`${routes.login}?next=${next}`} icon="user">
                  Войти
                </ButtonLink>
                <ButtonLink href={`${routes.register}?next=${next}`} variant="secondary">
                  Создать аккаунт
                </ButtonLink>
              </div>
            </Panel>
          ) : failed || !loaded ? (
            <Panel className="max-w-xl p-6 sm:p-8">
              <p className="leading-7 text-body">Кабинет временно недоступен. Попробуйте обновить страницу чуть позже.</p>
            </Panel>
          ) : loaded.partner ? (
            <PartnerDashboard
              partner={loaded.partner}
              dashboard={loaded.dashboard}
              link={`${origin}${referralPath(loaded.partner.code)}`}
            />
          ) : (
            <Panel accent="cyan" className="max-w-xl p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-white">Получить ссылку</h2>
              <p className="mt-3 leading-7 text-body">
                Вы вошли как {session.name}. Выберите код для своей ссылки, программа подключается сразу.
              </p>
              <div className="mt-6">
                <BecomePartnerForm origin={origin} />
              </div>
            </Panel>
          )}
        </Container>
      </section>
    </>
  );
}
