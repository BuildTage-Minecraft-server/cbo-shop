import "server-only";
import { headers } from "next/headers";
import { detectPlatform } from "../lib/platform";
import type { DetectedPlatform } from "../lib/platform";

export async function getInitialPlatform(): Promise<DetectedPlatform> {
  const list = await headers();
  return detectPlatform(list.get("user-agent") ?? "");
}
