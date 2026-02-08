"use client";

import Link from "next/link";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Category {
  id: string;
  label: string;
  tag: string;
  description: string;
}

interface BlogNavigationBarProps {
  className?: string;
  active: string;
  categories: Category[];
}

export const FilterBar = ({
  className,
  active,
  categories,
}: BlogNavigationBarProps) => {
  const t = useTranslations("Blog");
  const param = useSearchParams();
  const [searchText, setSearchText] = useState<string>(
    param.get("query") || ""
  );
  const [isSearchActive, setIsSearchActive] = useState(
    param.get("query") !== null && param.get("query") !== ""
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSearchActive) {
      searchInputRef.current?.focus();
    }
  }, [isSearchActive]);

  const onHandleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchText === "") {
        router.push("/blog");
      } else {
        router.push(`/blog/?query=${searchText}`);
      }
    }
    if (e.key === "Escape") {
      setIsSearchActive(false);
    }
  };

  const onClearSearch = () => {
    setIsSearchActive(false);
    if (
      searchText === "" &&
      param.get("query") !== "" &&
      param.get("query") !== null
    ) {
      router.push("/blog");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={cn(
        "flex items-center justify-between max-w-6xl mx-auto px-4",
        className
      )}
    >
      {isSearchActive ? (
        <div className="flex w-full items-center rounded-full border border-primary/20 bg-primary/[0.02] px-4 py-2 transition-all duration-300">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-full border-none bg-transparent px-3 py-0 text-sm focus-visible:outline-none"
            onKeyUp={onHandleKey}
            onBlur={onClearSearch}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={onClearSearch} className="shrink-0 p-1 rounded-full hover:bg-primary/10 transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      ) : (
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex gap-2 whitespace-nowrap overflow-x-auto scrollbar-hide">
            <Link href="/blog" key="latest">
              <button
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                  active === "latest"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                )}
              >
                {t("filterAll")}
              </button>
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.tag}`}
              >
                <button
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                    active === category.tag
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  )}
                >
                  {category.label}
                </button>
              </Link>
            ))}
          </div>
          <button
            onClick={() => setIsSearchActive(true)}
            className="shrink-0 w-10 h-10 rounded-full bg-primary/5 hover:bg-primary/10 flex items-center justify-center transition-colors duration-300"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}
    </motion.div>
  );
};
