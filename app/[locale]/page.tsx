"use client";

import { ChatWidget } from "@/components/chat-widget";
import About from "@/components/section/about";
import CTA from "@/components/section/cta";
import Hero from "@/components/section/hero";
import InteractiveServices from "@/components/section/interactive-services";
import Methodology from "@/components/section/methodology";
import ProgressiveContactForm from "@/components/section/progressive-contact-form";
import Services from "@/components/section/services";
import { Testimonial } from "@/components/section/testimonial";

export default function NeoCraftLanding() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Services />
      <InteractiveServices />
      <Methodology />
      <Testimonial />
      <ProgressiveContactForm />
      <CTA />
      <ChatWidget />
    </div>
  );
}
