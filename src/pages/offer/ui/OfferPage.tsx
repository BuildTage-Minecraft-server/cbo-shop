import { siteConfig } from "@/shared/config";
import { LegalDocument } from "@/widgets/legal-document";
import { offerIntro, offerSections } from "../model/sections";

export function OfferPage() {
  return (
    <LegalDocument
      title="Публичная оферта"
      updatedAt={siteConfig.documentsUpdatedAt}
      intro={offerIntro}
      sections={offerSections}
    />
  );
}
