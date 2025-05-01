// // // /* eslint-disable react-hooks/exhaustive-deps */
// // "use client";
// // import React, { useState, useEffect, useRef } from "react";
// // import {
// //   FiSearch,
// //   FiX,
// //   FiChevronDown,
// //   FiMic,
// //   FiCamera,
// //   FiClock,
// // } from "react-icons/fi";
// // import { AiOutlineFire } from "react-icons/ai";
// // import { Input } from "@/components/ui/input";
// // import Image from "next/image";
// // import { Button } from "@/components/ui/button";
// // import { t } from "i18next";
// // import { SearchIcon } from "lucide-react";
// // import {
// //   Select,
// //   SelectTrigger,
// //   SelectValue,
// //   SelectContent,
// //   SelectGroup,
// //   SelectItem,
// // } from "@/components/ui/select";
// // // import ImageSearch from "../home-page/navbar/search/ImageSearch";
// // // import VoiceSearch from "../home-page/navbar/search/VoiceSearch";

// // const ModernEcommerceSearch = () => {
// //   // Search state
// //   const [query, setQuery] = useState("");
// //   const [suggestions, setSuggestions] = useState<any[]>([]);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [selectedCategory, setSelectedCategory] = useState("All Categories");
// //   const [showCategories, setShowCategories] = useState(false);

// //   // Enhanced features state
// //   const [recentSearches, setRecentSearches] = useState<string[]>([]);
// //   const [popularSearches, setPopularSearches] = useState<any[]>([]);
// //   const [showImageSearch, setShowImageSearch] = useState(false);
// //   const [isListening, setIsListening] = useState(false);
// //   const [filters, setFilters] = useState({
// //     priceRange: [0, 1000],
// //     location: "",
// //     rating: 0,
// //     inStock: false,
// //   });

// //   const searchRef = useRef(null);
// //   const recognitionRef = useRef(null);

// //   // Mock data - replace with real API calls
// //   const categories = [
// //     "All Categories",
// //     "Electronics",
// //     "Fashion",
// //     "Home & Garden",
// //     "Beauty",
// //     "Sports",
// //   ];

// //   // Load recent and popular searches from localStorage/API
// //   useEffect(() => {
// //     const storedRecent =
// //       JSON.parse(String(localStorage.getItem("recentSearches"))) || [];

// //     setRecentSearches(storedRecent);

// //     // Simulate fetching popular searches
// //     setPopularSearches([
// //       "iPhone 15",
// //       "Air Fryer",
// //       "Yoga Mat",
// //       "Blender",
// //       "Smart TV",
// //     ]);
// //   }, []);

// //   // Initialize voice recognition
// //   useEffect(() => {
// //     if ("webkitSpeechRecognition" in window) {
// //       const b = new window.webkitSpeechRecognition();
// //       recognitionRef.current = new window.webkitSpeechRecognition();
// //       (recognitionRef.current as any).continuous = false;
// //       (recognitionRef.current as any).interimResults = false;

// //       (recognitionRef.current as any).onresult = (event: {
// //         results: { transcript: any }[][];
// //       }) => {
// //         const transcript = event.results[0][0].transcript;
// //         setQuery(transcript);
// //         setIsListening(false);
// //         trackSearchAnalytics(transcript, "voice");
// //       };

// //       (recognitionRef.current as any).onerror = (event: { error: any }) => {
// //         console.error("Voice recognition error", event.error);
// //         setIsListening(false);
// //       };
// //     }
// //   }, []);

// //   // Debounced search suggestions
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       if (query.length > 1) {
// //         const mockProducts = [
// //           {
// //             id: 1,
// //             name: "Wireless Headphones",
// //             price: 99.99,
// //             image: "https://example.com/headphones.jpg",
// //             category: "Electronics",
// //           },
// //           {
// //             id: 2,
// //             name: "Smart Watch",
// //             price: 199.99,
// //             image: "https://example.com/smartwatch.jpg",
// //             category: "Electronics",
// //           },
// //           {
// //             id: 3,
// //             name: "Running Shoes",
// //             price: 89.99,
// //             image: "https://example.com/shoes.jpg",
// //             category: "Fashion",
// //           },
// //         ];
// //         const fetchSuggestions = async (query: string) => {
// //           // Simulate API call with mock data
// //           const filtered = mockProducts.filter(
// //             (product) =>
// //               product.name.toLowerCase().includes(query.toLowerCase()) &&
// //               (selectedCategory === "All Categories" ||
// //                 product.category === selectedCategory)
// //           );

// //           setSuggestions(filtered.slice(0, 5));
// //           setShowSuggestions(true);
// //         };

// //         fetchSuggestions(query);
// //         trackSearchAnalytics(query, "typed");
// //       } else {
// //         setSuggestions([]);
// //       }
// //     }, 300);

// //     return () => clearTimeout(timer);
// //   }, [query, selectedCategory]);

// //   // const fetchSuggestions = async (query) => {
// //   //   // Simulate API call with mock data
// //   //   const filtered = mockProducts.filter(
// //   //     (product) =>
// //   //       product.name.toLowerCase().includes(query.toLowerCase()) &&
// //   //       (selectedCategory === "All Categories" ||
// //   //         product.category === selectedCategory)
// //   //   );

// //   //   setSuggestions(filtered.slice(0, 5));
// //   //   setShowSuggestions(true);
// //   // };

// //   const handleSearch = (e: { preventDefault: any }) => {
// //     e.preventDefault();
// //     if (!query.trim()) return;

// //     // Save to recent searches
// //     const updatedRecent = [
// //       query,
// //       ...recentSearches.filter((item) => item !== query),
// //     ].slice(0, 5);
// //     setRecentSearches(updatedRecent);
// //     localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));

// //     // Implement actual search navigation here
// //     console.log("Searching for:", query, "with filters:", filters);
// //     setShowSuggestions(false);
// //   };

// //   const startVoiceSearch = () => {
// //     if (recognitionRef.current) {
// //       (recognitionRef.current as any)?.start();
// //       setIsListening(true);
// //     }
// //   };

// //   const handleImageUpload = (e: { target: { files: any[] } }) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       // Implement image search logic here
// //       console.log("Searching with image:", file.name);
// //       setQuery(`Similar to ${file.name.split(".")[0]}`);
// //     }
// //   };

// //   const trackSearchAnalytics = (term: string, method: string) => {
// //     console.log(`Tracking search: ${term} (${method})`);
// //     // Implement analytics tracking here
// //   };

// //   return (
// //     <div className="relative w-full max-w-4xl mx-auto" ref={searchRef}>
// //       <form
// //         onSubmit={handleSearch}
// //         className="flex shadow-lg rounded-xl overflow-hidden"
// //       >
// //         <div className="flex flex-col items-center">
// //           <div className="flex items-center focus-within:ring-1 focus-within:ring-orange-300 justify-between w-[600px] bg-white rounded-full shadow-md px-4 py-1 border border-gray-200">
// //             <Select
// //               value={selectedCategory}
// //               onValueChange={setSelectedCategory}
// //             >
// //               <SelectTrigger className=" space-x-1 focus:ring-0 focus:ring-orange-200 w-auto h-[30px] bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
// //                 <SelectValue className="" placeholder={t("All Products")} />
// //               </SelectTrigger>
// //               <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-lg">
// //                 {categories.map((el, idx) => (
// //                   <SelectGroup key={idx}>
// //                     <SelectItem value={el}>{el}</SelectItem>
// //                   </SelectGroup>
// //                 ))}
// //               </SelectContent>
// //             </Select>

// //             <div className="flex items-center flex-grow relative">
// //               <Input
// //                 className="w-full py-2 px-4 text-gray-700 bg-transparent border-none shadow-none focus-visible:ring-0 focus:ring-0 placeholder-gray-500"
// //                 placeholder={t("Search for products, brands, categories ...")}
// //                 value={query}
// //                 onChange={(e) => setQuery(e.target.value)}
// //                 onFocus={() => setShowSuggestions((val) => !val)}
// //                 onMouseEnter={() => setShowSuggestions((val) => !val)}
// //               />
// //               {/* <div className="flex items-center gap-3 absolute right-2 text-gray-500">
// //                 <ImageSearch
// //                   icon={icon}
// //                   showPop={showPop}
// //                   setShowPo={setShowPop}
// //                 />

// //                 <VoiceSearch setSearchQuery={setSearchQuery} />
// //               </div> */}
// //               <div className="absolute right-0 top-0 h-full flex items-center space-x-1 pr-2">
// //                 {query && (
// //                   <Button
// //                     type="button"
// //                     className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
// //                     onClick={() => setQuery("")}
// //                   >
// //                     <FiX size={18} />
// //                   </Button>
// //                 )}

// //                 <button
// //                   type="button"
// //                   className={` rounded-full hover:bg-gray-100 ${
// //                     isListening
// //                       ? "text-red-500 animate-pulse"
// //                       : "text-gray-500 hover:text-gray-700"
// //                   }`}
// //                   onClick={startVoiceSearch}
// //                   disabled={!recognitionRef.current}
// //                   title="Voice search"
// //                 >
// //                   <FiMic size={18} />
// //                 </button>

// //                 <label className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 cursor-pointer">
// //                   <Input
// //                     type="file"
// //                     accept="image/*"
// //                     className="hidden"
// //                     onChange={handleImageUpload}
// //                   />
// //                   <FiCamera size={18} />
// //                 </label>
// //               </div>
// //             </div>

// //             <Button
// //               onClick={() => console.log("Text Search:")}
// //               className="h-[30px] ml-2 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-[5px] rounded-full font-medium shadow-md transition duration-200"
// //               aria-label="Search"
// //             >
// //               <SearchIcon size={18} /> {t("search")}
// //             </Button>
// //           </div>
// //         </div>
// //       </form>

// //       {/* Suggestions dropdown */}
// //       {showSuggestions && (
// //         <div className="absolute z-30 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
// //           {/* Recent searches */}
// //           {recentSearches.length > 0 && query.length < 2 && (
// //             <div className="p-2 border-b">
// //               <div className="flex items-center px-3 py-2 text-gray-500">
// //                 <FiClock className="mr-2" />
// //                 <span className="font-medium">Recent searches</span>
// //               </div>
// //               {recentSearches.map((search, index) => (
// //                 <div
// //                   key={`recent-${index}`}
// //                   className="px-3 py-3 hover:bg-gray-50 cursor-pointer flex items-center"
// //                   onClick={() => {
// //                     setQuery(search);
// //                     handleSearch({ preventDefault: () => {} });
// //                   }}
// //                 >
// //                   <FiClock className="mr-3 text-gray-400" />
// //                   <span>{search}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           {/* Popular searches */}
// //           {popularSearches.length > 0 && query.length < 2 && (
// //             <div className="p-2 border-b">
// //               <div className="flex items-center px-3 py-2 text-gray-500">
// //                 <AiOutlineFire className="mr-2" />
// //                 <span className="font-medium">Popular right now</span>
// //               </div>
// //               {popularSearches.map((search, index) => (
// //                 <div
// //                   key={`popular-${index}`}
// //                   className="px-3 py-3 hover:bg-gray-50 cursor-pointer flex items-center"
// //                   onClick={() => {
// //                     setQuery(search);
// //                     handleSearch({ preventDefault: () => {} });
// //                   }}
// //                 >
// //                   <AiOutlineFire className="mr-3 text-gray-400" />
// //                   <span>{search}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           {/* Product suggestions */}
// //           {/* {suggestions.length > 0 && ( */}
// //           <div className="p-2">
// //             <h1>PRODUCT SUGGESTION</h1>
// //             {suggestions?.map((product: any) => (
// //               <div
// //                 key={product.id}
// //                 className="px-3 py-3 hover:bg-gray-50 cursor-pointer flex items-center"
// //                 onClick={() => {
// //                   setQuery(product.name);
// //                   handleSearch({ preventDefault: () => {} });
// //                 }}
// //               >
// //                 <Image
// //                   src={product.image}
// //                   alt={product.name}
// //                   width={200}
// //                   height={150}
// //                   className="w-10 h-10 rounded-md object-cover mr-3"
// //                 />
// //                 <div>
// //                   <div className="font-medium">{product.name}</div>
// //                   <div className="text-sm text-gray-600">
// //                     ${product.price.toFixed(2)}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           {/* )} */}

// //           {query.length > 1 && suggestions.length === 0 && (
// //             <div className="px-4 py-3 text-gray-500">
// //               No results found for &quot;{query}&quot;
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ModernEcommerceSearch;
// "use client";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   FiSearch,
//   FiX,
//   FiChevronDown,
//   FiMic,
//   FiCamera,
//   FiClock,
// } from "react-icons/fi";
// import { AiOutlineFire, AiOutlineStar } from "react-icons/ai";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { t } from "i18next";
// import { SearchIcon } from "lucide-react";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
// } from "@/components/ui/select";
// import { debounce } from "lodash";
// import { Skeleton } from "@/components/ui/skeleton";

// // Types
// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
//   rating?: number;
//   brand?: string;
// };

// type SearchSuggestion = {
//   type: "product" | "category" | "brand";
//   data: any;
// };

// const ModernEcommerceSearch = () => {
//   // Search state
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All Categories");
//   const [isLoading, setIsLoading] = useState(false);

//   // Enhanced features state
//   const [recentSearches, setRecentSearches] = useState<string[]>([]);
//   const [popularSearches, setPopularSearches] = useState<string[]>([]);
//   const [trendingCategories, setTrendingCategories] = useState<string[]>([]);
//   const [popularBrands, setPopularBrands] = useState<string[]>([]);
//   const [isListening, setIsListening] = useState(false);

//   const searchRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const recognitionRef = useRef<any>(null);

//   // Mock data - replace with real API calls
//   const categories = [
//     "All Categories",
//     "Electronics",
//     "Fashion",
//     "Home & Garden",
//     "Beauty",
//     "Sports",
//     "Toys",
//     "Books",
//   ];

//   const mockProducts: Product[] = [
//     {
//       id: 1,
//       name: "Wireless Headphones Pro X",
//       price: 199.99,
//       image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
//       category: "Electronics",
//       rating: 4.5,
//       brand: "SoundMaster",
//     },
//     {
//       id: 2,
//       name: "Smart Watch Series 5",
//       price: 299.99,
//       image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
//       category: "Electronics",
//       rating: 4.7,
//       brand: "TechWear",
//     },
//     {
//       id: 3,
//       name: "Running Shoes AirMax",
//       price: 129.99,
//       image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
//       category: "Fashion",
//       rating: 4.3,
//       brand: "SportRun",
//     },
//     {
//       id: 4,
//       name: "Organic Cotton T-Shirt",
//       price: 29.99,
//       image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
//       category: "Fashion",
//       rating: 4.2,
//       brand: "EcoWear",
//     },
//     {
//       id: 5,
//       name: "Stainless Steel Blender",
//       price: 89.99,
//       image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5",
//       category: "Home & Garden",
//       rating: 4.6,
//       brand: "KitchenPro",
//     },
//   ];

//   // Load recent and popular searches from localStorage/API
//   useEffect(() => {
//     const storedRecent = JSON.parse(
//       localStorage.getItem("recentSearches") || "[]"
//     );
//     setRecentSearches(storedRecent);

//     // Simulate fetching popular data
//     setPopularSearches([
//       "iPhone 15 Pro",
//       "Air Fryer XXL",
//       "Yoga Mat Premium",
//       "Blender Pro 2000",
//       'Smart TV 4K 65"',
//     ]);

//     setTrendingCategories([
//       "Gaming Laptops",
//       "Wireless Earbuds",
//       "Smart Home",
//       "Fitness Trackers",
//       "Organic Skincare",
//     ]);

//     setPopularBrands(["Apple", "Samsung", "Nike", "Sony", "Dyson"]);
//   }, []);

//   // Initialize voice recognition
//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window) {
//       recognitionRef.current = new (window as any).webkitSpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = "en-US";

//       recognitionRef.current.onresult = (event: any) => {
//         const transcript = event.results[0][0].transcript;
//         setQuery(transcript);
//         setIsListening(false);
//         trackSearchAnalytics(transcript, "voice");
//         handleSearch({ preventDefault: () => {} });
//       };

//       recognitionRef.current.onerror = (event: any) => {
//         console.error("Voice recognition error", event.error);
//         setIsListening(false);
//       };
//     }

//     // Close suggestions when clicking outside
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target as Node)
//       ) {
//         setShowSuggestions(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Debounced search suggestions with proper typing
//   const fetchSuggestions = useCallback(
//     debounce(async (query: string, category: string) => {
//       if (query.length < 1) {
//         setSuggestions([]);
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);

//       // Simulate API call delay
//       await new Promise((resolve) => setTimeout(resolve, 300));

//       try {
//         // Filter products
//         const filteredProducts = mockProducts.filter(
//           (product) =>
//             product.name.toLowerCase().includes(query.toLowerCase()) &&
//             (category === "All Categories" || product.category === category)
//         );

//         // Find matching categories
//         const matchedCategories = categories.filter(
//           (cat) =>
//             cat.toLowerCase().includes(query.toLowerCase()) &&
//             cat !== "All Categories"
//         );

//         // Find matching brands
//         const matchedBrands = popularBrands.filter((brand) =>
//           brand.toLowerCase().includes(query.toLowerCase())
//         );

//         // Combine all suggestions with type identifiers
//         const allSuggestions: SearchSuggestion[] = [
//           ...matchedCategories.map((cat) => ({ type: "category", data: cat })),
//           ...matchedBrands.map((brand) => ({ type: "brand", data: brand })),
//           ...filteredProducts.map((product) => ({
//             type: "product",
//             data: product,
//           })),
//         ];

//         setSuggestions(allSuggestions.slice(0, 8));
//       } catch (error) {
//         console.error("Error fetching suggestions:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }, 300),
//     []
//   );

//   useEffect(() => {
//     fetchSuggestions(query, selectedCategory);
//     return () => fetchSuggestions.cancel();
//   }, [query, selectedCategory, fetchSuggestions]);

//   const handleSearch = (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     // Save to recent searches
//     const updatedRecent = [
//       query,
//       ...recentSearches.filter(
//         (item) => item.toLowerCase() !== query.toLowerCase()
//       ),
//     ].slice(0, 5);
//     setRecentSearches(updatedRecent);
//     localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));

//     // Implement actual search navigation here
//     console.log("Searching for:", query, "in category:", selectedCategory);
//     setShowSuggestions(false);
//     inputRef.current?.blur();
//   };

//   const startVoiceSearch = () => {
//     if (isListening) {
//       recognitionRef.current?.stop();
//       setIsListening(false);
//       return;
//     }

//     if (recognitionRef.current) {
//       recognitionRef.current.start();
//       setIsListening(true);
//     } else {
//       console.warn("Voice recognition not supported");
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Implement image search logic here
//       console.log("Searching with image:", file.name);
//       setQuery(`Similar to ${file.name.split(".")[0]}`);
//       handleSearch({ preventDefault: () => {} });
//     }
//   };

//   const trackSearchAnalytics = (term: string, method: string) => {
//     console.log(`Tracking search: ${term} (${method})`);
//     // Implement analytics tracking here
//   };

//   const renderSuggestionIcon = (type: string) => {
//     switch (type) {
//       case "product":
//         return <FiSearch className="mr-3 text-gray-400" />;
//       case "category":
//         return <FiChevronDown className="mr-3 text-gray-400" />;
//       case "brand":
//         return <AiOutlineStar className="mr-3 text-gray-400" />;
//       default:
//         return <FiSearch className="mr-3 text-gray-400" />;
//     }
//   };

//   const renderSuggestionContent = (suggestion: SearchSuggestion) => {
//     switch (suggestion.type) {
//       case "product":
//         const product = suggestion.data as Product;
//         return (
//           <div className="flex items-center w-full">
//             <div className="relative w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div className="flex-grow min-w-0">
//               <div className="font-medium truncate">{product.name}</div>
//               <div className="flex items-center text-sm text-gray-600">
//                 <span>${product.price.toFixed(2)}</span>
//                 {product.rating && (
//                   <span className="ml-2 flex items-center">
//                     <AiOutlineStar className="text-yellow-400 mr-1" />
//                     {product.rating}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="text-xs text-gray-500 ml-2">{product.brand}</div>
//           </div>
//         );
//       case "category":
//         return (
//           <div className="flex items-center w-full">
//             <span className="font-medium">{suggestion.data}</span>
//             <span className="ml-auto text-xs text-gray-500">Category</span>
//           </div>
//         );
//       case "brand":
//         return (
//           <div className="flex items-center w-full">
//             <span className="font-medium">{suggestion.data}</span>
//             <span className="ml-auto text-xs text-gray-500">Brand</span>
//           </div>
//         );
//       default:
//         return <span>{suggestion.data}</span>;
//     }
//   };

//   return (
//     <div className="relative w-full max-w-4xl mx-auto" ref={searchRef}>
//       <form onSubmit={handleSearch} className="flex">
//         <div className="relative flex-grow">
//           <div className="flex items-center focus-within:ring-2 focus-within:ring-primary/50 justify-between w-full bg-white rounded-full shadow-sm px-4 py-1 border border-gray-200 hover:border-gray-300 transition-colors">
//             <Select
//               value={selectedCategory}
//               onValueChange={setSelectedCategory}
//             >
//               <SelectTrigger className="space-x-1 focus:ring-0 focus:ring-primary/20 w-auto h-[36px] bg-gray-50 text-gray-700 rounded-full text-sm hover:bg-gray-100 transition-colors">
//                 <SelectValue placeholder={t("All Products")} />
//               </SelectTrigger>
//               <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-lg max-h-[300px] overflow-y-auto">
//                 {categories.map((category, idx) => (
//                   <SelectGroup key={idx}>
//                     <SelectItem value={category}>{category}</SelectItem>
//                   </SelectGroup>
//                 ))}
//               </SelectContent>
//             </Select>

//             <div className="flex items-center flex-grow relative mx-2">
//               <Input
//                 ref={inputRef}
//                 className="w-full py-2 px-4 text-gray-800 bg-transparent border-none shadow-none focus-visible:ring-0 focus:ring-0 placeholder-gray-400 text-base"
//                 placeholder={t("Search for products, brands, categories...")}
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 onFocus={() => setShowSuggestions(true)}
//                 aria-autocomplete="list"
//                 aria-expanded={showSuggestions}
//                 aria-controls="search-suggestions"
//               />

//               <div className="absolute right-0 top-0 h-full flex items-center space-x-1 pr-2">
//                 {query && (
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="rounded-full text-gray-500 hover:text-gray-700"
//                     onClick={() => setQuery("")}
//                   >
//                     <FiX size={18} />
//                   </Button>
//                 )}

//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="icon"
//                   className={`rounded-full ${
//                     isListening
//                       ? "text-red-500 animate-pulse"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                   onClick={startVoiceSearch}
//                   disabled={!recognitionRef.current}
//                   title="Voice search"
//                 >
//                   <FiMic size={18} />
//                 </Button>

//                 <label className="rounded-full text-gray-500 hover:text-gray-700 cursor-pointer p-2">
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleImageUpload}
//                   />
//                   <FiCamera size={18} />
//                 </label>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="h-[36px] ml-2 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-[5px] rounded-full font-medium shadow-sm transition duration-200"
//               aria-label="Search"
//             >
//               <SearchIcon size={18} /> {t("search")}
//             </Button>
//           </div>

//           {/* Suggestions dropdown */}
//           {showSuggestions && (
//             <div
//               id="search-suggestions"
//               className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
//             >
//               {/* Recent searches */}
//               {recentSearches.length > 0 && query.length < 1 && (
//                 <div className="p-2 border-b">
//                   <div className="flex items-center px-3 py-2 text-gray-500">
//                     <FiClock className="mr-2" />
//                     <span className="font-medium">Recent searches</span>
//                     <button
//                       className="ml-auto text-xs text-gray-400 hover:text-gray-600"
//                       onClick={() => {
//                         setRecentSearches([]);
//                         localStorage.setItem(
//                           "recentSearches",
//                           JSON.stringify([])
//                         );
//                       }}
//                     >
//                       Clear
//                     </button>
//                   </div>
//                   {recentSearches.map((search, index) => (
//                     <div
//                       key={`recent-${index}`}
//                       className="px-3 py-3 hover:bg-gray-50 cursor-pointer flex items-center"
//                       onClick={() => {
//                         setQuery(search);
//                         inputRef.current?.focus();
//                       }}
//                     >
//                       <FiClock className="mr-3 text-gray-400" />
//                       <span>{search}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Popular searches */}
//               {popularSearches.length > 0 && query.length < 1 && (
//                 <div className="p-2 border-b">
//                   <div className="flex items-center px-3 py-2 text-gray-500">
//                     <AiOutlineFire className="mr-2" />
//                     <span className="font-medium">Popular right now</span>
//                   </div>
//                   {popularSearches.map((search, index) => (
//                     <div
//                       key={`popular-${index}`}
//                       className="px-3 py-3 hover:bg-gray-50 cursor-pointer flex items-center"
//                       onClick={() => {
//                         setQuery(search);
//                         inputRef.current?.focus();
//                       }}
//                     >
//                       <AiOutlineFire className="mr-3 text-gray-400" />
//                       <span>{search}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Trending categories */}
//               {trendingCategories.length > 0 && query.length < 1 && (
//                 <div className="p-2 border-b">
//                   <div className="flex items-center px-3 py-2 text-gray-500">
//                     <FiChevronDown className="mr-2" />
//                     <span className="font-medium">Trending categories</span>
//                   </div>
//                   <div className="flex flex-wrap gap-2 px-3 pb-3">
//                     {trendingCategories.map((category, index) => (
//                       <div
//                         key={`category-${index}`}
//                         className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
//                         onClick={() => {
//                           setQuery(category);
//                           setSelectedCategory("All Categories");
//                           inputRef.current?.focus();
//                         }}
//                       >
//                         {category}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Search suggestions */}
//               {query.length > 0 && (
//                 <div className="p-2">
//                   {isLoading ? (
//                     Array(4)
//                       .fill(0)
//                       .map((_, index) => (
//                         <div
//                           key={`loading-${index}`}
//                           className="px-3 py-3 flex items-center"
//                         >
//                           <Skeleton className="w-8 h-8 rounded mr-3" />
//                           <div className="flex-grow">
//                             <Skeleton className="h-4 w-3/4 mb-2" />
//                             <Skeleton className="h-3 w-1/2" />
//                           </div>
//                         </div>
//                       ))
//                   ) : suggestions.length > 0 ? (
//                     suggestions.map((suggestion, index) => (
//                       <div
//                         key={`suggestion-${index}`}
//                         className="px-3 py-3 hover:bg-gray-50 cursor-pointer flex items-center"
//                         onClick={() => {
//                           if (suggestion.type === "product") {
//                             setQuery(suggestion.data.name);
//                           } else {
//                             setQuery(suggestion.data);
//                           }
//                           handleSearch({ preventDefault: () => {} });
//                         }}
//                       >
//                         {renderSuggestionIcon(suggestion.type)}
//                         {renderSuggestionContent(suggestion)}
//                       </div>
//                     ))
//                   ) : (
//                     <div className="px-4 py-3 text-gray-500">
//                       No results found for &quot;{query}&quot;
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Quick actions */}
//               {query.length > 0 && (
//                 <div className="p-2 border-t bg-gray-50 flex justify-between">
//                   <button
//                     type="button"
//                     className="text-sm text-gray-500 hover:text-gray-700"
//                     onClick={() => {
//                       setQuery("");
//                       setShowSuggestions(false);
//                     }}
//                   >
//                     Clear search
//                   </button>
//                   <button
//                     type="submit"
//                     className="text-sm text-primary hover:text-primary/80 font-medium"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleSearch({ preventDefault: () => {} });
//                     }}
//                   >
//                     View all results
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ModernEcommerceSearch;
import React from "react";

export default function ModernEcommerceSearch() {
  return <div>ModernEcommerceSearch</div>;
}
