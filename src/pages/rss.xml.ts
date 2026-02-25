import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { BlogType } from "../content.config";
import type { APIContext } from "astro";
import { siteConfig } from "../config/site";

export async function GET(context: APIContext) {
  if (!context.site) {
    return new Response("Site is not defined on the request context", {
      status: 500,
    });
  }

  const blogs: BlogType[] = await getCollection("posts");
  const sorted = blogs.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  const lastBuildDate = sorted.length
    ? sorted[0].data.date.toUTCString()
    : new Date().toUTCString();
  return rss({
    // stylesheet: "/pretty-feed-v3.xsl",
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    trailingSlash: false,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: [
      `<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
      `<atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>`,
    ].join(""),
    items: sorted.map((blog: BlogType) => ({
      title: blog.data.title,
      description: blog.data.description,
      pubDate: blog.data.date,
      author: blog.data.author,
      link: `/${blog.slug}`,
    })),
  });
}
