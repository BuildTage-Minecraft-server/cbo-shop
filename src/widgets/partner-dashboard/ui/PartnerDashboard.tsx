import type { Partner, PartnerDashboard as DashboardData, PayoutStatus } from "@/entities/partner";
import { PayoutForm } from "@/features/request-payout";
import { partnerProgram } from "@/shared/config";
import { formatDate, formatNumber, formatRubPrecise } from "@/shared/lib";
import { CopyField, Panel } from "@/shared/ui";

type Props = {
  partner: Partner;
  dashboard: DashboardData;
  link: string;
};

const statusLabels: Record<PayoutStatus, { label: string; className: string }> = {
  pending: { label: "В обработке", className: "text-hud-orange" },
  paid: { label: "Выплачено", className: "text-hud-green" },
  rejected: { label: "Отклонено", className: "text-hud-red" },
};

function money(kopecks: number): string {
  return formatRubPrecise(kopecks / 100);
}

function Stat({ label, value, hint, highlight = false }: { label: string; value: string; hint?: string; highlight?: boolean }) {
  return (
    <Panel highlight={highlight} className="p-5">
      <dt className="font-display text-sm uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-2 font-display text-3xl font-semibold tracking-wide text-white">{value}</dd>
      {hint ? <p className="mt-2 text-xs leading-5 text-muted">{hint}</p> : null}
    </Panel>
  );
}

function EmptyRow({ text }: { text: string }) {
  return <li className="px-5 py-4 text-sm text-muted">{text}</li>;
}

export function PartnerDashboard({ partner, dashboard, link }: Props) {
  const minKopecks = partnerProgram.minPayoutRub * 100;
  const now = new Date();

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide text-white">Ваш кабинет</h2>
        <p className="mt-3 leading-7 text-body">
          Ваш процент: {partner.rateBps / 100}%. Отправляйте эту ссылку своей аудитории или добавьте её в описание канала.
        </p>
        <div className="mt-5">
          <CopyField label="Ваша ссылка" value={link} />
        </div>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="Привлечено игроков" value={formatNumber(dashboard.referrals)} />
        <Stat label="Покупателей" value={formatNumber(dashboard.buyers)} />
        <Stat label="Начислено всего" value={money(dashboard.earnedKopecks)} />
        <Stat
          label="На удержании"
          value={money(dashboard.holdKopecks)}
          hint={partnerProgram.holdDays > 0 ? `Доступно к выплате через ${partnerProgram.holdDays} дн. после платежа.` : undefined}
        />
        <Stat label="Доступно к выплате" value={money(dashboard.availableKopecks)} highlight />
        <Stat label="Выплачено" value={money(dashboard.paidKopecks)} />
      </dl>

      <Panel accent="cyan" className="p-6 sm:p-8">
        <h3 className="font-display text-2xl font-semibold uppercase tracking-wide text-white">Выплата</h3>
        <div className="mt-4">
          {dashboard.pendingKopecks > 0 ? (
            <p className="leading-7 text-body">
              Заявка на {money(dashboard.pendingKopecks)} в обработке. Новую можно создать после её выполнения.
            </p>
          ) : dashboard.availableKopecks >= minKopecks ? (
            <PayoutForm amountLabel={money(dashboard.availableKopecks)} />
          ) : (
            <p className="leading-7 text-body">
              Выплата доступна от {partnerProgram.minPayoutRub}&nbsp;₽. Сейчас к выплате доступно {money(dashboard.availableKopecks)}.
            </p>
          )}
        </div>
      </Panel>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-white">Последние начисления</h3>
          <Panel className="mt-4">
            <ul className="divide-y divide-line">
              {dashboard.commissions.length === 0 ? (
                <EmptyRow text="Начислений пока нет." />
              ) : (
                dashboard.commissions.map((item) => (
                  <li key={item.createdAt.toISOString()} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div>
                      <p className="text-white">{formatDate(item.createdAt)}</p>
                      <p className="text-xs text-muted">
                        {item.availableAt > now ? `Доступно с ${formatDate(item.availableAt)}` : "Доступно к выплате"}
                      </p>
                    </div>
                    <span className="font-display text-lg text-hud-green">+{money(item.amountKopecks)}</span>
                  </li>
                ))
              )}
            </ul>
          </Panel>
        </section>

        <section>
          <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-white">История выплат</h3>
          <Panel className="mt-4">
            <ul className="divide-y divide-line">
              {dashboard.payouts.length === 0 ? (
                <EmptyRow text="Заявок пока не было." />
              ) : (
                dashboard.payouts.map((item) => {
                  const status = statusLabels[item.status];
                  return (
                    <li key={item.id} className="flex items-center justify-between gap-4 px-5 py-4">
                      <div>
                        <p className="text-white">{formatDate(item.createdAt)}</p>
                        <p className={`text-xs ${status.className}`}>{status.label}</p>
                      </div>
                      <span className="font-display text-lg text-white">{money(item.amountKopecks)}</span>
                    </li>
                  );
                })
              )}
            </ul>
          </Panel>
        </section>
      </div>
    </div>
  );
}
