'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Client Component - Uses useTranslations for reactive locale updates
 */
export default function HeroContent() {
  const t = useTranslations('Hero');

  return (
    <div className="lg:col-span-7 text-left">
      <div className="inline-flex items-center gap-2 mb-8 bg-primary/5 border border-primary/10 px-4 py-1.5 rounded-full backdrop-blur-md animate-fade-in">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60">
          {t('badge')}
        </span>
      </div>

      <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tight leading-[0.85] mb-12 animate-slide-up">
        <span className="block text-foreground mix-blend-difference">{t('h1')}</span>
        <span className="relative inline-block text-primary italic font-serif mt-2">
          {t('span')}
          <svg 
            className="absolute -bottom-4 left-0 w-full h-6 text-primary/30 animate-draw-line" 
            viewBox="0 0 300 24" 
            fill="none"
          >
            <path 
              d="M5 19C50 5 150 5 295 19" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinecap="round"
              className="hero-underline"
            />
          </svg>
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-muted-foreground/70 mb-14 max-w-2xl leading-relaxed font-medium animate-slide-up animation-delay-200">
        {t('p')}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-6 animate-slide-up animation-delay-400">
        <Link href="#contact">
          <Button
            size="lg"
            className="h-16 px-10 rounded-full text-lg font-bold group transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.05)] bg-primary text-primary-foreground overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('button')}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Button>
        </Link>
        
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
    </div>
  );
}
