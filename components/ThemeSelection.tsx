"use client";
import { useState } from "react";
import { FullWidthHeader } from "./FullWidthHeader";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

enum Color {
  slate = "slate",
  gray = "gray",
  zinc = "zinc",
  neutral = "neutral",
  stone = "stone",
  red = "red",
  orange = "orange",
  amber = "amber",
  yellow = "yellow",
  lime = "lime",
  green = "green",
  emerald = "emerald",
  teal = "teal",
  cyan = "cyan",
  sky = "sky",
  blue = "blue",
  indigo = "indigo",
  violet = "violet",
  purple = "purple",
  fuchsia = "fuchsia",
  pink = "pink",
  rose = "rose",
}

const GradientDisplayButton = ({
  label,
  gradient,
  setGradient,
}: {
  label: string;
  gradient: string;
  setGradient: (gradient: string) => void;
}) => {
  return (
    <Button
      className={cn("w-32 text-primary", gradient)}
      onClick={() => setGradient(gradient)}
    >
      {label}
    </Button>
  );
};

export const ThemeSelection = () => {
  const [gradient, setGradient] = useState<string>("");

  const setGradientAndScrollToTop = (gradient: string) => {
    setGradient(gradient);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const lightGradients = [
    { label: "Dawn", gradient: "bg-gradient-to-r from-lime-50 to-amber-50" },
    { label: "Frost", gradient: "bg-gradient-to-r from-sky-50 to-violet-50" },
    {
      label: "Quarry",
      gradient: "bg-gradient-to-r from-slate-100 to-gray-100",
    },
    {
      label: "Grove",
      gradient: "bg-gradient-to-r from-teal-100 to-emerald-100",
    },
    {
      label: "Zest",
      gradient: "bg-gradient-to-r from-orange-100 to-yellow-100",
    },
    {
      label: "Azure",
      gradient: "bg-gradient-to-r from-indigo-100 to-sky-100",
    },
    {
      label: "Dusk",
      gradient: "bg-gradient-to-r from-neutral-100 to-fuchsia-100",
    },
    {
      label: "Shade",
      gradient: "bg-gradient-to-r from-slate-100 to-indigo-100",
    },
    {
      label: "Basalt",
      gradient: "bg-gradient-to-r from-neutral-200 to-zinc-200",
    },
    {
      label: "Enigma",
      gradient: "bg-gradient-to-r from-fuchsia-200 to-purple-200",
    },
    { label: "Blaze", gradient: "bg-gradient-to-r from-red-200 to-orange-200" },
    {
      label: "Glow",
      gradient: "bg-gradient-to-r from-orange-200 to-amber-200",
    },
    {
      label: "Marine",
      gradient: "bg-gradient-to-r from-sky-200 to-emerald-200",
    },
    {
      label: "Bloom",
      gradient: "bg-gradient-to-r from-pink-200 to-orange-200",
    },
    {
      label: "Aqua",
      gradient: "bg-gradient-to-r from-sky-200 to-cyan-200",
    },
  ];

  const darkGradients = [
    {
      label: "Blush",
      gradient: "bg-gradient-to-r from-rose-600 to-red-600 text-white",
    },
    {
      label: "Glow",
      gradient: "bg-gradient-to-r from-yellow-600 to-red-600 text-white",
    },
    {
      label: "Bloom",
      gradient: "bg-gradient-to-r from-pink-600 to-red-600 text-white",
    },
    {
      label: "Twilight",
      gradient: "bg-gradient-to-r from-slate-900 to-fuchsia-900 text-white",
    },
    {
      label: "Midnight",
      gradient: "bg-gradient-to-r from-indigo-900 to-slate-900 text-white",
    },
    {
      label: "Shadow",
      gradient: "bg-gradient-to-r from-slate-600 to-gray-600 text-white",
    },
    {
      label: "Mystic",
      gradient: "bg-gradient-to-r from-pink-600 to-violet-600 text-white",
    },
    {
      label: "Dusk",
      gradient: "bg-gradient-to-r from-amber-600 to-orange-600 text-white",
    },
    {
      label: "Abyss",
      gradient: "bg-gradient-to-r from-cyan-900 to-violet-900 text-white",
    },
    {
      label: "Eclipse",
      gradient: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white",
    },
    {
      label: "Nebula",
      gradient: "bg-gradient-to-r from-indigo-900 to-purple-900 text-white",
    },
    {
      label: "Obsidian",
      gradient: "bg-gradient-to-r from-gray-800 to-slate-800 text-white",
    },
    {
      label: "Ember",
      gradient: "bg-gradient-to-r from-orange-800 to-red-800 text-white",
    },
    {
      label: "Verdant",
      gradient: "bg-gradient-to-r from-teal-800 to-lime-800 text-white",
    },
    {
      label: "Deep",
      gradient: "bg-gradient-to-r from-blue-900 to-gray-900 text-white",
    },
  ];

  const randomLightGradient = () => {
    const colors = Object.values(Color);
    const randomColors = colors.sort(() => Math.random() - 0.5).slice(0, 2);
    const randomIntensity = [50, 100, 200][Math.floor(Math.random() * 3)];
    return `bg-gradient-to-r from-${randomColors[0]}-${randomIntensity} to-${randomColors[1]}-${randomIntensity}`;
  };

  const randomDarkGradient = () => {
    const colors = Object.values(Color);
    const randomColors = colors.sort(() => Math.random() - 0.5).slice(0, 2);
    const randomIntensity = [600, 900][Math.floor(Math.random() * 2)];
    return `bg-gradient-to-r from-${randomColors[0]}-${randomIntensity} to-${randomColors[1]}-${randomIntensity} text-white`;
  };

  return (
    <>
      <FullWidthHeader
        title="Theme selector"
        description="Select a theme for the blog"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Theme Selector", href: "/theme" },
        ]}
        className={gradient}
      />
      <div className="container mx-auto px-4 my-8 max-w-6xl">
        <div className="prose prose-lg">
          <p>
            Tailwind Class: <code>{gradient}</code>
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 my-8 flex gap-4 max-w-6xl">
        <div className="prose prose-lg w-2/5">
          <h2>Instructions</h2>
          <p>
            This tool allows you to select some of the popular gradient or
            generate a random gradient for the header to style the blog. Click
            on the color blobs to select and apply the theme to this page.
          </p>
          <p>
            Once you are satisfied with the theme, copy the Tailwind Class from
            above and apply it to the <code>FullWidthHeader</code> component.
          </p>
        </div>
        <div className="prose prose-lg w-3/5">
          <h2>Light Gradients</h2>
          <div className="flex flex-wrap gap-2">
            {lightGradients.map((gradient) => (
              <GradientDisplayButton
                key={gradient.label}
                label={gradient.label}
                gradient={gradient.gradient}
                setGradient={setGradientAndScrollToTop}
              />
            ))}
          </div>
          <p>or just select a random gradient:</p>
          <Button
            onClick={() => setGradientAndScrollToTop(randomLightGradient())}
          >
            Random Gradient
          </Button>
          <h2>Dark Gradients</h2>
          <div className="flex flex-wrap gap-2">
            {darkGradients.map((gradient) => (
              <GradientDisplayButton
                key={gradient.label}
                label={gradient.label}
                gradient={gradient.gradient}
                setGradient={setGradientAndScrollToTop}
              />
            ))}
          </div>
          <p>or just select a random gradient:</p>
          <Button
            onClick={() => setGradientAndScrollToTop(randomDarkGradient())}
          >
            Random Gradient
          </Button>
        </div>
      </div>
    </>
  );
};
