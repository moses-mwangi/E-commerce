"use client";

import React from "react";
import SignInBotton from "./sign_In_Up_Button/SignInButton";
import Logo from "./logo/Logo";
import CartPage from "./cart/Cart";
import Language from "./language_currency_change/Language_Cur";
import DeliverTo from "./deliverTo/DeliverTo";
import FavouriteProduct from "./favouriteButton/FavouriteProductIcon";
import ExtraNavbarSection from "./ExtraNavbarSection/ExtraNavbarSection";
import ModernEcommerceSearch from "@/app/test/ModernEcommerceSearch2";
import { useRouter } from "next/navigation";

export function MobileNav() {
  const { push } = useRouter();
  return (
    <div className="sticky top-0 z-50 flex flex-col gap-2 bg-card px-2 py-2 shadow-xl lg:hidden">
      <div className="flex w-full items-center justify-between">
        <div
          onClick={() => {
            push("/");
          }}
          className=""
        >
          {/* <Logo /> */}
          HYPERMART
        </div>

        <div className="flex items-center gap-2 py-1">
          <FavouriteProduct />
          <CartPage />
          <SignInBotton />
        </div>
      </div>
      <div className="w-auto">
        <ModernEcommerceSearch />
      </div>
    </div>
  );
}

export default function Navbar() {
  return (
    <>
      <MobileNav />
      <div className="sticky top-0 z-50 hidden flex-col gap-2 bg-card pt-4 pb-2 shadow-xl lg:flex xl:px-11">
        <div className="flex items-center justify-between">
          <div className="">
            <Logo />
          </div>
          <div className="w-auto">
            <ModernEcommerceSearch />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden xl:flex">
              <DeliverTo />
            </div>
            <Language />
            <FavouriteProduct />
            <CartPage />
            <SignInBotton />
          </div>
        </div>
        <div className="hidden md:block">
          <ExtraNavbarSection />
        </div>
      </div>
    </>
  );
}
