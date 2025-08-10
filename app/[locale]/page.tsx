"use client";

import type React from "react";

import Footer from "@/components/section/footer";
import CTA from "@/components/section/cta";
import {Testimonial} from "@/components/section/testimonial";
import Methodology from "@/components/section/methodology";
import Services from "@/components/section/services";
import Hero from "@/components/section/hero";
import About from "@/components/section/about";
import Header from "@/components/header";
import InteractiveServices from "@/components/section/interactive-services";
import ProgressiveContactForm from "@/components/section/progressive-contact-form";
import {ChatWidget} from "@/components/chat-widget";

export default function NeoCraftLanding() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
            <Header/>

            <Hero/>

            <About/>

            <Services/>

            <InteractiveServices/>

            <Methodology/>

            <Testimonial/>

            <ProgressiveContactForm/>

            <CTA/>

            <ChatWidget/>

            <Footer/>
        </div>
    );
}
