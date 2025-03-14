import { Inter, Playfair_Display } from "next/font/google"; // Corrected import for Playfair Display
import { cn } from "@/lib/utils";
import "./globals.css";

import "nprogress/nprogress.css";
import Navbar from "./components/home/Navbar";

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
