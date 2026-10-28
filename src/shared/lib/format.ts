export function formatNumber(value: number): string {
  return String(Math.trunc(value)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
}

export function formatRub(value: number): string {
  return `${formatNumber(value)}\u00A0₽`;
}

export function formatRubPrecise(value: number): string {
  return `${value.toFixed(2).replace(".", ",")}\u00A0₽`;
}
