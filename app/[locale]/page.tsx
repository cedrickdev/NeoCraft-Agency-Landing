import Hero from "@/components/section/hero";
import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ChatWidgetWrapper } from "./chat-widget-wrapper";

// Lazy-load below-the-fold sections to reduce initial JS bundle
const About = dynamic(() => import("@/components/section/about"), {
  loading: () => <SectionSkeleton />,
});
const Services = dynamic(() => import("@/components/section/services"), {
  loading: () => <SectionSkeleton />,
});
const InteractiveServices = dynamic(() => import("@/components/section/interactive-services"), {
  loading: () => <SectionSkeleton />,
});
const Methodology = dynamic(() => import("@/components/section/methodology"), {
  loading: () => <SectionSkeleton />,
});
const Testimonial = dynamic(
  () => import("@/components/section/testimonial").then(mod => ({ default: mod.Testimonial })),
  { loading: () => <SectionSkeleton /> }
);
const ProgressiveContactForm = dynamic(() => import("@/components/section/progressive-contact-form"), {
  loading: () => <SectionSkeleton />,
});
const CTA = dynamic(() => import("@/components/section/cta"), {
  loading: () => <SectionSkeleton />,
});

/**
 * Homepage - Server Component
 * 
 * Performance Strategy:
 * - Hero renders server-side immediately (critical for LCP)
 * - Below-the-fold sections are lazy-loaded to reduce initial JS bundle
 * - ChatWidget is client-only and deferred via wrapper
 */
export default async function NeoCraftLanding({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Enable static rendering for this page
  setRequestLocale(locale);
  return (
    <div className="flex flex-col">
      {/* Hero section - critical, rendered immediately */}
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      
      {/* Below-the-fold sections - lazy loaded */}
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

function SectionSkeleton() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
          <div className="h-6 w-24 bg-primary/10 rounded-full mx-auto" />
          <div className="h-12 w-2/3 bg-primary/5 rounded-lg mx-auto" />
          <div className="h-6 w-1/2 bg-primary/5 rounded-lg mx-auto" />
        </div>
      </div>
    </section>
  );
}
