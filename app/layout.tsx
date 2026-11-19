import type { Metadata, Viewport } from "next";
import { createMetadata, RootLayout } from "@/app/layout";

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  themeColor: "#0d0610",
  colorScheme: "dark",
};

export default RootLayout;
