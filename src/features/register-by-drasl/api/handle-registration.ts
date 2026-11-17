import "server-only";
import { z } from "zod";
import { DraslRegisterError, registerInDrasl } from "@/shared/api/drasl";
import { proofOfWorkBits, proofOfWorkKey } from "../lib/pow-config";
import { verifyProof } from "../lib/proof-of-work";
import { passwordSchema, usernameSchema } from "../lib/rules";
import { codeReply, readJsonBody } from "./http";

const MAX_BODY_LENGTH = 2048;

const requestSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  challenge: z.string().max(200).optional(),
  nonce: z.string().max(32).optional(),
});

export async function handleAccountRegistration(request: Request): Promise<Response> {
  const parsed = requestSchema.safeParse(await readJsonBody(request, MAX_BODY_LENGTH));
  if (!parsed.success) {
    return codeReply(400, "rejected");
  }

  const { username, password, challenge, nonce } = parsed.data;

  try {
    const bits = proofOfWorkBits();
    if (bits > 0) {
      const key = proofOfWorkKey();
      if (!key) {
        return codeReply(502, "unavailable");
      }
      if (!challenge || !nonce || !verifyProof(key, username, bits, challenge, nonce)) {
        return codeReply(400, "rejected");
      }
    }

    await registerInDrasl(username, password);
    return codeReply(201, "ok");
  } catch (error) {
    if (error instanceof DraslRegisterError) {
      if (error.kind === "username-taken") {
        return codeReply(409, "nameTaken");
      }
      if (error.kind === "invalid-username" || error.kind === "invalid-password") {
        return codeReply(400, "rejected");
      }
    }
    console.error("Registration for the launcher failed", error);
    return codeReply(502, "unavailable");
  }
}
