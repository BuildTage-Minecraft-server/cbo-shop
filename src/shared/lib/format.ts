export function formatNumber(value: number): string {
  return String(Math.trunc(value)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
}

export function formatRub(value: number): string {
  return `${formatNumber(value)}\u00A0₽`;
}

export function formatRubPrecise(value: number): string {
  return `${value.toFixed(2).replace(".", ",")}\u00A0₽`;
}

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Moscow",
});

export function formatDate(value: Date): string {
  return dateFormatter.format(value);
}

export function formatMegabytes(bytes: number): string {
  return `${Math.max(1, Math.round(bytes / 1048576))}\u00A0МБ`;
}
