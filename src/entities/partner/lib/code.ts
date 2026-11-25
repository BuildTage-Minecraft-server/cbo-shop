const CODE_PATTERN = /^[a-z0-9_-]{3,24}$/;

export function normalizeCode(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidCode(value: string): boolean {
  return CODE_PATTERN.test(value);
}

export function referralPath(code: string): string {
  return `/r/${code}`;
}
