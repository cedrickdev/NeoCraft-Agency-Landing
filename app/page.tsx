"use client";

import type React from "react";

import Footer from "@/components/section/footer";
import CTA from "@/components/section/cta";
import Contact from "@/components/section/contact";
import Testimonial from "@/components/section/testimonial";
import Team from "@/components/section/team";
import Methodology from "@/components/section/methodology";
import Services from "@/components/section/services";
import Hero from "@/components/section/hero";
import About from "@/components/section/about";
import Header from "@/components/header";

export default function NeoCraftLanding() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />

      <Hero />

      <About />

      <Services />

      <Methodology />

      <Team />

      <Testimonial />

      <Contact />

      <CTA />

      <Footer />
    </div>
  );
}
