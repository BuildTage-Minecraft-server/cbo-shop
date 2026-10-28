import type { Metadata } from "next";
import { siteConfig } from "@/shared/config";
import { siteUrl } from "@/shared/config/site-url";

export function createMetadata(): Metadata {
  const title = `${siteConfig.name}: ${siteConfig.tagline}`;

  return {
    metadataBase: new URL(siteUrl()),
    title: { default: title, template: `%s | ${siteConfig.name}` },
    description: siteConfig.description,
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: siteConfig.name,
      title,
      description: siteConfig.description,
    },
    robots: { index: true, follow: true },
  };
}
