import React from "react";
import SignInBotton from "./SignInBotton";
import Logo from "./logo/Logo";
import SearchBar from "./search/SearchBar";
import CartPage from "./cart/Cart";
import Language from "./language_currency_change/Language_Cur";
import DeliverTo from "./deliverTo/DeliverTo";
import FavouriteProduct from "./favourite/FavouriteProduct";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-card flex items-center justify-between shadow-xl px-14 py-5">
      <div>
        <Logo />
      </div>
      <div>
        <SearchBar />
      </div>

      <div className=" flex gap-6 items-center">
        <DeliverTo />
        <Language />
        <FavouriteProduct />
        <CartPage />
        <SignInBotton />
      </div>
    </div>
  );
}
// fea92866
