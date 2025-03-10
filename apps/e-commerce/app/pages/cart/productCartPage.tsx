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
import PaymentModal from "./PaymentModal";
import { useRouter } from "next/navigation";
import LoadingState from "@/app/components/LoadingState";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";

export default function ProductCartPage() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();
  const { items: cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(setCart(savedCart));
    }
  }, [dispatch]);

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      {isLoading && <LoadingState />}
      <div className=" min-h-screen">
        <div className="containerCart rounded-xl mt-12 mb-10 mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <Link
              href="/pages/fashion"
              className="flex items-center text-blue-600 hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
          {cartItems.length === 0 && (
            <div className="text-center py-16 min-h-[75svh]">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven&apos;t added any items to your cart yet.
              </p>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => router.push("/fashion")}
              >
                Start Shopping
              </Button>
            </div>
          )}
          <div className="grid grid-cols-[2fr_1.1fr] gap-6">
            <div className="cart-items space-y-6">
              {cartItems.length > 0 &&
                cartItems.map((item) => {
                  const product = item.product;
                  return (
                    <div
                      key={item.productId}
                      className="cart-item flex items-center justify-between bg-white shadow-lg rounded-lg p-4"
                    >
                      <div className="grid grid-cols-[1fr_4fr] items-center space-x-4">
                        <div>
                          <img
                            src={product?.images ? product?.images[0] : ""}
                            alt={product.name}
                            className="w-full h-28 object-cover rounded-md"
                          />
                        </div>
                        <div className=" space-y-1">
                          <h3 className="font-semibold text-lg">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 text-nowrap">
                            {product.description.slice(0, 92)}...
                          </p>

                          <div className="price text-gray-700 text-base font-semibold">
                            ${product.price * item.quantity}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Button
                                className="text-lg w-9 h-9 text-black hover:bg-gray-100 font-semibold px-3 py-1 bg-gray-200 rounded-full"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.productId,
                                    item.quantity - 1
                                  )
                                }
                              >
                                -
                              </Button>
                              <span className="text-lg font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                className="text-lg w-9 h-9 text-black hover:bg-gray-100 font-semibold px-3 py-1 bg-gray-200 rounded-full"
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
                              className="remove bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
                              onClick={() => handleRemove(item.productId)}
                            >
                              {/* <RiDeleteBin5Fill /> */}
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="sticky top-24 self-start">
              {cartItems.length > 0 && (
                <div className="cart-summary  bg-white shadow-lg rounded-lg p-6">
                  <Label className="">Order Summary</Label>
                  <div className="flex justify-between text-xl font-semibold mb-4">
                    <p>Total amount :</p>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <Separator className=" mb-4" />
                  <DiscountInput />
                  <Button
                    className=" bg-orange-500 w-full rounded-lg hover:bg-orange-600 my-7"
                    onClick={() => {
                      setIsLoading(true);
                      router.push("/pages/cart/checkout");
                      // setIsModalOpen(true);
                    }}
                  >
                    <HiMiniShieldCheck className="w-[19px] h-[19px]" />
                    Check Out
                  </Button>
                  <Separator className=" mb-4 mt-4" />
                  <div className="flex flex-col mt-4 gap-[3px] text-gray-700 text-[14px]">
                    <Label className=" text-black/85 font-semibold mb-[3px] text-base">
                      You’re protected on Hypermart.com
                    </Label>
                    <span className="flex gap-2 items-center">
                      <HiMiniShieldCheck className="text-green-500 w-[18px] h-[18px]" />
                      Secure payment
                    </span>
                    <span className="flex gap-2 items-center">
                      <TbCreditCardRefund className="text-green-500 w-[18px] h-[18px]" />
                      Refund and returns
                    </span>
                    <span className="flex gap-2 items-center">
                      <IoFileTrayFullOutline className="text-green-500 w-[18px] h-[18px]" />
                      Fulfillment by Hypermart.com Logistics
                    </span>
                  </div>
                </div>
              )}
              {cartItems.length > 0 && (
                <Button
                  variant="outline"
                  className="w-full rounded-lg mt-3 hover:bg-red-600 hover:text-white bg-red-500 text-white"
                  onClick={handleClearCart}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
