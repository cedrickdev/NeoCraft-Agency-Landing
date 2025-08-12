"use client";

import Link from "next/link";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

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
    <div className={cn("flex items-center justify-between px-4", className)}>
      {isSearchActive ? (
        <div className="flex w-full items-center justify-between rounded-sm border px-1">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Rechercher..."
            className="w-full border-none bg-transparent px-4 py-2 focus-visible:outline-none"
            onKeyUp={onHandleKey}
            onBlur={onClearSearch}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={onClearSearch} className="ml-4">
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-2 whitespace-nowrap overflow-x-auto">
            <Link href="/blog" key="latest">
              <button
                className={cn(
                  "py-1 px-2",
                  active === "latest" && "border-b-2 border-black font-semibold"
                )}
              >
                Tous
              </button>
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.tag}`}
              >
                <button
                  className={cn(
                    "py-1 px-2",
                    active === category.tag &&
                      "border-b-2 border-black font-semibold"
                  )}
                >
                  {category.label}
                </button>
              </Link>
            ))}
          </div>
          <div className="flex-shrink-0">
            <button onClick={() => setIsSearchActive(true)}>
              <Search className="bg-primary-foreground m-2 h-5 w-5 rounded" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
