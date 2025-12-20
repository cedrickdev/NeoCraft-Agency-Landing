"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CTA() {
    const t = useTranslations('cta');
    
    const stats = [
        { value: "3", label: t('stats.years') },
        { value: "6+", label: t('stats.projects') },
        { value: "98%", label: t('stats.clients') },
        { value: "24h", label: t('stats.time') },
    ];

    return (
        <section className="py-32 relative overflow-hidden bg-background">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="glass-card p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden group">
                        {/* Decorative background blur */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-primary/5 blur-[120px] rounded-full group-hover:bg-primary/10 transition-colors duration-700" />
                        
                        <div className="relative z-10 flex flex-col items-center gap-8">
                            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                                <Sparkles className="w-6 h-6" />
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                                {t('title.h1')}
                                <span className="text-gradient block mt-2">
                                    {t('title.span')}
                                </span>
                            </h2>

                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                {t('description')}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 my-8">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs uppercase tracking-[0.1em] text-muted-foreground font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="h-14 px-10 rounded-full text-base font-medium group transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
                                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                                >
                                    {t('button.cta')}
                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                                
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className="h-14 px-10 rounded-full text-base font-medium hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto"
                                    onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                                >
                                    {t('button.more')}
                                </Button>
                            </div>

                            {/* Trust Message */}
                            <div className="mt-12 pt-8 border-t border-primary/5 w-full">
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/40 mb-8 font-semibold">
                                    {t('trustMessage')}
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                                    <span className="text-xl font-bold tracking-tighter">TechStart</span>
                                    <span className="text-xl font-bold tracking-tighter">Sigeris</span>
                                    <span className="text-xl font-bold tracking-tighter">StartupLab</span>
                                    <span className="text-xl font-bold tracking-tighter">Innovate</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

