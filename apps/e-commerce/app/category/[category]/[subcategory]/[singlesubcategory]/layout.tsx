import slugify from "@/utils/slungify";
import { Metadata } from "next";
import { getProductMetadata } from "./productMetadataUtils";
import Head from "next/head";

export async function generateMetadata({
  params,
}: {
  params: {
    category: string;
    subcategory: string;
    singlesubcategory: string;
  };
}): Promise<Metadata> {
  const categoryFromUrl = decodeURIComponent(params?.category || "");
  const subCategoryFromUrl = decodeURIComponent(params?.subcategory || "");
  const productNameFromUrl = decodeURIComponent(
    params?.singlesubcategory || ""
  );

  const normalizedUrlCategory = slugify(categoryFromUrl.toLowerCase());
  const normalizedUrlSubCategory = slugify(subCategoryFromUrl.toLowerCase());
  const normalizedUrlProduct = slugify(productNameFromUrl.toLowerCase());

  const productMeta = await getProductMetadata(
    normalizedUrlCategory,
    normalizedUrlSubCategory,
    normalizedUrlProduct
  );

  return productMeta;
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
    //   {/* </body>
    // </html> */}
  );
}
