"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { fetchProducts } from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Product } from "@/app/types/products";
import { useRouter } from "next/navigation";
import { addToRecentlyViewed } from "@/redux/slices/BrowsingHistory";
import LoadingState from "@/app/components/loaders/LoadingState";

export default function RelatedProducts({ product }: { product: Product }) {
  const { push } = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);
  const [isLoading, setIsLoading] = useState(false);

  const relatedProducts = products.filter(
    (pro) =>
      pro.category === product.category &&
      pro.subCategory === product.subCategory
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {isLoading === true && <LoadingState />}
      <div className="py-3 sm:py-0">
        <div className=" sm:bg-muted/50  sm:rounded-xl sm:p-3">
          <h2 className=" text-xl sm:text-2xl font-bold mb-2 sm:mb-6">
            Related products
          </h2>

          <div className="flex md:grid md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 overflow-x-scroll hide-scrollbar py-1">
            {relatedProducts?.map((product) => (
              <Card
                key={product.id}
                className="h-auto min-w-36 cursor-pointer"
                onClick={() => {
                  setIsLoading(true);
                  push(
                    `/category/${product.category}/${product.subCategory}/${product.name}?id=${product.id}`
                  );
                  dispatch(addToRecentlyViewed(product));
                }}
              >
                <div className="relative h-32 shadow-sm md:h-36 lg:h-[152px] bg-gray-100 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-t-lg hover:scale-105 transition-all duration-200"
                    style={{
                      backgroundImage: `url('${
                        product.productImages.find((el) => el.isMain === true)
                          ?.url || ""
                      }')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
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
    </>
  );
}
