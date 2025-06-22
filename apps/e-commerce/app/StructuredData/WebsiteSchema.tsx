// components/StructuredData/WebsiteSchema.tsx
import { Metadata } from "next";

export default function WebsiteSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kivamall",
    url: "https://www.kivamall.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.kivamall.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
