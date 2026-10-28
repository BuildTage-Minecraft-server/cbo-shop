import { siteConfig } from "@/shared/config";
import { LegalDocument } from "@/widgets/legal-document";
import { privacySections } from "../model/sections";

export function PrivacyPage() {
  return (
    <LegalDocument
      title="Политика конфиденциальности"
      updatedAt={siteConfig.documentsUpdatedAt}
      sections={privacySections}
    />
  );
}
