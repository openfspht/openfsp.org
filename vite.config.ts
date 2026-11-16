import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { fumadocsMdx } from "fumadocs-mdx/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 4321 },
  plugins: [
    fumadocsMdx(),
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true, failOnError: true },
      pages: [{ path: "/" }, { path: "/fr" }, { path: "/api/search-index/en" }, { path: "/api/search-index/fr" }],
    }),
    react(),
  ],
  resolve: { tsconfigPaths: true },
});
