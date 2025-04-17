"use client";

import React, { useRef, useState } from "react";
import Footer from "@/app/home-page/footer/Footer";
import Logo from "@/app/home-page/navbar/logo/Logo";
import UserProfileImage from "@/app/components/users/UserProfileImage";
import Link from "next/link";
import { FaBell } from "react-icons/fa";
import CartPage from "@/app/home-page/navbar/cart/Cart";
import PaymentsForm from "./PaymentsForm";
import OrderSummaryCard from "./OrderSummaryCard";
import SmsSentModal from "./SmsSentModal";
import PaymentProgress from "./PaymentProgress";
import { PaymentProvider } from "@/hooks/paymentContext";

export default function Page() {
  const [details, setDetails] = useState();

  return (
    <>
      <SmsSentModal details={details} />
      <div className="bg-gray-50/30 relative">
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
        <div className="py-12 gap-3  w-full  px-24 ">
          <div>
            <PaymentProgress val={3} />
          </div>
          <PaymentProvider>
            <div className="gap-3  w-full justify-between flex">
              <PaymentsForm setDetails={setDetails} />
              <div className=" sticky top-7 self-start max-w-[376px] w-full">
                <OrderSummaryCard details={details} />
              </div>
            </div>
          </PaymentProvider>
        </div>
        <Footer />
      </div>
    </>
  );
}
