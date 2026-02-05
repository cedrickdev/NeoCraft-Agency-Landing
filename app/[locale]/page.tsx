import About from "@/components/section/about";
import CTA from "@/components/section/cta";
import Hero from "@/components/section/hero";
import InteractiveServices from "@/components/section/interactive-services";
import Methodology from "@/components/section/methodology";
import ProgressiveContactForm from "@/components/section/progressive-contact-form";
import Services from "@/components/section/services";
import { Testimonial } from "@/components/section/testimonial";
import { Suspense } from "react";
import { ChatWidgetWrapper } from "./chat-widget-wrapper";

/**
 * Homepage - Server Component
 * 
 * Performance Strategy:
 * - Hero renders server-side immediately (critical for LCP)
 * - All sections can render on server (no dynamic imports needed in Server Components)
 * - ChatWidget is client-only and deferred via wrapper
 */
export default function NeoCraftLanding() {
  return (
    <div className="flex flex-col">
      {/* Critical: Server-rendered Hero for fast LCP */}
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      
      {/* All sections server-rendered */}
      <About />
      <Services />
      <InteractiveServices />
      <Methodology />
      <Testimonial />
      <ProgressiveContactForm />
      <CTA />
      
      {/* Non-critical: Client-only, loaded after page is interactive */}
      <ChatWidgetWrapper />
    </div>
  );
}

function HeroSkeleton() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background pt-32 pb-20 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-6 w-32 bg-primary/10 rounded-full" />
          <div className="h-24 w-3/4 bg-primary/5 rounded-lg" />
          <div className="h-16 w-1/2 bg-primary/10 rounded-lg" />
          <div className="h-8 w-2/3 bg-primary/5 rounded-lg" />
        </div>
      </div>
    </section>
  );
}
