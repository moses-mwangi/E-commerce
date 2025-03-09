"use client";
import React, { useEffect } from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  Filter,
  ShoppingCart,
  Search,
  Grid,
  List,
  ChevronDown,
  Eye,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/slices/productSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addToCart, setCart } from "@/redux/slices/cartSlice";
import LoadingState from "@/app/components/LoadingState";

export default function CategoryProductPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [gridView, setGridView] = useState(true);
  const { products } = useSelector((state: RootState) => state.product);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProducts());

    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(setCart(savedCart)); // Set cart state in Redux
    }
  }, [dispatch]);

  function handleRoute(id: any) {
    setIsLoading(true);
    router.push(`fashion/${id}`);
  }

  function handleAddToCart(id: any) {
    const product = products.find((el) => el.id === id);
    if (product) {
      dispatch(addToCart(product));
    }
  }

  return (
    <>
      {isLoading && <LoadingState />}
      <div className="px-6 py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Fashions Products
          </h1>

          <div className="flex items-center gap-4">
            <div className="flex bg-white dark:bg-gray-800 p-2 rounded shadow-md">
              <Search className="text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="ml-2 bg-transparent outline-none"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter /> Filters
            </Button>
            <Switch checked={gridView} onCheckedChange={setGridView} />
            {gridView ? (
              <Grid className="text-gray-600" />
            ) : (
              <List className="text-gray-600" />
            )}
          </div>
        </div>
        <div className="grid grid-cols-[1fr_3.5fr] gap-6">
          <div className="col-span-1 p-4 bg-white dark:bg-gray-800 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="flex flex-col gap-3">
              <details className="border-b pb-2">
                <summary className="flex items-center justify-between cursor-pointer">
                  Price Range <ChevronDown />
                </summary>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>$0</span>
                  <span>$1000+</span>
                </div>
              </details>
              <details className="border-b pb-2">
                <summary className="flex items-center justify-between cursor-pointer">
                  Brand <ChevronDown />
                </summary>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Nike
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Adidas
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Puma
                  </label>
                </div>
              </details>
              <details className="border-b pb-2">
                <summary className="flex items-center justify-between cursor-pointer">
                  Ratings <ChevronDown />
                </summary>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> 4 stars & up
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> 3 stars & up
                  </label>
                </div>
              </details>
              <details className="border-b pb-2">
                <summary className="flex items-center justify-between cursor-pointer">
                  Color <ChevronDown />
                </summary>
                <div className="flex gap-2 mt-2">
                  <button className="w-6 h-6 rounded-full bg-red-500"></button>
                  <button className="w-6 h-6 rounded-full bg-blue-500"></button>
                  <button className="w-6 h-6 rounded-full bg-green-500"></button>
                </div>
              </details>
              <details className="border-b pb-2">
                <summary className="flex items-center justify-between cursor-pointer">
                  Shipping <ChevronDown />
                </summary>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Free Shipping
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Express Delivery
                  </label>
                </div>
              </details>

              <details className="border-b pb-2">
                <summary className="flex items-center justify-between cursor-pointer">
                  Delivery by <ChevronDown />
                </summary>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Delivery by Mar
                    08
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Delivery by Mar
                    14
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Delivery by Mar
                    20
                  </label>
                </div>
              </details>
            </div>
          </div>

          <div className="grid gap-6">
            {products.map((product) => (
              <Card
                className="p-4 h-[280px] hover:cursor-pointer gap-2 grid grid-cols-[1fr_2fr] bg-white dark:bg-gray-800 shadow-lg rounded-xl"
                key={product.id}
              >
                <div className="h-[96%] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden hover:cursor-pointer">
                  <Image
                    className="h-full w-full hover:scale-110 transition-all duration-200 object-cover rounded-md"
                    src={product.images[0]}
                    alt={product.name}
                    width={500}
                    height={300}
                  />
                </div>

                <CardContent className="flex flex-col justify-between p-2">
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-lg font-semibold">
                      <p className="text-gray-800 dark:text-gray-200">
                        ${product.price}
                      </p>
                      {product.discount > 0 && (
                        <p className="text-red-500 bg-red-100 dark:bg-red-900 px-2 py-1 text-xs rounded-md">
                          -{product.discount}%
                        </p>
                      )}
                    </div>

                    <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < product.ratings
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                      <span className="ml-1">({product.ratings})</span>
                    </div>

                    <div className="mt-2 text-sm grid grid-cols-3">
                      {product.specifications
                        ?.slice(0, 6)
                        .map((spec: any, idx: any) => (
                          <div className="flex gap-1" key={idx}>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                              {spec.key}:
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              {spec.value}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 flex items-center gap-2 shadow-md"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <ShoppingCart /> Add to Cart
                    </Button>
                    <Button
                      className="w-full flex items-center gap-2 border-gray-300 dark:border-gray-600 shadow-md"
                      variant="outline"
                      onClick={() => handleRoute(product.id)}
                    >
                      <Eye /> Quick View
                    </Button>
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
