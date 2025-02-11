"use client";

import React from "react";
import Navbar from "./home-page/navbar/Navbar";
import Hero_Section from "./home-page/hero_section/Hero_Section";
import Footer from "./home-page/footer/Footer";
import useUser from "./components/users/useUser";
// import DiagonalDivider from "./home-page/hero_section/try";

export default function HomePage() {
  //calling useUser Custostom hook at top so that the redux may be updated
  useUser();
  return (
    <div>
      <Navbar />
      <Hero_Section />
      <Footer />
      {/* <DiagonalDivider /> */}
    </div>
  );
}
