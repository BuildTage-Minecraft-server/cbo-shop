import type { Metadata, Viewport } from "next";
import { createMetadata, RootLayout } from "@/app/layout";

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  themeColor: "#09050f",
  colorScheme: "dark",
};

export default RootLayout;
