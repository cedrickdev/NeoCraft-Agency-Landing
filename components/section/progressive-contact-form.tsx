"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  User,
  Mail,
  MessageSquare,
  FileText,
  Send,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";
type FormStep = "name" | "email" | "subject" | "message" | "complete";

export default function ProgressiveContactForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>("name");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Focus input when step changes
  useEffect(() => {
    if (inputRef.current && currentStep !== "complete") {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [currentStep]);

  const handleNext = () => {
    const steps: FormStep[] = [
      "name",
      "email",
      "subject",
      "message",
      "complete",
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleSubmit = async () => {
    setFormStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
        headers: { "Content-Type": "application/json" },
      });

      let isSuccess = res.ok;
      let errorData = null;

      if (!isSuccess) {
        errorData = await res.json();
        console.error("Erreur lors de l'envoi:", errorData);
      }

      if (isSuccess) {
        setFormStatus("success");
        setCurrentStep("complete");
        setTimeout(() => {
          setFormStatus("idle");
          setCurrentStep("name");
          setFormData({ name: "", email: "", subject: "", message: "" });
        }, 3000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (currentStep === "message") {
        handleSubmit();
      } else {
        handleNext();
      }
    }
  };

  const getStepIcon = (step: FormStep) => {
    switch (step) {
      case "name":
        return User;
      case "email":
        return Mail;
      case "subject":
        return FileText;
      case "message":
        return MessageSquare;
      default:
        return CheckCircle;
    }
  };

  const getStepTitle = (step: FormStep) => {
    switch (step) {
      case "name":
        return "Comment pouvons-nous vous appeler ?";
      case "email":
        return `Ravi de vous rencontrer ${formData.name} ! Quel est votre email ?`;
      case "subject":
        return "De quoi souhaitez-vous parler ?";
      case "message":
        return "Parlez-nous de votre projet";
      case "complete":
        return "Message envoyé avec succès !";
      default:
        return "";
    }
  };

  const getStepPlaceholder = (step: FormStep) => {
    switch (step) {
      case "name":
        return "Votre prénom ou nom...";
      case "email":
        return "votre@email.com";
      case "subject":
        return "Sujet de votre message...";
      case "message":
        return "Décrivez votre projet, vos besoins, vos objectifs...";
      default:
        return "";
    }
  };

  const isStepValid = (step: FormStep) => {
    switch (step) {
      case "name":
        return formData.name.trim().length > 0;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case "subject":
        return formData.subject.trim().length > 0;
      case "message":
        return formData.message.trim().length > 10;
      default:
        return false;
    }
  };

  const getProgressPercentage = () => {
    const steps = ["name", "email", "subject", "message"];
    const currentIndex = steps.indexOf(currentStep);
    return currentStep === "complete"
      ? 100
      : ((currentIndex + 1) / steps.length) * 100;
  };

  if (currentStep === "complete") {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="h-2 bg-gradient-to-r from-blue-600 to-emerald-500"></div>
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Merci {formData.name} !
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Votre message a été envoyé avec succès. Nous vous répondrons dans
              les plus brefs délais à l'adresse{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {formData.email}
              </span>
              .
            </p>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
              <p className="text-emerald-800 dark:text-emerald-400 text-sm">
                ✨ Temps de réponse habituel : moins de 24h
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white dark:bg-gray-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] opacity-50 dark:opacity-20"></div>
        <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-800/30 px-4 py-1.5 text-sm font-medium">
            Contactez-nous
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Parlons de votre projet
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Prêt à démarrer votre projet ? Contactez-nous pour discuter de vos
            besoins et découvrir comment nous pouvons vous aider.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
              {/* Progress Bar */}
              <div className="h-2 bg-gray-200 dark:bg-gray-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              <div className="p-8">
                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    {["name", "email", "subject", "message"].map(
                      (step, index) => {
                        const StepIcon = getStepIcon(step as FormStep);
                        const isActive = step === currentStep;
                        const isCompleted =
                          ["name", "email", "subject", "message"].indexOf(
                            currentStep
                          ) > index;

                        return (
                          <div key={step} className="flex items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isActive
                                  ? "bg-gradient-to-br from-blue-600 to-emerald-500 text-white scale-110"
                                  : isCompleted
                                  ? "bg-emerald-500 text-white"
                                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                              }`}
                            >
                              <StepIcon className="w-5 h-5" />
                            </div>
                            {index < 3 && (
                              <div
                                className={`w-8 h-0.5 mx-2 transition-colors duration-300 ${
                                  isCompleted
                                    ? "bg-emerald-500"
                                    : "bg-gray-200 dark:bg-gray-700"
                                }`}
                              />
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Form Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {getStepTitle(currentStep)}
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                      {currentStep === "name" && (
                        <Input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          onKeyPress={handleKeyPress}
                          placeholder={getStepPlaceholder(currentStep)}
                          className="w-full text-lg py-4 px-6 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-xl transition-all duration-300"
                        />
                      )}

                      {currentStep === "email" && (
                        <Input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          onKeyPress={handleKeyPress}
                          placeholder={getStepPlaceholder(currentStep)}
                          className="w-full text-lg py-4 px-6 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-xl transition-all duration-300"
                        />
                      )}

                      {currentStep === "subject" && (
                        <Input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          onKeyPress={handleKeyPress}
                          placeholder={getStepPlaceholder(currentStep)}
                          className="w-full text-lg py-4 px-6 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-xl transition-all duration-300"
                        />
                      )}

                      {currentStep === "message" && (
                        <Textarea
                          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                          name="message"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          onKeyPress={handleKeyPress}
                          placeholder={getStepPlaceholder(currentStep)}
                          className="w-full text-lg py-4 px-6 h-32 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-xl resize-none transition-all duration-300"
                        />
                      )}

                      {/* Action Button */}
                      <div className="flex justify-between items-center pt-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {currentStep !== "message"
                            ? "Appuyez sur Entrée pour continuer"
                            : "Appuyez sur Entrée pour envoyer"}
                        </div>

                        <Button
                          onClick={
                            currentStep === "message"
                              ? handleSubmit
                              : handleNext
                          }
                          disabled={
                            !isStepValid(currentStep) ||
                            formStatus === "loading"
                          }
                          className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white px-8 py-3 rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-emerald-500/20 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {formStatus === "loading" ? (
                            <div className="flex items-center">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Envoi...
                            </div>
                          ) : currentStep === "message" ? (
                            <div className="flex items-center">
                              <Send className="w-5 h-5 mr-2" />
                              Envoyer
                            </div>
                          ) : (
                            <div className="flex items-center">
                              Continuer
                              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Progress Text */}
                    <div className="text-center pt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Étape{" "}
                        {["name", "email", "subject", "message"].indexOf(
                          currentStep
                        ) + 1}{" "}
                        sur 4
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-blue-600 to-emerald-500 rounded-3xl shadow-xl overflow-hidden text-white">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6">
                    Contactez-nous directement
                  </h3>

                  <div className="space-y-4">
                    <a
                      href="mailto:contact@neocraft.dev?subject=Demande de contact depuis le site"
                      className="flex items-center space-x-4 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white/80">
                          Email
                        </p>
                        <p className="font-medium">Envoyer un message</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto" />
                    </a>

                    <a
                      href="https://wa.me/237693118109?text=Bonjour%20NeoCraft%2C%20je%20souhaite%20discuter%20d%27un%20projet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white/80">
                          WhatsApp
                        </p>
                        <p className="font-medium">Message instantané</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto" />
                    </a>

                    <a
                      href="tel:+237693118109"
                      className="flex items-center space-x-4 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white/80">
                          Téléphone
                        </p>
                        <p className="font-medium">Appel direct</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="p-8">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Prêt à commencer ?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Réservez un créneau dans notre agenda pour discuter de votre
                    projet en détail.
                  </p>
                  <a
                    href="https://calendly.com/neocraft/consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white rounded-lg shadow-lg shadow-blue-500/20 dark:shadow-emerald-500/20 px-6 py-3 font-medium transition-all duration-300 group"
                  >
                    Planifier un appel
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
