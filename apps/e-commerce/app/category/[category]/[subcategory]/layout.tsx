import { Metadata } from "next";
import slugify from "@/utils/slungify";
import { getSubCategoryMetadata } from "./subCategoryMetadataUtils";

export async function generateMetadata({
  // export async function generateMetadata({
  params,
}: {
  params: {
    category: string;
    subcategory: string;
  };
}): Promise<Metadata> {
  const categoryFromUrl = decodeURIComponent(params?.category || "");
  const subCategoryFromUrl = decodeURIComponent(params?.subcategory || "");

  const normalizedUrlCategory = slugify(categoryFromUrl.toLowerCase());
  const normalizedUrlSubCategory = slugify(subCategoryFromUrl.toLowerCase());

  const subCategoryMetadata = await getSubCategoryMetadata(
    normalizedUrlCategory,
    normalizedUrlSubCategory
  );

  return subCategoryMetadata;
}

export const LocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Kivamall",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kamukunji Trade Centre, Sheikh Karume Road",
    addressLocality: "Nairobi",
    postalCode: "00100",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-1.2849",
    longitude: "36.8426",
  },
  telephone: "+254725672675",
  openingHours: "Mo-Fr 09:00-17:00",
};

export default function SubCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kivamall",
              description:
                "Kenya's Largest Online Shopping Marketplace for electronics, fashion, beauty products, and more",
              url: "https://www.kivamall.com",
              logo: "https://www.kivamall.com/logos/kivamall.png",
              sameAs: [
                "https://www.instagram.com/kivamall.ke/",
                "https://www.facebook.com/profile.php?id=61577725620473/",
                "https://www.tiktok.com/@kivamall/",
                "https://www.linkedin.com/company/108217082/",

                // "https://www.linkedin.com/company/kivamall",
                // "https://www.facebook.com/kivamallkenya",
                // "https://www.youtube.com/@kivamall",
                // "https://twitter.com/kivamallkenya",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+254725672675",
                contactType: "customer service",
                email: "moses.mwangi.me@gmail.com",
                areaServed: "KE",
                availableLanguage: "en",
              },
            }),
          }}
        />
        <meta
          name="google-site-verification"
          content="KkSiGxDsOVL1yR49qNvUrjSy-c1hJAIOt5lBH1tW3BI"
        />
      </head>
      <body>
        <div className="flex min-h-screen ">
          <div className="flex-1 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
