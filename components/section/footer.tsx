import { Code2, ChevronRight, Github, Linkedin, Twitter, CheckCircle } from "lucide-react";

const date = new Date;
const year = date.getFullYear();

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>

      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-emerald-500"></div>

      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10  rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 dark:shadow-emerald-500/20">
                  <img
                    src="/logo/logo.png"
                    alt="Logo NeoCraft"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  NeoCraft
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Nous traduisons vos besoins en solutions.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/neocraft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-emerald-500 rounded-xl flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-transparent"
                >
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
                </a>
                <a
                  href="https://linkedin.com/company/neocraft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-emerald-500 rounded-xl flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-transparent"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
                </a>
                <a
                  href="https://twitter.com/neocraft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-emerald-500 rounded-xl flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-transparent"
                >
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#iservices"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-blue-400" />
                    Sites vitrine & institutionnels
                  </a>
                </li>
                <li>
                  <a
                    href="#iservices"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-emerald-400" />
                    Sites e-commerce
                  </a>
                </li>
                <li>
                  <a
                    href="#iservices"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-blue-400" />
                    Développement sur mesure
                  </a>
                </li>
                <li>
                  <a
                    href="#iservices"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-emerald-400" />
                    Google Ads & Facebook Ads
                  </a>
                </li>
                <li>
                  <a
                    href="#iservices"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-emerald-400" />
                    SEO
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Légal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/mentions-legales"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-emerald-400" />
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a
                    href="/politique-confidentialite"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-blue-400" />
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a
                    href="/cgv"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-emerald-400" />
                    CGV
                  </a>
                </li>
                <li>
                  <a
                    href="/cookies"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-blue-400" />
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
                © {year} NeoCraft. Tous droits réservés.
              </p>
              <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-2">Propulsé par</span>
                <div className="flex items-center space-x-1">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent font-medium">
                    <a
                      href="https://github.com/NeoCraftTeam"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      NeoCraftTeam
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
