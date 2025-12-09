import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const url = new URL("rss.xml", site ?? "https://augists.top");
  return new Response(null, {
    status: 301,
    headers: { Location: url.href },
  });
};
