"use client";

import React, { useEffect, useState } from "react";
import { fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import LoadingState from "@/app/components/loaders/LoadingState";
import Link from "next/link";
import useCategoryContex from "@/hooks/useCategoryContex";
import useLanguage_Currency from "../navbar/language_currency_change/useLanguage_Currency";
import { Product } from "@/app/types/products";
import { addToRecentlyViewed } from "@/redux/slices/BrowsingHistory";

export default function FrequencySearched() {
  const { selectedCurrency } = useLanguage_Currency();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { products, status } = useSelector((state: RootState) => state.product);

  const {
    handleAddToCart,
    handleAddToFavourite,
    items: favItems,
  } = useCategoryContex();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const recommendedProductss = products;

  const handleRouteProduct = (product: Product) => {
    setIsLoading(true);
    dispatch(addToRecentlyViewed(product));
  };

  return (
    <>
      {isLoading === true && <LoadingState />}
      <div className=" bg-[#f4f4f4] px-3 sm:px-6 py-3 sm:py-5 sm:rounded-2xl relative group/product cursor-pointer">
        <p className=" text-base sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-6">
          Frequently searched
        </p>

        <button className="absolute text-sm top-1/2 left-1 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-md opacity-0 group-hover/product:opacity-100 transition-opacity z-50">
          <GrPrevious className=" w-4 h-4" />
        </button>
        <button className="absolute text-sm top-1/2 right-1 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-md opacity-0 group-hover/product:opacity-100 transition-opacity z-50">
          <GrNext className=" w-4 h-4" />
        </button>

        <div className=" relative flex gap-3 overflow-x-auto hide-scrollbar">
          {recommendedProductss.map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[185px] bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow group"
            >
              <div className="relative h-36 sm:h-40 shadow-sm bg-gray-100 overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-black hover:scale-105 transition-all duration-200"
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
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-[2px] rounded">
                    {Math.round(product.discount)}% OFF
                  </span>
                )}
                <span
                  onClick={() => handleAddToFavourite(product.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
                >
                  <FiHeart
                    fill={
                      favItems.some((el) => el.product.id === product.id)
                        ? "oklch(70.4% 0.191 22.216)"
                        : "white"
                    }
                    className={`${
                      favItems.some((el) => el.product.id === product.id)
                        ? " text-red-400"
                        : ""
                    } text-gray-400 group-hover:text-red-400 cursor-pointer`}
                  />
                </span>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="flex items-center justify-center whitespace-nowrap mx-auto absolute text-sm bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-[4px] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiShoppingCart className="mr-1" /> Quick Add
                </button>
              </div>
              <div className="px-3 py-3">
                <Link
                  href={`/category/${product.category}/${product.subCategory}/${product.name}?id=${product.id}`}
                  onClick={() => handleRouteProduct(product)}
                >
                  <h3 className="w-full overflow-hidden text-[15px] whitespace-nowrap truncate font-medium text-gray-900 mb-1">
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
                      {/* ({product.reviews}) */} ({5})
                    </span>
                  </div>
                  <div className="flex items-center">
                    {product.discount ? (
                      <div>
                        <span className="text-[16px] font-bold text-gray-900">
                          {`${product.currency} ${(
                            product.price -
                            (product.discount / 100) * product.price
                          )
                            .toFixed(2)
                            .toLocaleString()}`}
                        </span>
                        <span className="text-[15px] text-gray-500 line-through ml-2">
                          {`${selectedCurrency} ${product.price
                            .toFixed(2)
                            .toLocaleString()}`}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[15px] font-bold text-gray-900">
                        {`
                        ${product.currency} ${product.price
                          .toFixed(2)
                          .toLocaleString()}
                        `}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
