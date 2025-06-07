"use client";

import React, { useState } from "react";

import ModernEcommerceSearch from "@/app/home-page/navbar/search/ModernEcommerceSearch";
import { usePathname, useRouter } from "next/navigation";
import CartPage from "./cart/Cart";
import DeliverTo from "./deliverTo/DeliverTo";
import ExtraNavbarSection from "./ExtraNavbarSection/ExtraNavbarSection";
import FavouriteProduct from "./favouriteButton/FavouriteProductIcon";
import Language from "./language_currency_change/Language_Cur";
import Logo from "./logo/Logo";
import SignInBotton from "./sign_In_Up_Button/SignInButton";

import LoadingState from "@/app/components/loaders/LoadingState";
import MobileMenu from "./MobileMenu";

export function MobileNav() {
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();
  const path = usePathname();

  const navigate = () => {
    setIsLoading(true);
  };
  return (
    <>
      {isLoading === true && <LoadingState />}
      <div className="sticky top-0 z-50 flex flex-col gap-2 bg-card px-3 py-2 shadow-xl lg:hidden">
        <div className="flex w-full items-center justify-between">
          <MobileMenu setIsLoading={setIsLoading} />

          <div
            onClick={() => {
              push("/");
            }}
            className=""
          >
            HYPERMART
          </div>

          <div className="flex items-center gap-2 py-1">
            <FavouriteProduct />
            <CartPage />
            <SignInBotton />
          </div>
        </div>
        <div className={` w-auto ${path === "/" ? " hidden" : ""}`}>
          <ModernEcommerceSearch />
        </div>
      </div>
    </>
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
