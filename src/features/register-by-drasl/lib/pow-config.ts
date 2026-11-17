import "server-only";
import { serverEnv } from "@/shared/config/env";
import { deriveKey } from "./proof-of-work";

export function proofOfWorkBits(): number {
  return serverEnv().ACCOUNT_REGISTER_POW_BITS ?? 0;
}

export function proofOfWorkKey(): string | null {
  const secret = serverEnv().DRASL_ADMIN_TOKEN;
  return secret ? deriveKey(secret) : null;
}
