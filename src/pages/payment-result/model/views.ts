import type { PaymentOutcome } from "@/features/check-payment-status";
import { seller } from "@/shared/config";
import type { Accent } from "@/shared/ui";

export type OutcomeView = {
  accent: Accent;
  mark?: string;
  title: string;
  text: string;
  note: string;
};

export const outcomeViews: Record<PaymentOutcome, OutcomeView> = {
  paid: {
    accent: "yellow",
    title: "Спасибо за покупку",
    text: "Оплата прошла. Валюта начисляется на ваш аккаунт, обычно это занимает несколько минут. Проверить баланс можно в донатном магазине внутри игры.",
    note: `Если за 24 часа ничего не пришло, напишите на ${seller.email}.`,
  },
  pending: {
    accent: "orange",
    mark: "!",
    title: "Оплата не завершена",
    text: "Подтверждения платежа пока нет. Если вы вышли из оплаты, вернитесь в магазин и выберите пакет заново. Если вы уже заплатили, подождите минуту и обновите страницу.",
    note: `Если деньги списались, а валюта не пришла, напишите на ${seller.email}.`,
  },
  canceled: {
    accent: "red",
    mark: "×",
    title: "Платёж отменён",
    text: "Оплата не прошла, деньги за этот платёж не списаны. Вернитесь в магазин и попробуйте ещё раз, при необходимости другим способом оплаты.",
    note: `Если деньги всё же списались, напишите на ${seller.email}.`,
  },
  unknown: {
    accent: "cyan",
    mark: "?",
    title: "Статус оплаты",
    text: "Не удалось определить статус платежа. Если вы оплатили заказ, валюта появится на балансе в течение нескольких минут. Проверить баланс можно в донатном магазине внутри игры.",
    note: `Если за 24 часа ничего не пришло, напишите на ${seller.email}.`,
  },
};
