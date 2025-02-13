// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// // Sample New Arrivals Data (Replace with API Fetch Later)
// const newArrivals = [
//   {
//     id: 1,
//     name: "Smart Fitness Watch",
//     image: "/products/fitness-watch.png",
//     price: "$199",
//   },
//   {
//     id: 2,
//     name: "Wireless Noise Cancelling Headphones",
//     image: "/products/headphones.png",
//     price: "$249",
//   },
//   {
//     id: 3,
//     name: "AI-Powered Smart Lamp",
//     image: "/products/smart-lamp.png",
//     price: "$129",
//   },
//   {
//     id: 4,
//     name: "Luxury Leather Handbag",
//     image: "/products/handbag.png",
//     price: "$299",
//   },
// ];

// export default function NewArrivals() {
//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-8">
//         <motion.h2
//           className="text-3xl font-bold text-gray-900 text-center mb-8"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           ✨ New Arrivals
//         </motion.h2>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {newArrivals.map((product, index) => (
//             <motion.div
//               key={index}
//               className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2 cursor-pointer"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//             >
//               <Link href={`/product/${product.id}`}>
//                 <div className="relative w-full h-48">
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     layout="fill"
//                     objectFit="contain"
//                     className="rounded-lg"
//                   />
//                 </div>
//                 <h3 className="mt-4 text-lg font-semibold text-gray-900">
//                   {product.name}
//                 </h3>
//                 <p className="text-gray-600">{product.price}</p>
//                 <Button className="mt-3 bg-orange-600 hover:bg-orange-700 w-full">
//                   🛒 Add to Cart
//                 </Button>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import smartSperker from "../../public/newArrival/smartSpeker.png";
import earbuds from "../../public/newArrival/wireless_Earbud.png";
import foldedlaptop from "../../public/newArrival/foldedLaptop.png";
import blender from "../../public/newArrival/blender.png";
import smartwatch from "../../public/newArrival/smart_watch.png";
import tablet from "../../public/newArrival/tablet.png";

// Sample New Arrivals Data
const newArrivals = [
  {
    id: 1,
    name: "Smart Home Speaker",
    price: "$89.99",
    image: smartSperker,
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: "$129.99",
    image: earbuds,
  },
  {
    id: 3,
    name: "Foldable Laptop Stand",
    price: "$49.99",
    image: foldedlaptop,
  },
  {
    id: 4,
    name: "Portable Blender",
    price: "$39.99",
    image: blender,
  },
  {
    id: 5,
    name: "Smartwatch Pro",
    price: "$199.99",
    image: smartwatch,
  },
  {
    id: 6,
    name: "Digital Drawing Tablet",
    price: "$279.99",
    image: tablet,
  },
];

// Masonry Grid Breakpoints
const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function NewArrivals() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 py-12 rounded-2xl">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          🆕 New Arrivals
        </h2>

        <div className="flex gap-6">
          {newArrivals.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white w-48 rounded-lg shadow-md overflow-hidden p-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* "Just Arrived" Badge */}
              {/* <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-sm font-bold rounded">
                <Tag className="inline-block mr-1" size={14} /> Just Arrived
              </div> */}

              {/* Product Image */}
              <div className=" relative w-full h-32">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  // layout="responsive"
                  objectFit="cover"
                  className="rounded-lg h-28 w-full"
                />
              </div>

              {/* Product Info */}
              <h3 className="mt-4 text-[16px] font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-orange-500 text-[15px] font-semibold">
                {product.price}
              </p>

              {/* Buy Button */}
              {/* <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white w-full">
                🛒 Shop Now
              </Button> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
