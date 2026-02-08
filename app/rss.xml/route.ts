import { config } from "@/config";
import { wisp } from "@/lib/wisp";

export async function GET() {
  const result = await wisp.getPosts({ limit: 50 });
  const posts = result.posts;

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${config.baseUrl}/blog/post/${post.slug}</link>
      <guid>${config.baseUrl}/blog/post/${post.slug}</guid>
      <description><![CDATA[${post.description || ""}]]></description>
      <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : ""}</pubDate>
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${config.organization} Blog</title>
    <link>${config.baseUrl}/blog</link>
    <description>${config.description}</description>
    <language>fr</language>
    <atom:link href="${config.baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
