export function jsonReply(status: number, body: Record<string, unknown>): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export function codeReply(status: number, code: string): Response {
  return jsonReply(status, { code });
}

export async function readJsonBody(request: Request, maxLength: number): Promise<unknown> {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > maxLength) return undefined;

  const raw = await request.text().catch(() => "");
  if (raw.length === 0 || raw.length > maxLength) return undefined;

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return undefined;
  }
}
