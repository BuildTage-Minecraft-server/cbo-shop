import { handleReferralLink } from "@/features/track-referral";

export async function GET(_request: Request, context: { params: Promise<{ code: string }> }): Promise<Response> {
  const { code } = await context.params;
  return handleReferralLink(code);
}
