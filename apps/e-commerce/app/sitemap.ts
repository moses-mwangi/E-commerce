import { MetadataRoute } from "next";
import axios from "axios";

interface Category {
  id: string;
  name: string;
  updatedAt?: string;
  subcategories?: SubCategory[];
}

interface SubCategory {
  id: string;
  name: string;
  updatedAt?: string;
}

interface Product {
  products: {
    id: string;
    name: string;
    category: string;
    subCategory: string;
    updatedAt?: string;
  }[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const apiBaseUrl = "https://kivamall.up.railway.app";

    const [productsRes, categoriesRes] = await Promise.all([
      axios.get<Product>(`${apiBaseUrl}/api/product`),
      axios.get<{ data: { categories: Category[] } }>(
        `${apiBaseUrl}/api/category`
      ),
    ]);

    const categories = categoriesRes.data?.data?.categories || [];
    const products = productsRes.data?.products || [];

    const baseUrls: MetadataRoute.Sitemap = [
      {
        url: "https://www.kivamall.com",
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: "https://www.kivamall.com/category",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },
      {
        url: "https://www.kivamall.com/supports",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },
    ];

    const categoryUrls = categories.map((category) => {
      const categorySlug = slugify(category.name);
      return {
        url: `https://www.kivamall.com/category/${categorySlug}`,
        lastModified: getValidDate(category.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    });

    const subCategoryUrls = categories.flatMap((category) =>
      (category.subcategories || []).map((sub) => {
        return {
          url: `https://www.kivamall.com/category/${slugify(
            category.name
          )}/${slugify(sub.name)}`,
          lastModified: getValidDate(sub.updatedAt ?? category.updatedAt),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        };
      })
    );

    const productUrls = products.map((product) => {
      return {
        url: `https://www.kivamall.com/category/${slugify(
          product.category
        )}/${slugify(product.subCategory)}/${slugify(product.name)}`,

        lastModified: getValidDate(product.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      };
    });

    return [
      ...baseUrls,
      ...categoryUrls,
      ...subCategoryUrls,
      ...productUrls,
    ].filter(Boolean);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return [
      {
        url: "https://www.kivamall.com",
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: "https://www.kivamall.com/category",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },
      {
        url: "https://www.kivamall.com/supports",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },
    ];
  }
}

function slugify(text: string): string {
  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function getValidDate(dateString?: string): Date {
  try {
    return dateString ? new Date(dateString) : new Date();
  } catch {
    return new Date();
  }
}
