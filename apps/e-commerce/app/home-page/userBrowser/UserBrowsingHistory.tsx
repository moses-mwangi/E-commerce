"use client";

import LoadingState from "@/app/components/loaders/LoadingState";
import useCategoryContex from "@/hooks/useCategoryContex";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import React, { useState } from "react";
import { FiClock, FiHeart } from "react-icons/fi";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useDispatch } from "react-redux";
import useBrowsingHistory from "./useBrowsingHistory";
import { clearRecentlyViewed } from "@/redux/slices/BrowsingHistory";
import dynamic from "next/dynamic";
import slugify from "@/utils/slungify";

const FrequencySearched = dynamic(
  () => import("../frequencySearched/FrequencySearched"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function UserBrowsingHistory() {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleAddToCart,
    handleAddToFavourite,
    items: favItems,
  } = useCategoryContex();

  const { recentlyViewed } = useBrowsingHistory();

  const handleRouteProduct = (id: any) => {
    setIsLoading(true);
  };

  const clearBrowsingHistory = () => {
    dispatch(clearRecentlyViewed());
  };

  return (
    <>
      {isLoading === true && <LoadingState />}
      <div
        className={`sm:grid ${
          recentlyViewed.length > 0
            ? "sm:grid-cols-2 space-y-3 sm:space-y-0 sm:gap-5"
            : " grid-cols-1"
        } py-4 sm:py-7 mx-auto sm:px-6 md:px-7 lg:px-9`}
      >
        <div
          className={`${
            recentlyViewed.length <= 0 && "hidden"
          } hover:cursor-pointer bg-[#f4f4f4] px-3 sm:px-6 py-3 sm:py-5 sm:rounded-2xl relative group`}
        >
          <div className="flex justify-between items-center mb-3 sm:mb-6">
            <h2 className="text-base sm:text-xl md:text-2xl font-semibold text-gray-900">
              Recently Viewed
            </h2>
            <button
              onClick={() => clearBrowsingHistory()}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear all
            </button>
          </div>

          <button className="absolute text-sm top-1/2 left-1 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
            <GrPrevious className=" w-4 h-4" />
          </button>
          <button className="absolute text-sm top-1/2 right-1 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
            <GrNext className=" w-4 h-4" />
          </button>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar">
            {recentlyViewed?.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[185px]  bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow group/fav"
              >
                <div className="relative h-36 sm:h-40 shadow-sm bg-gray-100 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-black hover:scale-105 transition-all duration-200"
                    style={{
                      backgroundImage: `url('${
                        item.productImages.find((el) => el.isMain === true)
                          ?.url || ""
                      }')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <span
                    onClick={() => handleAddToFavourite(item.id)}
                    className="absolute z-50 top-2 right-2 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover/fav:opacity-100"
                  >
                    <FiHeart
                      fill={
                        favItems.some((el) => el.product.id === item.id)
                          ? "oklch(70.4% 0.191 22.216)"
                          : "white"
                      }
                      className={`${
                        favItems.some((el) => el.product.id === item.id)
                          ? " text-red-400"
                          : ""
                      }  text-gray-400 group-hover/fav:text-red-400 cursor-pointer`}
                    />
                  </span>
                </div>
                <div className="py-4 px-3">
                  <Link
                    href={`/category/${slugify(item.category)}/${slugify(
                      item.subCategory
                    )}/${slugify(item.name)}?id=${item.id}`}
                    onClick={() => handleRouteProduct(item.id)}
                    className="flex flex-col items-start"
                  >
                    <h3 className="truncate text-[15px] overflow-hidden whitespace-nowrap w-full font-semibold text-gray-900/95">
                      {item.name}
                    </h3>
                    <div className="text-right text-[15px] sm:text-[15px]">
                      <p className="font-bold text-gray-900">
                        {`${item.currency} ${item.price
                          .toFixed(2)
                          .toLocaleString()}`}
                      </p>
                    </div>
                  </Link>
                  <div className="flex flex-col gap-3">
                    <span className="text-sm pt-1 text-gray-500 flex items-center">
                      <FiClock className="mr-1" /> 3 days ago
                    </span>
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md flex items-center justify-center"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <FrequencySearched />
        </div>
      </div>
    </>
  );
}
