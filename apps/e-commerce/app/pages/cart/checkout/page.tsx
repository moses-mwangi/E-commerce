import React from "react";
import CheckOutForm from "./CheckOutForm";
import Footer from "@/app/home-page/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Logo from "@/app/home-page/navbar/logo/Logo";
import UserProfileImage from "@/app/components/users/UserProfileImage";

export default function Page() {
  return (
    <div className="">
      <div className="bg-white flex justify-between shadow-md py-4 px-6">
        <div>
          <Logo />
        </div>
        <div>
          <UserProfileImage />
        </div>
      </div>
      <div className="py-14">
        <CheckOutForm />
      </div>
      <Footer />
    </div>
  );
}
