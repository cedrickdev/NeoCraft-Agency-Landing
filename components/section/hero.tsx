"use client";

import { Badge } from "@/components/ui/badge";
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 px-4"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full animate-slow-float" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-slow-float" style={{ animationDelay: '-10s' }} />
      </div>

      <div className="container max-w-7xl mx-auto z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center pt-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <Badge variant="outline" className="px-5 py-2 rounded-full border-primary/10 bg-primary/5 text-primary/80 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                {t('badge')}
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-[100px] font-bold tracking-tight leading-[0.9] mb-10"
            >
              <span className="block text-foreground">{t('h1')}</span>
              <span className="text-primary block mt-4 italic font-serif opacity-90 transition-all hover:opacity-100">
                {t('span')}
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground/80 mb-12 max-w-xl leading-relaxed font-medium"
            >
              {t('p')}
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Button
                size="lg"
                className="h-16 px-10 rounded-full text-lg font-bold group transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20 bg-primary text-primary-foreground"
                onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" });
                    } else {
                        window.location.href = "/#contact";
                    }
                }}
              >
                {t('button')}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Link href="/about">
                <Button
                  variant="ghost"
                  size="lg"
                  className="h-16 px-10 rounded-full text-lg font-bold hover:bg-primary/5 transition-all duration-300"
                >
                  {t('button2')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Sophisticated 3D-like Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              {/* Main Sphere */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-3xl animate-pulse" />
              
              <div className="absolute inset-4 rounded-[4rem] glass-card border-primary/20 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                  {/* Abstract moving shapes */}
                  <motion.div 
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-[-20%] border-[2px] border-primary/10 rounded-[3rem] opacity-20"
                  />
                  <motion.div 
                    animate={{ 
                      rotate: -360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                      scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-[-30%] border-[1px] border-primary/5 rounded-[5rem] opacity-10"
                  />
                  
                  {/* Digital particles */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-4 p-8">
                    {[...Array(64)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          opacity: [0.1, 0.5, 0.1],
                          scale: [1, 1.5, 1]
                        }}
                        transition={{ 
                          duration: Math.random() * 3 + 2,
                          repeat: Infinity,
                          delay: Math.random() * 5
                        }}
                        className="w-1 h-1 bg-primary rounded-full"
                      />
                    ))}
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-[120px] font-black text-primary/5 leading-none select-none">NEO</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating accents */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-24 h-24 glass-card rounded-3xl flex items-center justify-center border-primary/20 shadow-2xl shadow-primary/10"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 animate-pulse" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-32 h-32 glass-card rounded-[2rem] flex items-center justify-center border-primary/20 shadow-2xl shadow-primary/10"
              >
                <div className="w-12 h-1 bg-primary/20 rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll</span>
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

