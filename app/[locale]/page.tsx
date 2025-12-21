"use client";

import About from "@/components/section/about";
import CTA from "@/components/section/cta";
import Hero from "@/components/section/hero";
import ProgressiveContactForm from "@/components/section/progressive-contact-form";
import Services from "@/components/section/services";
import dynamic from "next/dynamic";

// Lazy load ChatWidget (non critique au chargement initial)
const ChatWidget = dynamic(() => import("@/components/chat-widget").then(mod => ({ default: mod.ChatWidget })), {
  ssr: false, // Ne pas rendre côté serveur pour le chat
  loading: () => null
});

// Lazy load sections qui ne sont pas immédiatement visibles (below the fold)
const InteractiveServices = dynamic(() => import("@/components/section/interactive-services"), {
  loading: () => <div className="min-h-[600px] flex items-center justify-center"><div className="animate-pulse text-primary">Chargement...</div></div>,
  ssr: true
});

const Methodology = dynamic(() => import("@/components/section/methodology"), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center"><div className="animate-pulse text-primary">Chargement...</div></div>,
  ssr: true
});

const Testimonial = dynamic(() => import("@/components/section/testimonial").then(mod => ({ default: mod.Testimonial })), {
  loading: () => <div className="min-h-[600px] flex items-center justify-center"><div className="animate-pulse text-primary">Chargement...</div></div>,
  ssr: true
});

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
