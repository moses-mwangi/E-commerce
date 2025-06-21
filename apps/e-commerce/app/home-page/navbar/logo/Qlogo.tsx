// import React from "react";
// import { BsGlobe2 } from "react-icons/bs";

// import { Inter, Merriweather, Sevillana } from "next/font/google";
// import { cn } from "@/lib/utils";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
//   weight: ["400"],
//   display: "swap",
// });

// // export const metadata = {
// //   title: "Qivamall",
// // };

// export default function QivamallLogo() {
//   return (
//     <div>
//       <div className={` ${cn(inter.variable)}`}>
//         {/* <h1
//           // style={{ fontFamily: "var(--font-inter)" }}
//           className="text-3xl font-extrabold tracking-wide text-slate-800"
//         >
//           <span className="text-orange-600">Q</span>ivamall
//         </h1> */}

//         {/* <div className="bg-card h-7 w-7 rounded-full border-orange-600 border-[6px]" /> */}
//         <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg">
//           <div className=" absolute top-0 left-0 bg-card h-7 w-7 rounded-full border-orange-600 border-[6px]" />
//           {/* <div className="absolute inset-4 bg-[#fff] rounded-full" /> */}
//           <div className="absolute bottom-6 right-0 w-2 h-6 bg-gradient-to-br from-orange-500 to-orange-700 -rotate-45 rounded-bl-[80%] rounded-tr-[80%]" />
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import { Inter } from "next/font/google";
// import { cn } from "@/lib/utils";
// import { string } from "zod";
// import Image from "next/image";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
//   weight: ["400"],
//   display: "swap",
// });

// export default function QivamallLogo({ withText = true, size = "md" }) {
//   const sizeClasses = {
//     sm: {
//       icon: "w-5 h-5",
//       border: "border-[4px]",
//       text: "text-xl",
//       tail: "w-1.5 h-4 bottom-4",
//     },
//     md: {
//       icon: "w-7 h-7",
//       border: "border-[6px]",
//       text: "text-3xl",
//       tail: "w-2 h-6 bottom-6",
//     },
//     lg: {
//       icon: "w-10 h-10",
//       border: "border-[8px]",
//       text: "text-4xl",
//       tail: "w-3 h-8 bottom-8",
//     },
//   };

//   // const currentSize = sizeClasses[size];
//   const currentSize = sizeClasses["lg"];

//   return (
//     <div className={`flex items-center gap-2 ${cn(inter.variable)}`}>
//       {/* Icon part */}
//       {/* <div
//         className={`relative ${currentSize.icon} rounded-full bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg`}
//       >
//         <div
//           className={`absolute top-0 left-0 bg-white ${currentSize.icon} rounded-full border-orange-600 ${currentSize.border}`}
//         />
//         <div
//           className={`absolute right-0 ${currentSize.tail} bg-gradient-to-br from-orange-500 to-orange-700 -rotate-45 rounded-bl-[80%] rounded-tr-[80%]`}
//         />
//       </div>

//       {withText && (
//         <h1
//           className={`font-extrabold tracking-wide text-slate-800 ${currentSize.text}`}
//         >
//           <span className="text-orange-600">K</span>ivamall
//         </h1>
//       )}

//       <div className="relative w-8 h-8 rounded-full border-4 border-orange-400 bg-white shadow-lg">
//         <div className="absolute inset-4 bg-white rounded-full"></div>

//          <div
//           className={`absolute right-0 bottom-0 ${currentSize.tail} bg-gradient-to-br from-orange-500 to-orange-700 -rotate-45 rounded-bl-[80%] rounded-tr-[80%]`}
//         />
//         <div className="absolute bottom-0 right-0 w-3 h-4 bg-gradient-to-br from-orange-500 to-orange-700 rotate-45 rounded-bl-[100%] rounded-tr-[100%]"></div>
//       </div> */}
//       <Image
//         src={`/logoidea_2.png`}
//         width={300}
//         height={200}
//         alt="lll"
//         className="h-auto w-auto"
//       />
//     </div>
//   );
// }

import React from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export function QivamallLogo({
  variant = "full", // "full" | "icon" | "wordmark"
  size = "md", // "sm" | "md" | "lg" | "xl"
  className = "",
}) {
  const sizes = {
    sm: { icon: 20, text: "text-lg", spacing: "gap-1" },
    md: { icon: 28, text: "text-2xl", spacing: "gap-2" },
    lg: { icon: 40, text: "text-4xl", spacing: "gap-3" },
    xl: { icon: 56, text: "text-5xl", spacing: "gap-4" },
  };

  const { icon: iconSize, text, spacing } = sizes["md"];
  const tailHeight = iconSize * 0.4;
  const tailWidth = iconSize * 1.8;

  const QIcon = () => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox={`0 0 ${iconSize} ${iconSize}`}
      className="flex-shrink-0"
    >
      {/* Orange circle */}
      <circle
        cx={iconSize / 2}
        cy={iconSize / 2}
        r={iconSize / 2 - 2}
        fill="url(#orangeGradient)"
      />
      {/* White inner circle */}
      <circle
        cx={iconSize / 2}
        cy={iconSize / 2}
        r={iconSize / 2 - 6}
        fill="white"
      />
      {/* Tail - part that will extend */}
      <path
        d={`M${iconSize - 4} ${iconSize / 2} Q${iconSize + 8} ${
          iconSize + tailHeight / 2
        }, ${tailWidth} ${iconSize + tailHeight}`}
        stroke="url(#orangeGradient)"
        strokeWidth="3"
        fill="none"
      />
      <defs>
        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        variant === "full" ? "flex-row" : "flex-col",
        spacing,
        className
      )}
    >
      <QIcon />

      {variant !== "icon" && (
        <div
          className={cn(
            "relative",
            inter.className,
            text,
            "font-bold text-gray-800 tracking-tight"
          )}
        >
          ivamall
          {variant === "full" && (
            <div
              className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
              style={{ bottom: -4 }}
            />
          )}
        </div>
      )}
    </div>
  );
}
