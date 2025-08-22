"use client";
import { config } from "@/config";
import { Rss } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import { Button } from "./ui/button";

export const BlogFooter: FunctionComponent = () => {
  return (
    <section className="mt-8 md:mt-16 mb-12">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          © NeoCraft {new Date().getFullYear()}
        </div>
        <div className="text-xs text-muted-foreground hidden lg:block">
         
        </div>
        <div>
          <Link href="/blog/rss">
            <Button variant="ghost" className="p-2" aria-label="RSS Feed">
              <Rss className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
      
    </section>
  );
};
