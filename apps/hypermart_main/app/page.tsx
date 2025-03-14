import React from "react";
import HeroSection from "./components/home/HeroSection";
import TestimonialsSection from "./components/home/TestimonialsSection";
import ServicesOverview from "./components/home/ServicesOverview";
import WhyChooseUs from "./components/home/WhyChooseUs";
import LatestNews from "./components/home/LatestNews";
import ContactCTA from "./components/home/ContactCTA";

export default function page() {
  return (
    <div>
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <TestimonialsSection />
      <LatestNews />
      <ContactCTA />
    </div>
  );
}
