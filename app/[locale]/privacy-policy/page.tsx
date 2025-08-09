"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import Footer from "@/components/section/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ChevronRight, Sun, Moon, X, Menu } from "lucide-react";

// Hook pour l'effet de frappe
function useTypewriter(text: string, speed: number = 50) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
}

export default function privacyPolicyPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Textes pour l'effet de frappe
  const titleText = "Politique de confidentialité";

  const displayTitle = useTypewriter(titleText, 100);

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
    <div>
      {/* Header */}
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
            <a href="/">
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
      <section
        id="privacy-policy"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 dark:opacity-10"></div>

          {/* Animated Gradient Blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <Breadcrumb className="text-left">Home / </Breadcrumb>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block">{displayTitle}</span>
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 mix-blend-saturation mb-8 rounded-full mx-auto"></div>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Dernière mise à jour : 01/08/2025
              </p>
            </motion.div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              <span className="block">
                Quels sont les outils que nous utilisons?
              </span>
            </h2>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="block">MailerLite</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Nous utilisons MailerLite pour la gestion de notre liste
            d’abonné·e·s à notre newsletter et pour l’envoi de nos newsletters à
            nos abonné·e·s.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="block">Google Ads</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Google Ads est une plateforme fournie par Google. Nous utilisons
            Google Ads pour protéger notre marque. Tu verras peut-être notre
            contenu promu dans Google Search en tapant le mot clé
            «neocraft.dev».
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="block">Piwik PRO</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Piwik PRO nous permet de collecter et d’analyser l’information sur
            les propriétés du trafic visitant notre site, les interactions avec
            le contenu proposé, et la performance dans le but d’améliorer le
            contenu pour vous.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="block">LinkedIn Insight</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            LinkedIn Insight nous permet de mesurer l’impact des publications de
            Neocraft sur LinkedIn.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="block">Teamtailor</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Lorsque tu postules à un emploi, les données personnelles qui
            figurent dans ta candidature sont collectées et traitées par
            Teamtailor.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="block">Google reCaptcha</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Nous utilisons reCaptcha pour vérifier si les données saisies sur
            notre formulaire de contact ont été saisies par un humain ou par un
            programme automatisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  mt-8 leading-tight">
              <span className="block">
                Quels sont les outils que nous utilisons?
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Nous collectons différentes données à l’aide de plusieurs systèmes.
            Par conséquent, ils seront regroupés sous le titre : outils
            d'analyse.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="block">
              Outils d'analyse Lors de ta première visite
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Piwik PRO va générer et t’attribuer plusieurs identifiants
            d’utilisation aléatoires et anonymes, qui seront stockés dans
            différents cookies sur ton navigateur.
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            <span className="block">
              Lorsque tu débutes la navigation sur notre site
            </span>
          </h2>
          <li>
            <span className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              l’appareil utilisé (modèle, version du système d’exploitation)
            </span>
          </li>
          <li>
            <span className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              le navigateur utilisé (nom, version, langue)
            </span>
          </li>
          <li>
            <span className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              ton site de provenance (referer, medium)
            </span>
          </li>
          <li>
            <span className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              ton adresse IP qui sera anonymisée par Piwik PRO avant son
              stockage
            </span>
          </li>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-6 leading-tight">
            <span className="block">Lors d’un chargement de page</span>
          </h2>
          <li>
            <span className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              informations sur la page chargée (URL, titre de page, temps de
              chargement, type de page)
            </span>
          </li>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-6 leading-tight">
            <span className="block">Lors d’interactions sur la page</span>
          </h2>
          <li>
            <span className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              mots clés entrés lors d’une recherche
            </span>
          </li>
          <li>
            <span className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              liens cliqués
            </span>
          </li>
          <li>
            <span className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              e-mail et numéro de téléphone cliqués
            </span>
          </li>
          <li>
            <span className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              formulaires soumis (seulement le nom du formulaire et non son
              contenu)
            </span>
          </li>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-6 leading-tight">
            <span className="block">Formulaire de contact</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Via le formulaire de contact, nous récoltons des demandes d’ordre
            général (presse kit, questions sur Liip, etc.) mais aussi des
            demandes d’offres, qui sont ensuite saisies dans notre CRM
            Pipedrive.
          </p>{" "}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-6 leading-tight">
            <span className="block">
              Comment ces données sont-elles récoltées? Outils d'analyse
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Afin d’améliorer le contenu proposé, nous analysons et mesurons le
            trafic sur notre site, les interactions avec le contenu proposé
            ainsi que leur performance par rapport à nos objectifs.
            Techniquement, Piwik PRO génère un nouveau chiffre aléatoire chaque
            fois que tu visites notre site Web. Lors de chaque chargement de
            page ou interaction sur la page, une requête avec des informations
            sur la page et les propriétés du navigateur seront envoyées à Piwik
            Pro.
          </p>{" "}
        </div>
      </section>
      <Footer />
    </div>
  );
}
