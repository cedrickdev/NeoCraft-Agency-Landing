import { motion } from "framer-motion";
import { Code2, Search, Lightbulb, TestTube, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {useTranslations} from "next-intl";



export default function Methodology() {
  const t = useTranslations('Methodology');

  const methodology = [
    {
      icon: Search,
      title: t("step1.title"),
      description: t("step1.description"),
      iconColor: "from-blue-600 to-indigo-700",
      color: "text-blue-600",
    },
    {
      icon: Lightbulb,
      title: t("step2.title"),
      description: t("step2.description"),
      iconColor: "from-emerald-500 to-teal-600",
      color: "text-emerald-500",
    },
    {
      icon: Code2,
      title: t("step3.title"),
      description: t("step3.description"),
      iconColor: "from-amber-500 to-orange-600",
      color: "text-amber-500",
    },
    {
      icon: TestTube,
      title: t("step4.title"),
      description: t("step4.description"),
      iconColor: "from-purple-600 to-pink-600",
      color: "text-purple-600",
    },
    {
      icon: CheckCircle,
      title: t("step5.title"),
      description: t("step5.description"),
      iconColor: "from-rose-500 to-red-600",
      color: "text-rose-500",
    },
  ];
  return (
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
          <Badge className="mb-4 bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border-purple-100 dark:border-purple-800/30 px-4 py-1.5 text-sm font-medium hover:text-white">
            {t("badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t("title")}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("description")}
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
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center`}
              >
                <div
                  className={`lg:w-5/12 ${
                    index % 2 === 0
                      ? "lg:text-right lg:pr-16"
                      : "lg:text-left lg:pl-16"
                  } text-center mb-8 lg:mb-0`}
                >
                  <span className="inline-block text-5xl font-bold text-gray-200 dark:text-gray mb-4">
                    0{index + 1}
                  </span>
                  <h3
                    className={`text-2xl font-bold ${step.color} dark:text-white mb-4`}
                  >
                    {step.title}
                  </h3>
                  <p className="dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${step.iconColor} rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300`}
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
  );
}
