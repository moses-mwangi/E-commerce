"use client";

import React from "react";
import CheckOutForm from "./CheckOutForm";
import CheckOutForm1 from "./CheckOutForm1";
import Footer from "@/app/home-page/footer/Footer";
import Logo from "@/app/home-page/navbar/logo/Logo";
import UserProfileImage from "@/app/components/users/UserProfileImage";
import Link from "next/link";
import { FaBell } from "react-icons/fa";
import CartPage from "@/app/home-page/navbar/cart/Cart";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);

export default function Page() {
  return (
    <div className="bg-gray-50/30">
      <div className="bg-white flex justify-between shadow-md py-4 px-6">
        <div>
          <Logo />
        </div>
        <div>
          <div className="flex items-center space-x-6">
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 relative"
            >
              <div className="relative">
                <FaBell className="text-gray-700/65 text-2xl cursor-pointer" />
                <span className="absolute -top-[6px] -right-[6px] bg-red-500/90 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center">
                  3
                </span>
              </div>
            </Link>
            <CartPage />
            <UserProfileImage />
          </div>
        </div>
      </div>
      <div className="py-14">
        {/* <Elements stripe={stripePromise}> */}
        <CheckOutForm />
        {/* </Elements> */}
        {/* <CheckOutForm1 /> */}
      </div>
      <Footer />
    </div>
  );
}
