"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export default function Hero() {
  const t = useTranslations('Hero');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 px-4"
    >
      {/* Premium Gradient Background Elements */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl aspect-[2/1] bg-gradient-to-b from-primary/5 to-transparent blur-[120px] rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container max-w-5xl mx-auto text-center z-10"
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/10 bg-primary/5 text-primary/80 font-medium backdrop-blur-sm">
            {t('badge')}
          </Badge>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
        >
          <span className="block text-foreground">{t('h1')}</span>
          <span className="text-gradient block mt-2">
            {t('span')}
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {t('p')}
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="h-14 px-8 rounded-full text-base font-medium group transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t('button')}
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className="h-14 px-8 rounded-full text-base font-medium hover:bg-primary/5 transition-all duration-300"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t('button2')}
          </Button>
        </motion.div>
      </motion.div>

      {/* Visual representation of innovation/tech - subtle and abstract */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="mt-20 w-full max-w-6xl mx-auto relative px-4"
      >
        <div className="glass-card rounded-2xl aspect-[16/9] md:aspect-[21/9] overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          
          {/* Abstract Grid Elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          
          <div className="flex flex-col items-center justify-center h-full gap-6 opacity-40 group-hover:opacity-60 transition-opacity">
            <div className="w-16 h-1 bg-foreground/20 rounded-full animate-pulse" />
            <div className="w-32 h-1 bg-foreground/10 rounded-full" />
            <div className="w-24 h-1 bg-foreground/15 rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

