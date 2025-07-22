import { Metadata } from "next";
import { categoryMetadata } from "./metadataUtils";
import slugify from "@/utils/slungify";
import Head from "next/head";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const categoryFromUrl = decodeURIComponent(params?.category || "");
  const normalizedUrlCategory = slugify(categoryFromUrl.toLowerCase());

  const matchedCategory = Object.keys(categoryMetadata).find(
    (key) => slugify(key.toLowerCase()) === normalizedUrlCategory
  );

  if (!matchedCategory) {
    return {
      title: "Shop Categories - Kivamall",
      description: "Browse our wide range of products at Kivamall Kenya",
    };
  }

  const categoryMeta = categoryMetadata[matchedCategory];
  const canonicalUrl =
    (categoryMeta.alternates?.canonical as string) ||
    `https://www.kivamall.com/category/${slugify(matchedCategory)}`;

  return {
    ...categoryMeta,
    metadataBase: new URL("https://www.kivamall.com"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export const LocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Kivamall",
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

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LocalBusinessSchema),
          }}
        />
        <meta
          name="google-site-verification"
          content="KkSiGxDsOVL1yR49qNvUrjSy-c1hJAIOt5lBH1tW3BI"
        />
      </Head>

      <div className="flex min-h-screen ">
        <div className="flex-1 w-full">{children}</div>
      </div>
    </>
  );
}
