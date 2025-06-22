// components/StructuredData/OrganizationSchema.tsx
export default function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kivamall",
    url: "https://www.kivamall.com",
    logo: "https://www.kivamall.com/logo.png",
    sameAs: [
      "https://www.facebook.com/kivamallkenya",
      "https://www.instagram.com/kivamall.ke/",
      "https://twitter.com/kivamallkenya",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254700000000",
      contactType: "customer service",
      email: "support@kivamall.com",
      areaServed: "KE",
      availableLanguage: ["en", "sw"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
