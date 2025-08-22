'use client';

import {AnimatePresence, motion, useScroll, useTransform,} from "framer-motion";


import {useTranslations} from 'next-intl';
import {ChevronRight, Menu, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {DarkModeToggle} from "@/components/DarkModeToggle";
import Image from 'next/image'
import Link from "next/link";

export default function Header() {
    const t = useTranslations('Header');


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {scrollYProgress} = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);


    return (
        <header
            className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10 dark:border-gray-800/50"
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div
                    className="flex items-center space-x-2"
                >
                    <Link href="/">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lgdark:shadow-emerald-500/20">
                            <Image
                                src="/logo/logo.png"
                                width={110}
                                height={110}
                                alt="Logo NeoCraft"
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link
                        href="#about"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium"
                    >
                        {t("about")}
                    </Link>
                    <Link
                        href="#iservices"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium"
                    >
                        {t("services")}
                    </Link>
                    {/*  <Link
            href="#team"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium"
          >
            Équipe
          </Link> */}
                    <Link
                        href="#contact"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium"
                    >
                        {t("contact")}
                    </Link>
                    <Link
                        href="/blog"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium"
                    >
                        Blog
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <LanguageSwitcher/>

                    <DarkModeToggle/>

                    <Button
                        variant="default"
                        aria-label="Contact us"
                        className="hidden md:flex bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white shadow-lg shadow-blue-500/20 dark:shadow-emerald-500/20"
                        onClick={() =>
                            document
                                .getElementById("contact")
                                ?.scrollIntoView({behavior: "smooth"})
                        }
                    >
                        {t("cta")}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle Menu"
                        className="md:hidden bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="w-5 h-5"/>
                        ) : (
                            <Menu className="w-5 h-5"/>
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-hidden"
                    >
                        <nav className="container mx-auto px-4 py-6 flex flex-col space-y-6">
                            <Link
                                href="#about"
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium flex items-center justify-between"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t("about")}
                                <ChevronRight className="w-5 h-5"/>
                            </Link>
                            <a
                                href="#services"
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium flex items-center justify-between"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t("services")}
                                <ChevronRight className="w-5 h-5"/>
                            </a>
                            {/*<Link
                href="#team"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                Équipe
                <ChevronRight className="w-5 h-5" />
              </Link>*/}
                            <Link
                                href="#contact"
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium flex items-center justify-between"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t("contact")}
                                <ChevronRight className="w-5 h-5"/>
                            </Link>
                            <Link
                                href="/blog"
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium flex items-center justify-between"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Blog
                                <ChevronRight className="w-5 h-5"/>
                            </Link>
                            <Button
                                aria-label="Contact us"
                                className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white"
                                onClick={() => {
                                    document
                                        .getElementById("contact")
                                        ?.scrollIntoView({behavior: "smooth"});
                                    setIsMenuOpen(false);
                                }}
                            >
                                {t("cta")}
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
