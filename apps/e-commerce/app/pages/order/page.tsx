import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import React from "react";
import OrderPages from "./OrderPage";

export default function Orders() {
  return (
    <div>
      <Navbar />
      <OrderPages />
      <Footer />
    </div>
  );
}
