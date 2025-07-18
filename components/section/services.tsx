import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  GraduationCap,
  Users,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    description:
      "Programmes de formation adaptés pour développer les compétences techniques de vos équipes.",
    color: "from-amber-500 to-orange-600",
    delay: 0.3,
  },
  {
    icon: Users,
    title: "Accompagnement projet",
    description:
      "Support complet de la conception à la livraison avec une méthodologie agile et transparente.",
    color: "from-purple-600 to-pink-600",
    delay: 0.4,
  },
];

export default function Services() {
  return (
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
          <Badge className="mb-4 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30 px-4 py-1.5 text-sm font-medium hover:text-stone-100">
            Nos expertises
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Services sur mesure
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Des services complets pour accompagner votre transformation digitale
            et vous aider à atteindre vos objectifs.
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
                <div
                  className={`h-2 w-full bg-gradient-to-r ${service.color}`}
                ></div>
                <div className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
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
  );
}
