"use server";

import { redirect } from "next/navigation";
import { destroySession } from "@/entities/session";
import { routes } from "@/shared/config";

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect(routes.home);
}
