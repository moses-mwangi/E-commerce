/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  setCart,
  updateQuantity,
} from "@/redux/slices/cartSlice";
import DiscountInput from "./discountInput";
import { RootState } from "@/redux/store";
import { TbCreditCardRefund } from "react-icons/tb";
import { HiMiniShieldCheck } from "react-icons/hi2";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import LoadingState from "@/app/components/loaders/LoadingState";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MdOutlineDelete } from "react-icons/md";
import { Product } from "@/app/types/products";
import useLanguage_Currency from "@/app/home-page/navbar/language_currency_change/useLanguage_Currency";

interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export default function ProductCartPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedCurrency } = useLanguage_Currency();

  const { categories } = useSelector((state: RootState) => state.category);
  const { products } = useSelector((state: RootState) => state.product);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  const proSubCategory = categories
    .find((category) =>
      cartItems.some(
        (item) =>
          item.product.category?.toLowerCase() === category.name.toLowerCase()
      )
    )
    ?.subcategories.find(
      (subcat) => subcat.name.toLowerCase() === "smartphones & accessories"
    );

  useEffect(() => {}, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const filterProducts = products.filter((pro) =>
        savedCart.some((el: CartItem) => el.productId === pro.id)
      );

      const cartProducts = filterProducts.map((product) => {
        const cartItem = savedCart.find(
          (el: CartItem) => el.productId === product.id
        );
        return {
          product: product,
          quantity: cartItem?.quantity || 1,
          productId: cartItem?.productId || product.id,
        };
      });

      dispatch(setCart(cartProducts));
      // dispatch(setCart(savedCart));
    }
  }, [dispatch, products]);

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      {isLoading && <LoadingState />}
      <div className="min-h-screen">
        {/* Header Section */}
        <div className="px-2 sm:px-6 lg:px-16 xl:px-44 flex sm:flex-row items-center justify-between mt-4 sm:mt-8 mb-6 sm:mb-8 sm:gap-4">
          <h1 className="text-lg sm:text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <Link
            href="/category"
            onClick={() => setIsLoading(true)}
            className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 transition-all duration-200 hover:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        {/* Empty Cart State */}
        {cartItems.length === 0 && (
          <div className="px-4 sm:px-8 md:px-16 lg:px-40">
            <Card className="bg-gray-100 rounded-xl text-center py-12 sm:py-16 min-h-[50svh]">
              <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-6 sm:mb-8 px-4">
                Looks like you haven&apos;t added any items to your cart yet.
              </p>
              <Button
                className="bg-orange-500/90 hover:bg-orange-600 text-sm sm:text-base"
                onClick={() => router.push("/category")}
              >
                Start Shopping
              </Button>
            </Card>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 rounded-xl flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => {
                const product = item.product;
                return (
                  <div
                    key={item.productId}
                    className="cart-item flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg rounded-lg p-3 sm:p-4"
                  >
                    <div className="w-full grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-3 sm:gap-4">
                      <div className="w-full h-32 sm:h-28">
                        <img
                          src={
                            product.productImages
                              ? String(
                                  product.productImages.find(
                                    (el: any) => el.isMain === true
                                  )?.url
                                )
                              : ""
                          }
                          alt={product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="space-y-2 sm:space-y-1">
                        <Link
                          href={`/category/${product.category}/${proSubCategory?.name}/${product.name}?id=${product.id}`}
                          className="font-semibold text-base sm:text-lg hover:underline hover:text-gray-700 transition-all duration-200 cursor-pointer"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="text-gray-700 text-base font-semibold">
                          {`${product.currency} ${(
                            product.price * item.quantity
                          ).toFixed(2)}`}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-3 sm:gap-0">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 sm:w-9 sm:h-9 p-0"
                              onClick={() => {
                                handleUpdateQuantity(
                                  item.productId,
                                  item.quantity - 1
                                );
                                if (item.quantity <= 1) {
                                  handleRemove(item.productId);
                                }
                              }}
                            >
                              {item.quantity <= 1 ? (
                                <MdOutlineDelete className="text-red-500" />
                              ) : (
                                "-"
                              )}
                            </Button>
                            <span className="text-base sm:text-lg font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 sm:w-9 sm:h-9 p-0"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="text-xs sm:text-sm h-8 px-3 sm:px-4"
                            onClick={() => handleRemove(item.productId)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 lg:self-start w-full lg:w-96">
              <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                <Label className="text-base sm:text-lg">Order Summary</Label>
                <div className="flex justify-between text-lg sm:text-xl font-semibold my-3 sm:mb-4">
                  <p>Total amount:</p>
                  <span>
                    {`${selectedCurrency.toLocaleUpperCase()} ${totalPrice.toFixed(
                      2
                    )}`}
                  </span>
                </div>
                <Separator className="my-3 sm:my-4" />
                <DiscountInput />
                <Button
                  className="bg-orange-500 w-full rounded-lg hover:bg-orange-600 my-4 sm:my-6 text-sm sm:text-base"
                  onClick={() => {
                    setIsLoading(true);
                    router.push("/pages/cart/checkout");
                  }}
                >
                  <HiMiniShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Check Out
                </Button>
                <Separator className="my-3 sm:my-4" />
                <div className="flex flex-col mt-3 sm:mt-4 gap-2 text-gray-700 text-xs sm:text-sm">
                  <Label className="text-black/85 font-semibold text-sm sm:text-base">
                    You&apos;re protected on Hypermart.com
                  </Label>
                  <span className="flex gap-2 items-center">
                    <HiMiniShieldCheck className="text-green-500 w-4 h-4" />
                    Secure payment
                  </span>
                  <span className="flex gap-2 items-center">
                    <TbCreditCardRefund className="text-green-500 w-4 h-4" />
                    Refund and returns
                  </span>
                  <span className="flex gap-2 items-center">
                    <IoFileTrayFullOutline className="text-green-500 w-4 h-4" />
                    Fulfillment by Hypermart.com Logistics
                  </span>
                </div>
              </div>

              <Button
                variant="destructive"
                className="w-full rounded-lg mt-3 text-sm sm:text-base"
                onClick={handleClearCart}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
