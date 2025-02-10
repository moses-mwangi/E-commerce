// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import aiDashboard from "../../../public/images/image copy.png";

// export default function HeroSection() {
//   return (
//     <section className="relative flex items-center justify-between min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 px-12">
//       {/* Left Content */}
//       <div className="w-[55%] flex flex-col justify-center space-y-6">
//         <motion.h1
//           className="text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           AI-Driven Commerce <br /> for the Future 🚀
//         </motion.h1>

//         <motion.p
//           className="text-lg text-gray-300 max-w-2xl"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Experience next-level AI-powered shopping with intelligent
//           recommendations, voice & image search, and seamless automation.
//           Whether you’re a business looking to scale or a shopper seeking the
//           best deals, we’ve got you covered!
//         </motion.p>

//         <motion.div
//           className="flex gap-4 mt-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.9 }}
//         >
//           <Button className="px-6 py-3 text-lg font-semibold bg-orange-600 hover:bg-orange-700 shadow-lg rounded-xl">
//             🛍️ Start Shopping
//           </Button>
//           <Button className="px-6 py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 shadow-lg rounded-xl">
//             🎙️ Search by Voice
//           </Button>
//           <Button className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg rounded-xl">
//             📷 Search by Image
//           </Button>
//         </motion.div>
//       </div>

//       {/* Right Content - AI Dashboard Image */}
//       <div className="w-[45%] flex justify-center items-center">
//         <motion.div
//           className="relative w-[90%] h-auto bg-gray-800 rounded-xl shadow-lg p-5"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <Image
//             src={aiDashboard}
//             alt="AI Commerce Dashboard"
//             className="w-full h-auto object-contain rounded-lg"
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// }
import React from "react";

export default function Hero_Section_dark() {
  return <div>Hero_Section_dark</div>;
}
