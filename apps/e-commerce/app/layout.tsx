import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
// import I18nProvider from "./home-page/components/I18nProvider";
// import dynamic from "next/dynamic";

// const I18nProvider = dynamic(
//   () => import("./home-page/components/I18nProvider"),
//   { ssr: false }
// );

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
        {/* <I18nProvider> */}
        <div>{children}</div>
        {/* </I18nProvider> */}
      </body>
    </html>
  );
}

// #@moses=7662;
