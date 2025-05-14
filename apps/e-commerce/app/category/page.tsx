// "use client";

// export default function ProductCategories() {
//   const router = useRouter();
//   const dispatch: AppDispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(6);

//   const { categories, status } = useSelector(
//     (state: RootState) => state.category
//   );

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchCategories());
//     }
//   }, [dispatch, status]);

//   useEffect(() => {
//     if (window.innerWidth < 640) {
//       setItemsPerPage(6);
//     }
//   }, []);

//   const filteredCategories = categories.filter((category) =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const trendingCategories = categories.filter((cat) => cat.trending);
//   const totalSlides = Math.ceil(filteredCategories.length / itemsPerPage);

//   const handleNext = () => {
//     if (currentSlide < totalSlides - 1) {
//       setCurrentSlide(currentSlide + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentSlide > 0) {
//       setCurrentSlide(currentSlide - 1);
//     }
//   };

//   const goToCategory = (categoryName: string) => {
//     setIsLoading(true);
//     router.push(`/category/${categoryName.toLowerCase()}`);
//   };

//   const visibleCategories = filteredCategories.slice(
//     currentSlide * itemsPerPage,
//     (currentSlide + 1) * itemsPerPage
//   );

//   return (
//     <>
//       {isLoading && <LoadingState />}
//       <Navbar />
//       <section className="sm:py-10 bg-gradient-to-b from-white to-gray-50">
//         <div className="container rounded-xl py-4 sm:py-6 lg:py-8 mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-6"
//           >
//             <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between">
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                   Shop by Category
//                 </h2>
//                 <p className="text-gray-500 mt-2">
//                   Browse our wide range of product categories
//                 </p>
//               </div>

//               <div className="relative w-full md:w-auto">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   type="text"
//                   placeholder="Search categories..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 w-full md:w-64 lg:w-80 bg-white focus-visible:ring-orange-500/85"
//                 />
//               </div>
//             </div>

//             {trendingCategories.length > 0 && (
//               <div className="space-y-3">
//                 <div className="relative">
//                   <div className="flex gap-3 py-2 overflow-x-auto scrollbar-hide">
//                     {trendingCategories.map((category) => (
//                       <motion.div
//                         key={`trending-${category.id}`}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="flex-shrink-0"
//                       >
//                         <Badge
//                           variant="secondary"
//                           className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100"
//                           onClick={() => goToCategory(category.name)}
//                         >
//                           <TrendingUp className="w-4 h-4 text-orange-500" />
//                           <span className="text-orange-700">
//                             {category.name}
//                           </span>
//                         </Badge>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="relative">
//               {status === "loading" ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
//                   {Array.from({ length: 6 }).map((_, index) => (
//                     <Skeleton key={index} className="h-40 rounded-xl" />
//                   ))}
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-medium text-gray-700">
//                       All Categories
//                     </h3>

//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={handlePrevious}
//                         disabled={currentSlide === 0}
//                         className="p-2 rounded-full bg-white disabled:opacity-55 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
//                         aria-label="Previous categories"
//                       >
//                         <ChevronLeft className="w-5 h-5" />
//                       </button>
//                       <span className="text-sm text-gray-500">
//                         Page {currentSlide + 1} of {totalSlides}
//                       </span>
//                       <button
//                         onClick={handleNext}
//                         disabled={currentSlide >= totalSlides - 1}
//                         className="p-2 rounded-full bg-white disabled:opacity-55 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
//                         aria-label="Next categories"
//                       >
//                         <ChevronRight className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>

//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={currentSlide}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
//                     >
//                       {visibleCategories.map((category) => (
//                         <motion.div
//                           key={category.id}
//                           whileHover={{ y: -5 }}
//                           whileTap={{ scale: 0.98 }}
//                           className="group cursor-pointer relative w-full"
//                           onClick={() => goToCategory(category.name)}
//                         >
//                           <div className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 w-full h-full flex flex-col items-center">
//                             <div className="relative mb-4">
//                               <div className="w-16 h-16 mx-auto rounded-full bg-gray-50 flex items-center justify-center shadow-inner">
//                                 {category?.icon ? (
//                                   <div
//                                     className="w-full h-full rounded-full bg-contain bg-center bg-no-repeat"
//                                     style={{
//                                       backgroundImage: `url(${category.icon})`,
//                                       backgroundSize: "cover",
//                                       backgroundPosition: "center",
//                                     }}
//                                   />
//                                 ) : (
//                                   <div className="w-12 h-12 bg-gray-200 rounded-full" />
//                                 )}
//                               </div>
//                             </div>

//                             <div className="text-center space-y-1 w-full">
//                               <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
//                                 {category.name}
//                               </h3>
//                               <p className="text-xs text-gray-500">
//                                 {category.itemCount || 0} products
//                               </p>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </motion.div>
//                   </AnimatePresence>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Search, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingState from "@/app/components/loaders/LoadingState";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { Pagination } from "../components/pagination/pagination";

import Link from "next/link";
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
    className="flex-shrink-0"
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
      <span className="block text-sm text-center mt-1 sm:mt-3 text-gray-700 group-hover:text-orange-600 transition-colors whitespace-nowrap">
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

        <div className="max-w-6xl mx-auto px-3 sm:px-6 -mt-16 z-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg px-[13px] py-3 sm:p-6 md:p-8"
          >
            <div className="flex overflow-x-auto hide-scrollbar gap-3 sm:gap-8">
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
