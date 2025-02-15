// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import fash_1 from "../../public/fashion/fash_1.png";

// // Sample category data
// const categories = [
//   { name: "Fashion", icon: fash_1 },
//   { name: "Electronics", icon: "/icons/electronics.png" },
//   { name: "Beauty", icon: "/icons/beauty.png" },
//   { name: "Kitchen", icon: "/icons/kitchen.png" },
//   { name: "Fitness", icon: "/icons/fitness.png" },
//   { name: "Gaming", icon: "/icons/gaming.png" },
// ];

// export default function ProductCategories() {
//   return (
//     <section className="py-16 bg-white">
//       <div className="">
//         <div className="container mx-auto px-8 py-14 rounded-lg">
//           <motion.h2
//             className="text-3xl font-bold text-gray-900 text-center mb-8"
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             Explore Categories
//           </motion.h2>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//             {categories.map((category, index) => (
//               <motion.div
//                 key={index}
//                 className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md cursor-pointer hover:bg-orange-100 transition"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//               >
//                 <Image
//                   className="w-24 h-24"
//                   src={category.icon}
//                   alt={category.name}
//                   width={60}
//                   height={60}
//                 />
//                 <p className="mt-2 text-gray-800 font-semibold">
//                   {category.name}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import fash_1 from "../../public/category_Image/fash_1.png";
import electronics from "../../public/category_Image/electronics.png";
import kitchen from "../../public/category_Image/kitchen.png";
import beauty from "../../public/category_Image/beauty.png";
import fitness from "../../public/category_Image/fittness.png";
import gaming from "../../public/category_Image/gaming.png";
import { useRouter } from "next/navigation";

// Sample category data
const categories = [
  {
    name: "Fashion",
    icon: fash_1,
    color: "from-pink-500 to-red-500",
  },
  {
    name: "Electronics",
    icon: electronics,
    color: "from-blue-500 to-purple-500",
  },
  {
    name: "Beauty",
    icon: beauty,
    color: "from-rose-500 to-pink-500",
  },
  {
    name: "Kitchen",
    icon: kitchen,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Fitness",
    icon: fitness,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Gaming",
    icon: gaming,
    color: "from-indigo-500 to-blue-500",
  },
  {
    name: "Kitchen",
    icon: fash_1,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Fitness",
    icon: fash_1,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Gaming",
    icon: fash_1,
    color: "from-indigo-500 to-blue-500",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: index * 0.1, type: "spring" },
  }),
};

export default function ProductCategories() {
  const { push } = useRouter();
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-8 py-14 rounded-2xl">
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Categories
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((category, index) => (
            <motion.div
              onClick={() => {
                push(
                  `${category.name.at(0)?.toLowerCase()}${category.name.slice(
                    1
                  )}`
                );
              }}
              key={index}
              className={`flex bg-slate-50  flex-col items-center p-6 rounded-xl shadow-md cursor-pointer transform hover:scale-150 transition-all duration-300`}
              initial="hidden"
              animate="visible"
              custom={index}
              variants={fadeInUp}
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
                <Image
                  className=" w-full h-full rounded-full"
                  src={category.icon}
                  alt={category.name}
                  width={60}
                  height={60}
                />
              </div>
              <p className="mt-4 text-gray-800 font-semibold text-lg">
                {category.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
