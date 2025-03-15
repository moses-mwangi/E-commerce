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
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6">AI-Powered Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products?.map((product) => (
          <Card key={product.id} className=" bg-slate-50 p-4 h-auto">
            <div>
              <Image
                src={product.images[0]}
                alt={product.name}
                width={150}
                height={50}
                className="rounded-lg  w-full h-[170px]"
              />
            </div>
            <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">${product.price}</p>
            <div className="text-sm text-gray-500">
              {product.stock > 0 ? (
                <p className="text-green-600">Stock Available</p>
              ) : (
                <p className="text-red-600">Out of stock</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
