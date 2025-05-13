import React from "react";
import MessagesPage from "./MessagePage";
import Navbar from "@/app/home-page/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";

export default function Message() {
  return (
    <div>
      <Navbar />
      <div className="mb-20">
        <MessagesPage />
      </div>
      <Footer />
    </div>
  );
}
