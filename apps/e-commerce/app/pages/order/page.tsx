import Footer from "@/app/home-page/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import React from "react";
// import OrdersPage from "./Alibaba";
import OrderPages from "./OrderPage";

export default function Orders() {
  return (
    <div>
      <Navbar />
      {/* <OrdersPage /> */}
      <OrderPages />
      <Footer />
    </div>
  );
}
