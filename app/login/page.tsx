import type { Metadata } from "next";
import { LoginPage } from "@/pages/login";

export const metadata: Metadata = {
  title: "Вход",
  robots: { index: false, follow: false },
};

export default LoginPage;
