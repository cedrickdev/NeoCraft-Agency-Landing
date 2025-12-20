"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AIChatbot } from "./ai-chatbot";

export function ChatWidget() {
  const t = useTranslations('chat-widget');
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={false}
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-8 right-8 z-50 flex items-center justify-center gap-3 h-14 px-6 rounded-2xl shadow-xl transition-all active:scale-95 ${
          open 
            ? "bg-primary text-primary-foreground" 
            : "bg-background border border-primary/10 text-primary hover:bg-primary/5"
        }`}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="flex items-center gap-3"
            >
              <Bot className="w-6 h-6" />
              <span className="hidden md:inline font-bold text-sm tracking-tight">{t('button')}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-28 right-8 z-50 w-[400px] max-w-[calc(100vw-4rem)]"
          >
            <div className="glass-card rounded-[2rem] overflow-hidden shadow-2xl border-primary/10">
              <AIChatbot />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
