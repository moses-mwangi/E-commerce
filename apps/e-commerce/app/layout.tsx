import "./globals.css";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import PageLoadingIndicator from "./components/loaders/PageLoadingIndicator";
import ClientWrapper from "./ClientProviders";
import { Suspense } from "react";

const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kivamall - Kenya's Largest Online Shopping Marketplace",
    template: "%s | Kivamall Kenya",
  },
  // logo: "https://www.kivamall.com/logos/logo-512x512.png",
  description:
    "Shop online for electronics, fashion, beauty, cosmetics, home decor, construction materials, car accessories, security devices & more in Kenya. Free vendor listings. Secure payments, nationwide delivery, and global export opportunities.",
  keywords: [
    "Kivamall",
    "Qivamall",
    "Kenya ecommerce",
    "online shopping Kenya",
    "buy online Kenya",
    "Nairobi online shopping",
    "electronics Kenya",
    "mobile phones Kenya",
    "laptops Kenya",
    "smartphones Kenya",
    "fashion Kenya",
    "shoes Kenya",
    "clothing Kenya",
    "beauty products Kenya",
    "cosmetics Kenya",
    "home decor Kenya",
    "furniture Kenya",
    "construction materials Kenya",
    "building materials Kenya",
    "security devices Kenya",
    "CCTV Kenya",
    "car accessories Kenya",
    "vehicle accessories Kenya",
    "free vendor listing Kenya",
    "dropshipping Kenya",
    "wholesale Kenya",
    "retail Kenya",
    "export Kenya",
    "B2B Kenya marketplace",
    "Kenya marketplace platform",
    "online marketplace Africa",

    "ecommerce",
    "ecommerce Nairobi",
    "buy products online",
    "Kivamall Kenya",
    "trusted online store",
    "nationwide delivery Kenya",
    "secure online payments",
    "best prices Kenya",
    "authentic products Nairobi",

    "fashion Kenya",
    "home decor Nairobi",
  ],

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "KkSiGxDsOVL1yR49qNvUrjSy-c1hJAIOt5lBH1tW3BI",
  },
  alternates: {
    canonical: "https://www.kivamall.com",
    languages: {
      "en-KE": "https://www.kivamall.com",
    },
  },
  openGraph: {
    title: "Kivamall - Kenya's #1 Online Marketplace",
    description:
      "Discover thousands of products from Kenyan vendors. Electronics, fashion, home & living, and more with secure payments.",
    url: "https://www.kivamall.com",
    siteName: "Kivamall Kenya",
    images: [
      {
        url: "https://www.kivamall.com/socialMedia_Images/og-image.png",
        secureUrl: "https://www.kivamall.com/socialMedia_Images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kivamall - Kenya's Online Marketplace",
      },
      // {
      //   url: "https://www.kivamall.com/socialMedia_Images/og-facebook.png",
      //   secureUrl:
      //     "https://www.kivamall.com/socialMedia_Images/og-facebook.png",
      //   width: 1200,
      //   height: 630,
      //   alt: "Kivamall Facebook Preview",
      // },
      // {
      //   url: "https://www.kivamall.com/socialMedia_Images/og-instagram.png",
      //   secureUrl:
      //     "https://www.kivamall.com/socialMedia_Images/og-instagram.png",
      //   width: 1200,
      //   height: 630,
      //   alt: "Kivamall Instagram Preview",
      // },
      // {
      //   url: "https://www.kivamall.com/socialMedia_Images/og-linkedin.png",
      //   secureUrl:
      //     "https://www.kivamall.com/socialMedia_Images/og-linkedin.png",
      //   width: 1200,
      //   height: 630,
      //   alt: "Kivamall LinkedIn Preview",
      // },
      // {
      //   url: "https://www.kivamall.com/socialMedia_Images/og-tiktok.png",
      //   secureUrl: "https://www.kivamall.com/socialMedia_Images/og-tiktok.png",
      //   width: 1200,
      //   height: 630,
      //   alt: "Kivamall TikTok Preview",
      // },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kivamall - Kenya's Online Shopping",
    description:
      "Discover thousands of products from Kenyan vendors. Electronics, fashion, home & living, and more with secure payments.",
    creator: "@kivamallkenya",

    images: {
      url: "https://www.kivamall.com/socialMedia_Images/og-image.png",
      alt: "Kivamall Twitter Card",
      width: 1200,
      height: 628,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logos/kivamall.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },

  // manifest: "/site.webmanifest",
  themeColor: "#ffffff",
  appleWebApp: {
    title: "Kivamall",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  metadataBase: new URL("https://www.kivamall.com"),
  category: "ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(poppins.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Kivamall",
              url: "https://www.kivamall.com",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.kivamall.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kivamall",
              url: "https://www.kivamall.com",
              description:
                "Kenya's Largest Online Shopping Marketplace for electronics, fashion, beauty products, and more",
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
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+254725672675",
                contactType: "customer service",
                email: "moses.mwangi.me@gmail.com",
                areaServed: "KE",
                availableLanguage: "en",
              },
            }),
          }}
        />
        <meta
          name="google-site-verification"
          content="KkSiGxDsOVL1yR49qNvUrjSy-c1hJAIOt5lBH1tW3BI"
        />
        <meta name="/logos/kivamall.png" content="/logos/kivamall.png" />
      </head>
      <body className="antialiased">
        <Suspense>
          <PageLoadingIndicator />
        </Suspense>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
