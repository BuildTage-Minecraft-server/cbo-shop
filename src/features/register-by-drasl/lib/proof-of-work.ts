import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const CHALLENGE_TTL_SECONDS = 120;

export type Challenge = { challenge: string; bits: number; expiresAt: number };

function sign(key: string, username: string, expiresAt: number, salt: string): string {
  return createHmac("sha256", key).update(`${username.toLowerCase()}.${expiresAt}.${salt}`).digest("hex");
}

export function deriveKey(secret: string): string {
  return createHmac("sha256", secret).update("account-register-pow").digest("hex");
}

export function createChallenge(key: string, username: string, bits: number, now = Date.now()): Challenge {
  const expiresAt = Math.floor(now / 1000) + CHALLENGE_TTL_SECONDS;
  const salt = randomBytes(16).toString("hex");
  return { challenge: `${expiresAt}.${salt}.${sign(key, username, expiresAt, salt)}`, bits, expiresAt };
}

export function leadingZeroBits(digest: Buffer): number {
  let count = 0;
  for (const byte of digest) {
    if (byte === 0) {
      count += 8;
      continue;
    }
    count += Math.clz32(byte) - 24;
    break;
  }
  return count;
}

export function verifyProof(
  key: string,
  username: string,
  bits: number,
  challenge: string,
  nonce: string,
  now = Date.now(),
): boolean {
  if (!/^\d{1,16}$/.test(nonce)) return false;

  const parts = challenge.split(".");
  if (parts.length !== 3) return false;
  const [expiresRaw, salt, mac] = parts;
  if (!/^\d{1,12}$/.test(expiresRaw) || !/^[0-9a-f]{32}$/.test(salt) || !/^[0-9a-f]{64}$/.test(mac)) {
    return false;
  }

  const expiresAt = Number(expiresRaw);
  const nowSeconds = Math.floor(now / 1000);
  if (expiresAt < nowSeconds || expiresAt > nowSeconds + CHALLENGE_TTL_SECONDS) return false;

  const expected = Buffer.from(sign(key, username, expiresAt, salt), "hex");
  if (!timingSafeEqual(expected, Buffer.from(mac, "hex"))) return false;

  const digest = createHash("sha256").update(`${challenge}:${nonce}`).digest();
  return leadingZeroBits(digest) >= bits;
}
