import React from "react";
import { BsGlobe2 } from "react-icons/bs";

import { Inter, Merriweather, Sevillana } from "next/font/google";
import { cn } from "@/lib/utils";

const sevillana = Sevillana({
  variable: "--font-sevillana",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// export const metadata = {
//   title: "Qivamall",
// };

export default function QivamallLogo() {
  return (
    <div>
      <div className={` ${cn(inter.variable)}`}>
        <h1
          // style={{ fontFamily: "var(--font-inter)" }}
          className="text-3xl font-extrabold tracking-wide text-slate-800"
        >
          <span className="text-orange-600">Q</span>ivamall
        </h1>
        <div>
          <div className="bg-card relative h-7 w-7 rounded-full border-orange-600 border-[6px]" />
          <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg">
            <div className="absolute inset-4 bg-[#fff] rounded-full" />
            <div className="absolute bottom-6 right-0 w-2 h-6 bg-gradient-to-br from-orange-500 to-orange-700 -rotate-45 rounded-bl-[80%] rounded-tr-[80%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
