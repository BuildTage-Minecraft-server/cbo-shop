import { handleAccountRegistration } from "@/features/sign-up";

export function POST(request: Request): Promise<Response> {
  return handleAccountRegistration(request);
}
