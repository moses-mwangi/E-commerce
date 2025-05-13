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
// import { Card } from "@/components/ui/card";

// function ProductCategoriesMobile() {
//   const router = useRouter();
//   const dispatch: AppDispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const { categories, status } = useSelector(
//     (state: RootState) => state.category
//   );

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchCategories());
//     }
//   }, [dispatch, status]);

//   const goToCategory = (categoryName: string) => {
//     setIsLoading(true);
//     router.push(`/category/${categoryName.toLowerCase()}`);
//   };

//   return (
//     <>
//       {isLoading && <LoadingState />}
//       <section className=" bg-gradient-to-b from-white to-gray-50 sm:hidden">
//         <div className=" mx-auto py-6 px-4">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-1"
//           >
//             <div className="flex gap-6 items-center justify-between">
//               <h2 className="text-base font-semibold text-gray-900">
//                 Shop by Category
//               </h2>
//               <ChevronRight className="w-5 h-5" />
//             </div>

//             <div className="relative">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentSlide}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex gap-3 py-2 overflow-x-auto hide-scrollbar"
//                 >
//                   {categories?.map((category) => (
//                     <motion.div
//                       key={category.id}
//                       whileHover={{ y: -5 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="group cursor-pointer relative w-full"
//                       onMouseEnter={() => setActiveCategory(category.name)}
//                       onMouseLeave={() => setActiveCategory(null)}
//                       onClick={() => goToCategory(category.name)}
//                     >
//                       <Card className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 px-4 py-2 w-full h-full flex  gap-2 items-center">
//                         <div className="relative">
//                           <div className="w-16 h-16 mx-auto rounded-full bg-gray-50 flex items-center justify-center shadow-inner">
//                             {category?.icon ? (
//                               <div
//                                 className="w-full h-full rounded-full bg-contain bg-center bg-no-repeat"
//                                 style={{
//                                   backgroundImage: `url(${category.icon})`,
//                                   backgroundSize: "cover",
//                                   backgroundPosition: "center",
//                                 }}
//                               />
//                             ) : (
//                               <div className="w-12 h-12 bg-gray-200 rounded-full" />
//                             )}
//                           </div>
//                         </div>

//                         <div className=" w-full">
//                           <h3 className="font-medium text-[15px] text-gray-900 flex whitespace-nowrap group-hover:text-primary transition-colors line-clamp-2">
//                             {category.name}
//                           </h3>
//                           <p className="text-xs flex whitespace-nowrap text-gray-500">
//                             {category.itemCount || 0} products
//                           </p>
//                         </div>
//                       </Card>
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default function ProductCategories() {
//   const router = useRouter();
//   const dispatch: AppDispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
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
//       setItemsPerPage(1);
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
//       <ProductCategoriesMobile />
//       <section className="hidden sm:block sm:pt-7 sm:pb-0 py-4 sm:px-6 md:px-9 bg-white">
//         <div className="sm:bg-[#f4f4f4] mx-auto py-6 px-4 md:px-6 lg:px-8 rounded-2xl">
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

//             {/* Trending Categories */}
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
//                           onMouseEnter={() => setActiveCategory(category.name)}
//                           onMouseLeave={() => setActiveCategory(null)}
//                           onClick={() => goToCategory(category.name)}
//                         >
//                           <div className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 w-full h-full flex sm:flex-col items-center">
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

//                             <AnimatePresence>
//                               {activeCategory === category.name && (
//                                 <motion.div
//                                   initial={{ opacity: 0 }}
//                                   animate={{ opacity: 1 }}
//                                   exit={{ opacity: 0 }}
//                                   // className="absolute inset-0 z-10 bg-red-500/90 backdrop-blur-sm rounded-xl shadow-lg p-4 flex flex-col justify-center"
//                                   className="absolute shadow-lg  bg-gray-50/55 backdrop-blur-sm rounded-xl py-4 px-3 flex flex-col justify-center"
//                                   onClick={(e) => e.stopPropagation()}
//                                 >
//                                   <div className="space-y-2 max-h-40 custom-scroll overflow-y-auto">
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

import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import {
  FiClock,
  FiEye,
  FiHeart,
  FiSearch,
  FiShoppingCart,
  FiStar,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const CategoriesSection = () => {
  const dispatch: AppDispatch = useDispatch();

  const { categories: cat, status } = useSelector(
    (state: RootState) => state.category
  );

  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const recentlyReviewed = products;
  const recommendedProductss = products;

  // Demo data
  const categories = [
    { name: "Industrial Machinery", icon: "⚙️", count: 1245 },
    { name: "Consumer Electronics", icon: "📱", count: 876 },
    { name: "Jewelry & Watches", icon: "⌚", count: 532 },
    { name: "Apparel & Accessories", icon: "👔", count: 1567 },
    { name: "Home & Garden", icon: "🏠", count: 943 },
    { name: "Health & Beauty", icon: "💄", count: 721 },
    { name: "Sports & Outdoors", icon: "⚽", count: 612 },
    { name: "Toys & Games", icon: "🎮", count: 489 },
  ];

  const recommendedProducts = [
    {
      name: "Premium Cash Register POS",
      price: 265.99,
      discountPrice: 239.99,
      rating: 4.8,
      reviews: 124,
      image: "/demo/pos1.jpg",
    },
    {
      name: "Compact POS System",
      price: 200.0,
      discountPrice: 179.99,
      rating: 4.5,
      reviews: 87,
      image: "/demo/pos2.jpg",
    },
    {
      name: "Basic Cash Register",
      price: 130.0,
      discountPrice: 99.99,
      rating: 4.2,
      reviews: 56,
      image: "/demo/pos3.jpg",
    },
    {
      name: "Mobile POS Terminal",
      price: 349.99,
      discountPrice: 299.99,
      rating: 4.9,
      reviews: 215,
      image: "/demo/pos4.jpg",
    },
  ];

  return (
    <div className="gmax-w-7xl mx-auto px-4 sm:px-6 md:7 lg:px-9 py-8">
      {/* Categories Section */}
      <div className="mb-12 bg-[#f4f4f4] px-3 sm:px-6 py-3 sm:py-5 rounded-2xl">
        <h2 className=" text-lg sm:text-2xl md:text-2xl font-bold text-gray-900 mb-6">
          Shop by Category
        </h2>
        <div className="overflow-x-auto sm:overflow-x-hidden hide-scrollbar flex space-x-3 sm:space-x-0 sm:grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex gap-2 sm:gap-0 sm:flex-col items-center cursor-pointer border border-gray-100 hover:border-blue-200"
            >
              <span className="sm:text-3xl text-2xl sm:mb-2">
                {category.icon}
              </span>
              <div className="flex flex-col">
                <h3 className="font-medium text-[14px] sm:text-base text-gray-800 text-center">
                  {category.name}
                </h3>
                <span className="text-sm text-gray-500 mt-1 sm:text-center">
                  {category.count}+ items
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browsing History */}
      <div className="flex gap-3">
        <div className="mb-12 bg-[#f4f4f4] px-3 sm:px-6 py-3 sm:py-5 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Recently Viewed
            </h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyReviewed?.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-gray-100">
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-black"
                    style={{
                      backgroundImage: `url('${
                        item.productImages.find((el) => el.isMain === true)
                          ?.url || ""
                      }')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <span className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                    <FiHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500 flex items-center">
                      {/* <FiClock className="mr-1" /> {item.viewedAt} */}
                      <FiClock className="mr-1" /> 3 days ago
                    </span>
                    <button className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full flex items-center">
                      <FiShoppingCart className="mr-1" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12 bg-[#f4f4f4] px-3 sm:px-6 py-3 sm:py-5 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently searched
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProductss.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="relative h-48 bg-gray-100">
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-black"
                    style={{
                      backgroundImage: `url('${
                        product?.productImages.find((el) => el.isMain === true)
                          ?.url || ""
                      }')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {/* {Math.round((1 - product.discount / product.price) * 100)}% */}
                      {Math.round(product.discount)}% OFF
                    </span>
                  )}
                  <span className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                    <FiHeart className="text-gray-400 group-hover:text-red-500 cursor-pointer" />
                  </span>
                  <button className="absolute text-sm bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                    <FiShoppingCart className="mr-2" /> Quick Add
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={
                            i < Math.floor(product.ratings)
                              ? "fill-current"
                              : ""
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center">
                    {product.discount ? (
                      <>
                        <span className="text-lg font-bold text-gray-900">
                          {(
                            product.price -
                            (product.discount / 100) * product.price
                          ).toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Virtual Reality Showroom */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Virtual Reality Showroom</h2>
          <p className="text-lg mb-6">
            Experience our products in immersive 3D before you buy. Put on your
            VR headset and explore!
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center">
              <FiEye className="mr-2" /> View in VR
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
