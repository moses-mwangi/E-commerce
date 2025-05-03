"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiSearch, FiX, FiChevronDown, FiMic, FiClock } from "react-icons/fi";
import { AiOutlineFire, AiOutlineStar } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { t } from "i18next";
import { SearchIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { debounce } from "lodash-es";
import { Skeleton } from "@/components/ui/skeleton";
import ImageSearchPopup from "./ImageSearchPopUp";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { capitalizeWords, Product } from "../types/products";
import { Category } from "../types/category";
import { string } from "zod";
import useSearch from "./useSearch";

type SearchSuggestion = {
  type: "product" | "category" | "brand" | "recent" | "popular" | string;
  data: Product | Category | object | string;
};

type SearchResult = {
  products: Partial<Product>[];
  categories: Category[];
  brands: string[];
};

const ModernEcommerceSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { categories } = useSelector((state: RootState) => state.category);
  const { products, status } = useSelector((state: RootState) => state.product);

  const dispatch: AppDispatch = useDispatch();

  const manipulatedCategory = [
    "All Categories",
    ...categories.map((el) => el.name),
  ];

  // Enhanced features state
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [trendingCategories, setTrendingCategories] = useState<string[]>([]);
  const [popularBrands, setPopularBrands] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isInitialLoad) {
      dispatch(fetchCategories());
      dispatch(fetchProducts());
      setIsInitialLoad(false);
    }
  }, [dispatch, isInitialLoad, setIsInitialLoad]);

  useEffect(() => {
    const storedRecent = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecentSearches(storedRecent);

    setPopularSearches([
      "iPhone 15 Pro",
      "Air Fryer XXL",
      "Yoga Mat Premium",
      "Blender Pro 2000",
      'Smart TV 4K 65"',
    ]);

    setTrendingCategories([
      "Gaming Laptops",
      "Wireless Earbuds",
      "Smart Home",
      "Fitness Trackers",
      "Organic Skincare",
    ]);

    setPopularBrands(products?.map((el) => String(el.brand)));
  }, [products]);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        handleSearch({ preventDefault: () => {} });
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Voice recognition error", event.error);
        setIsListening(false);
      };
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterProducts = useCallback(
    (query: string, category: string) => {
      return products.filter(
        (product) =>
          product.name?.toLowerCase().includes(query?.toLowerCase()) ||
          product.subCategory?.toLowerCase().includes(query.toLowerCase()) ||
          (product.description?.toLowerCase().includes(query.toLowerCase()) &&
            (category === "All Categories" ||
              product.category.toLowerCase() === category.toLowerCase()))
      );
    },
    [products]
  );

  const filterCategories = useCallback(
    (query: string) => {
      return categories.filter(
        (cat) =>
          (cat.name !== "All Categories" &&
            cat.name?.toLowerCase().includes(query.toLowerCase())) ||
          cat.slug?.toLowerCase().includes(query.toLowerCase()) ||
          cat.subcategories.some(
            (el) =>
              el.name.toLowerCase().includes(query.toLowerCase()) ||
              cat.slug?.toLowerCase().includes(query.toLowerCase())
          )
      );
    },
    [categories]
  );

  const filterBrands = useCallback(
    (query: string) => {
      return popularBrands.filter((brand) =>
        brand.toLowerCase().includes(query.toLowerCase())
      );
    },
    [popularBrands]
  );

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string, category: string) => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const filteredProducts = filterProducts(query, category);
        const matchedCategories = filterCategories(query);
        const matchedBrands = filterBrands(query);

        const newSuggestions: SearchSuggestion[] = [
          ...(matchedCategories ?? []).map((cat: any) => ({
            type: "category",
            data: cat,
          })),
          ...(matchedBrands ?? []).map((brand: any) => ({
            type: "brand",
            data: brand,
          })),

          ...filteredProducts.map((product) => ({
            type: "product",
            data: product,
          })),
        ];

        setSuggestions(newSuggestions.slice(0, 8));
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 200),
    [filterProducts, filterCategories, filterBrands]
  );

  useEffect(() => {
    // if (query.trim()) {
    if (query) {
      debouncedSearch(query, selectedCategory);
    } else {
      setSuggestions([]);
    }

    return () => debouncedSearch.cancel();
  }, [query, selectedCategory, debouncedSearch]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!query.trim()) {
      setShowSuggestions(false);
      return;
    }

    // Save to recent searches
    const updatedRecent = [
      query,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== query.toLowerCase()
      ),
    ].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));

    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const startVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    } else {
      console.warn("Voice recognition not supported");
    }
  };

  const renderSuggestionIcon = (type: string) => {
    switch (type) {
      case "product":
        return <FiSearch className="mr-3 text-gray-400" />;
      case "category":
        return <FiChevronDown className="mr-3 text-gray-400" />;
      case "brand":
        return <AiOutlineStar className="mr-3 text-gray-400" />;
      case "recent":
        return <FiClock className="mr-3 text-gray-400" />;
      case "popular":
        return <AiOutlineFire className="mr-3 text-gray-400" />;
      default:
        return <FiSearch className="mr-3 text-gray-400" />;
    }
  };

  const renderSuggestionContent = (suggestion: SearchSuggestion) => {
    switch (suggestion.type) {
      case "product":
        const product = suggestion.data as Product;
        return (
          <div className="flex items-center w-full">
            <div className="relative w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
              <Image
                src={String(
                  product.productImages?.find((el) => el.isMain === true)
                    ?.url || "/placeholder-product.jpg"
                )}
                alt={product.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="flex-grow min-w-0">
              <div className="font-medium truncate">{product.name}</div>
              <div className="flex items-center text-sm text-gray-600">
                <span>${product.price?.toFixed(2)}</span>
                {product.ratings && (
                  <span className="ml-2 flex items-center">
                    <AiOutlineStar className="text-yellow-400 mr-1" />
                    {product.ratings}
                  </span>
                )}
              </div>
            </div>
            {product.brand && (
              <div className="text-xs text-gray-500 ml-2">{product.brand}</div>
            )}
          </div>
        );
      case "category":
        const category = suggestion.data as Category;
        return (
          <div className="flex items-center w-full">
            <span className="font-medium">
              {capitalizeWords(category.name)}
            </span>
            <span className="ml-auto text-xs text-gray-500">Category</span>
          </div>
        );
      case "brand":
        return (
          <div className="flex items-center w-full">
            <span className="font-medium">
              {capitalizeWords(suggestion.data as string)}
            </span>
            <span className="ml-auto text-xs text-gray-500">Brand</span>
          </div>
        );
      case "recent":
      case "popular":
        return <span className="font-medium">{suggestion.data as string}</span>;
      default:
        return <span>{suggestion.data as string}</span>;
    }
  };

  return (
    <div className="relative w-[600px]" ref={searchRef}>
      <form onSubmit={handleSearch} className="flex">
        <div className="relative flex-grow">
          <div className="flex items-center focus-within:ring-1 focus-within:ring-orange-400/70 justify-between w-full bg-white rounded-full shadow-sm ggpl-4 px-[8px] py-1 border border-gray-200 hover:border-gray-300 transition-colors">
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
                if (query) {
                  debouncedSearch(query, value);
                }
              }}
            >
              <SelectTrigger className="space-x-1 focus:ring-0 focus:ring-primary/20 w-auto h-[32px] bg-gray-50 text-gray-700 rounded-full text-sm hover:bg-gray-100 transition-colors">
                <SelectValue placeholder={t("All Products")} />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-lg max-h-[300px] overflow-y-auto">
                {manipulatedCategory?.map((category, idx) => (
                  <SelectGroup key={idx}>
                    <SelectItem value={category}>
                      {capitalizeWords(category)}
                    </SelectItem>
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center flex-grow relative">
              <Input
                ref={inputRef}
                className="w-full py-2 px-3 text-gray-800 bg-transparent border-none shadow-none focus-visible:ring-0 focus:ring-0 placeholder-gray-400 text-base"
                placeholder={t("Search for products, brands, categories...")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                aria-autocomplete="list"
                aria-expanded={showSuggestions}
                aria-controls="search-suggestions"
              />

              <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                {query && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                  >
                    <FiX size={18} />
                  </Button>
                )}

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${
                    isListening
                      ? "text-red-500 animate-pulse"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={startVoiceSearch}
                  disabled={!recognitionRef.current}
                  title="Voice search"
                >
                  <FiMic size={18} />
                </Button>
                {/* <ImageSearchPopup onImageUpload={handleImageUpload} /> */}
                <ImageSearchPopup />
              </div>
            </div>

            <Button
              type="submit"
              className="h-[30px] flex items-center gap-2 bg-orange-500 hover:bg-orange-600/90 text-white px-5 py-[2px] rounded-full font-medium shadow-sm transition duration-200"
              aria-label="Search"
              disabled={status === "loading"}
            >
              <SearchIcon size={18} /> {t("search")}
            </Button>
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && (
            <div
              id="search-suggestions"
              className="absolute z-30 overflow-y-auto custom-scroll rounded-tl-sm max-h-[70svh] w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg"
            >
              {/* Recent searches */}
              {recentSearches.length > 0 && query.length < 1 && (
                <div className="p-2 border-b">
                  <div className="flex items-center px-3 py-2 text-gray-500">
                    <FiClock className="mr-2" />
                    <span className="font-medium">Recent searches</span>
                    <button
                      className="ml-auto text-xs text-gray-400 hover:text-gray-600"
                      onClick={() => {
                        setRecentSearches([]);
                        localStorage.setItem(
                          "recentSearches",
                          JSON.stringify([])
                        );
                      }}
                    >
                      Clear
                    </button>
                  </div>
                  {recentSearches.map((search, index) => (
                    <div
                      key={`recent-${index}`}
                      className="px-3 py-3 hover:bg-gray-50 cursor-pointer flex items-center"
                      onClick={() => {
                        setQuery(search);
                        inputRef.current?.focus();
                        handleSearch({ preventDefault: () => {} });
                      }}
                    >
                      <FiClock className="mr-3 text-gray-400" />
                      <span>{search}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Popular searches */}
              {popularSearches.length > 0 && query.length < 1 && (
                <div className="p-2 border-b">
                  <div className="flex items-center px-3 py-2 text-gray-500">
                    <AiOutlineFire className="mr-2" />
                    <span className="font-medium">Popular right now</span>
                  </div>
                  {popularSearches.map((search, index) => (
                    <div
                      key={`popular-${index}`}
                      className="px-3 py-3 hover:bg-gray-50 cursor-pointer flex items-center"
                      onClick={() => {
                        setQuery(search);
                        inputRef.current?.focus();
                        handleSearch({ preventDefault: () => {} });
                      }}
                    >
                      <AiOutlineFire className="mr-3 text-gray-400" />
                      <span>{search}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Trending categories */}
              {trendingCategories.length > 0 && query.length < 1 && (
                <div className="p-2 border-b">
                  <div className="flex items-center px-3 py-2 text-gray-500">
                    <FiChevronDown className="mr-2" />
                    <span className="font-medium">Trending categories</span>
                  </div>
                  <div className="flex flex-wrap gap-2 px-3 pb-3">
                    {trendingCategories.map((category, index) => (
                      <div
                        key={`category-${index}`}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
                        onClick={() => {
                          setQuery(category);
                          setSelectedCategory("All Categories");
                          inputRef.current?.focus();
                          handleSearch({ preventDefault: () => {} });
                        }}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Search suggestions */}
              {query.length > 0 && (
                <div className="p-2">
                  {isLoading ? (
                    Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={`loading-${index}`}
                          className="px-3 py-3 flex items-center"
                        >
                          <Skeleton className="w-8 h-8 rounded mr-3" />
                          <div className="flex-grow">
                            <Skeleton className="h-4 w-3/4 mb-2" />
                            <Skeleton className="h-3 w-1/2" />
                          </div>
                        </div>
                      ))
                  ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                      <div
                        key={`suggestion-${index}`}
                        className="px-3 py-3 hover:bg-gray-50 cursor-pointer flex items-center"
                        onClick={() => {
                          if (suggestion.type === "product") {
                            setQuery((suggestion.data as Product).name);
                          } else {
                            setQuery(suggestion.data as string);
                          }
                          handleSearch({ preventDefault: () => {} });
                        }}
                      >
                        {renderSuggestionIcon(suggestion.type)}
                        {renderSuggestionContent(suggestion)}
                      </div>
                    ))
                  ) : query.length >= 2 ? (
                    <div className="px-4 py-3 text-gray-500">
                      No results found for &quot;{query}&quot;
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-gray-500">
                      Type at least 2 characters to see suggestions
                    </div>
                  )}
                </div>
              )}

              {query.length > 0 && (
                <div className="p-2 border-t bg-gray-50 flex justify-between">
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setQuery("");
                      setShowSuggestions(false);
                    }}
                  >
                    Clear search
                  </button>
                  <button
                    type="submit"
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSearch({ preventDefault: () => {} });
                    }}
                  >
                    View all results
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ModernEcommerceSearch;
