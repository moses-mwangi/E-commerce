"use client";

import React from "react";
import HeroSection from "./components/home/HeroSection";
import ServicesOverview from "./components/home/ServicesOverview";
import WhyChooseUs from "./components/home/WhyChooseUs";
import LatestNews from "./components/home/LatestNews";
import TestimonialsSection from "./components/home/TestimonialsSection";
import ContactCTA from "./components/home/ContactCTA";
// import { useTranslations } from "next-intl";

export default function HomePage() {
  // const t = useTranslations("Home");

  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <TestimonialsSection />
      <LatestNews />
      <ContactCTA />
    </main>
  );
}
