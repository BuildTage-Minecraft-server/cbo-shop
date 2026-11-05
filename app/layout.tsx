import type { Metadata, Viewport } from "next";
import { createMetadata, RootLayout } from "@/app/layout";

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  themeColor: "#0a0b10",
  colorScheme: "dark",
};

export default RootLayout;
