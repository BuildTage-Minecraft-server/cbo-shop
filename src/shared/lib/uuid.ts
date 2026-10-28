const DASHED = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PLAIN = /^[0-9a-f]{32}$/i;

export function isUuid(value: string): boolean {
  return DASHED.test(value);
}

export function toDashedUuid(value: string): string | null {
  if (DASHED.test(value)) return value.toLowerCase();
  if (!PLAIN.test(value)) return null;

  const hex = value.toLowerCase();
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join("-");
}
