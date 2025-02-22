/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/slices/cartSlice";
import DiscountInput from "./discountInput";
import { RootState } from "@/redux/store";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";

export default function ProductCartPage() {
  const dispatch = useDispatch();
  const { items: cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

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
    <div className="container mt-12 mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Your Shopping Cart
      </h1>
      <div className="flex relative gap-2">
        <div className="cart-items space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-lg">
              Your cart is empty. Add some products!
            </p>
          ) : (
            cartItems.map((item) => {
              const product = item.product; // Assuming the product data is in the item object
              return (
                <div
                  key={item.productId}
                  className="cart-item flex items-center justify-between bg-white shadow-lg rounded-lg p-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.productId, item.quantity - 1)
                      }
                      className="text-lg font-semibold px-3 py-1 bg-gray-200 rounded-full"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.productId, item.quantity + 1)
                      }
                      className="text-lg font-semibold px-3 py-1 bg-gray-200 rounded-full"
                    >
                      +
                    </button>
                  </div>
                  <div className="price text-lg font-semibold">
                    ${product.price * item.quantity}
                  </div>
                  <Button
                    className="remove bg-red-500 text-[15px] text-white px-4 py-2 rounded-lg hover:bg-red-400"
                    onClick={() => handleRemove(item.productId)}
                  >
                    {/* <RiDeleteBin5Fill /> */}
                    Remove
                  </Button>
                </div>
              );
            })
          )}
        </div>

        <div className="cart-summary static top-2 bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between text-xl font-semibold mb-4">
            <p>Total:</p>
            <span>${totalPrice}</span>
          </div>

          <DiscountInput />

          <div className="cart-actions flex justify-between mt-6">
            <button
              className="clear-cart bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <button className="checkout bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
