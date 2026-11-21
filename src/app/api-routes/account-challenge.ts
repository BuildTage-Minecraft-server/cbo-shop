import { handleAccountChallenge } from "@/features/sign-up";

export function POST(request: Request): Promise<Response> {
  return handleAccountChallenge(request);
}
