"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import ErrorBoundary from "./components/errorBoundaries/ErrorBoundary";
import LoadingState from "./components/loaders/LoadingState";
import dynamic from "next/dynamic";
// import I18nProvider from "./components/language_change/I18nProvider";

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

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <I18nProvider>
        <ErrorBoundary>
          <Suspense fallback={<LoadingState />}>
            <main className="min-h-screen">{children}</main>
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
        </ErrorBoundary>
      </I18nProvider>
    </Provider>
  );
}
