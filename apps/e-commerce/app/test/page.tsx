"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../home-page/navbar/Navbar";
import Footer from "../components/footer/Footer";
import CategoriesSection from "../home-page/category/ProductCategorySection";
import Reccomeded from "../home-page/recommedation/RecommedationProduct";

const subCategories = [
  { name: "Mattresses", slug: "mattresses", image: "/images/mattresses.jpg" },
  {
    name: "Gaming Chairs",
    slug: "gaming-chairs",
    image: "/images/gaming-chairs.jpg",
  },
  {
    name: "Bedroom Sets",
    slug: "bedroom-sets",
    image: "/images/bedroom-sets.jpg",
  },
  {
    name: "Office Chairs",
    slug: "office-chairs",
    image: "/images/office-chairs.jpg",
  },
  {
    name: "Outdoor Tables",
    slug: "outdoor-tables",
    image: "/images/outdoor-tables.jpg",
  },
  {
    name: "Gaming Tables",
    slug: "gaming-tables",
    image: "/images/gaming-tables.jpg",
  },
  { name: "TV Stands", slug: "tv-stands", image: "/images/tv-stands.jpg" },
  {
    name: "Dining Room Sets",
    slug: "dining-room-sets",
    image: "/images/dining-room-sets.jpg",
  },
];

const CategoryCard = ({
  category,
  index,
}: {
  category: (typeof subCategories)[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
    whileHover={{ y: -5 }}
    className="flex-shrink-0 px-2"
  >
    <Link href={`/category/${category.slug}`} className="group block w-full">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden border-2 border-gray-100 shadow-sm group-hover:border-orange-300 transition-all">
        {category.image ? (
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-t-lg hover:scale-105 transition-all duration-200"
            style={{
              backgroundImage: `url('${category.image || ""}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-xl">
              {category.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-full" />
      </div>
      <span className="block text-sm text-center mt-3 text-gray-700 group-hover:text-orange-600 transition-colors whitespace-nowrap">
        {category.name}
      </span>
    </Link>
  </motion.div>
);

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <div
          style={{
            backgroundImage: `url(${"/bg1.png"})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative bg-gray-800 text-white pb-[68px] pt-16 sm:py-24 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-80" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 max-w-4xl mx-auto px-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold sm:mb-2">
              Shop Our Collections
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300">
              Find quality products for every need and lifestyle
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16 z-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg px-4 py-3 sm:p-6 md:p-8"
          >
            <div className="flex overflow-x-auto hide-scrollbar gap-6 sm:gap-8">
              {subCategories.map((category, index) => (
                <CategoryCard
                  key={category.slug}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className=" space-y-7 pb-8">
          <CategoriesSection />
          <Reccomeded />
        </div>
      </main>
      <Footer />
    </>
  );
}
