/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import aismartwatch from "../../../public/images/ai-smartwatch.png";
// import aiBgHero from "../../../public/images/ai-bg-hero.png";
// import beau from "../../../public/images/bea.png";
// import earbuds from "../../../public/images/ai-bg-hero.png";
// import smartHub from "../../../public/images/image copy.png";

// const images = [aismartwatch, earbuds, smartHub, beau];

// export default function HeroSection() {
//   const [currentImage, setCurrentImage] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="container flex text-white ">
//       <div className="section section-1">
//         <div className=" h-full w-full">
//           <div className=" w-[60%] h-full flex flex-col justify-center px-16 bg-gradient-to-br from-gray-900 via-black to-gray-800">
//             <motion.h1
//               className="text-5xl font-bold mb-5 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
//               initial={{ opacity: 0, y: -50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               AI-Powered Smart <br /> Shopping
//             </motion.h1>
//             <motion.p
//               className="text-lg mb-6 max-w-2xl text-gray-300"
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7 }}
//             >
//               Discover AI-curated products, image & voice search, and exclusive{" "}
//               <br />
//               smart deals tailored for you.
//             </motion.p>

//             <div className="flex gap-4">
//               <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-6 py-3 shadow-lg">
//                 🛍️ Shop Now
//               </Button>
//               <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 px-6 py-3 shadow-lg">
//                 🎙️ Search by Voice
//               </Button>
//               <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 px-6 py-3 shadow-lg">
//                 📷 Search by Image
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="section section-2 grid grid-cols-[1fr_1fr]">
//         <div></div>
//         <div className=" flex w-full h-svh items-center justify-center">
//           <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
//             <motion.div
//               key={currentImage}
//               className="absolute inset-0 w-full h-full"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1 }}
//             >
//               <Image
//                 src={images[currentImage]}
//                 alt="AI Product Showcase"
//                 className="w-full h-full object-cover"
//               />
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import aismartwatch from "../../../public/images/ai-smartwatch.png";
import aiBgHero from "../../../public/images/ai-bg-hero.png";
import beau from "../../../public/images/image copy 2.png";
import earbuds from "../../../public/images/ai-bg-hero.png";
import smartHub from "../../../public/images/image copy 2.png";

const images = [aismartwatch, earbuds, smartHub, beau];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Keep this interval for switching images
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container flex text-white ">
      <div className="section section-1">
        <div className="h-full w-full">
          <div className="w-[60%] h-full flex flex-col justify-center px-16 bg-gradient-to-br from-gray-900 via-black to-gray-800">
            {/* <div className="w-[60%] h-full flex flex-col justify-center px-16 bg-gradient-to-br"> */}
            <motion.h1
              className="text-5xl font-bold mb-5 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              // className="text-5xl font-bold mb-5 bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              AI-Powered Smart <br /> Shopping
            </motion.h1>
            <motion.p
              className="text-lg mb-6 max-w-2xl text-gray-300"
              // className="text-lg mb-6 max-w-2xl text-gray-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Discover AI-curated products, image & voice search, and exclusive{" "}
              <br />
              smart deals tailored for you.
            </motion.p>

            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-6 py-3 shadow-lg">
                🛍️ Shop Now
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 px-6 py-3 shadow-lg">
                🎙️ Search by Voice
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 px-6 py-3 shadow-lg">
                📷 Search by Image
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="section section-2 grid grid-cols-[1fr_1fr]">
        <div></div>
        <div className="flex w-full h-svh items-center justify-center">
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <motion.div
              key={currentImage}
              className="absolute inset-0 w-full h-full opacity-35"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} // Fade out the old image
              transition={{ duration: 1 }} // Slow transition for both fade in and fade out
            >
              <Image
                src={images[currentImage]}
                alt="AI Product Showcase"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
