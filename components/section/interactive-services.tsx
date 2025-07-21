"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Users,
  Palette,
  Search,
  Zap,
  Lightbulb,
  GraduationCap,
  TestTube,
  CheckCircle,
} from "lucide-react";

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
const servicesData: ServicesDataType = {
  development: {
    "custom-development": {
      icon: Code2,
      title: "Développement sur mesure",
      description:
        "Un site web est souvent le moteur de développement d'une entreprise, mais c'est aussi un outil de gestion essentiel à votre activité. Au quotidien, vous utilisez différents logiciels pour mettre à jour votre inventaire avec votre boutique, suivre vos opportunités commerciales, gérer vos factures et vos fournisseurs. Mais répondent-ils vraiment à vos méthodes de travail ?",
      details:
        "Pour gagner en performance et optimiser le retour sur investissement de vos applications, il est fondamental pour vos équipes de compter sur des technologies adaptées. Chez NeoCraft, nous développons des plateformes web qui tiennent compte à 100% des spécificités de votre organisation. Certains de nos clients ont gagné 2 semaines de travail par an et par collaborateur grâce à la conception d'un CRM sur mesure.",
      features: [
        "Applications web personnalisées",
        "Intégration avec vos outils existants",
        "Interface utilisateur intuitive",
        "Architecture scalable",
        "Support technique dédié",
        "Formation de vos équipes",
      ],
      cta: "Développez votre entreprise avec une plateforme web adaptée à vos besoins !",
    },
    ecommerce: {
      icon: Users,
      title: "Site e-commerce",
      description:
        "Créez votre boutique en ligne avec une solution e-commerce complète et performante. Nous développons des plateformes de vente adaptées à votre secteur d'activité avec toutes les fonctionnalités nécessaires pour maximiser vos conversions.",
      details:
        "Notre expertise en e-commerce nous permet de créer des solutions sur mesure qui s'adaptent parfaitement à vos produits et à votre clientèle. Gestion des stocks, paiements sécurisés, livraisons, nous prenons tout en charge.",
      features: [
        "Catalogue produits avancé",
        "Gestion des commandes",
        "Paiements sécurisés",
        "Gestion des stocks",
        "Tableau de bord analytique",
        "SEO optimisé",
      ],
      cta: "Lancez votre boutique en ligne et boostez vos ventes dès aujourd'hui !",
    },
    showcase: {
      icon: Palette,
      title: "Site vitrine",
      description:
        "Présentez votre entreprise avec un site vitrine élégant et professionnel. Nous créons des sites web qui reflètent parfaitement votre image de marque et convertissent vos visiteurs en clients.",
      details:
        "Un site vitrine efficace doit allier esthétique et performance. Nous concevons des sites rapides, responsive et optimisés pour le référencement naturel afin de maximiser votre visibilité en ligne.",
      features: [
        "Design responsive",
        "Optimisation SEO",
        "Temps de chargement rapide",
        "Formulaires de contact",
        "Galerie photos/vidéos",
        "Intégration réseaux sociaux",
      ],
      cta: "Créez votre présence en ligne avec un site vitrine qui vous ressemble !",
    },
  },
  marketing: {
    seo: {
      icon: Search,
      title: "Référencement SEO",
      description:
        "Améliorez votre visibilité sur les moteurs de recherche avec notre expertise SEO. Nous optimisons votre site web pour qu'il apparaisse en première page des résultats Google et attire plus de visiteurs qualifiés.",
      details:
        "Notre approche SEO combine technique et contenu pour des résultats durables. Audit technique, recherche de mots-clés, optimisation on-page et stratégie de contenu, nous mettons tout en œuvre pour améliorer votre positionnement.",
      features: [
        "Audit SEO complet",
        "Recherche de mots-clés",
        "Optimisation technique",
        "Création de contenu",
        "Netlinking qualifié",
        "Suivi des performances",
      ],
      cta: "Dominez les résultats de recherche et attirez plus de clients !",
    },
    "social-media": {
      icon: Users,
      title: "Réseaux sociaux",
      description:
        "Développez votre présence sur les réseaux sociaux avec une stratégie adaptée à votre audience. Nous créons et gérons vos comptes pour engager votre communauté et développer votre notoriété.",
      details:
        "Les réseaux sociaux sont devenus incontournables pour toucher votre audience. Nous élaborons une stratégie social media personnalisée et créons du contenu engageant pour faire grandir votre communauté.",
      features: [
        "Stratégie social media",
        "Création de contenu",
        "Gestion des publications",
        "Community management",
        "Publicités ciblées",
        "Analyse des performances",
      ],
      cta: "Engagez votre audience et développez votre communauté en ligne !",
    },
    advertising: {
      icon: Zap,
      title: "Publicité en ligne",
      description:
        "Maximisez votre retour sur investissement avec des campagnes publicitaires ciblées. Google Ads, Facebook Ads, LinkedIn Ads, nous optimisons vos budgets pour générer plus de leads et de ventes.",
      details:
        "La publicité en ligne permet d'obtenir des résultats rapides quand elle est bien maîtrisée. Nous créons et optimisons vos campagnes pour maximiser votre ROI et atteindre vos objectifs commerciaux.",
      features: [
        "Campagnes Google Ads",
        "Publicités Facebook/Instagram",
        "LinkedIn Ads B2B",
        "Remarketing",
        "Optimisation des conversions",
        "Reporting détaillé",
      ],
      cta: "Générez plus de leads avec des campagnes publicitaires performantes !",
    },
  },
  consulting: {
    strategy: {
      icon: Lightbulb,
      title: "Stratégie digitale",
      description:
        "Définissez une stratégie digitale cohérente avec vos objectifs business. Nous vous accompagnons dans la transformation digitale de votre entreprise avec une approche personnalisée et des recommandations concrètes.",
      details:
        "Une stratégie digitale efficace nécessite une vision globale de votre écosystème. Nous analysons votre marché, vos concurrents et vos objectifs pour élaborer une feuille de route digitale sur mesure.",
      features: [
        "Audit digital complet",
        "Analyse concurrentielle",
        "Définition des objectifs",
        "Feuille de route digitale",
        "Recommandations techniques",
        "Accompagnement dans la mise en œuvre",
      ],
      cta: "Accélérez votre transformation digitale avec une stratégie sur mesure !",
    },
    training: {
      icon: GraduationCap,
      title: "Formation technique",
      description:
        "Formez vos équipes aux dernières technologies et bonnes pratiques du web. Nos formations sur mesure permettent à vos collaborateurs de monter en compétences et d'être plus autonomes.",
      details:
        "Nous proposons des formations adaptées à votre niveau et vos besoins spécifiques. De l'initiation au perfectionnement, nos experts transmettent leur savoir-faire avec une approche pratique et opérationnelle.",
      features: [
        "Formations personnalisées",
        "Approche pratique",
        "Support de cours fourni",
        "Suivi post-formation",
        "Certification possible",
        "Formation en présentiel ou distanciel",
      ],
      cta: "Investissez dans les compétences de vos équipes pour l'avenir !",
    },
    audit: {
      icon: TestTube,
      title: "Audit & optimisation",
      description:
        "Identifiez les points d'amélioration de votre présence digitale avec un audit complet. Nous analysons vos performances actuelles et vous proposons des solutions concrètes pour optimiser vos résultats.",
      details:
        "Un audit approfondi révèle souvent des opportunités d'amélioration importantes. Nous passons au crible tous les aspects de votre présence digitale pour identifier les leviers de croissance les plus pertinents.",
      features: [
        "Audit technique complet",
        "Analyse des performances",
        "Recommandations prioritaires",
        "Plan d'action détaillé",
        "Estimation des gains",
        "Accompagnement dans la mise en œuvre",
      ],
      cta: "Optimisez vos performances digitales avec un audit professionnel !",
    },
  },
};

// Sub-services configuration
const subServicesConfig = {
  development: [
    { id: "custom-development", name: "Développement sur mesure" },
    { id: "ecommerce", name: "Site e-commerce" },
    { id: "showcase", name: "Site vitrine" },
  ],
  marketing: [
    { id: "seo", name: "Référencement SEO" },
    { id: "social-media", name: "Réseaux sociaux" },
    { id: "advertising", name: "Publicité en ligne" },
  ],
  consulting: [
    { id: "strategy", name: "Stratégie digitale" },
    { id: "training", name: "Formation technique" },
    { id: "audit", name: "Audit & optimisation" },
  ],
};

export default function InteractiveServices() {
  const [activeMainService, setActiveMainService] = useState("development");
  const [activeSubService, setActiveSubService] =
    useState("custom-development");

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
        <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-l-full blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-1/4 h-1/3 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-r-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Nos Services
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8 rounded-full"></div>
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Notre agence web associe un esprit{" "}
              <strong className="text-gray-900 dark:text-white">
                entrepreneurial
              </strong>{" "}
              à de{" "}
              <strong className="text-gray-900 dark:text-white">
                solides compétences digitales
              </strong>{" "}
              pour vous proposer des leviers marketing adaptés à votre budget.
              Vous bénéficiez d'un chef de projet pour suivre l'avancement de
              votre site internet et vous conseiller quant à votre stratégie de
              communication.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choisissez ci-dessous un pôle de l'agence afin de découvrir les
              services qu'il propose.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="w-full">
            {/* Main Service Tabs */}
            <div className="flex flex-col md:flex-row justify-center mb-8 gap-4">
              <button
                onClick={() => setActiveMainService("development")}
                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
                  activeMainService === "development"
                    ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                }`}
              >
                Développement Web
              </button>
              <button
                onClick={() => setActiveMainService("marketing")}
                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
                  activeMainService === "marketing"
                    ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                }`}
              >
                Marketing Digital
              </button>
              <button
                onClick={() => setActiveMainService("consulting")}
                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
                  activeMainService === "consulting"
                    ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                }`}
              >
                Conseil & Formation
              </button>
            </div>

            {/* Service Content Container */}
            <div className="bg-gradient-to-br from-blue-600 to-emerald-500 rounded-3xl p-8 shadow-2xl">
              {/* Sub-service buttons */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMainService}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap justify-center gap-4 mb-8"
                >
                  {currentSubServices.map((subService) => (
                    <button
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      {currentServiceData.icon && (
                        <currentServiceData.icon className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {currentServiceData.title}
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full"></div>
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
                          Fonctionnalités incluses :
                        </h4>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {currentServiceData.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center text-gray-700 dark:text-gray-300"
                            >
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {currentServiceData.cta && (
                      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
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
