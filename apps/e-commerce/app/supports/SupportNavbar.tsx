import React from "react";
import UserProfileImage from "../components/users/UserProfileImage";
import { FaBell } from "react-icons/fa";
import Link from "next/link";
import Logo from "../home-page/navbar/logo/Logo";
import { Card } from "@/components/ui/card";
import CartPage from "../home-page/navbar/cart/Cart";

export default function SupportNavbar() {
  return (
    <Card className=" rounded-none fixed top-0 left-0 w-full bg-white flex items-center justify-between shadow-md py-2 px-6">
      <div>
        <Logo />
      </div>
      <div>
        <div className="flex items-center space-x-6">
          <Link href="#" className="text-gray-700 hover:text-blue-600 relative">
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
    </Card>
  );
}
