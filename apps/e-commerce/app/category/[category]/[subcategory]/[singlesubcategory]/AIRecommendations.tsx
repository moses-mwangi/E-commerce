"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  fetchProducts,
  // fetchRecommendedProducts,
} from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";

export default function AIRecommendations() {
  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="py-3 sm:py-6">
      <div className=" bg-[#f4f4f4] rounded-xl p-3">
        <h2 className=" text-xl sm:text-2xl font-bold mb-6">
          AI-Powered Recommendations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products?.map((product) => (
            <Card key={product.id} className=" h-auto">
              <div className="h-32">
                <div
                  className="w-full h-full object-cover inset-0 rounded-t-lg"
                  style={{
                    backgroundImage: `url(${
                      product.productImages
                        ? String(
                            product.productImages.find(
                              (el) => el.isMain === true
                            )?.url
                          )
                        : ""
                    })`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
              </div>
              <div className="px-2 py-2">
                <h3 className="mt-2 text-sm sm:text-base sm:font-semibold line-clamp-1">
                  {product.name}
                </h3>

                <div className="flex gap-2">
                  <p className="text-sm text-gray-500">
                    {product.currency} {product.price}
                  </p>
                  <div className="text-sm text-gray-500">
                    <p
                      className={`${
                        product.status === "in stock"
                          ? " text-green-600"
                          : " text-red-600"
                      }`}
                    >
                      {product.status}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
