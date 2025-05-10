"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Eye, Heart } from "lucide-react";
import Image from "next/image";
import LoadingState from "@/app/components/loaders/LoadingState";
import useCategoryContex from "@/hooks/useCategoryContex";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCategories } from "@/redux/slices/categorySlice";

export default function Reccomeded() {
  const { push } = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { products, status } = useSelector((state: RootState) => state.product);
  const { categories } = useSelector((state: RootState) => state.category);

  const { items: favItems } = useCategoryContex();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const handleRouteProduct = (id: any) => {
    const product = products.find((el) => el.id === Number(id));
    if (product) {
      setIsLoading(true);
      push(
        `/category/${product.category}/${product.subCategory}/${product.name}?id=${product.id}`
      );
    }
  };

  return (
    <>
      {isLoading && <LoadingState />}

      <div className="bg-gray-50 px-3 sm:px-11 rounded-xl mx-auto pt-4 sm:pt-6 pb-8 sm:pb-16 dark:bg-gray-900 min-h-screen">
        <div className="">
          <h2 className="text-[17px] sm:text-xl font-semibold">Just for you</h2>
        </div>

        <div className={``}>
          <div
            className={`grid cursor-pointer grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-3 flex-1`}
          >
            {products?.map((product) => (
              <Card
                key={product.id}
                onClick={() => handleRouteProduct(product.id)}
                className={` bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden`}
              >
                <div
                  className={`h-32 sm:h-44  bg-gray-200 relative dark:bg-gray-700 overflow-hidden hover:cursor-pointer`}
                >
                  <Image
                    className="w-full hover:scale-105 transition-all duration-300 h-full object-cover group-hover:scale-105"
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
                  className={`flex flex-col justify-between flex-1 px-0`}
                >
                  <div className="p-2">
                    <h2 className="sm:text-[15px] text-sm font-semibold text-gray-900 dark:text-gray-100 overflow-hidden truncate">
                      {product.name}
                    </h2>
                    <p className="text-xs sm:text-[13px] text-gray-600 dark:text-gray-400">
                      {product.description.substring(0, 50)}...
                    </p>

                    <div className="flex items-center gap-2 text-sm sm:text-[15px] font-semibold">
                      <p className="text-gray-800 dark:text-gray-200">
                        ${product.price}
                      </p>
                      {product.discount > 0 && (
                        <p className="text-red-500 px-1 sm:px-2 py-0.5 text-xs rounded-md">
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
