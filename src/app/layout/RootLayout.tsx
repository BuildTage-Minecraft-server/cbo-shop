import { Inter, Press_Start_2P } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: "--font-press-start",
  display: "swap",
});

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${pressStart.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
