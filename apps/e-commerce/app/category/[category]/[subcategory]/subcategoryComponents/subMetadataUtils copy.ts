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
  // openGraph: {
  //   type: "website",
  //   siteName: "Kivamall - Kenya's Leading Online Store",
  //   title: "Kivamall | Shop Online in Kenya",
  //   description:
  //     "Best prices on electronics, fashion, home goods and more. Free Nairobi delivery on orders over KSh 3,000",
  //   url: "https://www.kivamall.com",
  //   locale: "en_KE",
  //   countryName: "Kenya",
  //   images: [
  //     {
  //       url: "/images/og/global-og-image.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Kivamall - Kenya's Favorite Online Shopping Destination",
  //       type: "image/jpeg",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@kivamall_ke",
  //   creator: "@kivamall_ke",
  //   title: "Kivamall | Shop Online in Kenya",
  //   description: "Best prices on electronics, fashion, home goods and more",
  //   images: ["/images/og/twitter-card.jpg"],
  // },
  // appleWebApp: {
  //   capable: true,
  //   title: "Kivamall",
  //   statusBarStyle: "black-translucent",
  // },
  // formatDetection: {
  //   telephone: true,
  //   date: true,
  //   address: true,
  //   email: true,
  // },
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  //   other: {
  //     rel: "kivamall-icon",
  //     url: "/icon-192x192.png",
  //   },
  // },
  // manifest: "/manifest.json",
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
