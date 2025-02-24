import React from "react";
import CheckOutForm from "./CheckOutForm";
import Footer from "@/app/home-page/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Page() {
  return (
    <div className="">
      <Card className="bg-white shadow-sm rounded-none w-full px-10 py-4 ">
        <Label>Hypermart</Label>
      </Card>
      <div className="py-14">
        <CheckOutForm />
      </div>
      <Footer />
    </div>
  );
}
