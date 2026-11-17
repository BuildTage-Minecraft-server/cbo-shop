import { handleAccountRegistration } from "@/features/register-by-drasl";

export function POST(request: Request): Promise<Response> {
  return handleAccountRegistration(request);
}
