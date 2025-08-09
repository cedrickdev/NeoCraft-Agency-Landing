"use client";

// components/ChatWidget.tsx
import React, { useState } from "react";
import { AIChatbot } from "./ai-chatbot";
import { Bot } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {useTranslations} from "next-intl";

export function ChatWidget() {
    const t = useTranslations('chat-widget');
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-emerald-500 text-primary-foreground rounded-full shadow-lg p-4 flex items-center gap-2 hover:bg-primary/90 transition"
        style={{ minWidth: 56, minHeight: 56 }}
        aria-label="Ouvrir le chat"
      >
        <Bot className="w-6 h-6" />
        <span className="hidden md:inline">{t('button')}</span>
      </button>

      {/* Fenêtre du chatbot avec animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[90vw]"
            initial={{ opacity: 0, x: 100 }} // x = 100 => décalé vers la droite
            animate={{ opacity: 1, x: 0 }} // arrive à sa position normale
            exit={{ opacity: 0, x: 100 }} // repart vers la droite
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {" "}
            <AIChatbot />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
