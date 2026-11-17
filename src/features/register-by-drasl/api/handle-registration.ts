import "server-only";
import { z } from "zod";
import { DraslRegisterError, registerInDrasl } from "@/shared/api/drasl";

const MAX_BODY_LENGTH = 2048;

const requestSchema = z.object({
  username: z.string().regex(/^[A-Za-z0-9_]{3,16}$/),
  password: z.string().min(8).max(128),
});

function reply(status: number, code: string): Response {
  return Response.json({ code }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function handleAccountRegistration(request: Request): Promise<Response> {
  const raw = await request.text().catch(() => "");
  if (raw.length === 0 || raw.length > MAX_BODY_LENGTH) {
    return reply(400, "rejected");
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return reply(400, "rejected");
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return reply(400, "rejected");
  }

  try {
    await registerInDrasl(parsed.data.username, parsed.data.password);
    return reply(201, "ok");
  } catch (error) {
    if (error instanceof DraslRegisterError) {
      if (error.kind === "username-taken") {
        return reply(409, "nameTaken");
      }
      if (error.kind === "invalid-username" || error.kind === "invalid-password") {
        return reply(400, "rejected");
      }
    }
    console.error("Registration for the launcher failed", error);
    return reply(502, "unavailable");
  }
}
