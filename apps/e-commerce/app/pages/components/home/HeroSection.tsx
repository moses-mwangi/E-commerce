// /* eslint-disable @typescript-eslint/no-unused-vars */

// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import img from "../../../public/images/image.png";
// import {
//   ArrowRight,
//   ShoppingCart,
//   Bot,
//   Sparkles,
//   BarChart,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export default function HeroSection() {
//   return (
//     <section className="relative min-h-[90vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
//       {/* Background Effects */}
//       <div className="absolute inset-0 bg-grid-white/[0.02]" />
//       <div className="absolute inset-0 bg-gradient-radial from-indigo-500/20 via-transparent to-transparent" />

//       <div className="container mx-auto px-4 py-20 relative">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="space-y-8 z-10"
//           >
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
//               <Sparkles className="w-4 h-4" />
//               <span className="text-sm">Next-Gen E-commerce Platform</span>
//             </div>

//             <motion.h1
//               className="text-4xl md:text-6xl font-bold text-white leading-tight"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               Transform Your Business with{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
//                 AI-Powered E-commerce
//               </span>
//             </motion.h1>

//             <motion.p
//               className="text-xl text-slate-300 max-w-xl leading-relaxed"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//             >
//               Elevate your online presence with cutting-edge AI technology.
//               Deliver personalized shopping experiences that convert visitors
//               into loyal customers.
//             </motion.p>

//             <motion.div
//               className="flex flex-wrap gap-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.6 }}
//             >
//               <Button
//                 size="lg"
//                 className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-lg shadow-indigo-500/25"
//                 asChild
//               >
//                 <Link href="/services" className="gap-2">
//                   Explore Services <ArrowRight className="w-5 h-5" />
//                 </Link>
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
//                 asChild
//               >
//                 <Link href="https://store.yourcompany.com" className="gap-2">
//                   <ShoppingCart className="w-5 h-5" />
//                   Visit Store
//                 </Link>
//               </Button>
//             </motion.div>

//             <motion.div
//               className="grid grid-cols-3 gap-8 pt-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.8 }}
//             >
//               {[
//                 { number: "50K+", label: "Products", icon: ShoppingCart },
//                 { number: "98%", label: "Satisfaction", icon: Sparkles },
//                 { number: "24/7", label: "Support", icon: Bot },
//               ].map((stat, index) => (
//                 <div
//                   key={stat.label}
//                   className="px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm"
//                 >
//                   <stat.icon className="w-5 h-5 text-indigo-400 mb-2" />
//                   <h4 className="text-2xl font-bold text-white">
//                     {stat.number}
//                   </h4>
//                   <p className="text-slate-400 text-sm">{stat.label}</p>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.4 }}
//             className="relative lg:h-[600px]"
//           >
//             <div className="relative h-full">
//               <Image
//                 src={img}
//                 alt="AI-Powered E-commerce"
//                 fill
//                 className="object-contain z-10"
//                 priority
//               />

//               {/* Decorative Elements */}
//               <div className="absolute -inset-x-20 top-0 h-64 bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 blur-3xl" />
//               <div className="absolute inset-0 bg-grid-white/[0.02] z-0" />

//               {/* Floating Elements */}
//               <motion.div
//                 className="absolute -right-8 top-1/4 bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-slate-700/50"
//                 animate={{ y: [0, 10, 0] }}
//                 transition={{ repeat: Infinity, duration: 3 }}
//               >
//                 <Bot className="w-8 h-8 text-indigo-400" />
//               </motion.div>

//               <motion.div
//                 className="absolute left-8 bottom-1/4 bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-slate-700/50"
//                 animate={{ y: [0, -10, 0] }}
//                 transition={{ repeat: Infinity, duration: 4 }}
//               >
//                 <BarChart className="w-8 h-8 text-cyan-400" />
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShoppingCart,
  Bot,
  Sparkles,
  BarChart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-slate-200/50" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-100/30 via-transparent to-transparent" />

      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                Next-Gen E-commerce Platform
              </span>
            </div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Transform Your Business with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                AI-Powered E-commerce
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Elevate your online presence with cutting-edge AI technology.
              Deliver personalized shopping experiences that convert visitors
              into loyal customers.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
                asChild
              >
                <Link href="/services" className="gap-2">
                  Explore Services <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                asChild
              >
                <Link href="https://store.yourcompany.com" className="gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Visit Store
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-8 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { number: "50K+", label: "Products", icon: ShoppingCart },
                { number: "98%", label: "Satisfaction", icon: Sparkles },
                { number: "24/7", label: "Support", icon: Bot },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="px-4 py-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <stat.icon className="w-5 h-5 text-blue-600 mb-2" />
                  <h4 className="text-2xl font-bold text-gray-900">
                    {stat.number}
                  </h4>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative lg:h-[600px]"
          >
            <div className="relative h-full">
              <Image
                src="/images/hero-illustration.svg"
                alt="AI-Powered E-commerce"
                fill
                className="object-contain z-10"
                priority
              />

              {/* Decorative Elements */}
              <div className="absolute -inset-x-20 top-0 h-64 bg-gradient-to-br from-blue-100/50 to-cyan-100/50 blur-3xl" />

              {/* Floating Elements */}
              <motion.div
                className="absolute -right-8 top-1/4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Bot className="w-8 h-8 text-blue-600" />
              </motion.div>

              <motion.div
                className="absolute left-8 bottom-1/4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <BarChart className="w-8 h-8 text-cyan-600" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
