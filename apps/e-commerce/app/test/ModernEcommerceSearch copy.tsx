// // /* eslint-disable react-hooks/exhaustive-deps */
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import {
//   FiSearch,
//   FiX,
//   FiChevronDown,
//   FiMic,
//   FiCamera,
//   FiClock,
// } from "react-icons/fi";
// import { AiOutlineFire } from "react-icons/ai";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";

// const ModernEcommerceSearch = () => {
//   // Search state
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<any[]>([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All Categories");
//   const [showCategories, setShowCategories] = useState(false);

//   // Enhanced features state
//   const [recentSearches, setRecentSearches] = useState<string[]>([]);
//   const [popularSearches, setPopularSearches] = useState<any[]>([]);
//   const [showImageSearch, setShowImageSearch] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [filters, setFilters] = useState({
//     priceRange: [0, 1000],
//     location: "",
//     rating: 0,
//     inStock: false,
//   });

//   const searchRef = useRef(null);
//   const recognitionRef = useRef(null);

//   // Mock data - replace with real API calls
//   const categories = [
//     "All Categories",
//     "Electronics",
//     "Fashion",
//     "Home & Garden",
//     "Beauty",
//     "Sports",
//   ];

//   // Load recent and popular searches from localStorage/API
//   useEffect(() => {
//     const storedRecent =
//       JSON.parse(String(localStorage.getItem("recentSearches"))) || [];

//     setRecentSearches(storedRecent);

//     // Simulate fetching popular searches
//     setPopularSearches([
//       "iPhone 15",
//       "Air Fryer",
//       "Yoga Mat",
//       "Blender",
//       "Smart TV",
//     ]);
//   }, []);

//   // Initialize voice recognition
//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window) {
//       const b = new window.webkitSpeechRecognition();
//       recognitionRef.current = new window.webkitSpeechRecognition();
//       (recognitionRef.current as any).continuous = false;
//       (recognitionRef.current as any).interimResults = false;

//       (recognitionRef.current as any).onresult = (event: {
//         results: { transcript: any }[][];
//       }) => {
//         const transcript = event.results[0][0].transcript;
//         setQuery(transcript);
//         setIsListening(false);
//         trackSearchAnalytics(transcript, "voice");
//       };

//       (recognitionRef.current as any).onerror = (event: { error: any }) => {
//         console.error("Voice recognition error", event.error);
//         setIsListening(false);
//       };
//     }
//   }, []);

//   // Debounced search suggestions
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (query.length > 1) {
//         const mockProducts = [
//           {
//             id: 1,
//             name: "Wireless Headphones",
//             price: 99.99,
//             image: "https://example.com/headphones.jpg",
//             category: "Electronics",
//           },
//           {
//             id: 2,
//             name: "Smart Watch",
//             price: 199.99,
//             image: "https://example.com/smartwatch.jpg",
//             category: "Electronics",
//           },
//           {
//             id: 3,
//             name: "Running Shoes",
//             price: 89.99,
//             image: "https://example.com/shoes.jpg",
//             category: "Fashion",
//           },
//         ];
//         const fetchSuggestions = async (query: string) => {
//           // Simulate API call with mock data
//           const filtered = mockProducts.filter(
//             (product) =>
//               product.name.toLowerCase().includes(query.toLowerCase()) &&
//               (selectedCategory === "All Categories" ||
//                 product.category === selectedCategory)
//           );

//           setSuggestions(filtered.slice(0, 5));
//           setShowSuggestions(true);
//         };

//         fetchSuggestions(query);
//         trackSearchAnalytics(query, "typed");
//       } else {
//         setSuggestions([]);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [query, selectedCategory]);

//   // const fetchSuggestions = async (query) => {
//   //   // Simulate API call with mock data
//   //   const filtered = mockProducts.filter(
//   //     (product) =>
//   //       product.name.toLowerCase().includes(query.toLowerCase()) &&
//   //       (selectedCategory === "All Categories" ||
//   //         product.category === selectedCategory)
//   //   );

//   //   setSuggestions(filtered.slice(0, 5));
//   //   setShowSuggestions(true);
//   // };

//   const handleSearch = (e: { preventDefault: any }) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     // Save to recent searches
//     const updatedRecent = [
//       query,
//       ...recentSearches.filter((item) => item !== query),
//     ].slice(0, 5);
//     setRecentSearches(updatedRecent);
//     localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));

//     // Implement actual search navigation here
//     console.log("Searching for:", query, "with filters:", filters);
//     setShowSuggestions(false);
//   };

//   const startVoiceSearch = () => {
//     if (recognitionRef.current) {
//       (recognitionRef.current as any)?.start();
//       setIsListening(true);
//     }
//   };

//   const handleImageUpload = (e: { target: { files: any[] } }) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Implement image search logic here
//       console.log("Searching with image:", file.name);
//       setQuery(`Similar to ${file.name.split(".")[0]}`);
//     }
//   };

//   const trackSearchAnalytics = (term: string, method: string) => {
//     console.log(`Tracking search: ${term} (${method})`);
//     // Implement analytics tracking here
//   };

//   return (
//     <div className="relative w-full max-w-4xl mx-auto" ref={searchRef}>
//       <form
//         onSubmit={handleSearch}
//         className="flex shadow-lg rounded-xl overflow-hidden"
//       >
//         {/* Category dropdown */}
//         <div className="relative flex-shrink-0">
//           <button
//             type="button"
//             className="flex items-center h-14 px-4 bg-gray-50 hover:bg-gray-100 border-r border-gray-200 text-gray-700 font-medium"
//             onClick={() => setShowCategories(!showCategories)}
//           >
//             <span className="truncate max-w-[120px]">{selectedCategory}</span>
//             <FiChevronDown
//               className={`ml-2 transition-transform ${
//                 showCategories ? "rotate-180" : ""
//               }`}
//             />
//           </button>

//           {showCategories && (
//             <div className="absolute z-20 w-56 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl">
//               {categories.map((category) => (
//                 <div
//                   key={category}
//                   className={`px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center ${
//                     selectedCategory === category
//                       ? "bg-blue-50 text-blue-600"
//                       : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedCategory(category);
//                     setShowCategories(false);
//                   }}
//                 >
//                   {category}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Main search input */}
//         <div className="relative flex-1 bg-white">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onFocus={() => setShowSuggestions(true)}
//             className="w-full h-14 px-4 pr-20 focus:outline-none text-gray-800 placeholder-gray-400"
//             placeholder="Search for products, brands, or categories..."
//           />

//           {/* Search action buttons */}
//           <div className="absolute right-0 top-0 h-full flex items-center space-x-1 pr-2">
//             {query && (
//               <button
//                 type="button"
//                 className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
//                 onClick={() => setQuery("")}
//               >
//                 <FiX size={18} />
//               </button>
//             )}

//             <button
//               type="button"
//               className={`p-2 rounded-full hover:bg-gray-100 ${
//                 isListening
//                   ? "text-red-500 animate-pulse"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//               onClick={startVoiceSearch}
//               disabled={!recognitionRef.current}
//               title="Voice search"
//             >
//               <FiMic size={18} />
//             </button>

//             <label className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 cursor-pointer">
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageUpload}
//               />
//               <FiCamera size={18} />
//             </label>
//           </div>
//         </div>

//         {/* Search button */}
//         <button
//           type="submit"
//           className="h-14 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center"
//         >
//           <FiSearch className="mr-2" size={18} />
//           Search
//         </button>
//       </form>

//       {/* Advanced filters (initially hidden) */}
//       <div className="mt-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Price range
//             </label>
//             <div className="flex items-center space-x-2">
//               <Input
//                 type="range"
//                 min="0"
//                 max="1000"
//                 value={filters.priceRange[1]}
//                 onChange={(e) =>
//                   setFilters({
//                     ...filters,
//                     priceRange: [filters.priceRange[0], Number(e.target.value)],
//                   })
//                 }
//                 className="w-full"
//               />
//               <span className="text-sm text-gray-600">
//                 ${filters.priceRange[1]}
//               </span>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Location
//             </label>
//             <Input
//               type="text"
//               placeholder="Anywhere"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               value={filters.location}
//               onChange={(e) =>
//                 setFilters({ ...filters, location: e.target.value })
//               }
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Minimum rating
//             </label>
//             <select
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               value={filters.rating}
//               onChange={(e) =>
//                 setFilters({ ...filters, rating: parseInt(e.target.value) })
//               }
//             >
//               <option value="0">Any rating</option>
//               <option value="3">3+ stars</option>
//               <option value="4">4+ stars</option>
//               <option value="5">5 stars</option>
//             </select>
//           </div>
//           <div className="flex items-end">
//             <label className="flex items-center space-x-2">
//               <Input
//                 type="checkbox"
//                 className="rounded text-blue-600"
//                 checked={filters.inStock}
//                 onChange={(e) =>
//                   setFilters({ ...filters, inStock: e.target.checked })
//                 }
//               />
//               <span className="text-sm text-gray-700">In stock only</span>
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* Suggestions dropdown */}
//       {showSuggestions && (
//         <div className="absolute z-30 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
//           {/* Recent searches */}
//           {recentSearches.length > 0 && query.length < 2 && (
//             <div className="p-2 border-b">
//               <div className="flex items-center px-3 py-2 text-gray-500">
//                 <FiClock className="mr-2" />
//                 <span className="font-medium">Recent searches</span>
//               </div>
//               {recentSearches.map((search, index) => (
//                 <div
//                   key={`recent-${index}`}
//                   className="px-3 py-3 hover:bg-gray-50 cursor-pointer flex items-center"
//                   onClick={() => {
//                     setQuery(search);
//                     handleSearch({ preventDefault: () => {} });
//                   }}
//                 >
//                   <FiClock className="mr-3 text-gray-400" />
//                   <span>{search}</span>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Popular searches */}
//           {popularSearches.length > 0 && query.length < 2 && (
//             <div className="p-2 border-b">
//               <div className="flex items-center px-3 py-2 text-gray-500">
//                 <AiOutlineFire className="mr-2" />
//                 <span className="font-medium">Popular right now</span>
//               </div>
//               {popularSearches.map((search, index) => (
//                 <div
//                   key={`popular-${index}`}
//                   className="px-3 py-3 hover:bg-gray-50 cursor-pointer flex items-center"
//                   onClick={() => {
//                     setQuery(search);
//                     handleSearch({ preventDefault: () => {} });
//                   }}
//                 >
//                   <AiOutlineFire className="mr-3 text-gray-400" />
//                   <span>{search}</span>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Product suggestions */}
//           {suggestions.length > 0 && (
//             <div className="p-2">
//               {suggestions?.map((product: any) => (
//                 <div
//                   key={product.id}
//                   className="px-3 py-3 hover:bg-gray-50 cursor-pointer flex items-center"
//                   onClick={() => {
//                     setQuery(product.name);
//                     handleSearch({ preventDefault: () => {} });
//                   }}
//                 >
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     width={200}
//                     height={150}
//                     className="w-10 h-10 rounded-md object-cover mr-3"

//                     // onError={(e) =>
//                     //   (e.target.src = "https://via.placeholder.com/40")
//                     // }
//                   />
//                   <div>
//                     <div className="font-medium">{product.name}</div>
//                     <div className="text-sm text-gray-600">
//                       ${product.price.toFixed(2)}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* No results */}
//           {query.length > 1 && suggestions.length === 0 && (
//             <div className="px-4 py-3 text-gray-500">
//               No results found for &quot;{query}&quot;
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ModernEcommerceSearch;

import React from "react";

export default function ModernEcommerceSearch() {
  return <div>ModernEcommerceSearch copy</div>;
}
