"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";

export default function Hero() {
  const t = useTranslations('Hero');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 px-4 bg-background"
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.07]" 
           style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      {/* Decorative Blobs */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute top-[10%] right-[10%] w-[50%] h-[50%] bg-primary/[0.03] blur-[120px] rounded-full animate-slow-float" />
        <div className="absolute bottom-[20%] left-[5%] w-[40%] h-[40%] bg-primary/[0.03] blur-[120px] rounded-full animate-slow-float" style={{ animationDelay: '-10s' }} />
      </div>

      <div className="container max-w-7xl mx-auto z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            style={{ y: yText }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-left"
          >
            <div className="inline-flex items-center gap-2 mb-8 bg-primary/5 border border-primary/10 px-4 py-1.5 rounded-full backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60">
                {t('badge')}
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tight leading-[0.85] mb-12">
              <span className="block text-foreground mix-blend-difference">{t('h1')}</span>
              <span className="relative inline-block text-primary italic font-serif mt-2">
                {t('span')}
                <motion.svg 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                  className="absolute -bottom-4 left-0 w-full h-6 text-primary/30" 
                  viewBox="0 0 300 24" 
                  fill="none"
                >
                  <path d="M5 19C50 5 150 5 295 19" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </motion.svg>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground/70 mb-14 max-w-2xl leading-relaxed font-medium">
              {t('p')}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button
                size="lg"
                className="h-16 px-10 rounded-full text-lg font-bold group transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.05)] bg-primary text-primary-foreground overflow-hidden relative"
                onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" });
                    } else {
                        window.location.href = "/#contact";
                    }
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('button')}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>
              
              <Link href="/about">
                <Button
                  variant="ghost"
                  size="lg"
                  className="h-16 px-10 rounded-full text-lg font-bold hover:bg-primary/5 transition-all duration-300 group"
                >
                  {t('button2')}
                  <div className="ml-2 w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* New Digital Craft Canvas */}
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
                
                {/* Floating tooltips */}
                <div className="absolute top-1/4 right-1/4 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  Precision 100%
                </div>
              </motion.div>

              {/* Connecting Lines (Craft feel) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 400 500">
                <path d="M100 100 L300 200 M200 400 L100 200" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" fill="none" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

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
    </section>
  );
}

