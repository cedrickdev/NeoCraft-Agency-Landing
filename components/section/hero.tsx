import { useRef } from "react";
import { motion } from "framer-motion";
import { Code2, Palette, GraduationCap, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
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
              Conçu avec une approche réfléchie, nous mettons en pratique ce que
              nous prêchons. Le résultat est un site web accessible à tous, qui
              se charge en un clin d’œil et qui minimise la quantité de carbone
              émise à chaque chargement de page
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/20 dark:shadow-emerald-500/20 group"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Demander un devis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white px-8 py-6 text-lg rounded-full"
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
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
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                <GraduationCap className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />
              </motion.div>

              <motion.div
                className="absolute -bottom-8 -left-8 w-20 h-20 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30 flex items-center justify-center shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  ease: "easeInOut",
                  delay: 1,
                }}
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
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-gray-500 dark:bg-gray-400 rounded-full"
              animate={{ y: [0, 4, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "easeInOut",
              }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
