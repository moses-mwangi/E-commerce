"use client";

import { Poppins } from "next/font/google";
import { Provider } from "react-redux";
import { cn } from "@/lib/utils";
import "./globals.css";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLoadingIndicator from "./components/PageLoadingIndicator";
import { Suspense } from "react";
import LoadingState from "./components/LoadingState";

import "nprogress/nprogress.css";

const I18nProvider = dynamic(
  () => import("./components/language_change/I18nProvider"),
  {
    ssr: false,
    // loading: () => (
    //   <div className="min-h-screen flex items-center justify-center">
    //     <div className="animate-pulse">Loading translations...</div>
    //   </div>
    // ),
  }
);

const poppins = Poppins({
  variable: "--poppins",
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
    <html lang="en" className={cn(poppins.variable)}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Your e-commerce store description" />
      </head>
      <body className="antialiased">
        <Suspense>
          <PageLoadingIndicator />
        </Suspense>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#333",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#4ade80",
                secondary: "#fff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <Provider store={store}>
          <I18nProvider>
            <ErrorBoundary>
              <Suspense fallback={<LoadingState />}>
                <main className="min-h-screen">{children}</main>
              </Suspense>
            </ErrorBoundary>
          </I18nProvider>
        </Provider>
      </body>
    </html>
  );
}

// #@moses=7662;
