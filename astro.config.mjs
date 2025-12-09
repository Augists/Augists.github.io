// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vitePluginSvgr from "vite-plugin-svgr";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkHexoNote from "./src/utils/remark-hexo-note.js";
import remarkInlineMath from "./src/utils/remark-inline-math.js";
import remarkNormalizeCodeLang from "./src/utils/remark-normalize-code-lang.js";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), vitePluginSvgr({})],
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [react(), sitemap()],

  markdown: {
    remarkPlugins: [
      remarkNormalizeCodeLang,
      remarkInlineMath,
      remarkMath,
      remarkHexoNote,
    ],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      defaultColor: false,
      themes: {
        light: "github-light-high-contrast", // one-light
        dark: "github-dark", // plastic
      },
      wrap: true,
    },
  },

  prefetch: {
    prefetchAll: true,
    // defaultStrategy: "load",
  },

  output: "static",
  site: "https://augists.top",
});
