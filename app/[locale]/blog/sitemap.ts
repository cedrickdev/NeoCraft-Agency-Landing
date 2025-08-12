export const dynamic = "force-dynamic";
export const revalidate = 360; // 1 hour

import type { MetadataRoute } from "next";
import urlJoin from "url-join";
import { wisp } from "@/lib/wisp";
import { config } from "@/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsResult = await wisp.getPosts({
    limit: "all",
  });
  const tagsResult = await wisp.getTags();
  return [
    {
      url: config.baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    ...postsResult.posts.map((post) => {
      return {
        url: urlJoin(config.baseUrl, "post", post.slug),
        lastModified: new Date(post.updatedAt),
        priority: 0.8,
      };
    }),
    ...tagsResult.tags.map((tag) => {
      return {
        url: urlJoin(config.baseUrl, "category", tag.id),
        lastModified: new Date(),
        priority: 0.5,
      };
    }),
  ];
}
