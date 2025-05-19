"use client";

import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  Search,
  Grid,
  List,
  ChevronDown,
  Eye,
  Sliders,
  Heart,
  ChevronRight,
} from "lucide-react";
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
import useSubCategoryContex from "@/hooks/useSubCategoryContex";
import ProductCard from "../../categoryComponents/ProductCard";
import useLanguage_Currency from "@/app/home-page/navbar/language_currency_change/useLanguage_Currency";

export default function SubCategory() {
  const { selectedCurrency } = useLanguage_Currency();

  const {
    isLoading,
    setIsLoading,
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
    decodedCategory,
    filteredProducts,
    handleRoute,
    decodedSub,
    handleBuyNow,
    items: favItems,
  } = useSubCategoryContex();

  useEffect(() => {
    if (window.innerWidth > 640) {
      setShowFilters(true);
    }
  }, [setShowFilters]);

  return (
    <>
      {isLoading && <LoadingState />}
      <div className="sm:px-6 px-2 containesr pb-16 bg-white dark:bg-gray-900 min-h-screen">
        <div className="mx-auto px-">
          <div className="flex items-center text-xs sm:text-sm py-3 sm:py-4 overflow-x-auto whitespace-nowrap">
            <Link
              href={`/category`}
              onClick={() => setIsLoading(true)}
              className="text-gray-500 hover:underline hover:text-blue-500"
            >
              Categories
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 text-gray-400" />
            <Link
              href={`/category/${category}`}
              onClick={() => setIsLoading(true)}
              className="text-gray-500 hover:underline hover:text-blue-500 capitalize"
            >
              {decodedCategory}
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 text-gray-400" />
            <span className=" text-gray-800 capitalize">{decodedSub}</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl px-3 sm:px-5 py-4 min-h-screen">
          <div className=" grid gap-2 mb-6">
            <h1 className="sm:text-3xl text-xl font-bold text-gray-800 dark:text-gray-200">
              {capitalizeWords(decodedSub)}
            </h1>
          </div>

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
                    className="pl-9 sm:pl-10 w-full max-w-[420px] focus-visible:ring-orange-500 text-sm sm:text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex justify-between flex-wrap items-center gap-2 sm:gap-3">
                  <Button
                    onClick={() => setShowFilters((el) => !el)}
                    variant="outline"
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10 px-3"
                  >
                    <Sliders className="w-1 h-1 sm:w-4 sm:h-4" />
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

          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6`}>
            <AnimatePresence>
              {showFilters && (
                <div className="sm:max-w-72 sm:w-full w-full p-3 sm:p-4 bg-white dark:bg-gray-800 rounded shadow-md">
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
            <div>
              <div
                className={` hidden sm:grid ${
                  !gridView
                    ? " grid"
                    : !showFilters
                    ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    : " sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                } gap-4 sm:gap-3 flex-1`}
              >
                {filteredProducts?.map((product) => (
                  <Card
                    key={product.id}
                    className={`${
                      gridView
                        ? "flex flex-col h-full"
                        : "flex flex-col sm:flex-row h-auto sm:h-[220px]"
                    } bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden`}
                  >
                    <div
                      className={`group shadow-sm ${
                        gridView
                          ? "aspect-square h-44 rounded-b-none rounded-t-md"
                          : "w-full sm:w-64  h-20 sm:h-full"
                      } bg-gray-200 relative dark:bg-gray-700 overflow-hidden hover:cursor-pointer`}
                    >
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: product.productImages
                            ? `url(${String(
                                product.productImages.find(
                                  (el) => el.isMain === true
                                )?.url
                              )})`
                            : "",

                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      />
                      {/* <Image
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
                    /> */}

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
                      <div className="space-y-2 sm:space-y-2">
                        <h2 className="text-base sm:text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                          {product.name}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                          {product.description}
                        </p>

                        <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
                          <p className="text-gray-800 dark:text-gray-200">
                            {`${product.currency} ${product.price
                              .toFixed(2)
                              .toLocaleString()}`}
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
                          <div className="grid grid-cols-2 sm:flex sm:fleffx-wrap w-full gap-1 sm:gap-2 mt-2 text-xs sm:text-sm">
                            {product.specifications
                              ?.slice(0, 2)
                              .map((spec: any, idx: any) => (
                                <div
                                  className="flex rounded w-full sm:w-auto overflow-hidden whitespace-nowrap text-ellipsis"
                                  key={idx}
                                >
                                  <p className="font-semibold text-gray-900 dark:text-gray-100 mr-1 line-clamp-1">
                                    {spec.key}:
                                  </p>
                                  <p className="text-gray-700 dark:text-gray-300 truncate line-clamp-1">
                                    {spec.value}
                                  </p>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>

                      <div
                        className={`grid ${
                          gridView
                            ? "grid-cols-2 mt-3"
                            : "grid-cols-2 sm:grid-cols-3"
                        } gap-2`}
                      >
                        <Button
                          size="sm"
                          className="w-full h-7 bg-orange-500 hover:bg-orange-600 text-xs sm:text-sm sm:h-8"
                          onClick={() => handleAddToCart(product.id)}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          className="w-full bg-orange-500 hover:bg-orange-600 text-xs sm:text-sm h-8 sm:h-8"
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
                          } w-full text-xs sm:text-sm h-8 sm:h-8`}
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
              <ProductCard val="sub" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
