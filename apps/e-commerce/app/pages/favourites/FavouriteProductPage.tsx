"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  removeFromCart,
  setCart,
} from "@/redux/slices/cartSlice";
import { clearFav, removeFromFav, setFav } from "@/redux/slices/favoriteSlice";
import { AppDispatch, RootState } from "@/redux/store";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, DeleteIcon, HeartIcon, ShoppingBag } from "lucide-react";
import { MdOutlineDelete } from "react-icons/md";

import ButtonLoader from "@/app/components/loaders/ButtonLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import toast from "react-hot-toast";
import { fetchProducts } from "@/redux/slices/productSlice";

export default function FavouritesProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);

  const { items: favItems } = useSelector(
    (state: RootState) => state.favourite
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const savedFav = JSON.parse(localStorage.getItem("fav") || "[]");

      dispatch(setCart(savedCart));
      dispatch(setFav(savedFav));
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  const handleAddToCart = (id: any) => {
    const product = products.find((el) => el.id === id);
    console.log(id);
    if (product) {
      dispatch(addToCart(product));
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleRemove = (productId: number) => {
    // dispatch(removeFromCart(productId));
    dispatch(removeFromFav(productId));
  };

  const handleClearFav = () => {
    dispatch(clearFav());
  };

  return (
    <>
      <div className="px-44 mt-8 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Favourites</h1>

          <Link
            href="/pages/fashion"
            className="flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
        <Card className=" containerCart rounded-xl mb-10 mx-auto px-4 py-8">
          {favItems.length === 0 && (
            <div className="text-center py-16 min-h-[40svh]">
              {/* <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" /> */}
              {/* <HeartIcon /> */}

              <h1 className="text-2xl font-bold text-center mb-3">
                Your Favourites is Empty
              </h1>
              <p className="text-gray-500 mb-8">
                Looks like you haven&apos;t added any favourites item yet.
              </p>
              <Button
                className="bg-orange-500/90 w-28 hover:bg-orange-600"
                disabled={isLoading === true}
                onClick={() => {
                  setIsLoading(true);
                  router.push("/");
                }}
              >
                {isLoading === true ? <ButtonLoader /> : "Back Home"}
              </Button>
            </div>
          )}
          {favItems.length > 0 && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <p>Favourite Items</p>
                  <div
                    className="bg-gray-200 hover:bg-gray-300 hover:text-red-700 text-red-500 transition-all duration-200 flex items-center gap-1 cursor-pointer text-[15px] font-medium rounded-sm px-5 py-[8px]"
                    onClick={() => handleClearFav()}
                  >
                    <MdOutlineDelete size={17} />
                    Clear
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 border rounded-lg bg-white"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover h-20 w-24"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">
                        Price: ${item.product.price}
                      </p>
                    </div>
                    <div
                      onClick={() => handleAddToCart(item.product.id)}
                      className="text-rights "
                    >
                      <Button className="h-[26px] bg-orange-500 hover:bg-orange-600/85 text-[15px]">
                        cart
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </Card>
      </div>
    </>
  );
}
