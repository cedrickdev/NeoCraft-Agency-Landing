"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Code2,
  Palette,
  GraduationCap,
  Users,
  Search,
  Lightbulb,
  TestTube,
  CheckCircle,
  Moon,
  Sun,
  Menu,
  X,
  ArrowRight,
  Star,
  Quote,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Clock,
  Zap,
  Shield,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function NeoCraftLanding() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("loading")

    // Simulation d'envoi de formulaire
    setTimeout(() => {
      setFormStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setFormStatus("idle"), 3000)
    }, 1500)
  }

  const services = [
    {
      icon: Code2,
      title: "Développement web personnalisé",
      description:
        "Applications web sur mesure avec les dernières technologies pour répondre parfaitement à vos besoins spécifiques.",
      color: "from-blue-600 to-indigo-700",
      delay: 0.1,
    },
    {
      icon: Palette,
      title: "UI/UX sur mesure",
      description:
        "Interfaces élégantes et expériences utilisateur optimales qui captent l'attention et convertissent vos visiteurs.",
      color: "from-emerald-500 to-teal-600",
      delay: 0.2,
    },
    {
      icon: GraduationCap,
      title: "Formation technique ciblée",
      description: "Programmes de formation adaptés pour développer les compétences techniques de vos équipes.",
      color: "from-amber-500 to-orange-600",
      delay: 0.3,
    },
    {
      icon: Users,
      title: "Accompagnement projet",
      description: "Support complet de la conception à la livraison avec une méthodologie agile et transparente.",
      color: "from-purple-600 to-pink-600",
      delay: 0.4,
    },
  ]

  const methodology = [
    {
      icon: Search,
      title: "Découverte",
      description: "Analyse approfondie de vos besoins, objectifs et contraintes pour définir la meilleure approche.",
      color: "from-blue-600 to-indigo-700",
    },
    {
      icon: Lightbulb,
      title: "Design & prototype",
      description:
        "Conception créative et prototypage interactif pour visualiser et tester votre solution avant développement.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Code2,
      title: "Développement agile",
      description: "Développement itératif avec des cycles courts pour s'adapter rapidement aux retours et évolutions.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: TestTube,
      title: "Tests & QA",
      description: "Validation rigoureuse et optimisation des performances pour garantir une qualité irréprochable.",
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: CheckCircle,
      title: "Livraison + suivi",
      description:
        "Déploiement maîtrisé et formation de vos équipes pour une transition en douceur et une autonomie rapide.",
      color: "from-rose-500 to-red-600",
    },
  ]

  const team = [
    {
      name: "Alex Dubois",
      role: "Lead Developer",
      avatar: "/placeholder.svg?height=400&width=400",
      bio: "Expert en React/Next.js avec 8 ans d'expérience dans le développement d'applications web complexes.",
      skills: ["React", "Next.js", "Node.js", "TypeScript"],
    },
    {
      name: "Sarah Martin",
      role: "UI/UX Designer",
      avatar: "/placeholder.svg?height=400&width=400",
      bio: "Créatrice d'expériences digitales mémorables avec une approche centrée sur l'utilisateur.",
      skills: ["Figma", "UX Research", "Design System", "Prototyping"],
    },
    {
      name: "Thomas Leroy",
      role: "Tech Lead",
      avatar: "/placeholder.svg?height=400&width=400",
      bio: "Architecte de solutions techniques innovantes qui transforment les défis en opportunités.",
      skills: ["Architecture", "Cloud", "DevOps", "Performance"],
    },
  ]

  const testimonials = [
    {
      name: "Marie Dupont",
      role: "CEO",
      company: "TechStart",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "NeoCraft a transformé notre vision en une application exceptionnelle. Leur approche artisanale et leur attention aux détails ont fait toute la différence. Un partenaire de confiance pour l'avenir.",
      rating: 5,
    },
    {
      name: "Pierre Moreau",
      role: "CTO",
      company: "InnovateCorp",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "Une équipe passionnée qui livre des solutions de qualité. Leur expertise technique et leur capacité à comprendre nos enjeux métier nous ont permis d'accélérer notre transformation digitale.",
      rating: 5,
    },
    {
      name: "Julie Bernard",
      role: "Head of Product",
      company: "StartupLab",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "Formation technique de haut niveau qui a transformé notre équipe. Nos développeurs ont gagné en autonomie et en efficacité grâce à l'approche pédagogique de NeoCraft.",
      rating: 5,
    },
  ]

  const values = [
    {
      icon: Shield,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque ligne de code et chaque pixel de design.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Nous travaillons en étroite collaboration avec nos clients pour créer des solutions sur mesure.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Nous explorons constamment de nouvelles technologies pour rester à la pointe.",
    },
    {
      icon: Clock,
      title: "Engagement",
      description: "Nous respectons nos engagements en termes de délais, de budget et de qualité.",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
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
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 dark:shadow-emerald-500/20">
              <Code2 className="w-6 h-6 text-white" />
            </div>
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
              href="#services"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium"
            >
              Services
            </a>
            <a
              href="#team"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors font-medium"
            >
              Équipe
            </a>
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
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
            </Button>

            <Button
              variant="default"
              className="hidden md:flex bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white shadow-lg shadow-blue-500/20 dark:shadow-emerald-500/20"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Nous contacter
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
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
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    setIsMenuOpen(false)
                  }}
                >
                  Nous contacter
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
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
              <Badge className="mb-6 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-800/30 px-4 py-1.5 text-sm font-medium">
                NeoCraft - L'artisanat du code
              </Badge>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block">L'artisanat du code,</span>
                <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                  réinventé.
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                NeoCraft conçoit des solutions digitales sur mesure et forme les esprits techniques de demain avec une
                approche artisanale et innovante.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/20 dark:shadow-emerald-500/20 group"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Travailler avec nous
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white px-8 py-6 text-lg rounded-full"
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Découvrir nos valeurs
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Main Hero Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-3xl rotate-6 scale-95 opacity-20 blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-3xl -rotate-6 scale-95 opacity-20 blur-xl"></div>

                <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 p-1">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500"></div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>

                    <div className="space-y-4">
                      <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-md w-3/4"></div>
                      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-full"></div>
                      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-5/6"></div>
                      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-4/5"></div>

                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="h-24 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30 flex items-center justify-center">
                          <Code2 className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                        </div>
                        <div className="h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/30 flex items-center justify-center">
                          <Palette className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
                        </div>
                      </div>

                      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-full"></div>
                      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-3/4"></div>
                      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-5/6"></div>

                      <div className="h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-md w-1/2 mx-auto"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800/30 flex items-center justify-center shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
                >
                  <GraduationCap className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-8 -left-8 w-20 h-20 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30 flex items-center justify-center shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut", delay: 1 }}
                >
                  <Users className="w-8 h-8 text-purple-500 dark:text-purple-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
          >
            <div className="w-8 h-12 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-start justify-center p-2">
              <motion.div
                className="w-1 h-3 bg-gray-500 dark:bg-gray-400 rounded-full"
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900"></div>
          <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 rounded-l-full blur-3xl"></div>
          <div className="absolute left-0 bottom-1/4 w-1/4 h-1/3 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-r-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-800/30 px-4 py-1.5 text-sm font-medium">
              Notre mission
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              À propos de NeoCraft
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8 rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-600 to-emerald-500 relative">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 mix-blend-soft-light"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center p-8">
                      <Code2 className="w-16 h-16 mx-auto mb-6 opacity-80" />
                      <h3 className="text-3xl font-bold mb-4">Créer, transmettre, élever.</h3>
                      <p className="text-lg opacity-90">Notre manifeste en trois mots</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30 -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30 -z-10"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Notre Vision</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Chez NeoCraft, nous croyons que le développement web est un art. Chaque ligne de code est ciselée avec
                  précision, chaque interface est pensée pour l'utilisateur, et chaque projet est une œuvre unique qui
                  reflète notre passion pour l'excellence technique.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Notre Mission</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Notre mission est de démocratiser l'excellence technique en combinant savoir-faire artisanal et
                  innovation technologique. Nous créons des solutions digitales qui transforment les idées en réalités
                  concrètes et formons les talents de demain.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                  >
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-white dark:bg-gray-950"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] opacity-50 dark:opacity-20"></div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30 px-4 py-1.5 text-sm font-medium">
              Nos expertises
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Services sur mesure
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Des services complets pour accompagner votre transformation digitale et vous aider à atteindre vos
              objectifs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: service.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="h-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
                  <div className={`h-2 w-full bg-gradient-to-r ${service.color}`}></div>
                  <div className="p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{service.description}</p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                      <span>En savoir plus</span>
                      <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900"></div>
          <div className="absolute left-0 top-0 w-full h-full bg-[conic-gradient(at_top_left,var(--tw-gradient-stops))] from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 opacity-60"></div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border-purple-100 dark:border-purple-800/30 px-4 py-1.5 text-sm font-medium">
              Notre approche
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Méthodologie NeoCraft
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Un processus éprouvé en 5 étapes pour garantir le succès de vos projets et une collaboration transparente.
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline line for desktop */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 via-emerald-500 to-purple-600 hidden lg:block rounded-full"></div>

            <div className="space-y-24">
              {methodology.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center`}
                >
                  <div
                    className={`lg:w-5/12 ${index % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:text-left lg:pl-16"} text-center mb-8 lg:mb-0`}
                  >
                    <span className="inline-block text-5xl font-bold text-gray-200 dark:text-gray-800 mb-4">
                      0{index + 1}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                  </div>

                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300`}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -inset-3 bg-white dark:bg-gray-900 rounded-full -z-10 opacity-80 blur-md"></div>
                  </div>

                  <div className="lg:w-5/12 hidden lg:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-white dark:bg-gray-950"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent"></div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-100 dark:border-amber-800/30 px-4 py-1.5 text-sm font-medium">
              Notre équipe
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Experts passionnés
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Des professionnels talentueux et passionnés qui donnent vie à vos projets avec expertise et créativité.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 h-full">
                  <div className="relative">
                    <div className="aspect-[3/2] bg-gradient-to-br from-blue-600 to-emerald-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 mix-blend-soft-light"></div>
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <img
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
                  </div>

                  <div className="p-8 pt-4 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{member.bio}</p>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-emerald-500">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 mix-blend-soft-light"></div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30 px-4 py-1.5 text-sm font-medium">
              Témoignages
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Ce que nos clients disent</h2>
            <div className="w-24 h-1.5 bg-white mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Découvrez les retours d'expérience de nos clients satisfaits et comment nous avons transformé leurs
              projets.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-8">
                      <div className="md:w-1/3 flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800">
                            <img
                              src={testimonials[activeTestimonial].avatar || "/placeholder.svg"}
                              alt={testimonials[activeTestimonial].name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full p-1">
                            <Quote className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          {testimonials[activeTestimonial].name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{testimonials[activeTestimonial].role}</p>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {testimonials[activeTestimonial].company}
                        </p>
                      </div>

                      <div className="md:w-2/3">
                        <div className="flex mb-6">
                          {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-lg italic leading-relaxed mb-6">
                          "{testimonials[activeTestimonial].content}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Voir le témoignage ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
            viewport={{ once: true }}
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
              Prêt à démarrer votre projet ? Contactez-nous pour discuter de vos besoins et découvrir comment nous
              pouvons vous aider.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="h-2 bg-gradient-to-r from-blue-600 to-emerald-500"></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Envoyez-nous un message</h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom *</label>
                        <Input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sujet *</label>
                      <Input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg"
                        placeholder="Sujet de votre message"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full h-32 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg resize-none"
                        placeholder="Décrivez votre projet..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white py-3 text-lg rounded-lg shadow-lg shadow-blue-500/20 dark:shadow-emerald-500/20"
                    >
                      {formStatus === "loading" ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Envoi en cours...
                        </div>
                      ) : (
                        "Envoyer le message"
                      )}
                    </Button>

                    <AnimatePresence>
                      {formStatus === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg"
                        >
                          <p className="text-emerald-800 dark:text-emerald-400 text-center flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Message envoyé avec succès ! Nous vous répondrons rapidement.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-blue-600 to-emerald-500 rounded-3xl shadow-xl overflow-hidden text-white">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white/80">Email</p>
                        <p className="font-medium">contact@neocraft.dev</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white/80">Téléphone</p>
                        <p className="font-medium">+33 1 23 45 67 89</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white/80">Adresse</p>
                        <p className="font-medium">Paris, France</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="p-8">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Prêt à commencer ?</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Discutons de votre projet et voyons comment nous pouvons vous aider à le concrétiser avec notre
                    expertise technique.
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white rounded-lg shadow-lg shadow-blue-500/20 dark:shadow-emerald-500/20">
                    Planifier un appel
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-emerald-500">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 mix-blend-soft-light"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Façonnons ensemble votre prochain projet digital
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Rejoignez les entreprises qui nous font confiance pour transformer leurs idées en réalité digitale avec
              notre approche artisanale.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-lg group"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Démarrer votre projet
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">NeoCraft</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                L'artisanat du code, réinventé. Nous créons des solutions digitales sur mesure et formons les talents de
                demain avec passion et expertise.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 group"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 group"
                >
                  <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Navigation</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" />À propos
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" />
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#team"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" />
                    Équipe
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" />
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Légal</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" />
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" />
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" />
                    CGV
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" />
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-center md:text-left">
                © 2024 NeoCraft. Tous droits réservés. Fait avec ❤️ en France.
              </p>
              <div className="flex items-center mt-4 md:mt-0">
                <span className="text-gray-400 text-sm mr-2">Propulsé par</span>
                <div className="flex items-center space-x-1">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-medium">Next.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
