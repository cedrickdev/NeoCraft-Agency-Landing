export const revalidate = 60; // 1 minute'

import type { Metadata } from "next";
import { wisp } from "@/lib/wisp";
import { BlogContent } from "@/components/BlogContent";
import type { BlogPosting, WithContext } from "schema-dts";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";

interface Params {
  slug: string;
}
export async function generateMetadata(
  props: {
    params: Promise<Params>;
  }
): Promise<Metadata> {
  const params = await props.params;

  const {
    slug
  } = params;

  const result = await wisp.getPost(slug);
  if (!result.post) {
    return {
      title: "Page introuvable !",
    };
  }
  return {
    title: result.post.title,
    description: result.post.description,
    openGraph: {
      title: result.post.title,
      description: result.post.description ?? "",
      images: [result.post.image || getOgImageUrl(result.post.title)],
    },
  };
}

export default async function BlogPost(
  props: {
    params: Promise<Params>;
  }
) {
  const params = await props.params;

  const {
    slug
  } = params;

  const [result, related] = await Promise.all([
    wisp.getPost(slug),
    wisp.getRelatedPosts({ slug, limit: 4 }),
  ]);

  if (!result.post) return null;

  const { title, publishedAt, updatedAt, author, image } = result.post;

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: image ? image : undefined,
    datePublished: publishedAt ? publishedAt.toString() : undefined,
    dateModified: updatedAt.toString(),
    author: {
      "@type": "Person",
      name: author.name ?? undefined,
      image: author.image ?? undefined,
    },
    publisher: {
      "@type": "Organization",
      name: config.organization,
      url: config.baseUrl,
      logo: {
        "@type": "ImageObject",
        url: config.logoUrl,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogContent post={result.post} relatedPosts={related.posts} />
    </>
  );
}
