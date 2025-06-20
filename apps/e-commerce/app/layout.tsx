// "use client";

// import { Poppins } from "next/font/google";
// import { Provider } from "react-redux";
// import { cn } from "@/lib/utils";
// import "./globals.css";
// import { store } from "@/redux/store";
// import { Toaster } from "react-hot-toast";
// import dynamic from "next/dynamic";
// import ErrorBoundary from "./components/errorBoundaries/ErrorBoundary";
// import PageLoadingIndicator from "./components/loaders/PageLoadingIndicator";
// import { Suspense } from "react";
// import LoadingState from "./components/loaders/LoadingState";

// import "nprogress/nprogress.css";

// const I18nProvider = dynamic(
//   () => import("./components/language_change/I18nProvider"),
//   {
//     ssr: false,
//     // loading: () => (
//     //   <div className="min-h-screen flex items-center justify-center">
//     //     <div className="animate-pulse">Loading translations...</div>
//     //   </div>
//     // ),
//   }
// );

// const poppins = Poppins({
//   variable: "--poppins",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   display: "swap",
// });

// const ddddd = {
//   title: "ssKivamall - Kenya's Online Store",
//   description:
//     "Welcome to Kivamall – Kenya’s digital shopping mall. Shop fashion, electronics, beauty, and more. Vendors can list their products for free.",
//   keywords: [
//     "Kivamall",
//     "Kenya online shopping",
//     "ecommerce Kenya",
//     "digital mall",
//     "shop electronics Kenya",
//     "sell products online Kenya",
//   ],
//   openGraph: {
//     title: "Kivamall - Kenya's Online Store",
//     description:
//       "Shop fashion, electronics, beauty, and more. Vendors can list their products for free.",
//     url: "https://www.kivamall.com",
//     siteName: "Kivamall",
//     images: [
//       {
//         url: "https://www.kivamall.com/og-image.jpg", // 🔁 Use your real OG image
//         width: 1200,
//         height: 630,
//         alt: "Kivamall",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Kivamall - Kenya's Online Store",
//     description:
//       "Shop fashion, electronics, beauty, and more. Vendors can list their products for free.",
//     images: ["https://www.kivamall.com/og-image.jpg"],
//   },
//   metadataBase: new URL("https://www.kivamall.com"),
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={cn(poppins.variable)}>
//       <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta name="description" content="Your e-commerce store description" />
//       </head>
//       <body className="antialiased">
//         <Suspense>
//           <PageLoadingIndicator />
//         </Suspense>
//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 4000,
//             style: {
//               background: "#333",
//               color: "#fff",
//             },
//             success: {
//               duration: 3000,
//               iconTheme: {
//                 primary: "#4ade80",
//                 secondary: "#fff",
//               },
//             },
//             error: {
//               duration: 4000,
//               iconTheme: {
//                 primary: "#ef4444",
//                 secondary: "#fff",
//               },
//             },
//           }}
//         />
//         <Provider store={store}>
//           <I18nProvider>
//             <ErrorBoundary>
//               <Suspense fallback={<LoadingState />}>
//                 <main className=" min-h-screen">{children}</main>
//               </Suspense>
//             </ErrorBoundary>
//           </I18nProvider>
//         </Provider>
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import PageLoadingIndicator from "./components/loaders/PageLoadingIndicator";
import ClientWrapper from "./ClientProviders";
import { Suspense } from "react";
import LoadingState from "./components/loaders/LoadingState";

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
  description:
    "Shop online for electronics, fashion, beauty, cosmetics, home decor, construction materials, car accessories, security devices & more in Kenya. Free vendor listings. Secure payments, nationwide delivery, and global export opportunities.",
  // "Shop online for electronics, fashion, home goods & more in Kenya. Free vendor listings. Secure payments & nationwide delivery.",
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
  ],
  robots: {
    index: true,
    follow: true,
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
  },
  openGraph: {
    title: "Kivamall - Kenya's Online Shopping Destination",
    description:
      "Discover thousands of products from Kenyan vendors. Electronics, fashion, home & living, and more with secure payments.",
    url: "https://www.kivamall.com",
    siteName: "Kivamall",
    images: [
      {
        url: "https://www.kivamall.com/socialMedia_Images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kivamall - Kenya's Online Marketplace",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kivamall - Kenya's Online Shopping Destination",
    description:
      "Discover thousands of products from Kenyan vendors. Electronics, fashion, home & living, and more with secure payments.",
    images: ["https://www.kivamall.com/socialMedia_Images/og-image.png"],
    creator: "@kivamallkenya",
  },
  icons: {
    icon: [
      // { url: "/favicon.ico" },
      { url: "/bg.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
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
              logo: "https://www.kivamall.com/socialMedia_Images/logo.png",
              sameAs: [
                "https://www.instagram.com/kivamall.ke/",
                "https://www.facebook.com/kivamallkenya",
                "https://twitter.com/kivamallkenya",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+254700000000",
                contactType: "customer service",
                email: "support@kivamall.com",
                areaServed: "KE",
                availableLanguage: "en",
              },
            }),
          }}
        />
        {/* <link rel="icon" href="/bg.png" type="image/png" /> */}
        <meta
          name="google-site-verification"
          content="KkSiGxDsOVL1yR49qNvUrjSy-c1hJAIOt5lBH1tW3BI"
        />
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
