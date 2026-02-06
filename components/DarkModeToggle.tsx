"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const DarkModeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={toggleDarkMode}
      suppressHydrationWarning
      className={`relative w-14 h-7 rounded-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        mounted ? (isDark ? "bg-primary" : "bg-muted-foreground/20") : "bg-muted-foreground/20"
      }`}
      style={{ opacity: mounted ? 1 : 0.5 }}
    >
      {/* Sun icon - visible in light mode */}
      <span 
        className={`absolute left-1.5 top-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark ? "opacity-0 scale-50" : "opacity-100 scale-100"
        }`}
      >
        <svg className="w-4 h-4 text-foreground/60" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      </span>

      {/* Moon icon - visible in dark mode */}
      <span 
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <svg className="w-4 h-4 text-primary-foreground/80" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>

      {/* Sliding circle */}
      <span
        suppressHydrationWarning
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-background shadow-md border border-border/50 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark ? "left-[calc(100%-1.625rem)]" : "left-0.5"
        }`}
      />
    </button>
  );
};
