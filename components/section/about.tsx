import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Code2, Users, Clock, Zap, Shield } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Excellence",
    description:
      "Nous visons l'excellence dans chaque ligne de code et chaque pixel de design.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Nous travaillons en étroite collaboration avec nos clients pour créer des solutions sur mesure.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "Nous explorons constamment de nouvelles technologies pour rester à la pointe.",
  },
  {
    icon: Clock,
    title: "Engagement",
    description:
      "Nous respectons nos engagements en termes de délais, de budget et de qualité.",
  },
];

export default function About() {
  return (
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
          <Badge className="mb-4 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-800/30 px-4 py-1.5 text-sm font-medium hover:text-white">
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
                    <h3 className="text-3xl font-bold mb-4">
                      Créer, transmettre, élever.
                    </h3>
                    <p className="text-lg opacity-90">
                      Notre manifeste en trois mots
                    </p>
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
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Notre Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Nous créons de la valeur sociale, environnementale et économique
                durable en œuvrant pour le progrès digital et humain. La
                motivation de contribuer à ces trois dimensions du développement
                durable a toujours été au cœur de nos activités
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Notre Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Démocratiser l'excellence technique en combinant savoir-faire
                artisanal et innovation technologique. Nous créons des solutions
                digitales qui transforment les idées en réalités concrètes et
                formons les talents de demain.
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
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
