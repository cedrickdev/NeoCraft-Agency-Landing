"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-destructive/10 flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-10 h-10 text-destructive/50" />
        </div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">
          Oops !
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Une erreur inattendue s&apos;est produite. Veuillez réessayer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="outline" className="rounded-full px-6 group">
            <RotateCcw className="w-4 h-4 mr-2 transition-transform group-hover:-rotate-180 duration-500" />
            Réessayer
          </Button>
          <Button asChild className="rounded-full px-6 group">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Accueil
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
