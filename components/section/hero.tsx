import HeroContent from "./hero-content";
import { HeroFloatingElements, HeroParticles, HeroScrollIndicator } from "./hero-visuals";

/**
 * Hero Section - Optimized for LCP
 * 
 * Strategy:
 * - HeroContent: Client Component with useTranslations for reactive locale updates
 * - HeroParticles: Client Component - loaded after hydration (desktop only)
 * - HeroFloatingElements: Client Component - visual enhancements
 * - HeroScrollIndicator: Client Component - scroll indicator with animation
 */
export default function Hero() {
  return (
    <section 
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 px-4 bg-background"
    >
      {/* Particles - Client component, deferred */}
      <HeroParticles />
      
      {/* Blueprint Grid Background - hidden on mobile for performance */}
      <div 
        className="hidden md:block absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.07]" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', 
          backgroundSize: '60px 60px' 
        }} 
        aria-hidden="true"
      />
      
      {/* Decorative Blobs - hidden on mobile for performance */}
      <div className="absolute inset-0 -z-10 bg-background" aria-hidden="true">
        <div className="hidden md:block absolute top-[10%] right-[10%] w-[50%] h-[50%] bg-primary/[0.03] blur-[120px] rounded-full" />
        <div className="hidden md:block absolute bottom-[20%] left-[5%] w-[40%] h-[40%] bg-primary/[0.03] blur-[120px] rounded-full" />
      </div>

      <div className="container max-w-7xl mx-auto z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Hero content with translations */}
          <HeroContent />

          {/* Floating visual elements - Client component */}
          <HeroFloatingElements />
        </div>
      </div>

      {/* Scroll indicator - Client component */}
      <HeroScrollIndicator />
    </section>
  );
}

// Skeleton for SSR fallback (rarely seen, but good practice)
function _HeroContentSkeleton() {
  return (
    <div className="lg:col-span-7 text-left animate-pulse">
      <div className="h-6 w-32 bg-primary/10 rounded-full mb-8" />
      <div className="space-y-4 mb-12">
        <div className="h-16 md:h-24 w-3/4 bg-primary/5 rounded-lg" />
        <div className="h-16 md:h-24 w-1/2 bg-primary/10 rounded-lg" />
      </div>
      <div className="h-8 w-2/3 bg-primary/5 rounded-lg mb-14" />
      <div className="flex gap-6">
        <div className="h-16 w-40 bg-primary/20 rounded-full" />
        <div className="h-16 w-32 bg-primary/5 rounded-full" />
      </div>
    </div>
  );
}
