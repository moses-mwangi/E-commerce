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

export function MobileNav() {
  return (
    <div className="sticky flex lg:hidden flex-col gap-2 top-0 z-50 bg-card shadow-xl px-2 py-2">
      <div className="flex items-center justify-between w-full">
        <div className="">
          {/* <Logo /> */}
          HYPERMART
        </div>

        <div className="flex gap-2 py-1 items-center">
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
      <div className=" hidden lg:sticky lg:flex flex-col gap-2 top-0 z-50 bg-card shadow-xl xl:px-11 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="">
            <Logo />
          </div>
          <div className="w-auto">
            <ModernEcommerceSearch />
          </div>

          <div className="flex gap-6 items-center">
            <div className=" hidden xl:flex">
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

// "use client";

// import React, { useState } from "react";
// import SignInBotton from "./sign_In_Up_Button/SignInButton";
// import Logo from "./logo/Logo";
// import SearchBar from "./search/SearchBar";
// import CartPage from "./cart/Cart";
// import Language from "./language_currency_change/Language_Cur";
// import DeliverTo from "./deliverTo/DeliverTo";
// import FavouriteProduct from "./favouriteButton/FavouriteProductIcon";
// import ExtraNavbarSection from "./ExtraNavbarSection/ExtraNavbarSection";
// import ModernEcommerceSearch from "@/app/test/ModernEcommerceSearch2";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <div className="sticky flex flex-col gap-2 top-0 z-50 bg-card shadow-xl px-4 sm:px-6 lg:px-11 pt-3 pb-2">
//       {/* Main Navbar */}
//       <div className="flex items-center justify-between gap-4">
//         {/* Mobile Menu Button (Hidden on Desktop) */}
//         <div className="lg:hidden">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </Button>
//         </div>

//         {/* Logo */}
//         <div className="flex-1 lg:flex-none">
//           <Logo />
//         </div>

//         {/* Search Bar (Hidden on Mobile) */}
//         <div className="hidden lg:block flex-1 max-w-2xl mx-4">
//           <ModernEcommerceSearch />
//         </div>

//         {/* Desktop Navigation Icons */}
//         <div className="hidden lg:flex gap-4 xl:gap-6 items-center">
//           <DeliverTo />
//           <Language />
//           <FavouriteProduct />
//           <CartPage />
//           <SignInBotton />
//         </div>

//         {/* Mobile Icons (Cart/SignIn) */}
//         <div className="flex lg:hidden gap-4 items-center">
//           <CartPage />
//           <SignInBotton />
//         </div>
//       </div>

//       {/* Mobile Search (Hidden on Desktop) */}
//       <div className="lg:hidden mt-2">
//         <ModernEcommerceSearch />
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="lg:hidden bg-background p-4 rounded-lg shadow-lg mt-2">
//           <div className="flex flex-col gap-4">
//             <DeliverTo />
//             <Language />
//             <FavouriteProduct />
//           </div>
//         </div>
//       )}

//       {/* Extra Navbar Section */}
//       <div className="hidden md:block">
//         <ExtraNavbarSection />
//       </div>
//     </div>
//   );
// }
