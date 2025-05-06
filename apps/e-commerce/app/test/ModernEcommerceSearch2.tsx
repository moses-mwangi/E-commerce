"use client";

import React, { useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import ImageSearchPopup from "./ImageSearchPopUp";
import { capitalizeWords, Product } from "../types/products";
import { Category, Subcategory } from "../types/category";
import useSearch from "./useSearch";
import e from "express";
import { useRouter } from "next/navigation";
import LoadingState from "../components/loaders/LoadingState";

type SearchSuggestion = {
  type: "product" | "category" | "brand" | "recent" | "popular" | string;
  data: Product | Category | object | string;
};

const ModernEcommerceSearch = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    categories,
    status,

    recentSearches,
    setRecentSearches,
    popularSearches,
    trendingCategories,

    isListening,

    searchRef,
    inputRef,
    recognitionRef,

    handleSearch,
    debouncedSearch,
    startVoiceSearch,
    setSuggestionsCount,
  } = useSearch();

  const manipulatedCategory = [
    "All Categories",
    ...categories.map((el) => el.name),
  ];

  const showLoading = () => {
    setLoading(true);
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

  const renderSuggestionContent = (
    suggestion: SearchSuggestion,
    searchQuery: string
  ) => {
    const highlightMatch = (text: string, query: string) => {
      if (!query) return text;

      const lowerText = text?.toLowerCase();
      const lowerQuery = query?.toLowerCase();
      const matches: number[] = [];

      let index = lowerText?.indexOf(lowerQuery);
      while (index !== -1) {
        for (let i = index; i < index + query.length; i++) {
          matches.push(i);
        }
        index = lowerText?.indexOf(lowerQuery, index + 1);
      }

      return (
        <span>
          {text?.split("").map((char, i) => (
            <span
              key={i}
              style={{
                color: matches.includes(i) ? "inherit" : "rgba(0, 0, 0, 0.5)",
                fontWeight: matches.includes(i) ? "normal" : "normal",
              }}
            >
              {char}
            </span>
          ))}
        </span>
      );
    };

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
              <div className="font-medium truncate">
                {highlightMatch(product.name.toLowerCase(), searchQuery)}
              </div>
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
              <div className="text-xs text-gray-500 ml-2">
                {highlightMatch(product.brand.toLowerCase(), searchQuery)}
              </div>
            )}
          </div>
        );
      case "subProduct":
        const subProduct = suggestion.data as Product;
        return (
          <div className="flex items-center w-full">
            <span className="font-medium">
              {highlightMatch(
                capitalizeWords(String(subProduct?.subCategory)),
                searchQuery
              )}
            </span>
            <span className="ml-auto text-xs text-gray-500">
              {capitalizeWords(subProduct.category)}
            </span>
          </div>
        );
      case "category":
        const category = suggestion.data as Category;
        return (
          <div className="flex items-center w-full">
            <span className="font-medium">
              {highlightMatch(capitalizeWords(category.name), searchQuery)}
            </span>
            <span className="ml-auto text-xs text-gray-500">
              category
              {/* {capitalizeWords(category.name)} */}
            </span>
          </div>
        );
      case "categorySlung":
        const categorySlung = suggestion.data as Category;
        return (
          <div className="flex items-center w-full">
            <span className="font-medium">
              {highlightMatch(
                capitalizeWords(String(categorySlung.slug)),
                searchQuery
              )}
            </span>
            <span className="ml-auto text-xs text-gray-500">
              category
              {/* {capitalizeWords(categorySlung.name)} */}
            </span>
          </div>
        );
      case "subCategoryName":
        const subCategoryName = suggestion.data as Subcategory;
        return (
          <div className="flex items-center w-full">
            <div className="flex flex-col">
              <span className="font-medium">
                {highlightMatch(
                  capitalizeWords(subCategoryName?.name),
                  searchQuery
                )}
              </span>
            </div>
            <span className="ml-auto text-xs text-gray-500">
              category
              {/* {capitalizeWords(subCategoryName.name)} */}
            </span>
          </div>
        );
      case "subCategorySlung":
        const subCategorySlung = suggestion.data as Subcategory;

        return (
          <div className="flex items-center w-full">
            <span className="font-medium">
              {highlightMatch(
                capitalizeWords(String(subCategorySlung?.slug)),
                searchQuery
              )}
            </span>
            <span className="ml-auto text-xs text-gray-500">category</span>
          </div>
        );
      case "brand":
        return (
          <div className="flex bg-red-500 items-center w-full">
            <span className="font-medium">
              {highlightMatch(
                capitalizeWords(suggestion.data as string),
                searchQuery
              )}
            </span>
            <span className="ml-auto text-xs text-gray-500">Brand</span>
          </div>
        );
      case "recent":
      case "popular":
        return (
          <span className="font-medium">
            {highlightMatch(suggestion.data as string, searchQuery)}
          </span>
        );
      default:
        return (
          <span>{highlightMatch(suggestion.data as string, searchQuery)}</span>
        );
    }
  };

  return (
    <>
      {loading === true && <LoadingState />}
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
                  placeholder={t("Search for products, categories...")}
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
                  <ImageSearchPopup />
                </div>
              </div>

              <Button
                type="submit"
                className="h-[30px] flex items-center gap-2 bg-orange-500 hover:bg-orange-600/90 text-white px-5 py-[2px] rounded-full font-medium shadow-sm transition duration-200"
                aria-label="Search"
                disabled={status === "loading"}
                onClick={() => {
                  console.log("Moses");
                  // inputRef.current?.focus();
                  handleSearch({ preventDefault: () => {} });
                }}
              >
                <SearchIcon size={18} /> {t("search")}
              </Button>
            </div>

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
                              const product = suggestion.data as Product;
                              showLoading();
                              setQuery(product.name);
                              push(
                                `/category/${product.category}/${product.subCategory}/${product.name}?id=${product.id}`
                              );
                            } else if (suggestion.type === "subProduct") {
                              const product = suggestion.data as Product;
                              showLoading();
                              setQuery(product?.subCategory);
                              push(
                                `/category/${product.category}/${product.subCategory}`
                              );
                            } else if (suggestion.type === "brand") {
                              setQuery(suggestion.data as string);
                              showLoading();
                              console.log(suggestion.data);
                            } else if (suggestion.type === "category") {
                              const category = suggestion.data as Category;
                              showLoading();
                              setQuery(category.name);
                              push(`/category/${category.name}`);
                            } else if (suggestion.type === "categorySlung") {
                              const category = suggestion.data as Category;
                              showLoading();
                              setQuery(String(category?.slug));
                              push(`/category/${category.name}`);
                            } else if (suggestion.type === "subCategoryName") {
                              const subCategory =
                                suggestion.data as Subcategory;
                              showLoading();
                              const proCate = categories.find((el) =>
                                el.subcategories.some(
                                  (sub) => sub.id === subCategory.id
                                )
                              );

                              setQuery(subCategory?.name);
                              push(
                                `/category/${proCate?.name}/${subCategory.name}`
                              );
                            } else if (suggestion.type === "subCategorySlung") {
                              const subCategory =
                                suggestion.data as Subcategory;
                              showLoading();
                              const proCate = categories.find((el) =>
                                el.subcategories.some(
                                  (sub) => sub.id === subCategory.id
                                )
                              );
                              setQuery(
                                String((suggestion?.data as Subcategory)?.slug)
                              );
                              push(
                                `/category/${proCate?.name}/${subCategory.name}`
                              );
                            }
                            handleSearch({ preventDefault: () => {} });
                          }}
                        >
                          {renderSuggestionIcon(suggestion.type)}
                          {renderSuggestionContent(suggestion, query)}
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
                        // handleSearch({ preventDefault: () => {} });
                        setSuggestionsCount(suggestions.length);
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
    </>
  );
};

export default ModernEcommerceSearch;
