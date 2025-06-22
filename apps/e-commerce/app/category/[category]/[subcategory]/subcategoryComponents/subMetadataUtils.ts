import { Category } from "@/app/types/category";
import slugify from "@/utils/slungify";
import axios from "axios";
import { Metadata } from "next";

const baseMetadata = {
  metadataBase: new URL("https://www.kivamall.com"),
  applicationName: "Kivamall",
  authors: [{ name: "Kivamall", url: "https://www.kivamall.com" }],
  generator: "Next.js",
  themeColor: "#ffffff",
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};
const getKenyaKeywords = (mainKeywords: string[]) => [
  ...mainKeywords,
  "Nairobi delivery",
  "Kenya online store",
  "free delivery Nairobi",
  "best prices Kenya",
  "authentic products Kenya",
  "online shopping Kenya",
  "ecommerce Kenya",
  "buy online Kenya",
];

export const getSubCategoryMetadata = async (
  category: string,
  subCategoryName: string
): Promise<Metadata> => {
  const response = await axios.get(
    `https://kivamall.up.railway.app/api/category`
  );

  const data: Category[] = response.data.data.categories;
  const subcategory = data.find(
    (cate) =>
      slugify(cate.name) === slugify(category) &&
      cate.subcategories.some(
        (sub) => slugify(sub.name) === slugify(subCategoryName)
      )
  );

  const title = `${subcategory?.name} | ${category} | Kivamall Kenya`;
  const description = `Shop best ${subcategory?.name} under ${category} at Kivamall. Free delivery in Nairobi. Best prices in Kenya.`;

  const baseKeywords = [
    `buy ${subcategory?.name} online`,
    `${subcategory?.name} Kenya`,
    `best ${subcategory?.name} Nairobi`,
    `${category} ${subcategory?.name}`,
    `affordable ${subcategory?.name}`,
  ];

  return {
    title,
    description,
    keywords: getKenyaKeywords(baseKeywords),
    openGraph: {
      ...baseMetadata,
      title,
      description,
      url: `https://www.kivamall.com/category/${slugify(category)}/${slugify(
        String(subcategory?.name)
      )}`,
      siteName: "Kivamall",
      images: [
        {
          url: `/images/og/${slugify(category)}-${slugify(
            String(subcategory?.name)
          )}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${subcategory?.name} products at Kivamall`,
        },
      ],
    },
    alternates: {
      canonical: `https://www.kivamall.com/category/${slugify(
        category
      )}/${slugify(String(subcategory?.name))}`,
    },
    other: {
      "json-ld": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        description: description,
        url: `https://www.kivamall.com/category/${slugify(category)}/${slugify(
          String(subcategory?.name)
        )}`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.kivamall.com/category/${slugify(category)}`,
        },
      }),
    },
  };
};
