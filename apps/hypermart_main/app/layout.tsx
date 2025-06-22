import { Inter, Playfair_Display } from "next/font/google"; // Corrected import for Playfair Display
import { cn } from "@/lib/utils";
import "./globals.css";

import "nprogress/nprogress.css";
import Navbar from "./components/home/Navbar";

// import { Metadata } from "next";
// import { categoryMetadata } from "./metadataUtils";

// export async function generateMetadata(
//   // parent: any,
//   {
//     params,
//   }: {
//     params: { category: string };
//   }
// ): Promise<Metadata> {
//   const decodedCategory = decodeURIComponent(params?.category)
//     .replace(/-/g, " ")
//     .replace(/\b\w/g, (c) => c.toUpperCase());

//   const normalizedCategory = Object.keys(categoryMetadata).find(
//     (key) => key.toLowerCase() === decodedCategory.toLowerCase()
//   );

//   const metadatas = normalizedCategory
//     ? categoryMetadata[normalizedCategory]
//     : undefined;

//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "WebPage",
//     name: metadatas?.title?.toString() ?? "",
//     description: metadatas?.description?.toString() ?? "",
//     url: `https://www.kivamall.com/category/${params?.category ?? ""}`,
//   };

//   return {
//     ...metadatas,
//     other: {
//       ...metadatas?.other,
//       "json-ld": JSON.stringify(jsonLd),
//     },
//   };
// }

// Define Inter font
const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Define Playfair Display font
const playfair = Playfair_Display({
  variable: "--playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, playfair.variable)}
      style={{ fontFamily: "var(--inter)" }}
    >
      {/* <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Your e-commerce store description" />
      </head> */}
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
