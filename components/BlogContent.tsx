"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatFullDate } from "@/lib/date";
import { Author, GetRelatedPostsResult, TagInPost } from "@wisp-cms/client";
import { ContentWithCustomComponents } from "@wisp-cms/react-custom-component";
import { ArrowLeft, Link as LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { CommentSection } from "./CommentSection";
import { FullWidthHeader } from "./FullWidthHeader";
import { RelatedPosts } from "./RelatedPosts";
import { processTableOfContents, TableOfContents } from "./TOC";
import { Button } from "./ui/button";
import { FAQ } from "./WispComponents/FAQ";

export const BlogContent = ({
  post: { title, content, author: _author, publishedAt, tags, slug },
  relatedPosts,
}: {
  post: {
    id: string;
    createdAt: Date;
    teamId: string;
    description: string | null;
    title: string;
    content: string;
    slug: string;
    image: string | null;
    authorId: string;
    updatedAt: Date;
    publishedAt: Date | null;
    tags: TagInPost[];
    author: Author;
  };
  relatedPosts: GetRelatedPostsResult["posts"];
}) => {
  const t = useTranslations("Blog");
  const isRealization = tags.some((tag: any) => {
    const name = tag.name.toLowerCase();
    return name === "realisation" || name === "projet";
  });

  const filteredRelatedPosts = relatedPosts.filter((rp: any) => {
    const rpIsRealization = rp.tags?.some((tag: any) => {
      const name = tag.name.toLowerCase();
      return name === "realisation" || name === "projet";
    }) ?? false;
    return isRealization ? rpIsRealization : !rpIsRealization;
  });

  const contentRef = useRef<HTMLDivElement>(null);

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try { document.execCommand("copy"); } catch { /* noop */ }
    document.body.removeChild(textarea);
  };

  // Optimize blog images: lazy loading, responsive srcset via Next.js Image Optimization API
  useEffect(() => {
    if (!contentRef.current) return;
    const images = contentRef.current.querySelectorAll("img");
    images.forEach((img) => {
      const src = img.getAttribute("src");
      if (!src) return;

      // Add lazy loading
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");

      // Use Next.js image optimization endpoint for remote images
      if (src.startsWith("http")) {
        const widths = [640, 828, 1080];
        const srcset = widths
          .map((w) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75 ${w}w`)
          .join(", ");
        img.setAttribute("srcset", srcset);
        img.setAttribute("sizes", "(max-width: 720px) 100vw, 720px");
        // Set optimized src for default
        img.setAttribute(
          "src",
          `/_next/image?url=${encodeURIComponent(src)}&w=1080&q=75`
        );
      }
    });
  }, [content]);

  const { modifiedHtml, tableOfContents } = processTableOfContents(content, {
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
  });
  return (
    <>
      <div className="container mx-auto px-4 max-w-6xl pt-32 flex items-center justify-between">
        <Button variant="ghost" asChild className="group text-muted-foreground hover:text-primary transition-colors">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{t("backToHome")}</span>
          </Link>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="rounded-full gap-2 border-primary/10 bg-primary/5 hover:bg-primary/10 text-primary transition-all active:scale-95"
          onClick={() => {
            const url = window.location.href;
            if (navigator.clipboard && window.isSecureContext) {
              navigator.clipboard.writeText(url).then(() => {
                toast.success(t("linkCopied"));
              }).catch(() => {
                fallbackCopy(url);
                toast.success(t("linkCopied"));
              });
            } else {
              fallbackCopy(url);
              toast.success(t("linkCopied"));
            }
          }}
        >
          <LinkIcon className="w-4 h-4" />
          <span>{t("copyLink")}</span>
        </Button>
      </div>
      <FullWidthHeader
        title={title}
        breadcrumb={[
          { label: t("blogLabel"), href: "/blog" },
          { label: title, href: "" },
        ]}
      />
      <div className="container mx-auto mt-4 px-4 max-w-6xl dark:text-gray-400">
        <div className="flex">
          <div ref={contentRef} className="lg:w-3/4 prose prose-lg max-w-none w-full break-words blog-content">
            <Accordion
              type="single"
              collapsible
              className="w-full not-prose my-6 block lg:hidden"
            >
              <AccordionItem value="toc" className="border-none">
                <AccordionTrigger>{t("toc")}</AccordionTrigger>
                <AccordionContent>
                  <TableOfContents items={tableOfContents} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <ContentWithCustomComponents
              content={modifiedHtml}
              customComponents={{
                FAQ,
              }}
            />
          </div>
          <div className="w-1/4 hidden lg:block">
            <div className="sticky top-0 mt-4 p-4 max-h-screen overflow-y-auto">
              <div className="text-lg font-semibold">{t("toc")}</div>
              <TableOfContents items={tableOfContents} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-medium">
            {t("publishedOn")} {publishedAt ? formatFullDate(publishedAt) : "N/A"}
          </div>
        </div>
        <div className="my-8 space-x-2">
          {tags.map((tag) => (
            <Link href={`/blog/category/${tag.name}`} key={tag.id}>
              #{tag.name}
            </Link>
          ))}
        </div>

        {/* Social Share */}
        <div className="my-8 flex items-center gap-4">
          <span className="text-sm font-semibold text-muted-foreground">{t("shareTitle")}</span>
          <div className="flex gap-2">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/5 hover:bg-primary/10 text-primary transition-colors"
            >
              {t("shareOnTwitter")}
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/5 hover:bg-primary/10 text-primary transition-colors"
            >
              {t("shareOnLinkedIn")}
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/5 hover:bg-primary/10 text-primary transition-colors"
            >
              {t("shareOnFacebook")}
            </a>
          </div>
        </div>

        <CommentSection slug={slug} />
        <RelatedPosts posts={filteredRelatedPosts} />
      </div>
    </>
  );
};
