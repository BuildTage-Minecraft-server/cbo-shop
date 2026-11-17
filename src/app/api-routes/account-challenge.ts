import { handleAccountChallenge } from "@/features/register-by-drasl";

export function POST(request: Request): Promise<Response> {
  return handleAccountChallenge(request);
}
