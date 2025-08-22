"use client";

import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {CheckCircle, Code2, GraduationCap, Lightbulb, Palette, Search, TestTube, Users, Zap,} from "lucide-react";
import {useTranslations} from "next-intl";


export default function InteractiveServices() {
    const t = useTranslations('iServices');
    const [activeMainService, setActiveMainService] = useState("development");
    const [activeSubService, setActiveSubService] =
        useState("custom-development");


// Types
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

// Services Data
    // @ts-ignore
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

// Sub-services configuration
    const subServicesConfig = {
        development: [
            {id: "custom-development", name: t('subServices.development.1')},
            {id: "ecommerce", name: t('subServices.development.2')},
            {id: "showcase", name: t('subServices.development.3')},
        ],
        marketing: [
            {id: "seo", name: t('subServices.marketing.1')},
            {id: "social-media", name: t('subServices.marketing.2')},
            {id: "advertising", name: t('subServices.marketing.3')},
        ],
        consulting: [
            {id: "strategy", name: t('subServices.consulting.1')},
            {id: "training", name: t('subServices.consulting.2')},
            {id: "audit", name: t('subServices.consulting.3')},
        ],
    };


    // Update sub-service when main service changes
    useEffect(() => {
        const firstSubService =
            subServicesConfig[activeMainService as keyof typeof subServicesConfig][0];
        if (firstSubService) {
            setActiveSubService(firstSubService.id);
        }
    }, [activeMainService]);

    // Get current sub-services
    const currentSubServices =
        subServicesConfig[activeMainService as keyof typeof subServicesConfig] ||
        [];

    // Get current service data
    const currentServiceData =
        servicesData[activeMainService]?.[activeSubService] || {};

    return (
        <section id="iservices" className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900"></div>
                <div
                    className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-l-full blur-3xl"></div>
                <div
                    className="absolute left-0 bottom-1/4 w-1/4 h-1/3 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-r-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        {t('title')}
                    </h2>
                    <div
                        className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8 rounded-full"></div>
                    <div className="max-w-4xl mx-auto space-y-4">
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t('description')}
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            {t('p')}
                        </p>
                    </div>
                </motion.div>
                é
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.2}}
                    className="max-w-6xl mx-auto"
                >
                    <div className="w-full">
                        {/* Main Service Tabs */}
                        <div className="flex flex-col md:flex-row justify-center mb-8 gap-4">
                            <button
                                aria-label="Development"
                                onClick={() => setActiveMainService("development")}
                                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
                                    activeMainService === "development"
                                        ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-500/25"
                                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                                }`}
                            >
                                {t('development.title')}
                            </button>
                            <button
                                aria-label="Marketing"
                                onClick={() => setActiveMainService("marketing")}
                                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
                                    activeMainService === "marketing"
                                        ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-500/25"
                                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                                }`}
                            >
                                {t('marketing.title')}
                            </button>
                            <button
                                aria-label="Consulting"
                                onClick={() => setActiveMainService("consulting")}
                                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
                                    activeMainService === "consulting"
                                        ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-500/25"
                                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                                }`}
                            >
                                {t('consulting.title')}
                            </button>
                        </div>

                        {/* Service Content Container */}
                        <div className="bg-gradient-to-br from-blue-600 to-emerald-500 rounded-3xl p-8 shadow-2xl">
                            {/* Sub-service buttons */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeMainService}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    transition={{duration: 0.3}}
                                    className="flex flex-wrap justify-center gap-4 mb-8"
                                >
                                    {currentSubServices.map((subService) => (
                                        <button
                                            aria-label="sub-service"
                                            key={subService.id}
                                            onClick={() => setActiveSubService(subService.id)}
                                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                                activeSubService === subService.id
                                                    ? "bg-white text-blue-600 shadow-lg"
                                                    : "bg-blue-400/50 text-white hover:bg-blue-400/70"
                                            }`}
                                        >
                                            {subService.name}
                                        </button>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            {/* Service Description */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSubService}
                                    initial={{opacity: 0, y: 30}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -30}}
                                    transition={{duration: 0.4}}
                                    className="bg-white dark:bg-gray-900 rounded-2xl p-8"
                                >
                                    <div className="flex items-start gap-4 mb-6">
                                        <div
                                            className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            {currentServiceData.icon && (
                                                <currentServiceData.icon className="w-6 h-6 text-white"/>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                {currentServiceData.title}
                                            </h3>
                                            <div
                                                className="w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full"></div>
                                        </div>
                                    </div>

                                    <div className="prose prose-lg max-w-none">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                            {currentServiceData.description}
                                        </p>

                                        {currentServiceData.details && (
                                            <div className="space-y-4">
                                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                    {currentServiceData.details}
                                                </p>
                                            </div>
                                        )}

                                        {currentServiceData.features && (
                                            <div className="mt-6">
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                                    {t('functionalities')}
                                                </h4>
                                                <ul className="grid md:grid-cols-2 gap-2">
                                                    {currentServiceData.features.map((feature, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center text-gray-700 dark:text-gray-300"
                                                        >
                                                            <CheckCircle
                                                                className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"/>
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {currentServiceData.cta && (
                                            <div
                                                className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                                <p className="text-blue-700 dark:text-blue-300 font-semibold text-lg">
                                                    {currentServiceData.cta}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
