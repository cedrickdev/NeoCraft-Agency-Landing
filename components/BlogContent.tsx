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
import { toast } from "sonner";
import { CommentSection } from "./CommentSection";
import { FullWidthHeader } from "./FullWidthHeader";
import { RelatedPosts } from "./RelatedPosts";
import { processTableOfContents, TableOfContents } from "./TOC";
import { Button } from "./ui/button";
import { FAQ } from "./WispComponents/FAQ";

export const BlogContent = ({
  post: { title, content, author, publishedAt, tags, slug },
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
            navigator.clipboard.writeText(window.location.href);
            toast.success(t("linkCopied"));
          }}
        >
          <LinkIcon className="w-4 h-4" />
          <span>{t("copyLink")}</span>
        </Button>
      </div>
      <FullWidthHeader
        title={title}
        breadcrumb={[
          { label: "Blog", href: "/blog" },
          { label: title, href: "" },
        ]}
      />
      <div className="container mx-auto mt-4 px-4 max-w-6xl dark:text-gray-400">
        <div className="flex">
          <div className="lg:w-3/4 prose prose-lg max-w-none w-full break-words blog-content">
            <Accordion
              type="single"
              collapsible
              className="w-full not-prose my-6 block lg:hidden"
            >
              <AccordionItem value="toc" className="border-none">
                <AccordionTrigger>Table of Content</AccordionTrigger>
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
              <div className="text-lg font-semibold">Table of Contents</div>
              <TableOfContents items={tableOfContents} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-medium">
            Publié le {publishedAt ? formatFullDate(publishedAt) : "N/A"}
          </div>
        </div>
        <div className="my-8 space-x-2">
          {tags.map((tag) => (
            <Link href={`/blog/category/${tag.name}`} key={tag.id}>
              #{tag.name}
            </Link>
          ))}
        </div>

        <CommentSection slug={slug} />
        <RelatedPosts posts={filteredRelatedPosts} />
      </div>
    </>
  );
};
