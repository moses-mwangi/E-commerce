import { Product } from "@/app/types/products";
import slugify from "@/utils/slungify";
import axios from "axios";
import { Metadata } from "next";

const BASE_URL = "https://www.kivamall.com";
const API_URL = "https://kivamall.up.railway.app/api/product";

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
  "cheap prices Kenya",
  "trusted online store Kenya",
];

const generateProductUrl = (product: Product): string => {
  return `${BASE_URL}/category/${slugify(product.category)}/${slugify(
    product.subCategory
  )}/${slugify(product.name)}`;
};

export const getProductMetadata = async (
  category: string,
  subcategory: string,
  productName: string
): Promise<Metadata> => {
  try {
    const categoryFromUrl = decodeURIComponent(category || "");
    const subCategoryFromUrl = decodeURIComponent(subcategory || "");
    const productNameFromUrl = decodeURIComponent(productName || "");

    const normalizedUrlCategory = slugify(categoryFromUrl.toLowerCase());
    const normalizedUrlSubCategory = slugify(subCategoryFromUrl.toLowerCase());
    const normalizedUrlProduct = slugify(productNameFromUrl.toLowerCase());

    const response = await axios.get(`${API_URL}`);

    const data = response.data.products;
    const matchedProduct: Product = data.find(
      (el: any) =>
        slugify(el.name) === normalizedUrlProduct &&
        slugify(el.category) === normalizedUrlCategory &&
        slugify(el.subCategory) === normalizedUrlSubCategory
    );

    if (!matchedProduct) {
      return {
        ...baseMetadata,
        title: "Shop Categories - Kivamall",
        description: "Browse our wide range of products at Kivamall Kenya",
        alternates: {
          canonical: `${BASE_URL}/products`,
        },
      };
    }

    const productUrl = generateProductUrl(matchedProduct);
    const title = `${matchedProduct.name} | Buy Online Kenya - Kivamall`;
    const shortDescription = matchedProduct.name.slice(0, 160);
    const description = `${shortDescription} - ${
      matchedProduct.description || "Available at the best price in Kenya"
    }. Free delivery in Nairobi.`;

    const baseKeywords = [
      `buy ${matchedProduct.name} online`,
      `${matchedProduct.name} Kenya`,
      `best ${matchedProduct.name} Nairobi`,
      `${matchedProduct.category} ${matchedProduct.name}`,
      `affordable ${matchedProduct.name}`,
      `cheap ${matchedProduct.name} Kenya`,
      `${matchedProduct.name} price in Kenya`,
      `buy ${matchedProduct.name} online Kenya`,
      `Kivamall ${matchedProduct.name}`,
      `cheap ${matchedProduct.name} Kenya`,
      `${matchedProduct.category} ${matchedProduct.name}`,
      `${matchedProduct.subCategory} ${matchedProduct.name}`,
      `buy ${matchedProduct.name} online Kenya cash on delivery`,
      `authentic ${matchedProduct.name} in Nairobi`,
    ];

    const images = matchedProduct.productImages?.length
      ? matchedProduct.productImages.map((img) => ({
          url: img.url,
          width: 800,
          height: 600,
          alt: matchedProduct.name,
        }))
      : [
          {
            url: "/images/og/product-default.jpg",
            width: 800,
            height: 600,
            alt: `${matchedProduct.name} in Kenya - Kivamall`,
          },
        ];

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: matchedProduct.name,
      description: matchedProduct.description,
      url: productUrl,
      mainEntityOfPage: productUrl,
      image: matchedProduct.productImages?.map((img) => img.url) || [],
      brand: {
        "@type": "Brand",
        name: matchedProduct.brand || "Generic",
      },

      offers: {
        "@type": "Offer",
        url: productUrl,
        priceCurrency: "KES",
        price: matchedProduct.price,
        priceValidUntil: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        availability:
          matchedProduct.status.toLowerCase() === "in stock"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: "Kivamall",
        },
        itemCondition: "https://schema.org/NewCondition",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        reviewCount: "100",
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
        url: productUrl,
        siteName: "Kivamall",
        images,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: images[0]?.url,
      },
      alternates: {
        canonical: productUrl,
      },
      other: {
        "json-ld": JSON.stringify([
          jsonLd,
          {
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
          },
        ]),
        // "fb:app_id": "your-facebook-app-id",
        "og:locale": "en_KE",
        "og:type": "product",
        "product:price:amount": matchedProduct.price.toString(),
        "product:price:currency": "KES",
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
    return {
      ...baseMetadata,
      title: "Products - Kivamall",
      description: "Browse our collection of products at Kivamall Kenya",
      alternates: {
        canonical: `${BASE_URL}/products`,
      },
    };
  }
};
