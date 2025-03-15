// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Search,
//   Filter,
//   Grid2x2,
//   LayoutList,
//   ChevronRight,
// } from "lucide-react";
// import Link from "next/link";
// import { ProductCard } from "@/app/category/[category]/[subcategory]/subcategoryComponents/ProductCard copy";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { fetchProducts } from "@/redux/slices/productSlice";
// import { fetchCategories } from "@/redux/slices/categorySlice";

// export default function Subcategory() {
//   const [view, setView] = useState<"grid" | "list">("grid");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);

//   const { category, subcategory } = useParams();
//   const dispatch: AppDispatch = useDispatch();
//   const { categories } = useSelector((state: RootState) => state.category);
//   const { products } = useSelector((state: RootState) => state.product);

//   useEffect(() => {
//     dispatch(fetchProducts());
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   const decodedCategory = decodeURIComponent(String(category));
//   const decodedSub = decodeURIComponent(String(subcategory));

//   const data = categories.find((el) =>
//     el.subcategories.map(
//       (sub) => sub.name.toLowerCase() === decodedCategory.toLowerCase()
//     )
//   );

//   const product = products.filter(
//     (el) => el.category.toLowerCase() === decodedCategory.toLowerCase()
//   );

//   if (!data) {
//     return <div>Subcategory not found</div>;
//   }

//   return (
//     <div className=" min-h-screen">
//       <div className="">
//         <div className="mx-auto px-7">
//           <div className="flex items-center py-4 text-sm">
//             <Link
//               href="/category"
//               className="text-gray-500 hover:text-gray-900"
//             >
//               Categories
//             </Link>
//             <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
//             <Link
//               href={`/category/${category}`}
//               className="text-gray-500 hover:text-gray-900 capitalize"
//             >
//               {decodedCategory}
//             </Link>
//             <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
//             <span className="text-gray-900 capitalize">{decodedSub}</span>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.name}</h1>
//           <p className="text-gray-600">{data.description}</p>
//         </div>

//         {/* Search and Filters */}
//         <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <Input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 w-[300px]"
//               />
//             </div>

//             <Button
//               variant="outline"
//               onClick={() => setShowFilters(!showFilters)}
//               className="gap-2"
//             >
//               <Filter className="w-4 h-4" />
//               Filters
//             </Button>
//           </div>

//           <div className="flex items-center gap-2">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setView("grid")}
//               className={view === "grid" ? "text-blue-600" : "text-gray-600"}
//             >
//               <Grid2x2 className="w-5 h-5" />
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setView("list")}
//               className={view === "list" ? "text-blue-600" : "text-gray-600"}
//             >
//               <LayoutList className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>

//         {showFilters && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="bg-white rounded-lg shadow-sm p-6 mb-8"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//               {data?.filters.map((filter, idx) => (
//                 <div key={filter.id}>
//                   <h3 className="font-medium mb-3">{filter.name}</h3>
//                   <div className="space-y-2">
//                     {filter.options.map((option) => (
//                       <label
//                         key={option.id}
//                         className="flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer"
//                       >
//                         <input type="checkbox" className="rounded" />
//                         {option.option}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         <div
//           className={`grid ${
//             view === "grid"
//               ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
//               : "grid-cols-1"
//           } gap-6`}
//         >
//           {product.map((product) => (
//             <ProductCard key={product.id} product={product} view={view} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
