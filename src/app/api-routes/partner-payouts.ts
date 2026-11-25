import { handlePayoutList, handlePayoutResolve } from "@/features/process-payouts";

export function GET(request: Request): Promise<Response> {
  return handlePayoutList(request);
}

export function POST(request: Request): Promise<Response> {
  return handlePayoutResolve(request);
}
