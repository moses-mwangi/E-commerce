// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// // Sample trending products data
// const trendingProducts = [
//   {
//     id: 1,
//     name: "Smartwatch Pro",
//     price: "$199.99",
//     image: "/products/smartwatch.png",
//     rating: 4.8,
//   },
//   {
//     id: 2,
//     name: "Wireless Headphones",
//     price: "$129.99",
//     image: "/products/headphones.png",
//     rating: 4.7,
//   },
// {
//   id: 3,
//   name: "AI-Powered Smart Lamp",
//   price: "$89.99",
//   image: "/products/smartlamp.png",
//   rating: 4.6,
// },
// {
//   id: 4,
//   name: "Ultra HD 4K TV",
//   price: "$899.99",
//   image: "/products/4ktv.png",
//   rating: 4.9,
// },
// {
//   id: 5,
//   name: "Gaming Laptop RTX",
//   price: "$1,499.99",
//   image: "/products/gaminglaptop.png",
//   rating: 4.9,
// },
// {
//   id: 6,
//   name: "AI Home Assistant",
//   price: "$349.99",
//   image: "/products/homeassistant.png",
//   rating: 4.7,
// },
// ];

// // Animation Variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (index: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, delay: index * 0.1, type: "spring" },
//   }),
// };

// export default function TrendingProducts() {
//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-8">
//         <motion.h2
//           className="text-4xl font-extrabold text-gray-900 text-center mb-12"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           🔥 Trending Products
//         </motion.h2>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {trendingProducts.map((product, index) => (
//             <motion.div
//               key={product.id}
//               className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2 cursor-pointer"
//               initial="hidden"
//               animate="visible"
//               custom={index}
//               variants={fadeInUp}
//             >
//               <div className="relative w-full h-48">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   layout="fill"
//                   objectFit="contain"
//                   className="rounded-lg"
//                 />
//               </div>
//               <h3 className="mt-4 text-lg font-bold text-gray-900">
//                 {product.name}
//               </h3>
//               <p className="text-gray-600 mt-1">{product.price}</p>
//               <p className="text-yellow-500 mt-1">⭐ {product.rating}</p>

//               <div className="mt-4 flex gap-3">
//                 <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2">
//                   🛒 Add to Cart
//                 </Button>
//                 <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
//                   🔍 View Details
//                 </Button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import fash_1 from "../../public/category_Image/fash_1.png";
import electronics from "../../public/category_Image/electronics.png";
import kitchen from "../../public/category_Image/kitchen.png";
import beauty from "../../public/category_Image/beauty.png";
import fitness from "../../public/category_Image/fittness.png";
import gaming from "../../public/category_Image/gaming.png";

const trendingProducts = [
  { id: 1, name: "Smart Watch", price: "$199", image: kitchen },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: "$99",
    image: electronics,
  },
  { id: 3, name: "Gaming Mouse", price: "$59", image: fitness },
  {
    id: 4,
    name: "Ultra HD Monitor",
    price: "$349",
    image: beauty,
  },
  {
    id: 5,
    name: "AI-Powered Smart Lamp",
    price: "$89.99",
    image: gaming,
    rating: 4.6,
  },
  {
    id: 6,
    name: "Ultra HD 4K TV",
    price: "$899.99",
    image: "/products/4ktv.png",
    rating: 4.9,
  },
  {
    id: 7,
    name: "Gaming Laptop RTX",
    price: "$1,499.99",
    image: "/products/gaminglaptop.png",
    rating: 4.9,
  },
  {
    id: 8,
    name: "AI Home Assistant",
    price: "$349.99",
    image: "/products/homeassistant.png",
    rating: 4.7,
  },
];

export default function TrendingProducts() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-4">🔥 Trending Now</h2>

        <div className="relative">
          <motion.div className="flex overflow-x-scroll overflow-y-hidden space-x-6">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="min-w-[250px] bg-white overflow-hidden p-4 hover:rounded-lg rounded-lg shadow hover:shadow-lg transition hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-40 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
                <p className="text-orange-500 font-bold">{product.price}</p>
                <Button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white w-full">
                  Buy Now
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
            <ChevronLeft size={24} />
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
