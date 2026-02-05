"use client";

import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function CTA() {
  const t = useTranslations('CTA');
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(true);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {!isMobile && (
        <Particles
          className="absolute inset-0"
          quantity={100}
          staticity={50}
          ease={50}
          color={theme === "dark" ? "#ffffff" : "#000000"}
          refresh
        />
      )}

      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/[0.03] blur-[120px] rounded-full animate-slow-float" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-primary/[0.02] blur-[100px] rounded-full animate-slow-float" style={{ animationDelay: '-10s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 bg-primary/5 border border-primary/10 px-6 py-2 rounded-full backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/80">
              {t('badge')}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-10">
            <span className="block">{t('title')}</span>
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent italic pr-4">
              {t('subtitle')}
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground/80 mb-14 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="h-16 px-12 rounded-full text-lg font-bold group transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.05)] overflow-hidden relative"
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
