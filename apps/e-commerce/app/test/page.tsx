// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import {
//   Search,
//   ArrowRight,
//   TrendingUp,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import LoadingState from "@/app/components/loaders/LoadingState";
// import { motion, AnimatePresence } from "framer-motion";
// import { fetchCategories } from "@/redux/slices/categorySlice";

// export default function ProductCategories() {
//   const router = useRouter();
//   const dispatch: AppDispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const { categories, status } = useSelector(
//     (state: RootState) => state.category
//   );
//   const itemsPerPage = 6;

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchCategories());
//     }
//   }, [dispatch, status]);

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
//       <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-6"
//           >
//             {/* Header Section */}
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
//                   className="pl-10 w-full md:w-64 lg:w-80"
//                 />
//               </div>
//             </div>

//             {/* Trending Categories */}
//             {trendingCategories.length > 0 && (
//               <div className="space-y-3">
//                 <h3 className="text-lg font-medium text-gray-700">
//                   Trending Now
//                 </h3>
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

//             {/* Main Categories Grid */}
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
//                       <span className="text-sm text-gray-500">
//                         {currentSlide + 1} of {totalSlides}
//                       </span>
//                       <button
//                         onClick={handlePrevious}
//                         disabled={currentSlide === 0}
//                         className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
//                         aria-label="Previous categories"
//                       >
//                         <ChevronLeft className="w-5 h-5" />
//                       </button>
//                       <button
//                         onClick={handleNext}
//                         disabled={currentSlide >= totalSlides - 1}
//                         className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
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
//                           onMouseEnter={() => setActiveCategory(category.name)}
//                           onMouseLeave={() => setActiveCategory(null)}
//                           onClick={() => goToCategory(category.name)}
//                         >
//                           <div className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 w-full h-full flex flex-col items-center">
//                             <div className="relative mb-4">
//                               <div className="w-16 h-16 mx-auto rounded-full bg-gray-50 flex items-center justify-center shadow-inner">
//                                 {category?.icon ? (
//                                   <div
//                                     className="w-12 h-12 bg-contain bg-center bg-no-repeat"
//                                     style={{
//                                       backgroundImage: `url(${category.icon})`,
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

//                             <AnimatePresence>
//                               {activeCategory === category.name && (
//                                 <motion.div
//                                   initial={{ opacity: 0 }}
//                                   animate={{ opacity: 1 }}
//                                   exit={{ opacity: 0 }}
//                                   className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 flex flex-col justify-center"
//                                   onClick={(e) => e.stopPropagation()}
//                                 >
//                                   <h4 className="font-medium text-center mb-3">
//                                     Subcategories
//                                   </h4>
//                                   <div className="space-y-2 max-h-40 overflow-y-auto">
//                                     {category?.subcategories?.length ? (
//                                       category.subcategories.map((sub) => (
//                                         <div
//                                           key={sub.id}
//                                           className="flex items-center justify-between text-sm hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
//                                           onClick={(e) => {
//                                             e.stopPropagation();
//                                             setIsLoading(true);
//                                             router.push(
//                                               `/category/${category.name.toLowerCase()}/${
//                                                 sub.name
//                                               }?id=${sub.id}`
//                                             );
//                                           }}
//                                         >
//                                           <span className="line-clamp-1">
//                                             {sub.name}
//                                           </span>
//                                           <ArrowRight className="w-4 h-4 text-gray-400" />
//                                         </div>
//                                       ))
//                                     ) : (
//                                       <p className="text-sm text-gray-500 text-center">
//                                         No subcategories
//                                       </p>
//                                     )}
//                                   </div>
//                                 </motion.div>
//                               )}
//                             </AnimatePresence>
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
//     </>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Search,
  ArrowRight,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingState from "@/app/components/loaders/LoadingState";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCategories } from "@/redux/slices/categorySlice";

export default function ProductCategories() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { categories, status } = useSelector(
    (state: RootState) => state.category
  );
  const itemsPerPage = 6;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trendingCategories = categories.filter((cat) => cat.trending);
  const totalSlides = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToCategory = (categoryName: string) => {
    setIsLoading(true);
    router.push(`/category/${categoryName.toLowerCase()}`);
  };

  const visibleCategories = filteredCategories.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage
  );

  return (
    <>
      {isLoading && <LoadingState />}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Header Section */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Shop by Category
                </h2>
                <p className="text-gray-500 mt-2">
                  Browse our wide range of product categories
                </p>
              </div>

              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64 lg:w-80"
                />
              </div>
            </div>

            {/* Trending Categories */}
            {trendingCategories.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-700">
                  Trending Now
                </h3>
                <div className="relative">
                  <div className="flex gap-3 py-2 overflow-x-auto scrollbar-hide">
                    {trendingCategories.map((category) => (
                      <motion.div
                        key={`trending-${category.id}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0"
                      >
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100"
                          onClick={() => goToCategory(category.name)}
                        >
                          <TrendingUp className="w-4 h-4 text-orange-500" />
                          <span className="text-orange-700">
                            {category.name}
                          </span>
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Main Categories Grid */}
            <div className="relative">
              {status === "loading" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="h-40 rounded-xl" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-700">
                      All Categories
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {currentSlide + 1} of {totalSlides}
                      </span>
                      <button
                        onClick={handlePrevious}
                        disabled={currentSlide === 0}
                        className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                        aria-label="Previous categories"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={currentSlide >= totalSlides - 1}
                        className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                        aria-label="Next categories"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
                    >
                      {visibleCategories.map((category) => (
                        <motion.div
                          key={category.id}
                          whileHover={{ y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          className="group cursor-pointer relative w-full"
                          onMouseEnter={() => setActiveCategory(category.name)}
                          onMouseLeave={() => setActiveCategory(null)}
                          onClick={() => goToCategory(category.name)}
                        >
                          <div className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 w-full h-full flex flex-col items-center">
                            <div className="relative mb-4">
                              <div className="w-16 h-16 mx-auto rounded-full bg-gray-50 flex items-center justify-center shadow-inner">
                                {category?.icon ? (
                                  <div
                                    className="w-full h-full rounded-full bg-contain bg-center bg-no-repeat"
                                    style={{
                                      backgroundImage: `url(${category.icon})`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                    }}
                                  />
                                ) : (
                                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                                )}
                              </div>
                            </div>

                            <div className="text-center space-y-1 w-full">
                              <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                                {category.name}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {category.itemCount || 0} products
                              </p>
                            </div>

                            <AnimatePresence>
                              {activeCategory === category.name && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  // className="absolute inset-0 z-10 bg-red-500/90 backdrop-blur-sm rounded-xl shadow-lg p-4 flex flex-col justify-center"
                                  className="absolute shadow-lg  bg-gray-50/55 backdrop-blur-sm rounded-xl py-4 px-3 flex flex-col justify-center"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="space-y-2 max-h-40 custom-scroll overflow-y-auto">
                                    {category?.subcategories?.length ? (
                                      category.subcategories.map((sub) => (
                                        <div
                                          key={sub.id}
                                          className="flex items-center justify-between text-sm hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setIsLoading(true);
                                            router.push(
                                              `/category/${category.name.toLowerCase()}/${
                                                sub.name
                                              }?id=${sub.id}`
                                            );
                                          }}
                                        >
                                          <span className="line-clamp-1">
                                            {sub.name}
                                          </span>
                                          <ArrowRight className="w-4 h-4 text-gray-400" />
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-sm text-gray-500 text-center">
                                        No subcategories
                                      </p>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
