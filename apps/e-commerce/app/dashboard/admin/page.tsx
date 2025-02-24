import React from "react";
import ProductForm from "./productUpload/Product";
import Footer from "../../home-page/footer/Footer";
import Navbar from "../../home-page/navbar/Navbar";

export default function Admin() {
  return (
    <div>
      {/* <Navbar /> */}
      <div className=" py-6">
        <ProductForm />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
