"use client";

import { Particles } from "@/components/ui/particles";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Client Component - Handles animations and interactive visuals
 * Loaded after main content for progressive enhancement
 */
export function HeroParticles() {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted || isMobile) return null;

  return (
    <Particles
      className="absolute inset-0 z-0"
      quantity={200}
      staticity={60}
      ease={50}
      color={theme === "dark" ? "#ffffff" : "#000000"}
      refresh
    />
  );
}

export function HeroFloatingElements() {
  return (
    <div className="lg:col-span-5 relative perspective-1000 hidden lg:block">
      <motion.div 
        initial={{ opacity: 0, rotateY: 20, rotateX: 10 }}
        animate={{ opacity: 1, rotateY: 0, rotateX: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full aspect-[4/5] flex items-center justify-center"
      >
        {/* Floating UI Elements */}
        <motion.div 
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-64 glass-card p-6 rounded-3xl border-primary/20 shadow-2xl z-30"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-3/4 bg-primary/10 rounded-full" />
            <div className="h-4 w-full bg-primary/5 rounded-full" />
            <div className="h-20 w-full bg-primary/5 rounded-2xl border border-dashed border-primary/10 flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary/20 uppercase tracking-widest">Design Draft</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 left-0 w-72 glass-card p-6 rounded-3xl border-primary/20 shadow-2xl z-20"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">Component.tsx</span>
            <div className="w-4 h-4 rounded-md bg-primary/10" />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-primary/20 rounded-full" />
            <div className="h-2 w-5/6 bg-primary/10 rounded-full" />
            <div className="h-2 w-4/6 bg-primary/10 rounded-full" />
          </div>
        </motion.div>

        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[80%] aspect-square rounded-[4rem] border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent flex items-center justify-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-mesh opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
          <div className="text-[140px] font-black text-primary/5 select-none leading-none tracking-tighter">N</div>
          
          <div className="absolute top-1/4 right-1/4 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            Precision 100%
          </div>
        </motion.div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 400 500">
          <path d="M100 100 L300 200 M200 400 L100 200" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        </svg>
      </motion.div>
    </div>
  );
}

export function HeroScrollIndicator() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40"
    >
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Explore Craft</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5 text-primary/20" />
      </motion.div>
    </motion.div>
  );
}
