import {
  Code2,
  ChevronRight,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import {useTranslations} from "next-intl";
import Image from "next/image";
import Link from "next/link";

const date = new Date();
const year = date.getFullYear();

export default function Footer() {
  const t = useTranslations('footer');
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
                <Image
                  src="/logo/logo.png"
                  alt="Logo NeoCraft"
                    width={100}
                    height={100}
                  className="object-contain"
                />

                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  NeoCraft
                </span>
              </div>
              
              <div className="flex space-x-4">
                <Link
                  href="https://www.facebook.com/neocraftdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-emerald-500 rounded-xl flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-transparent"
                >
                  <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/neocraftdev
"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-emerald-500 rounded-xl flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-transparent"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
                </Link>
                <Link
                  href="https://x.com/neocraftdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-emerald-500 rounded-xl flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-transparent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="2em"
                    height="2em"
                    viewBox="0 0 50 50"
                    className=" group-hover:text-white group-hover:scale-110 transition-all"
                  >
                    <path
                      fill="#9CA3AF"
                      d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"
                    ></path>
                  </svg>
                </Link>
                <Link
                  href="https://mastodon.social/@neocraftdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-emerald-500 rounded-xl flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-transparent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 32 32"
                    className=" group-hover:text-white group-hover:scale-110 transition-all"
                  >
                    <path
                      fill="#9CA3AF"
                      d="M15.938 4.031c-3.021.013-6.02.396-7.58 1.115c0 0-3.358 1.529-3.358 6.735c0 6.197-.005 13.98 5.563 15.484c2.131.573 3.965.697 5.439.612c2.675-.151 3.998-.971 3.998-.971l-.09-1.977s-1.734.611-3.88.541c-2.128-.075-4.369-.234-4.718-2.89a5.64 5.64 0 0 1-.046-.746c4.507 1.119 8.35.487 9.408.359c2.954-.359 5.525-2.211 5.853-3.904c.514-2.668.471-6.508.471-6.508c0-5.206-3.352-6.735-3.352-6.735c-1.645-.768-4.688-1.127-7.709-1.115zm-3.233 3.971c1.035.028 2.058.49 2.688 1.469l.609 1.035l.607-1.035c1.265-1.967 4.1-1.845 5.45-.323c1.244 1.448.966 2.383.966 8.852v.002h-2.447v-5.629c0-2.635-3.36-2.737-3.36.365V16h-2.43v-3.262c0-3.102-3.358-3.002-3.358-.367V18H8.977c0-6.474-.273-7.415.966-8.852c.68-.766 1.727-1.174 2.762-1.146z"
                    ></path>
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/neocraftdev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-emerald-500 rounded-xl flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-transparent"
                >
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Services
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#iservices"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-blue-400" />
                    {t('services.showcaseWebsite')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#iservices"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-emerald-400" />
                    {t('services.ecommerceWebsite')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#iservices"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-blue-400" />
                    {t('services.development')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#iservices"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-emerald-400" />
                    {t('services.ads')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#iservices"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-emerald-400" />
                    {t('services.seo')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                {t('legal.title')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform text-blue-400" />
                    {t('legal.policy')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center ">
              <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
                © {year} NeoCraft. {t('copyright')}
              </p>
              <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-2 ml-2">{t('by')}</span>
                <div className="flex items-center space-x-1">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent font-medium">

                      {" "}
                      NeoCraftTeam
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
