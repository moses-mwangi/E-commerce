"use client";

import React from "react";
import SignInBotton from "./sign_In_Up_Button/SignInButton";
import Logo from "./logo/Logo";
import SearchBar from "./search/SearchBar";
import CartPage from "./cart/Cart";
import Language from "./language_currency_change/Language_Cur";
import DeliverTo from "./deliverTo/DeliverTo";
import FavouriteProduct from "./favouriteButton/FavouriteProductIcon";
import ExtraNavbarSection from "./ExtraNavbarSection/ExtraNavbarSection";
import ModernEcommerceSearch from "@/app/test/ModernEcommerceSearch2";

export default function Navbar() {
  return (
    <div className="sticky flex flex-col gap-2 top-0 z-50 bg-card shadow-xl px-11 pt-4 pb-2">
      <div className="flex items-center justify-between">
        <div className="">
          <Logo />
        </div>
        <div className="w-auto">
          {/* <SearchBar />  */}
          <ModernEcommerceSearch />
        </div>

        <div className="flex gap-6 items-center">
          <DeliverTo />
          <Language />
          <FavouriteProduct />
          <CartPage />
          <SignInBotton />
        </div>
      </div>
      <ExtraNavbarSection />
    </div>
  );
}
