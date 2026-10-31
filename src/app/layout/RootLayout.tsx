import { Exo_2, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { HudBackdrop } from "@/shared/ui";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const exo = Exo_2({
  subsets: ["latin", "cyrillic"],
  variable: "--font-exo",
  display: "swap",
});

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${exo.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <HudBackdrop />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
