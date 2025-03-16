"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import fash_1 from "../../../public/category_Image/fash_1.png";
import electronics from "../../../public/category_Image/electronics.png";
import kitchen from "../../../public/category_Image/kitchen.png";
import beauty from "../../../public/category_Image/beauty.png";
import fitness from "../../../public/category_Image/fittness.png";
import gaming from "../../../public/category_Image/gaming.png";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Search, ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { fetchProducts } from "@/redux/slices/productSlice";
import LoadingState from "@/app/components/loaders/LoadingState";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCategories } from "@/redux/slices/categorySlice";

const defaultIcons: { [key: string]: any } = {
  Fashion: fash_1,
  Electronics: electronics,
  Kitchen: kitchen,
  Beauty: beauty,
  Fitness: fitness,
  Gaming: gaming,
};

export default function ProductCategories() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "featured">("grid");
  const { categories } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredCategories = categories.filter((cat) => cat.featured);
  const trendingCategories = categories.filter((cat) => cat.trending);

  return (
    <section className="py-16 bg-gradient-to-b from-whitte to-gray-5u0">
      <div className="container mx-auto rounded-lg px-4 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                Explore Categories
              </motion.h2>
              <p className="text-gray-600 max-w-2xl">
                Discover our wide range of products across different categories
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-[200px] md:w-[300px]"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setView(view === "grid" ? "featured" : "grid")}
              >
                {view === "grid" ? "Featured View" : "Grid View"}
              </Button>
            </div>
          </div>

          {/* Trending Categories Scroll */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-4 py-4 overflow-x-auto scrollbar-hide"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              {trendingCategories.map((category) => (
                <motion.div
                  key={`trending-${category.id}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-2 px-4 py-2 cursor-pointer"
                    onClick={() =>
                      router.push(`/category/${category.name.toLowerCase()}`)
                    }
                  >
                    <TrendingUp className="w-4 h-4" />
                    {category.name}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {view === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
              >
                {filteredCategories?.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    className="group cursor-pointer relative"
                    onMouseEnter={() => setActiveCategory(category.name)}
                    onMouseLeave={() => setActiveCategory(null)}
                    onClick={() =>
                      router.push(`/category/${category.name.toLowerCase()}`)
                    }
                  >
                    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 h-full">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity`}
                      />

                      <div className="relative space-y-4">
                        <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-sm">
                          <div className="relative w-full h-full">
                            <Image
                              src={
                                defaultIcons[category.name] ||
                                defaultIcons.Electronics ||
                                category.icon
                              }
                              alt={category.name}
                              fill
                              className=" w-full h-full rounded-full"
                            />
                          </div>
                        </div>

                        <div className="text-center space-y-2">
                          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {category.description}
                          </p>
                          <p className="text-xs text-gray-400">
                            {category.itemCount} items
                          </p>
                        </div>

                        {/* Subcategories Popup */}
                        <AnimatePresence>
                          {activeCategory === category.name && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute inset-0 shadow-lg bg-white/90 custom-scroll backdrop-blur-sm rounded-xl p-4 flex flex-col justify-center"
                            >
                              <div className="space-y-2">
                                {category?.subcategories?.map((sub, idx) => (
                                  <div
                                    key={idx}
                                    className="flex text-sm items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      router.push(
                                        `/category/${category.name.toLowerCase()}/${
                                          sub.name
                                        }`
                                      );
                                    }}
                                  >
                                    <span>{sub.name}</span>
                                    <ArrowRight className="w-4 h-4" />
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="featured"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {featuredCategories.map((category) => (
                  <motion.div
                    key={`featured-${category.id}`}
                    whileHover={{ scale: 1.02 }}
                    className="group cursor-pointer"
                    onClick={() =>
                      router.push(`/category/${category.name.toLowerCase()}`)
                    }
                  >
                    {/* Featured Category Card */}
                    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10`}
                      />
                      <div className="relative p-6 flex items-center gap-6">
                        <div className="w-24 h-24 relative rounded-xl overflow-hidden">
                          <Image
                            src={
                              defaultIcons[category.name] ||
                              defaultIcons.Electronics ||
                              category.icon
                            }
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold">
                              {category.name}
                            </h3>
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                          </div>
                          <p className="text-gray-600 text-[14px] mb-4">
                            {category.description}
                          </p>
                          <div className="flex items-center gap-4">
                            <Badge variant="secondary">
                              {category.itemCount} items
                            </Badge>
                            <Button
                              size="sm"
                              className="bg-orange-500/85 hover:bg-orange-600"
                            >
                              Explore <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { Search, ArrowRight, TrendingUp, Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { motion, AnimatePresence } from "framer-motion";
// import { fetchCategories } from "@/redux/slices/categorySlice";

// // Default category icons - you might want to move these to a separate config file
// import fash_1 from "@/public/category_Image/fash_1.png";
// import electronics from "@/public/category_Image/electronics.png";
// import kitchen from "@/public/category_Image/kitchen.png";
// import beauty from "@/public/category_Image/beauty.png";
// import fitness from "@/public/category_Image/fittness.png";
// import gaming from "@/public/category_Image/gaming.png";

// const defaultIcons: { [key: string]: any } = {
//   Fashion: fash_1,
//   Electronics: electronics,
//   Kitchen: kitchen,
//   Beauty: beauty,
//   Fitness: fitness,
//   Gaming: gaming,
// };

// export default function ProductCategories() {
//   const router = useRouter();
//   const dispatch: AppDispatch = useDispatch();
//   const { categories, status } = useSelector(
//     (state: RootState) => state.category
//   );
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [view, setView] = useState<"grid" | "featured">("grid");

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchCategories());
//     }
//   }, [dispatch, status]);

//   const filteredCategories = categories.filter((category) =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const featuredCategories = categories.filter((cat) => cat.featured);
//   const trendingCategories = categories.filter((cat) => cat.trending);

//   if (status === "loading") {
//     return <div>Loading...</div>; // You might want to use a proper loading component
//   }

//   return (
//     <section className="py-16 bg-gradient-to-b from-white to-gray-50">
//       <div className="container mx-auto rounded-lg px-4 py-6">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="space-y-8"
//         >
//           {/* Header Section */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//             <div className="space-y-4">
//               <motion.h2
//                 className="text-3xl md:text-4xl font-bold text-gray-900"
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//               >
//                 Explore Categories
//               </motion.h2>
//               <p className="text-gray-600 max-w-2xl">
//                 Discover our wide range of products across different categories
//               </p>
//             </div>

//             {/* Search and View Toggle */}
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   type="text"
//                   placeholder="Search categories..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 w-[200px] md:w-[300px]"
//                 />
//               </div>
//               <Button
//                 variant="outline"
//                 onClick={() => setView(view === "grid" ? "featured" : "grid")}
//               >
//                 {view === "grid" ? "Featured View" : "Grid View"}
//               </Button>
//             </div>
//           </div>

//           {/* Trending Categories Scroll */}
//           {trendingCategories.length > 0 && (
//             <div className="relative overflow-hidden">
//               <motion.div
//                 className="flex gap-4 py-4 overflow-x-auto scrollbar-hide"
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//               >
//                 {trendingCategories.map((category) => (
//                   <motion.div
//                     key={`trending-${category.name}`}
//                     whileHover={{ scale: 1.05 }}
//                     className="flex-shrink-0"
//                   >
//                     <Badge
//                       variant="secondary"
//                       className="flex items-center gap-2 px-4 py-2 cursor-pointer"
//                       onClick={() =>
//                         router.push(`/category/${category.name.toLowerCase()}`)
//                       }
//                     >
//                       <TrendingUp className="w-4 h-4" />
//                       {category.name}
//                     </Badge>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>
//           )}

//           {/* Main Categories Grid/Featured View */}
//           <AnimatePresence mode="wait">
//             {view === "grid" ? (
//               <motion.div
//                 key="grid"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
//               >
//                 {filteredCategories.map((category) => (
//                   <motion.div
//                     key={category.name}
//                     whileHover={{ scale: 1.05 }}
//                     className="group cursor-pointer relative"
//                     onMouseEnter={() => setActiveCategory(category.name)}
//                     onMouseLeave={() => setActiveCategory(null)}
//                     onClick={() =>
//                       router.push(`/category/${category.name.toLowerCase()}`)
//                     }
//                   >
//                     <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 h-full">
//                       <div
//                         className={`absolute inset-0 bg-gradient-to-br ${
//                           category.color || "from-blue-500 to-indigo-500"
//                         } opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity`}
//                       />

//                       <div className="relative space-y-4">
//                         <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-sm">
//                           <div className="relative w-full h-full">
//                             <Image
//                               src={
//                                 defaultIcons.Electronics ||
//                                 category.icon ||
//                                 defaultIcons[category.name]
//                               }
//                               alt={category.name}
//                               fill
//                               className="w-full h-full rounded-full object-cover"
//                             />
//                           </div>
//                         </div>

//                         <div className="text-center space-y-2">
//                           <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
//                             {category.name}
//                           </h3>
//                           <p className="text-sm text-gray-500 line-clamp-2">
//                             {category.description}
//                           </p>
//                           {/* Optional itemCount display */}
//                           <p className="text-xs text-gray-400">
//                             {category.subcategories?.length || 0} subcategories
//                           </p>
//                         </div>

//                         {/* Subcategories Popup */}
//                         <AnimatePresence>
//                           {activeCategory === category.name &&
//                             category.subcategories?.length > 0 && (
//                               <motion.div
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: 10 }}
//                                 className="absolute inset-0 bg-white/95 custom-scroll backdrop-blur-sm rounded-xl p-4 flex flex-col justify-center"
//                               >
//                                 <div className="space-y-2">
//                                   {category.subcategories.map((sub) => (
//                                     <div
//                                       key={sub.name}
//                                       className="flex text-sm items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         router.push(
//                                           `/category/${category.name.toLowerCase()}/${sub.name.toLowerCase()}`
//                                         );
//                                       }}
//                                     >
//                                       <span>{sub.name}</span>
//                                       <ArrowRight className="w-4 h-4" />
//                                     </div>
//                                   ))}
//                                 </div>
//                               </motion.div>
//                             )}
//                         </AnimatePresence>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="featured"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="grid grid-cols-1 md:grid-cols-2 gap-6"
//               >
//                 {featuredCategories.map((category) => (
//                   <motion.div
//                     key={`featured-${category.name}`}
//                     whileHover={{ scale: 1.02 }}
//                     className="group cursor-pointer"
//                     onClick={() =>
//                       router.push(`/category/${category.name.toLowerCase()}`)
//                     }
//                   >
//                     <div className="relative bg-white rounded-2xl shadow-md overflow-hidden">
//                       <div
//                         className={`absolute inset-0 bg-gradient-to-br ${
//                           category.color || "from-blue-500 to-indigo-500"
//                         } opacity-10`}
//                       />
//                       <div className="relative p-6 flex items-center gap-6">
//                         <div className="w-24 h-24 relative rounded-xl overflow-hidden">
//                           <Image
//                             src={
//                               defaultIcons.Electronics ||
//                               category.icon ||
//                               defaultIcons[category.name]
//                             }
//                             alt={category.name}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <h3 className="text-xl font-bold">
//                               {category.name}
//                             </h3>
//                             <Sparkles className="w-5 h-5 text-yellow-500" />
//                           </div>
//                           <p className="text-gray-600 mb-4">
//                             {category.description}
//                           </p>
//                           <div className="flex items-center gap-4">
//                             <Badge variant="secondary">
//                               {category.subcategories?.length || 0}{" "}
//                               subcategories
//                             </Badge>
//                             <Button size="sm">
//                               Explore <ArrowRight className="w-4 h-4 ml-2" />
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
