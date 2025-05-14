// "use client";

// import { useState, useEffect } from "react";
// import {
//   FiSearch,
//   FiFilter,
//   FiX,
//   FiChevronDown,
//   FiChevronUp,
//   FiStar,
//   FiShoppingCart,
//   FiHeart,
//   FiShare2,
//   FiClock,
//   FiEye,
// } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// const CategoryPage = () => {
//   // State for filters and UI
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const [sortOpen, setSortOpen] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
//   const [selectedSort, setSelectedSort] = useState("Most Popular");
//   const [quickViewProduct, setQuickViewProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Sample data - replace with your actual data
//   const category = {
//     name: "Smartphones",
//     description: "Latest smartphones with cutting-edge technology",
//     bannerImage: "/category-banners/smartphones.jpg",
//     subcategories: [
//       { name: "Flagship Phones", count: 42 },
//       { name: "Budget Phones", count: 38 },
//       { name: "Gaming Phones", count: 15 },
//       { name: "Camera Phones", count: 27 },
//     ],
//     filters: [
//       {
//         name: "Brand",
//         options: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"],
//       },
//       {
//         name: "Price",
//         options: ["Under $200", "$200 - $500", "$500 - $800", "Over $800"],
//       },
//       {
//         name: "Features",
//         options: ["5G", "Wireless Charging", "Waterproof", "High Refresh Rate"],
//       },
//     ],
//   };

//   const products = [
//     {
//       id: 1,
//       name: "Ultra Pro Max 5G",
//       brand: "Samsung",
//       price: 999.99,
//       discountPrice: 899.99,
//       rating: 4.8,
//       reviewCount: 124,
//       image: "/products/phone1.jpg",
//       colors: ["#000000", "#3B82F6", "#EF4444"],
//       isNew: true,
//       stock: 15,
//     },
//     {
//       id: 2,
//       name: "iPhone 14 Pro",
//       brand: "Apple",
//       price: 999.0,
//       rating: 4.9,
//       reviewCount: 215,
//       image: "/products/phone2.jpg",
//       colors: ["#000000", "#8B5CF6", "#EC4899"],
//       stock: 8,
//     },
//     {
//       id: 3,
//       name: "Pixel 7 Pro",
//       brand: "Google",
//       price: 899.0,
//       discountPrice: 799.0,
//       rating: 4.7,
//       reviewCount: 98,
//       image: "/products/phone3.jpg",
//       colors: ["#10B981", "#F59E0B"],
//       isNew: true,
//       stock: 22,
//     },
//     {
//       id: 4,
//       name: "Redmi Note 12",
//       brand: "Xiaomi",
//       price: 299.99,
//       rating: 4.5,
//       reviewCount: 76,
//       image: "/products/phone4.jpg",
//       colors: ["#EF4444", "#F59E0B"],
//       stock: 0, // Out of stock
//     },
//     {
//       id: 5,
//       name: "OnePlus 11",
//       brand: "OnePlus",
//       price: 699.99,
//       discountPrice: 649.99,
//       rating: 4.6,
//       reviewCount: 112,
//       image: "/products/phone5.jpg",
//       colors: ["#000000", "#3B82F6"],
//       stock: 14,
//     },
//     {
//       id: 6,
//       name: "Galaxy S23",
//       brand: "Samsung",
//       price: 799.99,
//       rating: 4.8,
//       reviewCount: 187,
//       image: "/products/phone6.jpg",
//       colors: ["#8B5CF6", "#EC4899"],
//       stock: 5,
//     },
//   ];

//   // Simulate loading
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   // Filter and sort functions
//   const toggleFilter = (filter: string) => {
//     setSelectedFilters((prev) =>
//       prev.includes(filter)
//         ? prev.filter((f) => f !== filter)
//         : [...prev, filter]
//     );
//   };

//   const applySort = (sortOption: string) => {
//     setSelectedSort(sortOption);
//     setSortOpen(false);
//     // Here you would implement actual sorting logic
//   };

//   const openQuickView = (product: any) => {
//     setQuickViewProduct(product);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Category Banner */}
//       <div className="relative h-64 md:h-80 lg:h-96 bg-gray-900 overflow-hidden">
//         <img
//           src={category.bannerImage}
//           alt={category.name}
//           className="w-full h-full object-cover opacity-70"
//         />
//         <div className="absolute inset-0 flex items-center justify-center text-center px-4">
//           <div className="max-w-4xl">
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
//               {category.name}
//             </h1>
//             <p className="text-lg md:text-xl text-gray-200">
//               {category.description}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Subcategories */}
//         <div className="mb-8 overflow-x-auto hide-scrollbar">
//           <div className="flex space-x-4 pb-2">
//             {category.subcategories.map((subcat, index) => (
//               <button
//                 key={index}
//                 className="flex-shrink-0 bg-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
//               >
//                 <span className="font-medium text-gray-900">{subcat.name}</span>
//                 <span className="ml-2 text-sm text-gray-500">
//                   ({subcat.count})
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Mobile Filter/Sort Bar */}
//         <div className="lg:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
//           <button
//             onClick={() => setMobileFiltersOpen(true)}
//             className="flex items-center text-gray-700"
//           >
//             <FiFilter className="mr-2" />
//             Filters
//           </button>
//           <button
//             onClick={() => setSortOpen(!sortOpen)}
//             className="flex items-center text-gray-700"
//           >
//             Sort: {selectedSort}
//             {sortOpen ? (
//               <FiChevronUp className="ml-2" />
//             ) : (
//               <FiChevronDown className="ml-2" />
//             )}
//           </button>
//         </div>

//         {/* Sort Dropdown (Mobile) */}
//         {sortOpen && (
//           <div className="lg:hidden mb-6 bg-white rounded-lg shadow-lg p-4">
//             <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
//             {[
//               "Most Popular",
//               "Newest",
//               "Price: Low to High",
//               "Price: High to Low",
//               "Highest Rated",
//             ].map((option) => (
//               <button
//                 key={option}
//                 onClick={() => applySort(option)}
//                 className={`w-full text-left py-2 px-3 rounded ${
//                   selectedSort === option
//                     ? "bg-blue-50 text-blue-600"
//                     : "text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Mobile Filters Panel */}
//         <AnimatePresence>
//           {mobileFiltersOpen && (
//             <motion.div
//               initial={{ opacity: 0, x: -300 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -300 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="fixed inset-0 z-50 lg:hidden"
//             >
//               <div
//                 className="absolute inset-0 bg-black/30"
//                 onClick={() => setMobileFiltersOpen(false)}
//               />
//               <div className="absolute inset-y-0 left-0 w-5/6 max-w-sm bg-white shadow-xl overflow-y-auto">
//                 <div className="p-4 border-b border-gray-200">
//                   <div className="flex justify-between items-center">
//                     <h2 className="text-lg font-medium text-gray-900">
//                       Filters
//                     </h2>
//                     <button onClick={() => setMobileFiltersOpen(false)}>
//                       <FiX className="h-6 w-6 text-gray-500" />
//                     </button>
//                   </div>
//                   {selectedFilters.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mt-3">
//                       {selectedFilters.map((filter) => (
//                         <span
//                           key={filter}
//                           className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
//                         >
//                           {filter}
//                           <button
//                             onClick={() => toggleFilter(filter)}
//                             className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500"
//                           >
//                             <FiX className="w-3 h-3" />
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-4">
//                   {category.filters.map((filter, index) => (
//                     <div key={index} className="mb-6">
//                       <h3 className="font-medium text-gray-900 mb-3">
//                         {filter.name}
//                       </h3>
//                       <div className="space-y-2">
//                         {filter.options.map((option, i) => (
//                           <div key={i} className="flex items-center">
//                             <input
//                               id={`mobile-filter-${index}-${i}`}
//                               name={`${filter.name}[]`}
//                               type="checkbox"
//                               checked={selectedFilters.includes(option)}
//                               onChange={() => toggleFilter(option)}
//                               className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                             />
//                             <label
//                               htmlFor={`mobile-filter-${index}-${i}`}
//                               className="ml-3 text-sm text-gray-600"
//                             >
//                               {option}
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
//                   <button
//                     onClick={() => setMobileFiltersOpen(false)}
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
//                   >
//                     Apply Filters
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div className="lg:grid lg:grid-cols-4 lg:gap-8">
//           {/* Filters - Desktop */}
//           <div className="hidden lg:block">
//             <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//                 {selectedFilters.length > 0 && (
//                   <button
//                     onClick={() => setSelectedFilters([])}
//                     className="text-sm text-blue-600 hover:text-blue-800"
//                   >
//                     Clear all
//                   </button>
//                 )}
//               </div>

//               {selectedFilters.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {selectedFilters.map((filter) => (
//                     <span
//                       key={filter}
//                       className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
//                     >
//                       {filter}
//                       <button
//                         onClick={() => toggleFilter(filter)}
//                         className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500"
//                       >
//                         <FiX className="w-3 h-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               )}

//               {category.filters.map((filter, index) => (
//                 <div key={index} className="mb-6">
//                   <h3 className="font-medium text-gray-900 mb-3">
//                     {filter.name}
//                   </h3>
//                   <div className="space-y-2">
//                     {filter.options.map((option, i) => (
//                       <div key={i} className="flex items-center">
//                         <input
//                           id={`filter-${index}-${i}`}
//                           name={`${filter.name}[]`}
//                           type="checkbox"
//                           checked={selectedFilters.includes(option)}
//                           onChange={() => toggleFilter(option)}
//                           className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                         />
//                         <label
//                           htmlFor={`filter-${index}-${i}`}
//                           className="ml-3 text-sm text-gray-600"
//                         >
//                           {option}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Product Grid */}
//           <div className="lg:col-span-3">
//             {/* Sort - Desktop */}
//             <div className="hidden lg:flex justify-between items-center mb-6">
//               <div className="text-sm text-gray-700">
//                 Showing <span className="font-medium">1-{products.length}</span>{" "}
//                 of <span className="font-medium">{products.length}</span>{" "}
//                 products
//               </div>
//               <div className="relative">
//                 <button
//                   onClick={() => setSortOpen(!sortOpen)}
//                   className="flex items-center text-sm text-gray-700 bg-white px-4 py-2 rounded-md shadow-sm border border-gray-300"
//                 >
//                   Sort: {selectedSort}
//                   {sortOpen ? (
//                     <FiChevronUp className="ml-2" />
//                   ) : (
//                     <FiChevronDown className="ml-2" />
//                   )}
//                 </button>
//                 {sortOpen && (
//                   <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10">
//                     <div className="py-1">
//                       {[
//                         "Most Popular",
//                         "Newest",
//                         "Price: Low to High",
//                         "Price: High to Low",
//                         "Highest Rated",
//                       ].map((option) => (
//                         <button
//                           key={option}
//                           onClick={() => applySort(option)}
//                           className={`block w-full text-left px-4 py-2 text-sm ${
//                             selectedSort === option
//                               ? "bg-blue-50 text-blue-600"
//                               : "text-gray-700 hover:bg-gray-50"
//                           }`}
//                         >
//                           {option}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Loading State */}
//             {loading ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(6)].map((_, index) => (
//                   <div
//                     key={index}
//                     className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
//                   >
//                     <div className="bg-gray-200 h-48 w-full"></div>
//                     <div className="p-4 space-y-3">
//                       <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                       <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {products.map((product) => (
//                   <motion.div
//                     key={product.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
//                   >
//                     {/* Product Image */}
//                     <div className="relative h-48 bg-gray-100 overflow-hidden">
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
//                       />
//                       {/* Badges */}
//                       <div className="absolute top-3 left-3 flex space-x-2">
//                         {product.isNew && (
//                           <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
//                             New
//                           </span>
//                         )}
//                         {product.discountPrice && (
//                           <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
//                             Sale
//                           </span>
//                         )}
//                       </div>
//                       {/* Quick Actions */}
//                       <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
//                           <FiHeart className="text-gray-600 hover:text-red-500" />
//                         </button>
//                         <button
//                           className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
//                           onClick={() => openQuickView(product)}
//                         >
//                           <FiEye className="text-gray-600 hover:text-blue-500" />
//                         </button>
//                       </div>
//                       {/* Stock Status */}
//                       {product.stock === 0 && (
//                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                           <span className="text-white font-medium bg-red-500 px-3 py-1 rounded-full">
//                             Out of Stock
//                           </span>
//                         </div>
//                       )}
//                       {product.stock > 0 && product.stock < 10 && (
//                         <div className="absolute bottom-3 left-3 right-3">
//                           <div className="bg-yellow-50 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded">
//                             Only {product.stock} left in stock
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Product Info */}
//                     <div className="p-4">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h3 className="font-medium text-gray-900 mb-1">
//                             {product.name}
//                           </h3>
//                           <p className="text-sm text-gray-500 mb-2">
//                             {product.brand}
//                           </p>
//                         </div>
//                         <div className="flex items-center">
//                           <FiStar className="text-yellow-400 fill-yellow-400" />
//                           <span className="ml-1 text-sm text-gray-600">
//                             {product.rating} ({product.reviewCount})
//                           </span>
//                         </div>
//                       </div>

//                       {/* Price */}
//                       <div className="mt-3">
//                         {product.discountPrice ? (
//                           <div className="flex items-center">
//                             <span className="text-lg font-bold text-gray-900">
//                               ${product.discountPrice.toFixed(2)}
//                             </span>
//                             <span className="ml-2 text-sm text-gray-500 line-through">
//                               ${product.price.toFixed(2)}
//                             </span>
//                           </div>
//                         ) : (
//                           <span className="text-lg font-bold text-gray-900">
//                             ${product.price.toFixed(2)}
//                           </span>
//                         )}
//                       </div>

//                       {/* Color Options */}
//                       <div className="mt-3 flex space-x-2">
//                         {product.colors.map((color, index) => (
//                           <button
//                             key={index}
//                             className="w-5 h-5 rounded-full border border-gray-200"
//                             style={{ backgroundColor: color }}
//                             aria-label={`Color option ${index + 1}`}
//                           />
//                         ))}
//                       </div>

//                       {/* Add to Cart */}
//                       <button
//                         disabled={product.stock === 0}
//                         className={`mt-4 w-full py-2 px-4 rounded-md flex items-center justify-center ${
//                           product.stock === 0
//                             ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                             : "bg-blue-600 hover:bg-blue-700 text-white"
//                         }`}
//                       >
//                         <FiShoppingCart className="mr-2" />
//                         {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}

//             {/* Pagination */}
//             <div className="mt-10 flex justify-center">
//               <nav className="flex items-center space-x-2">
//                 <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50">
//                   Previous
//                 </button>
//                 <button className="px-3 py-1 rounded bg-blue-600 text-white">
//                   1
//                 </button>
//                 <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
//                   2
//                 </button>
//                 <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
//                   3
//                 </button>
//                 <span className="px-2 text-gray-500">...</span>
//                 <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
//                   8
//                 </button>
//                 <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
//                   Next
//                 </button>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick View Modal */}
//       <AnimatePresence>
//         {quickViewProduct && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 overflow-y-auto"
//           >
//             <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//               <div
//                 className="fixed inset-0 transition-opacity"
//                 onClick={() => setQuickViewProduct(null)}
//               >
//                 <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//               </div>
//               <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
//                 &#8203;
//               </span>
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
//               >
//                 <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                   <div className="sm:flex sm:items-start">
//                     <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
//                       <div className="flex justify-between items-start">
//                         <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
//                           {quickViewProduct.name} sss
//                         </h3>
//                         <button
//                           onClick={() => setQuickViewProduct(null)}
//                           className="text-gray-400 hover:text-gray-500"
//                         >
//                           <FiX className="h-6 w-6" />
//                         </button>
//                       </div>
//                       <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center h-64">
//                           <img
//                             src={quickViewProduct.image}
//                             alt={quickViewProduct.name}
//                             className="max-h-full max-w-full object-contain"
//                           />
//                         </div>
//                         <div>
//                           <div className="flex items-center mb-2">
//                             <div className="flex items-center">
//                               {[...Array(5)].map((_, i) => (
//                                 <FiStar
//                                   key={i}
//                                   className={`${
//                                     i <
//                                     Math.floor((quickViewProduct as any).rating)
//                                       ? "text-yellow-400 fill-yellow-400"
//                                       : "text-gray-300"
//                                   }`}
//                                 />
//                               ))}
//                             </div>
//                             <span className="ml-1 text-sm text-gray-600">
//                               ({(quickViewProduct as any).reviewCount} reviews)
//                             </span>
//                           </div>
//                           <p className="text-gray-600 mb-4">
//                             {(quickViewProduct as any)?.description ||
//                               "Premium product with cutting-edge features"}
//                           </p>

//                           <div className="mb-4">
//                             {(quickViewProduct as any)?.discountPrice ? (
//                               <div className="flex items-center">
//                                 <span className="text-2xl font-bold text-gray-900">
//                                   $
//                                   {(
//                                     quickViewProduct as any
//                                   )?.discountPrice.toFixed(2)}
//                                 </span>
//                                 <span className="ml-2 text-lg text-gray-500 line-through">
//                                   ${(quickViewProduct as any)?.price.toFixed(2)}
//                                 </span>
//                               </div>
//                             ) : (
//                               <span className="text-2xl font-bold text-gray-900">
//                                 ${(quickViewProduct as any)?.price.toFixed(2)}
//                               </span>
//                             )}
//                           </div>

//                           <div className="mb-4">
//                             <h4 className="text-sm font-medium text-gray-900 mb-2">
//                               Color
//                             </h4>
//                             <div className="flex space-x-2">
//                               {(quickViewProduct as any)?.colors.map(
//                                 (color, index) => (
//                                   <button
//                                     key={index}
//                                     className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-blue-500"
//                                     style={{ backgroundColor: color }}
//                                     aria-label={`Color option ${index + 1}`}
//                                   />
//                                 )
//                               )}
//                             </div>
//                           </div>

//                           <div className="mb-4">
//                             <h4 className="text-sm font-medium text-gray-900 mb-2">
//                               Availability
//                             </h4>
//                             {(quickViewProduct as any)?.stock > 0 ? (
//                               <p className="text-green-600">
//                                 In Stock ({(quickViewProduct as any)?.stock}{" "}
//                                 available)
//                               </p>
//                             ) : (
//                               <p className="text-red-600">Out of Stock</p>
//                             )}
//                           </div>

//                           <div className="flex space-x-3 mt-6">
//                             <button
//                               disabled={(quickViewProduct as any)?.stock === 0}
//                               className={`flex-1 py-3 px-4 rounded-md flex items-center justify-center ${
//                                 (quickViewProduct as any)?.stock === 0
//                                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                                   : "bg-blue-600 hover:bg-blue-700 text-white"
//                               }`}
//                             >
//                               <FiShoppingCart className="mr-2" />
//                               Add to Cart
//                             </button>
//                             <button className="p-3 rounded-md border border-gray-300 hover:bg-gray-50">
//                               <FiHeart className="text-gray-600 hover:text-red-500" />
//                             </button>
//                             <button className="p-3 rounded-md border border-gray-300 hover:bg-gray-50">
//                               <FiShare2 className="text-gray-600 hover:text-blue-500" />
//                             </button>
//                           </div>

//                           <div className="mt-4 flex items-center text-sm text-gray-500">
//                             <FiClock className="mr-1" />
//                             <span>Usually ships in 2-3 business days</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default CategoryPage;

"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  X,
  Loader2,
  Check,
  AlertCircle,
  Move3d,
  Scan,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ARProductViewer({
  productName,
}: {
  productName: string;
}) {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [arActive, setArActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for WebXR/AR support
  useEffect(() => {
    const checkSupport = async () => {
      try {
        // Enhanced feature detection with better error handling
        if (!("xr" in navigator)) {
          setIsSupported(false);
          return;
        }

        const supported = await (navigator as any).xr?.isSessionSupported(
          "immersive-ar"
        );
        setIsSupported(!!supported);

        if (!supported) {
          setError("AR not supported on this device");
        }
      } catch (err) {
        console.error("AR support check failed:", err);
        setIsSupported(false);
        setError("Failed to check AR capabilities");
      }
    };

    checkSupport();
  }, []);

  const launchAR = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate AR loading (replace with actual AR implementation)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setArActive(true);
      toast.success("AR experience launched", {
        icon: "👁️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      setError("Failed to launch AR viewer");
      console.error(err);
      toast.error("Failed to launch AR", {
        icon: "⚠️",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exitAR = () => {
    setArActive(false);
    toast("Exited AR view", { icon: "👋" });
  };

  if (arActive) {
    return (
      <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-black/80 to-gray-900/80 text-white border-b border-gray-800">
          <div className="flex items-center gap-3">
            <Move3d className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-bold tracking-tight">
              Viewing {productName} in AR
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={exitAR}
            className="text-white hover:bg-white/10 hover:text-white rounded-full"
            aria-label="Exit AR view"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* AR Viewport Placeholder */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Grid pattern background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMCAwdjIwTTAgMTBoMjAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-20" />

            {/* Mock AR content */}
            <div className="relative z-10 w-full max-w-2xl mx-4">
              <div className="bg-white/5 backdrop-blur-lg border border-gray-800 rounded-xl p-6 text-center shadow-2xl shadow-blue-900/20">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Smartphone className="h-16 w-16 text-blue-400" />
                    <Scan className="absolute -bottom-2 -right-2 h-6 w-6 text-green-400 animate-pulse" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {productName} in Your Space
                </h3>
                <p className="text-white/80 mb-6 max-w-md mx-auto">
                  Move your device slowly and point at a flat surface to place
                  the product
                </p>

                <div className="relative">
                  <div className="animate-pulse bg-gradient-to-br from-blue-900/30 to-purple-900/30 h-64 rounded-xl flex items-center justify-center border-2 border-dashed border-white/20">
                    <p className="text-white/60 text-sm font-medium">
                      3D Product Model
                    </p>
                  </div>
                  <div className="absolute -inset-4 border border-blue-400/30 rounded-2xl pointer-events-none animate-[pulse_3s_ease-in-out_infinite]" />
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="secondary"
                    className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Check className="h-4 w-4" /> Place Product
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 text-white border-white/30 hover:bg-white/10 hover:text-white"
                  >
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    Change Color
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* AR Controls Footer */}
          <div className="absolute bottom-6 left-0 right-0">
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/30 hover:bg-white/10 gap-2"
              >
                <Move3d className="h-4 w-4" /> Move
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/30 hover:bg-white/10 gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
                  <path d="M16 2v4" />
                  <path d="M8 2v4" />
                  <path d="M3 10h5" />
                  <path d="M17.5 17.5 16 16.25V14" />
                  <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
                </svg>
                Rotate
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/30 hover:bg-white/10 gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="p-6 rounded-xl border-0 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Smartphone className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Preview {productName} in your space
            </h2>
          </div>

          <p className="text-gray-600 mb-6">
            See how this product looks in your room before you buy. Our
            augmented reality experience works on most modern smartphones with
            motion sensors.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {isSupported === null ? (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                ) : isSupported ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                )}
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-900">
                  {isSupported === null
                    ? "Checking AR support..."
                    : isSupported
                    ? "Your device supports AR"
                    : "Limited AR support"}
                </span>
                <span className="block text-sm text-gray-500 mt-1">
                  {isSupported === null
                    ? "Detecting device capabilities..."
                    : isSupported
                    ? "Ready for augmented reality experience"
                    : "Your device may have limited AR functionality"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-900">
                  Safe & Private
                </span>
                <span className="block text-sm text-gray-500 mt-1">
                  Camera access is only used for AR and never stored
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={launchAR}
              disabled={isSupported === false || isLoading}
              className="gap-2 px-6 py-3 rounded-lg transition-all hover:shadow-md"
              variant={isSupported ? "default" : "secondary"}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Launching AR...
                </>
              ) : (
                <>
                  <Smartphone className="h-4 w-4" />
                  {isSupported ? "View in AR" : "Try Anyway"}
                </>
              )}
            </Button>

            <Button variant="outline" className="gap-2 px-6 py-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              How it works
            </Button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full h-80 lg:h-auto rounded-xl overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center p-6">
              <div className="relative mb-6">
                <Smartphone className="h-16 w-16 text-gray-400" />
                <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2 text-center">
                Augmented Reality Preview
              </h3>
              <p className="text-gray-500 text-sm text-center max-w-xs">
                Point your camera at a flat surface to place {productName} in
                your space
              </p>
              <div className="absolute bottom-4 left-4 right-4 h-20 bg-white/80 rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="flex gap-2">
                  {[
                    "bg-blue-500",
                    "bg-amber-500",
                    "bg-emerald-500",
                    "bg-gray-500",
                  ].map((color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full ${color} border-2 border-white shadow-sm`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
