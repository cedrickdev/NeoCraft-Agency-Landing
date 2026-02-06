"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getCalApi } from "@calcom/embed-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Mail,
  MessageSquare,
  Phone
} from "lucide-react";
import { useTranslations } from "next-intl";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const CAL_LINK = "neocraftdev/30min";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";
type FormStep = "name" | "email" | "subject" | "message" | "complete";

export default function ProgressiveContactForm() {
  const t = useTranslations('progressiveContactForm');
  const [currentStep, setCurrentStep] = useState<FormStep>("name");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted && inputRef.current && currentStep !== "complete") {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [currentStep, hasInteracted]);

  // Initialize Cal.com embed - lazy loaded when section is visible
  const [calLoaded, setCalLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !calLoaded) {
          setCalLoaded(true);
          (async function () {
            const cal = await getCalApi();
            cal("init");
          })();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [calLoaded]);

  const handleNext = () => {
    const steps: FormStep[] = ["name", "email", "subject", "message", "complete"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: FormStep[] = ["name", "email", "subject", "message", "complete"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    setFormStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setFormStatus("success");
        setCurrentStep("complete");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (currentStep === "message" && isStepValid(currentStep)) {
        handleSubmit();
      } else if (isStepValid(currentStep)) {
        handleNext();
      }
    }
  };

  const isStepValid = (step: FormStep) => {
    switch (step) {
      case "name": return formData.name.trim().length > 0;
      case "email": return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case "subject": return formData.subject.trim().length > 0;
      case "message": return formData.message.trim().length > 5;
      default: return false;
    }
  };

  const getProgressPercentage = () => {
    const steps = ["name", "email", "subject", "message"];
    const currentIndex = steps.indexOf(currentStep);
    return currentStep === "complete" ? 100 : ((currentIndex + 1) / steps.length) * 100;
  };

  return (
    <section ref={sectionRef} id="contact" className="py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full border-primary/10 bg-primary/5 text-primary/80 font-medium">
              {t('badge')}
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t('title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t('description')}
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3 h-full"
          >
            <div className="glass-card rounded-[3rem] overflow-hidden flex flex-col h-full min-h-[500px]">
              {/* Progress Line */}
              <div className="h-1 bg-primary/5">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                />
              </div>

              <div className="p-10 md:p-16 flex-grow flex flex-col">
                <AnimatePresence mode="wait">
                  {currentStep === "complete" ? (
                    <motion.div
                      key="complete"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center h-full py-12"
                    >
                      <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-8">
                        <CheckCircle className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4 tracking-tight">
                        {t('formData.thanks')} {formData.name} !
                      </h3>
                      <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                        {t('formData.message')} <span className="text-primary font-medium">{formData.email}</span>.
                      </p>
                      <Badge variant="secondary" className="mt-8 px-6 py-2 rounded-xl bg-primary/5 text-primary border-none">
                        {t('formData.time')}
                      </Badge>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                      className="flex flex-col h-full"
                    >
                      <div className="mb-12">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary/40 mb-3 block">
                          {t('step.name')} {["name", "email", "subject", "message"].indexOf(currentStep) + 1} {t('step.of')}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                          {currentStep === "name" && t('formStepTitle.name')}
                          {currentStep === "email" && `${t('formStepTitle.email.start')} ${formData.name}${t('formStepTitle.email.end')}`}
                          {currentStep === "subject" && t('formStepTitle.subject')}
                          {currentStep === "message" && t('formStepTitle.message')}
                        </h3>
                      </div>

                      <div className="flex-grow">
                        {currentStep === "name" && (
                          <Input
                            ref={inputRef as any}
                            placeholder={t('formStepPlaceholder.name')}
                            aria-label={t('formStepPlaceholder.name')}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            onKeyPress={handleKeyPress}
                            onFocus={() => setHasInteracted(true)}
                            className="text-2xl md:text-3xl h-auto py-4 bg-transparent border-0 border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none shadow-none rounded-none placeholder:opacity-20 font-medium"
                          />
                        )}
                        {currentStep === "email" && (
                          <Input
                            ref={inputRef as any}
                            type="email"
                            placeholder={t('formStepPlaceholder.email')}
                            aria-label={t('formStepPlaceholder.email')}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            onKeyPress={handleKeyPress}
                            onFocus={() => setHasInteracted(true)}
                            className="text-2xl md:text-3xl h-auto py-4 bg-transparent border-0 border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none shadow-none rounded-none placeholder:opacity-20 font-medium"
                          />
                        )}
                        {currentStep === "subject" && (
                          <Input
                            ref={inputRef as any}
                            placeholder={t('formStepPlaceholder.subject')}
                            aria-label={t('formStepPlaceholder.subject')}
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            onKeyPress={handleKeyPress}
                            onFocus={() => setHasInteracted(true)}
                            className="text-2xl md:text-3xl h-auto py-4 bg-transparent border-0 border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none shadow-none rounded-none placeholder:opacity-20 font-medium"
                          />
                        )}
                        {currentStep === "message" && (
                          <Textarea
                            ref={inputRef as any}
                            placeholder={t('formStepPlaceholder.message')}
                            aria-label={t('formStepPlaceholder.message')}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            onKeyPress={handleKeyPress}
                            onFocus={() => setHasInteracted(true)}
                            className="text-2xl md:text-3xl h-auto py-4 bg-transparent border-0 border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none shadow-none rounded-none placeholder:opacity-20 font-medium resize-none min-h-[150px]"
                          />
                        )}
                      </div>

                      <div className="mt-12 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            {["email", "subject", "message"].includes(currentStep) && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleBack}
                                    className="h-10 px-4 rounded-xl text-muted-foreground hover:text-primary transition-all flex items-center gap-2"
                                >
                                    <ArrowRight className="w-4 h-4 rotate-180" />
                                    {t('formStatus.back')}
                                </Button>
                            )}
                            <p className="text-sm text-muted-foreground font-medium opacity-50 hidden md:block">
                            {t('action.continue')} (Enter ↵)
                            </p>
                        </div>
                        <Button
                          size="lg"
                          disabled={!isStepValid(currentStep) || formStatus === "loading"}
                          onClick={currentStep === "message" ? handleSubmit : handleNext}
                          className="h-14 px-10 rounded-2xl group transition-all duration-300"
                        >
                          {formStatus === "loading" ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              {currentStep === "message" ? t('formStatus.send') : t('formStatus.continue')}
                              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card p-10 rounded-[3rem] space-y-10">
              <h3 className="text-2xl font-bold tracking-tight">{t('contact.title')}</h3>
              
              <div className="space-y-8">
                {[
                  { icon: Mail, label: "Email", value: t('contact.email'), href: `mailto:${t('contact.email')}` },
                  { icon: MessageSquare, label: "WhatsApp", value: t('contact.whatsapp'), href: "https://wa.me/41778078806" },
                  { icon: Phone, label: "Phone", value: t('contact.phone'), href: "tel:+41778078806" }
                ].map((item, i) => (
                  <a key={i} href={item.href} className="group flex items-center gap-6">
                    <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-all duration-300" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-1">{item.label}</p>
                      <p className="font-semibold text-lg hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card p-10 rounded-[3rem] bg-card border-primary/5 group hover:border-primary/20 transition-all duration-500">
              <div className="space-y-6">
                <Calendar className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-all duration-500" />
                <h4 className="text-xl font-bold tracking-tight">
                  {t('call.title')}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {t('call.description')}
                </p>
                <Button 
                  data-cal-link={CAL_LINK}
                  size="lg"
                  className="w-full h-14 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-primary/10 cursor-pointer"
                >
                  {t('call.button')}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

