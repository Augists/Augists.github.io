import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: ({}) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      author: z.string().default("Augists"),
      tags: z
        .array(z.string())
        .or(z.string())
        .optional()
        .transform((value) =>
          typeof value === "string" ? [value] : value ?? [],
        ),
      featured: z.boolean().default(false),
      editable: z.boolean().default(false),
      readTime: z.number().optional(),
      mathjax: z.boolean().optional(),
      password: z.string().optional(),
    }),
});

const pages = defineCollection({
  type: "content",
  schema: ({}) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date().optional(),
    }),
});

export const collections = { posts, pages };

export type BlogType = import("astro:content").CollectionEntry<"posts">;
