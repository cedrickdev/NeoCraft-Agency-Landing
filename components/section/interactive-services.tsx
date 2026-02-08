"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle, Code2, GraduationCap, Lightbulb, Palette, Search, TestTube, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function InteractiveServices() {
    const t = useTranslations('iServices');
    const [activeMainService, setActiveMainService] = useState("development");
    const [activeSubService, setActiveSubService] = useState("custom-development");

    interface ServiceData {
        icon: any;
        title: string;
        description: string;
        details: string;
        features: string[];
        cta: string;
    }

    interface ServicesDataType {
        [key: string]: {
            [key: string]: ServiceData;
        };
    }

    const servicesData: ServicesDataType = {
        development: {
            "custom-development": {
                icon: Code2,
                title: t('development.customDevelopment.title'),
                description: t('development.customDevelopment.description'),
                details: t('development.customDevelopment.details'),
                features: [
                    t('development.customDevelopment.features.feature1'),
                    t('development.customDevelopment.features.feature2'),
                    t('development.customDevelopment.features.feature3'),
                    t('development.customDevelopment.features.feature4'),
                    t('development.customDevelopment.features.feature5'),
                    t('development.customDevelopment.features.feature6'),
                ],
                cta: t('development.customDevelopment.cta')
            },
            ecommerce: {
                icon: Users,
                title: t('development.ecommerce.title'),
                description: t('development.ecommerce.description'),
                details: t('development.ecommerce.details'),
                features: [
                    t('development.ecommerce.features.feature1'),
                    t('development.ecommerce.features.feature2'),
                    t('development.ecommerce.features.feature3'),
                    t('development.ecommerce.features.feature4'),
                    t('development.ecommerce.features.feature5'),
                    t('development.ecommerce.features.feature6'),
                ],
                cta: t('development.ecommerce.cta'),
            },
            showcase: {
                icon: Palette,
                title: t('development.showcase.title'),
                description: t('development.showcase.description'),
                details: t('development.showcase.details'),
                features: [
                    t('development.showcase.features.feature1'),
                    t('development.showcase.features.feature2'),
                    t('development.showcase.features.feature3'),
                    t('development.showcase.features.feature4'),
                    t('development.showcase.features.feature5'),
                    t('development.showcase.features.feature6'),
                ],
                cta: t('development.showcase.cta'),
            },
        },
        marketing: {
            seo: {
                icon: Search,
                title: t('marketing.seo.title'),
                description: t('marketing.seo.description'),
                details: t('marketing.seo.details'),
                features: [
                    t('marketing.seo.features.feature1'),
                    t('marketing.seo.features.feature2'),
                    t('marketing.seo.features.feature3'),
                    t('marketing.seo.features.feature4'),
                    t('marketing.seo.features.feature5'),
                    t('marketing.seo.features.feature6'),
                ],
                cta: t('marketing.seo.cta'),
            },
            "social-media": {
                icon: Users,
                title: t('marketing.social-media.title'),
                description: t('marketing.social-media.description'),
                details: t('marketing.social-media.details'),
                features: [
                    t('marketing.social-media.features.feature1'),
                    t('marketing.social-media.features.feature2'),
                    t('marketing.social-media.features.feature3'),
                    t('marketing.social-media.features.feature4'),
                    t('marketing.social-media.features.feature5'),
                    t('marketing.social-media.features.feature6'),
                ],
                cta: t('marketing.social-media.cta'),
            },
            advertising: {
                icon: Zap,
                title: t('marketing.advertising.title'),
                description: t('marketing.advertising.description'),
                details: t('marketing.advertising.details'),
                features: [
                    t('marketing.advertising.features.feature1'),
                    t('marketing.advertising.features.feature2'),
                    t('marketing.advertising.features.feature3'),
                    t('marketing.advertising.features.feature4'),
                    t('marketing.advertising.features.feature5'),
                    t('marketing.advertising.features.feature6'),
                ],
                cta: t('marketing.advertising.cta'),
            },
        },
        consulting: {
            strategy: {
                icon: Lightbulb,
                title: t('consulting.strategy.title'),
                description: t('consulting.strategy.description'),
                details: t('consulting.strategy.details'),
                features: [
                    t('consulting.strategy.features.feature1'),
                    t('consulting.strategy.features.feature2'),
                    t('consulting.strategy.features.feature3'),
                    t('consulting.strategy.features.feature4'),
                    t('consulting.strategy.features.feature5'),
                    t('consulting.strategy.features.feature6'),
                ],
                cta: t('consulting.strategy.cta'),
            },
            training: {
                icon: GraduationCap,
                title: t('consulting.training.title'),
                description: t('consulting.training.description'),
                details: t('consulting.training.details'),
                features: [
                    t('consulting.training.features.feature1'),
                    t('consulting.training.features.feature2'),
                    t('consulting.training.features.feature3'),
                    t('consulting.training.features.feature4'),
                    t('consulting.training.features.feature5'),
                    t('consulting.training.features.feature6'),
                ],
                cta: t('consulting.training.cta'),
            },
            audit: {
                icon: TestTube,
                title: t('consulting.audit.title'),
                description: t('consulting.audit.description'),
                details: t('consulting.audit.details'),
                features: [
                    t('consulting.audit.features.feature1'),
                    t('consulting.audit.features.feature2'),
                    t('consulting.audit.features.feature3'),
                    t('consulting.audit.features.feature4'),
                    t('consulting.audit.features.feature5'),
                    t('consulting.audit.features.feature6'),
                ],
                cta: t('consulting.audit.cta'),
            },
        },
    };

    const subServicesConfig = {
        development: [
            { id: "custom-development", name: t('subServices.development.1') },
            { id: "ecommerce", name: t('subServices.development.2') },
            { id: "showcase", name: t('subServices.development.3') },
        ],
        marketing: [
            { id: "seo", name: t('subServices.marketing.1') },
            { id: "social-media", name: t('subServices.marketing.2') },
            { id: "advertising", name: t('subServices.marketing.3') },
        ],
        consulting: [
            { id: "strategy", name: t('subServices.consulting.1') },
            { id: "training", name: t('subServices.consulting.2') },
            { id: "audit", name: t('subServices.consulting.3') },
        ],
    };

    useEffect(() => {
        const firstSubService = subServicesConfig[activeMainService as keyof typeof subServicesConfig][0];
        if (firstSubService) {
            setActiveSubService(firstSubService.id);
        }
    }, [activeMainService]);

    const currentSubServices = subServicesConfig[activeMainService as keyof typeof subServicesConfig] || [];
    const currentServiceData = servicesData[activeMainService]?.[activeSubService] || ({} as ServiceData);

    return (
        <section id="iservices" className="py-16 md:py-32 relative overflow-hidden bg-background">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Badge variant="outline" className="mb-4 md:mb-6 px-4 py-1.5 rounded-full border-primary/10 bg-primary/5 text-primary/80 font-medium text-xs">
                            Full Stack Agency
                        </Badge>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
                            {t('title')}
                        </h2>
                        <p className="text-base md:text-xl text-muted-foreground leading-relaxed px-2">
                            {t('description')}
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Main Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 md:mb-12">
                        {["development", "marketing", "consulting"].map((id) => (
                            <button
                                key={id}
                                onClick={() => setActiveMainService(id)}
                                className={`px-5 sm:px-10 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-bold transition-all duration-300 ${
                                    activeMainService === id
                                        ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105"
                                        : "bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                }`}
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                        {/* Sub-service sidebar - horizontal scroll on mobile */}
                        <div className="lg:col-span-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeMainService}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="flex lg:flex-col gap-2 sm:gap-4 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none"
                                >
                                    {currentSubServices.map((sub) => (
                                        <button
                                            key={sub.id}
                                            onClick={() => setActiveSubService(sub.id)}
                                            className={`flex-shrink-0 text-left px-4 py-3 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 border-2 ${
                                                activeSubService === sub.id
                                                    ? "bg-primary/5 border-primary/20 shadow-lg"
                                                    : "bg-transparent border-transparent hover:bg-primary/5 text-muted-foreground"
                                            }`}
                                        >
                                            <span className={`text-sm sm:text-xl font-bold tracking-tight whitespace-nowrap lg:whitespace-normal ${activeSubService === sub.id ? "text-primary" : ""}`}>
                                                {sub.name}
                                            </span>
                                        </button>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Service Content */}
                        <div className="lg:col-span-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSubService}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="glass-card rounded-2xl md:rounded-[3rem] p-6 sm:p-10 md:p-16 h-full border-primary/10"
                                >
                                    <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-10">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                                            {currentServiceData.icon && <currentServiceData.icon className="w-6 h-6 sm:w-8 sm:h-8" />}
                                        </div>
                                        <h3 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                                            {currentServiceData.title}
                                        </h3>
                                    </div>

                                    <div className="space-y-6 sm:space-y-8">
                                        <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">
                                            {currentServiceData.description}
                                        </p>

                                        {currentServiceData.features && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                {currentServiceData.features.map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-3 p-3 sm:p-4 bg-primary/5 rounded-xl border border-primary/5">
                                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary/40 flex-shrink-0" />
                                                        <span className="font-semibold text-sm sm:text-base">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="pt-6 sm:pt-8 border-t border-primary/5">
                                            <p className="text-primary font-bold text-sm sm:text-lg flex items-center gap-2 sm:gap-3 italic">
                                                <Zap className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                                                {currentServiceData.cta}
                                            </p>
                                        </div>
                                        
                                        <Button 
                                            size="lg" 
                                            className="h-12 sm:h-14 px-6 sm:px-10 rounded-xl sm:rounded-2xl group transition-all w-full sm:w-auto"
                                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                                        >
                                            {t('getStarted')}
                                            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
