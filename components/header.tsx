"use client";

import { DarkModeToggle } from "@/components/DarkModeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const t = useTranslations('Header');
    const locale = useLocale();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const navLinks = [
        { href: "/about", label: t("about") },
        { href: "/realisations", label: t("realisations") },
        { href: "/team", label: "Équipe" },
        { href: `/${locale}#services`, label: t("services") },
        { href: `/${locale}#contact`, label: t("contact") },
        { href: "/blog", label: "Blog" },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled 
                ? "py-3 bg-background/80 backdrop-blur-xl border-b border-primary/5" 
                : "py-6 bg-transparent"
            }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="relative z-50 flex items-center group">
                    <motion.div 
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="w-10 h-10 relative"
                    >
                        <Image
                            src="/logo/logo.png"
                            width={40}
                            height={40}
                            alt="NeoCraft"
                            priority
                            className="grayscale contrast-125 brightness-0 dark:brightness-200 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                        />
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10 bg-background/40 backdrop-blur-md px-10 py-3 rounded-full border border-primary/5 shadow-2xl shadow-primary/5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-[13px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all duration-300"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-1">
                        <LanguageSwitcher />
                        <DarkModeToggle />
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        <Button
                            size="sm"
                            className="h-10 px-6 rounded-full font-bold group transition-all active:scale-95 shadow-lg shadow-primary/10"
                            onClick={() => {
                                const contactSection = document.getElementById("contact");
                                if (contactSection) {
                                    contactSection.scrollIntoView({ behavior: "smooth" });
                                } else {
                                    window.location.href = `/${locale}#contact`;
                                }
                            }}
                        >
                            {t("cta")}
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden w-10 h-10 rounded-full hover:bg-primary/5"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed inset-x-4 top-24 z-40 md:hidden"
                    >
                        <div className="glass-card p-8 rounded-[2rem] shadow-2xl border-primary/10">
                            <nav className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-2xl font-bold tracking-tight hover:text-primary transition-colors flex items-center justify-between"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                        <ArrowRight className="w-5 h-5 opacity-20" />
                                    </Link>
                                ))}
                                <div className="pt-6 border-t border-primary/5 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <LanguageSwitcher />
                                        <DarkModeToggle />
                                    </div>
                                    <Button
                                        className="rounded-xl px-6"
                                        onClick={() => {
                                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        {t("cta")}
                                    </Button>
                                </div>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

