"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { wisp } from "../lib/wisp";

interface CommentSectionProps {
  slug: string;
}

export function CommentSection({ slug }: CommentSectionProps) {
  const t = useTranslations("Comments");
  const { data, isLoading } = useQuery({
    queryKey: ["comments", slug],
    queryFn: () => wisp.getComments({ slug, page: 1, limit: "all" }),
  });

  if (isLoading) {
    return <div className="animate-pulse text-muted-foreground">{t("loading")}</div>;
  }

  if (!data?.config.enabled) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-8 text-2xl font-bold tracking-tight">
        {t("addComment")}
      </h2>
      <CommentForm slug={slug} config={data.config} />
      <h2 className="mb-8 mt-16 text-2xl font-bold tracking-tight">
        {t("comments")}
      </h2>
      <CommentList
        comments={data.comments}
        pagination={data.pagination}
        config={data.config}
        isLoading={isLoading}
      />
    </div>
  );
}
