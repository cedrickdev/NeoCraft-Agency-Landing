import { Code2, ChevronRight, Github, Linkedin, Twitter } from "lucide-react";

const date = new Date;
const year = date.getFullYear();

export default function Footer() {
  return (
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
              Nous traduisons vos besoins en solutions.
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
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  Sites vitrine & institutionnels
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  Sites e-commerce
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  Développement sur mesure
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  Google Ads
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  Facebook Ads
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  SEO
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
              © {year} NeoCraft. Tous droits réservés.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-gray-400 text-sm mr-2">Propulsé par</span>
              <div className="flex items-center space-x-1">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-medium">NeoCraft team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
