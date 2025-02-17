"use client";

import { Poppins } from "next/font/google";
import { Provider } from "react-redux";
import { cn } from "@/lib/utils";
import "./globals.css";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const I18nProvider = dynamic(
  () => import("./components/language_change/I18nProvider"),
  { ssr: false }
);

const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cn(poppins.variable)}`}>
        <Toaster position="top-center" reverseOrder={false} />
        <Provider store={store}>
          <I18nProvider>
            <div>{children}</div>
          </I18nProvider>
        </Provider>
      </body>
    </html>
  );
}

// #@moses=7662;
