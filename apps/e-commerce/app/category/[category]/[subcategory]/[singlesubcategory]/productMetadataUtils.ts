import { Product } from "@/app/types/products";
import { RootState, AppDispatch } from "@/redux/store";
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

export const getProductMetadata = async (
  category: string,
  subcategory: string,
  productName: string
): Promise<Metadata> => {
  const response = await axios.get(
    `https://kivamall.up.railway.app/api/product`
  );

  const data = response.data.products;
  const product: Product = data.find(
    (el: any) =>
      slugify(el.name) === slugify(productName) &&
      slugify(el.category) === slugify(category) &&
      slugify(el.subCategory) === slugify(subcategory)
  );

  const title = `${product.name} | Buy Online Kenya - Kivamall`;
  const description = `${product.name.slice(0, 200)} - ${
    product.description || "Available at the best price in Kenya"
  }. Free delivery in Nairobi.`;

  const baseKeywords = [
    `buy ${product.name} online`,
    `${product?.name} Kenya`,
    `best ${product?.name} Nairobi`,
    `${category} ${product?.name}`,
    `affordable ${product?.name}`,
  ];

  return {
    ...baseMetadata,
    title,
    description,
    keywords: getKenyaKeywords(baseKeywords),
    openGraph: {
      title,
      description,
      url: `https://www.kivamall.com/category/${slugify(
        product.category
      )}/${slugify(product.subCategory)}/${slugify(product.name)}`,
      siteName: "Kivamall",
      images: product.productImages?.map((img) => ({
        url: img.url,
        width: 800,
        height: 600,
        alt: product.name,
      })) || [
        {
          url: "/images/og/product-default.jpg",
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `https://www.kivamall.com/category/${slugify(
        product.category
      )}/${slugify(product.subCategory)}/${slugify(product.name)}`,
    },
    other: {
      "json-ld": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,

        url: `https://www.kivamall.com/category/${slugify(
          product.category
        )}/${slugify(product.subCategory)}/${slugify(product.name)}`,

        image: product.productImages?.map((img) => img.url) || [],
        brand: {
          "@type": "Brand",
          name: product.brand || "Kivamall",
        },
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "KES",
          availability: product.status
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
      }),
    },
  };
};
