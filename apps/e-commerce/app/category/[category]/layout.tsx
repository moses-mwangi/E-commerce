import { Metadata } from "next";
import { categoryMetadata } from "./metadataUtils";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const decodedCategory = decodeURIComponent(params.category)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const normalizedCategory = Object.keys(categoryMetadata).find(
    (key) => key.toLowerCase() === decodedCategory.toLowerCase()
  );

  const metadatas =
    normalizedCategory && categoryMetadata[String(normalizedCategory)];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: (metadatas as any).title?.toString(),
    description: (metadatas as any).description?.toString(),
    url: `https://www.kivamall.com/category/${params.category}`,
  };

  return {
    ...metadatas,
    other: {
      ...(metadatas as any).other,
      "json-ld": JSON.stringify(jsonLd),
    },
  };

  // return matchedKey ? categoryMetadata[matchedKey] : defaultMetadata;
  // return categoryMetadata[String(matchedKey)];
  // return categoryMetadata[category];
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
