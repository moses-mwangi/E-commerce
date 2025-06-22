import { Metadata } from "next";
import { categoryMetadata } from "./metadataUtils";
import slugify from "@/utils/slungify";

export async function generateMetadata(
  // parent: any,
  {
    params,
  }: {
    params: { category: string };
  }
): Promise<Metadata> {
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

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
}
