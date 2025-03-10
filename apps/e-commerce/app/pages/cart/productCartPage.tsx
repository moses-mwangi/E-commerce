"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  setCart,
  updateQuantity,
} from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import {
  Shield,
  CreditCard,
  RefreshCw,
  Package,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  Loader2,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DiscountInput from "./discountInput";

export default function ProductCartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  const { items: cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(setCart(savedCart));
    }
  }, [dispatch]);

  const handleRemove = async (productId: number) => {
    setIsRemoving(productId);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Animation delay
    dispatch(removeFromCart(productId));
    setIsRemoving(null);
    toast.success("Item removed from cart");
  };

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setIsUpdating(productId);
    await new Promise((resolve) => setTimeout(resolve, 300));
    dispatch(updateQuantity({ productId, quantity }));
    setIsUpdating(null);
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
      toast.success("Cart cleared");
    }
  };

  const cartFeatures = [
    {
      icon: <Shield className="w-5 h-5 text-green-500" />,
      title: "Secure Payment",
      description: "Your payment information is safe",
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-blue-500" />,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: <Package className="w-5 h-5 text-orange-500" />,
      title: "Fast Delivery",
      description: "2-3 business days",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Link
            href="/fashion"
            className="flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-center py-16"
          >
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
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.productId}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-4 flex gap-4">
                      <div className="relative w-32 h-32">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-lg">
                            {item.product.name}
                          </h3>
                          <p className="font-bold text-lg">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              disabled={isUpdating === item.productId}
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {isUpdating === item.productId ? (
                                <Loader2 className="w-4 h-4 mx-auto animate-spin" />
                              ) : (
                                item.quantity
                              )}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              disabled={isUpdating === item.productId}
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={isRemoving === item.productId}
                            onClick={() => handleRemove(item.productId)}
                          >
                            {isRemoving === item.productId ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:sticky lg:top-4 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <DiscountInput />
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => router.push("/pages/cart/checkout")}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                </div>
              </motion.div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold mb-4">Shopping Protection</h3>
                <div className="space-y-4">
                  {cartFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {feature.icon}
                      <div>
                        <p className="font-medium">{feature.title}</p>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {cartItems.length > 0 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleClearCart}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
