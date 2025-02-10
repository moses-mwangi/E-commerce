import React from "react";
import Navbar from "./home-page/navbar/Navbar";
import Hero_Section from "./home-page/hero_section/Hero_Section";
import Footer from "./home-page/footer/Footer";
// import DiagonalDivider from "./home-page/hero_section/try";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero_Section />
      <Footer />
      {/* <DiagonalDivider /> */}
    </div>
  );
}
