// "use client";

// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Star,
//   ShoppingCart,
//   Search,
//   Grid,
//   List,
//   ChevronDown,
//   Eye,
//   Sliders,
//   Heart,
//   ArrowRight,
//   ArrowLeft,
// } from "lucide-react";
// import Image from "next/image";
// import LoadingState from "@/app/components/loaders/LoadingState";
// import { Input } from "@/components/ui/input";
// import { AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import useCategoryContex from "@/hooks/useCategoryContex";
// import { Subcategory } from "@/app/types/category";
// import { useRouter } from "next/navigation";

// export default function Category() {
//   const { push } = useRouter();
//   const {
//     isLoading,
//     gridView,
//     setGridView,
//     showFilters,
//     setShowFilters,
//     searchQuery,
//     setSearchQuery,
//     selectedBrands,
//     setSelectedBrands,
//     sortBy,
//     setSortBy,
//     category,
//     subFilter,
//     capitalizeWords,
//     handleAddToCart,
//     handleAddToFavourite,
//     filteredProducts,
//     handleRoute,
//     categoryData,
//     subCategoryRoute,
//     handleBuyNow,
//     items: favItems,
//   } = useCategoryContex();

//   return (
//     <>
//       {isLoading && <LoadingState />}

//       <div className="bg-gray-50 px-6 rounded-xl mx-auto container pt-6  pb-16 dark:bg-gray-900 min-h-screen">
//         <div className="mb-8">
//           <div className="flex items-center justify-between pb-6">
//             <h2 className="text-xl font-semibold">
//               Browse {capitalizeWords(decodeURIComponent(String(category)))} by
//               Category
//             </h2>
//             <Card className="text-gray-700 bg-gray-50 text-sm px-2 py-1 transition-all duration-150  rounded-md hover:text-gray-600">
//               <Link href="/category" className="flex items-center gap-3">
//                 <ArrowLeft size={17} />
//                 Back to Category
//               </Link>
//             </Card>
//           </div>
//           <div className="grid cursor-pointer grid-cols-2 md:grid-cols-4 gap-4">
//             {categoryData?.subcategories
//               .toReversed()
//               .map((sub: Subcategory) => (
//                 <div
//                   onClick={() => {
//                     subCategoryRoute(sub.name, sub.id);
//                   }}
//                   key={sub.name}
//                   className="group"
//                 >
//                   <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
//                           {sub.name}
//                         </h3>

//                         <p className="text-sm text-gray-500">
//                           {sub.itemCount} products
//                         </p>
//                       </div>
//                       <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>

//         <div className="sticky top-0 z-10 bg-white rounded-lg my-4 dark:bg-gray-800 shadow-md p-4">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div className="relative flex-grow md:max-w-md">
//                 <Search
//                   size={20}
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 />
//                 <Input
//                   type="text"
//                   placeholder="Search products..."
//                   className="pl-10 w-full focus-visible:ring-orange-500"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <div className="flex flex-wrap hidmden items-center gap-4">
//                 <div className="flex items-center gap-4 pr-4">
//                   <Button
//                     onClick={() => {
//                       setShowFilters((el) => !el);
//                     }}
//                     variant="outline"
//                     className="flex items-center gap-2"
//                   >
//                     <Sliders className="w-4 h-4" />
//                     Filters
//                   </Button>

//                   <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
//                     <button
//                       onClick={() => setGridView(true)}
//                       className={`p-2 rounded ${
//                         gridView
//                           ? "bg-white text-orange-500 dark:bg-gray-600 shadow"
//                           : ""
//                       }`}
//                     >
//                       <Grid className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => setGridView(false)}
//                       className={`p-2 rounded ${
//                         !gridView
//                           ? "bg-white text-orange-500 dark:bg-gray-600 shadow"
//                           : ""
//                       }`}
//                     >
//                       <List className="w-4 h-4" />
//                     </button>
//                   </div>

//                   <Select value={sortBy} onValueChange={(e) => setSortBy(e)}>
//                     <SelectTrigger className="flex w-52 focus:ring-orange-500">
//                       <SelectValue
//                         placeholder="Sort Product"
//                         className="flex gap-3"
//                       />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectItem value="featured">Featured</SelectItem>
//                         <SelectItem value="price-low">
//                           Price: Low to High
//                         </SelectItem>
//                         <SelectItem value="price-high">
//                           Price: High to Low
//                         </SelectItem>
//                         <SelectItem value="rating">Highest Rated</SelectItem>
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           className={`grid ${
//             showFilters ? "grid-cols-[1fr_3.5fr] gap-6" : ""
//           } `}
//         >
//           <AnimatePresence>
//             {showFilters && (
//               <div className="col-span-1 p-4 bg-white dark:bg-gray-800 rounded shadow-md">
//                 <h2 className="text-lg font-semibold mb-4">Filters</h2>
//                 <div className="flex flex-col gap-3">
//                   {subFilter?.filters.map((el) => (
//                     <details key={el.id} className="border-b pb-2">
//                       <summary className="flex items-center justify-between cursor-pointer">
//                         {el.name} <ChevronDown />
//                       </summary>
//                       {el.options.map((opt) => (
//                         <div
//                           key={opt.id}
//                           className="flex justify-between mt-2 text-sm text-gray-600"
//                         >
//                           <label
//                             key={opt.id}
//                             className="flex items-center gap-2 cursor-pointer"
//                           >
//                             <input
//                               type="checkbox"
//                               checked={selectedBrands.includes(opt.option)}
//                               onChange={(e) => {
//                                 if (e.target.checked) {
//                                   setSelectedBrands([
//                                     ...selectedBrands,
//                                     opt.option,
//                                   ]);
//                                 } else {
//                                   setSelectedBrands(
//                                     selectedBrands.filter(
//                                       (b) => b !== opt.option
//                                     )
//                                   );
//                                 }
//                               }}
//                               className="rounded border-gray-300"
//                             />
//                             <span>{opt.option}</span>
//                           </label>
//                         </div>
//                       ))}
//                     </details>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </AnimatePresence>
//           <div
//             className={` ${
//               !gridView
//                 ? "grid"
//                 : showFilters
//                 ? " grid grid-cols-3"
//                 : " grid grid-cols-4"
//             } gap-6`}
//           >
//             {filteredProducts?.map((product) => (
//               <Card
//                 className={`grid ${
//                   gridView
//                     ? " grid-cols-1 gap-3 h-auto"
//                     : "grid-cols-[1fr_2fr] h-[280px] p-4"
//                 }   hover:cursor-pointer gap-2  bg-white dark:bg-gray-800 shadow-lg rounded-xl`}
//                 key={product.id}
//               >
//                 <div
//                   className={`group ${
//                     gridView
//                       ? " h-[262px] rounded-b-none rounded-t-md"
//                       : "h-[96%] rounded-md"
//                   } bg-gray-200 relative dark:bg-gray-700 overflow-hidden hover:cursor-pointer`}
//                 >
//                   <Image
//                     className="h-full w-full hover:scale-110 transition-all duration-200 object-cover"
//                     src={
//                       product.productImages
//                         ? String(
//                             product.productImages.find(
//                               (el) => el.isMain === true
//                             )?.url
//                           )
//                         : ""
//                     }
//                     alt={product.name}
//                     width={500}
//                     height={300}
//                   />

//                   <Button
//                     onClick={() => {
//                       handleAddToFavourite(product.id);
//                     }}
//                     className="bg-gray-100/65 hover:bg-gray-100 absolute top-2 right-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//                   >
//                     <Heart
//                       fill={`${
//                         favItems.map((el) => el.product.id === product.id)
//                           .length > 0
//                           ? "oklch(70.4% 0.191 22.216)"
//                           : "white"
//                       }`}
//                       className={`w-6 h-6 text-red-400`}
//                     />
//                   </Button>
//                 </div>

//                 <CardContent
//                   className={`${
//                     gridView ? " p-4" : "p-2"
//                   } flex flex-col justify-between`}
//                 >
//                   <div
//                     className={`${gridView ? "space-y-[14px]" : "space-y-1"}`}
//                   >
//                     <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                       {product.name}
//                     </h2>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       {`${
//                         !gridView
//                           ? product.description
//                           : product.description.substring(0, 77) + "...."
//                       }`}
//                     </p>

//                     <div className="flex items-center gap-3 mt-2 text-lg font-semibold">
//                       <p className="text-gray-800 dark:text-gray-200">
//                         ${product.price}
//                       </p>
//                       {product.discount > 0 && (
//                         <p className="text-red-500 bg-red-100 dark:bg-red-900 px-2 py-1 text-xs rounded-md">
//                           -{product.discount}%
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
//                       {[...Array(5)].map((_, index) => (
//                         <Star
//                           key={index}
//                           className={`w-4 h-4 ${
//                             index < product.ratings
//                               ? "text-yellow-500"
//                               : "text-gray-400"
//                           }`}
//                         />
//                       ))}
//                       <span className="ml-1">({product.ratings})</span>
//                     </div>

//                     {!gridView && (
//                       <div
//                         className={`${
//                           gridView ? " grid-cols-1" : "grid-cols-3"
//                         } mt-2 text-sm grid `}
//                       >
//                         {product.specifications
//                           ?.slice(0, 6)
//                           .map((spec: any, idx: any) => (
//                             <div className="flex gap-1" key={idx}>
//                               <p className="font-semibold text-gray-900 dark:text-gray-100">
//                                 {spec.key}:
//                               </p>
//                               <p className="text-gray-700 dark:text-gray-300">
//                                 {spec.value}
//                               </p>
//                             </div>
//                           ))}
//                       </div>
//                     )}
//                   </div>

//                   <div
//                     className={`grid gap-2 ${
//                       !gridView ? " grid-cols-3" : " grid-cols-2"
//                     } mt-3`}
//                   >
//                     <Button
//                       className="w-full bg-orange-500 hover:bg-orange-600 flex items-center gap-2 shadow-md"
//                       onClick={() => handleAddToCart(product.id)}
//                     >
//                       {/* <ShoppingCart /> */}
//                       Add to Cart
//                     </Button>
//                     <Button
//                       className="w-full bg-orange-500 hover:bg-orange-600 flex items-center gap-2 shadow-md"
//                       onClick={() => handleBuyNow(product.id)}
//                     >
//                       Buy Now
//                     </Button>
//                     <Button
//                       className={`${
//                         !gridView ? "" : " col-span-2"
//                       } w-full flex items-center gap-2 border-gray-300 dark:border-gray-600 shadow-md`}
//                       variant="outline"
//                       onClick={() => handleRoute(product.name, product.id)}
//                     >
//                       <Eye /> Quick View
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  ShoppingCart,
  Search,
  Grid,
  List,
  ChevronDown,
  Eye,
  Sliders,
  Heart,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import LoadingState from "@/app/components/loaders/LoadingState";
import { Input } from "@/components/ui/input";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCategoryContex from "@/hooks/useCategoryContex";
import { Subcategory } from "@/app/types/category";
import { useRouter } from "next/navigation";

export default function Category() {
  const { push } = useRouter();
  const {
    isLoading,
    gridView,
    setGridView,
    showFilters,
    setShowFilters,
    searchQuery,
    setSearchQuery,
    selectedBrands,
    setSelectedBrands,
    sortBy,
    setSortBy,
    category,
    subFilter,
    capitalizeWords,
    handleAddToCart,
    handleAddToFavourite,
    filteredProducts,
    handleRoute,
    categoryData,
    subCategoryRoute,
    handleBuyNow,
    items: favItems,
  } = useCategoryContex();

  return (
    <>
      {isLoading && <LoadingState />}

      <div className="bg-gray-50 px-4 sm:px-6 rounded-xl mx-auto container pt-4 sm:pt-6 pb-8 sm:pb-16 dark:bg-gray-900 min-h-screen">
        {/* Category Navigation */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 sm:pb-6">
            <h2 className="text-[17px] sm:text-xl font-semibold">
              Browse {capitalizeWords(decodeURIComponent(String(category)))} by
              Category
            </h2>
            <Card className="text-gray-700 items-center bg-gray-50 text-xs sm:text-sm px-2 py-1 transition-all duration-150 rounded-md hover:text-gray-600 w-full sm:w-auto">
              <Link
                href="/category"
                className="flex items-center gap-2 sm:gap-3 mx-auto"
              >
                <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
                Back to Category
              </Link>
            </Card>
          </div>
          <div className=" overflow-x-scroll flex cursor-pointer  gap-3 sm:gap-4 hide-scrollbar">
            {categoryData?.subcategories
              .toReversed()
              .map((sub: Subcategory) => (
                <div
                  onClick={() => {
                    subCategoryRoute(sub.name, sub.id);
                  }}
                  key={sub.name}
                  className="group w-full"
                >
                  <div className="bg-white w-full rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="flex items-center justify-between h-full">
                      <div>
                        <h3 className="font-medium whitespace-nowrap text-sm sm:text-base text-gray-900 group-hover:text-blue-600">
                          {sub.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {sub.itemCount} products
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-600" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="sticky top-0 z-10 bg-white rounded-lg my-3 sm:my-4 dark:bg-gray-800 shadow-md p-3 sm:p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
              <div className="relative flex-grow">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-9 sm:pl-10 w-full focus-visible:ring-orange-500 text-sm sm:text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Button
                  onClick={() => setShowFilters((el) => !el)}
                  variant="outline"
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10 px-3"
                >
                  <Sliders className="w-3 h-3 sm:w-4 sm:h-4" />
                  Filters
                </Button>

                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                  <button
                    onClick={() => setGridView(true)}
                    className={`p-1 sm:p-2 rounded ${
                      gridView
                        ? "bg-white text-orange-500 dark:bg-gray-600 shadow"
                        : ""
                    }`}
                  >
                    <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => setGridView(false)}
                    className={`p-1 sm:p-2 rounded ${
                      !gridView
                        ? "bg-white text-orange-500 dark:bg-gray-600 shadow"
                        : ""
                    }`}
                  >
                    <List className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>

                <Select value={sortBy} onValueChange={(e) => setSortBy(e)}>
                  <SelectTrigger className="flex w-[140px] sm:w-52 focus:ring-orange-500 h-9 sm:h-10 text-xs sm:text-sm">
                    <SelectValue placeholder="Sort Product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6`}>
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <div className="sm:w-64 w-full p-3 sm:p-4 bg-white dark:bg-gray-800 rounded shadow-md">
                <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                  Filters
                </h2>
                <div className="flex flex-col gap-2 sm:gap-3">
                  {subFilter?.filters.map((el) => (
                    <details key={el.id} className="border-b pb-2">
                      <summary className="flex items-center justify-between cursor-pointer text-sm sm:text-base">
                        {el.name} <ChevronDown className="w-4 h-4" />
                      </summary>
                      {el.options.map((opt) => (
                        <div
                          key={opt.id}
                          className="flex justify-between mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600"
                        >
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(opt.option)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedBrands([
                                    ...selectedBrands,
                                    opt.option,
                                  ]);
                                } else {
                                  setSelectedBrands(
                                    selectedBrands.filter(
                                      (b) => b !== opt.option
                                    )
                                  );
                                }
                              }}
                              className="rounded border-gray-300"
                            />
                            <span>{opt.option}</span>
                          </label>
                        </div>
                      ))}
                    </details>
                  ))}
                </div>
              </div>
            )}
          </AnimatePresence>

          <div
            className={`grid ${
              !gridView
                ? " grid"
                : !showFilters
                ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : " sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            } gap-4 sm:gap-6 flex-1`}
          >
            {filteredProducts?.map((product) => (
              <Card
                key={product.id}
                className={`${
                  gridView
                    ? "flex flex-col h-full"
                    : "flex flex-col sm:flex-row h-auto sm:h-[280px]"
                } bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden`}
              >
                <div
                  className={`group ${
                    gridView
                      ? "aspect-square h-auto rounded-b-none rounded-t-md"
                      : "w-full sm:w-1/3 h-48 sm:h-full"
                  } bg-gray-200 relative dark:bg-gray-700 overflow-hidden hover:cursor-pointer`}
                >
                  <Image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    src={
                      product.productImages
                        ? String(
                            product.productImages.find(
                              (el) => el.isMain === true
                            )?.url
                          )
                        : ""
                    }
                    alt={product.name}
                    width={500}
                    height={500}
                  />

                  <Button
                    onClick={() => handleAddToFavourite(product.id)}
                    size="icon"
                    className="absolute top-2 right-2 bg-gray-100/65 hover:bg-gray-100 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8"
                  >
                    <Heart
                      fill={
                        favItems.some((el) => el.product.id === product.id)
                          ? "oklch(70.4% 0.191 22.216)"
                          : "white"
                      }
                      className="w-4 h-4 text-red-400"
                    />
                  </Button>
                </div>

                <CardContent
                  className={`${
                    gridView ? "p-3 sm:p-4" : "p-3 sm:p-4 sm:w-2/3"
                  } flex flex-col justify-between flex-1`}
                >
                  <div className="space-y-2 sm:space-y-3">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                      {product.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
                      <p className="text-gray-800 dark:text-gray-200">
                        ${product.price}
                      </p>
                      {product.discount > 0 && (
                        <p className="text-red-500 bg-red-100 dark:bg-red-900 px-1 sm:px-2 py-0.5 text-xs rounded-md">
                          -{product.discount}%
                        </p>
                      )}
                    </div>

                    <div className="flex gap-1 items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            index < product.ratings
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                      <span className="ml-1">({product.ratings})</span>
                    </div>

                    {!gridView && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 mt-2 text-xs sm:text-sm">
                        {product.specifications
                          ?.slice(0, 6)
                          .map((spec: any, idx: any) => (
                            <div className="flex gap-1" key={idx}>
                              <p className="font-semibold text-gray-900 dark:text-gray-100">
                                {spec.key}:
                              </p>
                              <p className="text-gray-700 dark:text-gray-300 truncate">
                                {spec.value}
                              </p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <div
                    className={`grid ${
                      gridView ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"
                    } gap-2 mt-3 sm:mt-4`}
                  >
                    <Button
                      size="sm"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-xs sm:text-sm h-8 sm:h-9"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-xs sm:text-sm h-8 sm:h-9"
                      onClick={() => handleBuyNow(product.id)}
                    >
                      Buy Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`${
                        gridView
                          ? "col-span-2 w-full"
                          : "sm:flex col-span-2 sm:col-span-1"
                      } w-full text-xs sm:text-sm h-8 sm:h-9`}
                      onClick={() => handleRoute(product.name, product.id)}
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
