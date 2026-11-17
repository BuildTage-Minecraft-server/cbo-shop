import "server-only";
import { z } from "zod";
import { proofOfWorkBits, proofOfWorkKey } from "../lib/pow-config";
import { createChallenge } from "../lib/proof-of-work";
import { usernameSchema } from "../lib/rules";
import { codeReply, jsonReply, readJsonBody } from "./http";

const MAX_BODY_LENGTH = 256;

const requestSchema = z.object({ username: usernameSchema });

export async function handleAccountChallenge(request: Request): Promise<Response> {
  const parsed = requestSchema.safeParse(await readJsonBody(request, MAX_BODY_LENGTH));
  if (!parsed.success) {
    return codeReply(400, "rejected");
  }

  try {
    const bits = proofOfWorkBits();
    if (bits === 0) {
      return jsonReply(200, { bits: 0, challenge: "", expiresAt: 0 });
    }

    const key = proofOfWorkKey();
    if (!key) {
      return codeReply(502, "unavailable");
    }

    return jsonReply(200, createChallenge(key, parsed.data.username, bits));
  } catch (error) {
    console.error("Challenge for the launcher failed", error);
    return codeReply(502, "unavailable");
  }
}
