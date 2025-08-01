import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Code2, ChevronRight, Sun, Moon, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
export default function er() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <motion.header
      style={{ opacity: headerOpacity }}
      className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10 dark:border-gray-800/50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <a href="#hero">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lgdark:shadow-emerald-500/20">
              <img
                src="/logo/logo.png"
                alt="Logo NeoCraft"
                className="w-10 h-10 object-contain"
              />
            </div>
          </a>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
            NeoCraft
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#about"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium"
          >
            À propos
          </a>
          <a
            href="#iservices"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium"
          >
            Services
          </a>
          {/*  <a
            href="#team"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium"
          >
            Équipe
          </a> */}
          <a
            href="#contact"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600" />
            )}
          </Button>

          <Button
            variant="default"
            className="hidden md:flex bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white shadow-lg shadow-blue-500/20 dark:shadow-emerald-500/20"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Nous contacter
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-6">
              <a
                href="#about"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="#services"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="#team"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                Équipe
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="#contact"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
                <ChevronRight className="w-5 h-5" />
              </a>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white"
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                  setIsMenuOpen(false);
                }}
              >
                Nous contacter
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
