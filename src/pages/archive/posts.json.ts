import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { BlogType } from "../../content.config";

export const GET: APIRoute = async () => {
  const blogs: BlogType[] = await getCollection("posts");
  blogs.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const posts = blogs.map((blog) => ({
    slug: blog.slug,
    title: blog.data.title,
    date: blog.data.date.toISOString(),
    tags: blog.data.tags ?? [],
    year: blog.data.date.getFullYear(),
  }));

  return new Response(JSON.stringify({ posts }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=600",
    },
  });
};

