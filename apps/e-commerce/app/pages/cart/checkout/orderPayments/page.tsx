"use client";

import Footer from "@/app/components/footer/Footer";
import UserProfileImage from "@/app/components/users/UserProfileImage";
import CartPage from "@/app/home-page/navbar/cart/Cart";
import Logo from "@/app/home-page/navbar/logo/Logo";
import { PaymentProvider } from "@/hooks/paymentContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import OrderSummaryCard from "./OrderSummaryCard";
import PaymentProgress from "./PaymentProgress";
import PaymentsForm from "./PaymentsForm";
import SmsSentModal from "./SmsSentModal";
import FavouriteProduct from "@/app/home-page/navbar/favouriteButton/FavouriteProductIcon";
import MobileMenu from "@/app/home-page/navbar/MobileMenu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchCategories } from "@/redux/slices/categorySlice";

export default function Page() {
  const [details, setDetails] = useState();
  const [isLoding, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <SmsSentModal details={details} />
      <div className="bg-gray-50/30 relative">
        <div className="bg-white flex items-center justify-between shadow-md py-4 px-3 sm:px-6">
          <div className=" cursor-pointer">
            <MobileMenu setIsLoading={setIsLoading} />
          </div>
          <div>
            <Logo />
          </div>
          <div>
            <div className="flex items-center space-x-3 sm:space-x-6">
              {/* <Link
                href="#"
                className="text-gray-700 hover:text-blue-600 relative"
              >
                <div className="relative">
                  <FaBell className="text-gray-700/65 text-2xl cursor-pointer" />
                  <span className="absolute -top-[6px] -right-[6px] bg-red-500/90 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center">
                    3
                  </span>
                </div>
              </Link> */}
              <FavouriteProduct />
              <CartPage />
              <UserProfileImage />
            </div>
          </div>
        </div>
        <div className="py-12 gap-3  w-full md:px-8  lg:px-20 ">
          <div>
            <PaymentProgress val={2} />
          </div>
          <PaymentProvider>
            <div className="lg:flex lg:gap-3  w-full justify-between">
              <PaymentsForm setDetails={setDetails} />
              <div className="px-2 md:px-0 md:sticky md:top-7 self-start max-w-[376px] w-full">
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
