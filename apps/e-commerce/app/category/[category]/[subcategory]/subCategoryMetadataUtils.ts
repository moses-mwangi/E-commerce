import { Category, Subcategory } from "@/app/types/category";
import slugify from "@/utils/slungify";
import axios from "axios";
import { Metadata } from "next";

const BASE_URL = "https://www.kivamall.com";
const API_URL = "https://kivamall.up.railway.app/api/category";

const baseMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: "Kivamall",
  authors: [{ name: "Kivamall", url: BASE_URL }],
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
      noimageindex: false,
    },
  },
};

const getKenyaKeywords = (mainKeywords: string[]): string[] => [
  ...mainKeywords,
  "Nairobi delivery",
  "Kenya online store",
  "free delivery Nairobi",
  "best prices Kenya",
  "authentic products Kenya",
  "online shopping Kenya",
  "ecommerce Kenya",
  "buy online Kenya",
  "cheap prices Kenya",
  "trusted online store Kenya",
  "secure online shopping Kenya",
  "same day delivery Nairobi",
  "best online shop Kenya",
];

const generateSubcategoryKeywords = (
  category: string,
  subcategory: string
): string[] => {
  const baseKeywords = [
    `buy ${subcategory} online`,
    `${subcategory} Kenya`,
    `best ${subcategory} Nairobi`,
    `${category} ${subcategory}`,
    `affordable ${subcategory} Kenya`,
    `cheap ${subcategory} prices`,
    `${subcategory} shop Kenya`,
    `shop ${subcategory} online`,
    `Kivamall ${subcategory}`,
    `best place to buy ${subcategory} in Kenya`,
    `${subcategory} store near me`,
    `${subcategory} online purchase Kenya`,
    `${subcategory} price list Kenya`,
    `${subcategory} brands in Kenya`,
    `where to buy ${subcategory} in Nairobi`,
    `${subcategory} cash on delivery Kenya`,
    `${subcategory} discounts Kenya`,
  ];

  switch (category.toLowerCase()) {
    case "consumer electronics":
      baseKeywords.push(
        `latest ${subcategory} models Kenya`,
        `genuine ${subcategory} Kenya`,
        `${subcategory} warranty Kenya`,
        `${subcategory} specifications Kenya`,
        `best ${subcategory} brands Kenya`,
        `${subcategory} price comparison Kenya`,
        `where to buy original ${subcategory} Nairobi`,
        `${subcategory} accessories Kenya`,
        `${subcategory} repair services Nairobi`
      );
      break;

    case "fashions & accessories":
      baseKeywords.push(
        `trendy ${subcategory} Kenya 2024`,
        `${subcategory} fashion trends Nairobi`,
        `designer ${subcategory} Kenya`,
        `affordable ${subcategory} fashion Kenya`,
        `${subcategory} for men/women Kenya`,
        `latest ${subcategory} styles Nairobi`,
        `quality ${subcategory} brands Kenya`,
        `${subcategory} outfit ideas Kenya`,
        `imported ${subcategory} Nairobi`
      );
      break;

    case "health & beauty":
      baseKeywords.push(
        `organic ${subcategory} Kenya`,
        `best ${subcategory} products Nairobi`,
        `${subcategory} for skin care Kenya`,
        `professional ${subcategory} Kenya`,
        `natural ${subcategory} products Nairobi`,
        `${subcategory} salon supplies Kenya`,
        `wholesale ${subcategory} Nairobi`,
        `${subcategory} beauty tips Kenya`,
        `dermatologist-approved ${subcategory} Kenya`
      );
      break;

    case "car accessories":
      baseKeywords.push(
        `premium ${subcategory} Kenya`,
        `${subcategory} for Toyota/Nissan etc. Nairobi`,
        `durable ${subcategory} Kenya`,
        `car ${subcategory} installation Nairobi`,
        `4x4 ${subcategory} accessories Kenya`,
        `original ${subcategory} parts Kenya`,
        `${subcategory} for all car models Nairobi`,
        `waterproof ${subcategory} Kenya`,
        `car ${subcategory} deals Kenya`
      );
      break;

    case "jewelry & watches":
      baseKeywords.push(
        `authentic ${subcategory} Kenya`,
        `gold/silver ${subcategory} Nairobi`,
        `luxury ${subcategory} brands Kenya`,
        `wedding ${subcategory} collections Nairobi`,
        `designer ${subcategory} Kenya`,
        `handmade ${subcategory} Nairobi`,
        `${subcategory} gift ideas Kenya`,
        `diamond ${subcategory} Kenya`,
        `water-resistant watches Nairobi`
      );
      break;

    case "home decor":
      baseKeywords.push(
        `modern ${subcategory} Kenya`,
        `affordable ${subcategory} Nairobi`,
        `luxury ${subcategory} designs Kenya`,
        `${subcategory} for living room Nairobi`,
        `imported ${subcategory} Kenya`,
        `African-themed ${subcategory} Nairobi`,
        `${subcategory} clearance sale Kenya`,
        `premium ${subcategory} brands Nairobi`,
        `eco-friendly ${subcategory} Kenya`
      );
      break;

    case "construction":
      baseKeywords.push(
        `heavy-duty ${subcategory} Kenya`,
        `professional ${subcategory} tools Nairobi`,
        `construction ${subcategory} suppliers Kenya`,
        `wholesale ${subcategory} Nairobi`,
        `quality ${subcategory} materials Kenya`,
        `${subcategory} for building Nairobi`,
        `imported ${subcategory} Kenya`,
        `${subcategory} price list Nairobi`,
        `durable ${subcategory} Kenya`
      );
      break;

    default:
      baseKeywords.push(
        `premium ${subcategory} Kenya`,
        `best ${subcategory} deals Nairobi`,
        `wholesale ${subcategory} Kenya`,
        `quality ${subcategory} brands Nairobi`
      );
  }

  return baseKeywords;
};

export const getSubCategoryMetadata = async (
  category: string,
  subcategory: string
): Promise<Metadata> => {
  try {
    const categoryFromUrl = decodeURIComponent(category || "");
    const subCategoryFromUrl = decodeURIComponent(subcategory || "");

    const normalizedUrlCategory = slugify(categoryFromUrl.toLowerCase());
    const normalizedUrlSubCategory = slugify(subCategoryFromUrl.toLowerCase());

    const response = await axios.get(API_URL);
    const categories: Category[] = response.data.data?.categories || [];

    const matchedCategory = categories.find(
      (cat) => slugify(cat.name) === normalizedUrlCategory
    );

    if (!matchedCategory) {
      return {
        ...baseMetadata,
        title: `${categoryFromUrl} Products | Shop Online Kenya - Kivamall`,
        description: `Browse our collection of ${categoryFromUrl} products at competitive prices in Kenya. Free delivery in Nairobi.`,
        alternates: {
          canonical: `${BASE_URL}/products`,
        },
      };
    }

    const matchedSubcategory = matchedCategory.subcategories?.find(
      (sub: Subcategory) => slugify(sub.name) === normalizedUrlSubCategory
    );

    if (!matchedSubcategory) {
      return {
        ...baseMetadata,
        title: `${matchedCategory.name} Collection | Kivamall Kenya`,
        description: `Explore our ${matchedCategory.name} collection with the best prices in Kenya. Free Nairobi delivery.`,
        alternates: {
          canonical: `${BASE_URL}/category/${normalizedUrlCategory}`,
        },
      };
    }

    const subCategoryUrl = `${BASE_URL}/category/${slugify(
      matchedCategory.name
    )}/${slugify(matchedSubcategory.name)}`;

    const title = `Best ${matchedSubcategory.name} in Kenya | ${matchedCategory.name} | Kivamall`;
    const description = `Shop the best ${
      matchedSubcategory.name
    } collection in Kenya. ${
      matchedSubcategory.description?.slice(0, 150) ||
      `High-quality ${matchedSubcategory.name} at competitive prices`
    }. Free Nairobi delivery, secure payments.`;

    const baseKeywords = generateSubcategoryKeywords(
      matchedCategory.name,
      matchedSubcategory.name
    );

    const images = [
      {
        url: matchedSubcategory.banner || "/images/og/subcategory-default.jpg",
        width: 1200,
        height: 630,
        alt: `${matchedSubcategory.name} collection at Kivamall Kenya`,
      },
    ];

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: matchedSubcategory.name,
      description: matchedSubcategory.description || title,
      url: subCategoryUrl,
      mainEntityOfPage: subCategoryUrl,
      publisher: {
        "@type": "Organization",
        name: "Kivamall",
        url: BASE_URL,
        // logo: `${BASE_URL}/logo.png`,
        logo: `${BASE_URL}/logos/kivamall.png`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };

    return {
      ...baseMetadata,
      title,
      description,
      keywords: getKenyaKeywords(baseKeywords),
      openGraph: {
        type: "website",
        title,
        description,
        url: subCategoryUrl,
        siteName: "Kivamall",
        images,
        locale: "en_KE",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: images[0].url,
        site: "@KivamallKE", // Add your Twitter handle if available
      },
      alternates: {
        canonical: subCategoryUrl,
      },
      other: {
        "json-ld": JSON.stringify(jsonLd),
        "og:locale": "en_KE",
        "og:type": "website",
        "product:category": matchedCategory.name,
      },
      verification: {
        google: "KkSiGxDsOVL1yR49qNvUrjSy-c1hJAIOt5lBH1tW3BI",
      },
      manifest: "/site.webmanifest",
      icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
      },
    };
  } catch (err) {
    console.error("Error generating subcategory metadata:", err);
    return {
      ...baseMetadata,
      title: "Shop Categories - Kivamall Kenya",
      description:
        "Browse our wide range of products with the best prices in Kenya. Free Nairobi delivery.",
      alternates: {
        canonical: `${BASE_URL}/products`,
      },
    };
  }
};
