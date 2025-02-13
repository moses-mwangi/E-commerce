// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// // Sample Best Seller products
// const bestSellers = [
//   {
//     id: 1,
//     name: "Smart Watch Series 7",
//     price: "$249.99",
//     image: "/products/smartwatch.png",
//     rating: 4.9,
//   },
//   {
//     id: 2,
//     name: "Portable Power Bank 20000mAh",
//     price: "$49.99",
//     image: "/products/powerbank.png",
//     rating: 4.8,
//   },
//   {
//     id: 3,
//     name: "Wireless Earbuds Pro",
//     price: "$179.99",
//     image: "/products/earbuds.png",
//     rating: 4.7,
//   },
//   {
//     id: 4,
//     name: "Ergonomic Office Chair",
//     price: "$349.99",
//     image: "/products/officechair.png",
//     rating: 4.6,
//   },
//   {
//     id: 5,
//     name: "Professional DSLR Camera",
//     price: "$999.99",
//     image: "/products/dslr.png",
//     rating: 4.9,
//   },
//   {
//     id: 6,
//     name: "Smart Robot Vacuum Cleaner",
//     price: "$299.99",
//     image: "/products/robotvacuum.png",
//     rating: 4.8,
//   },
// ];

// // Animation Variants
// const fadeIn = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: (index: number) => ({
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.4, delay: index * 0.1, type: "spring" },
//   }),
// };

// export default function BestSellers() {
//   return (
//     <section className="py-16 bg-gray-100">
//       <div className="container mx-auto px-8">
//         <motion.h2
//           className="text-4xl font-extrabold text-gray-900 text-center mb-12"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           🏆 Best Sellers
//         </motion.h2>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {bestSellers.map((product, index) => (
//             <motion.div
//               key={product.id}
//               className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2 cursor-pointer"
//               initial="hidden"
//               animate="visible"
//               custom={index}
//               variants={fadeIn}
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
import { Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import electronics from "../../public/category_Image/electronics.png";

// Sample Best Sellers Data
const bestSellers = [
  {
    id: 1,
    name: "Noise Cancelling Headphones",
    price: "$299",
    rating: 4.8,
    reviews: 320,
    image: electronics,
  },
  {
    id: 2,
    name: "Mechanical Gaming Keyboard",
    price: "$129",
    rating: 4.7,
    reviews: 210,
    image: electronics,
  },
  {
    id: 3,
    name: "4K Action Camera",
    price: "$249",
    rating: 4.6,
    reviews: 180,
    image: electronics,
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: "$189",
    rating: 4.5,
    reviews: 140,
    image: electronics,
  },
];

export default function BestSellers() {
  return (
    <section className="py-12 bg-white ">
      <div className="container rounded-2xl py-12 mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          🏆 Best Sellers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              className={`p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition hover:-translate-y-2 ${
                index === 0 ? "border-2 border-yellow-500" : ""
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* 🏅 Ranking Badge */}
              <div className="flex items-center gap-2 mb-2">
                <Award className="text-yellow-500" size={20} />
                <span className="text-lg font-bold text-gray-800">
                  #{index + 1} Best Seller
                </span>
              </div>

              {/* Product Image */}
              <div className="relative w-full h-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>

              {/* Product Info */}
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {product.name}
              </h3>
              <p className="text-orange-500 font-bold">{product.price}</p>

              {/* ⭐ Ratings */}
              <div className="flex items-center mt-2 text-yellow-500">
                {[...Array(Math.round(product.rating))].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
                <span className="text-gray-600 ml-2">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Buy Button */}
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white w-full">
                🛒 Buy Now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
