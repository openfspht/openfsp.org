import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { fumadocsMdx } from "fumadocs-mdx/vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
    fmt: {
        printWidth: 100,
        tabWidth: 4,
        overrides: [{ files: ["*.json", "*.yml", "*.yaml", "*.md"], options: { tabWidth: 2 } }],
        sortPackageJson: false,
        ignorePatterns: [
            "dist",
            ".output",
            ".source",
            ".tanstack",
            "src/routeTree.gen.ts",
            "bun.lock",
            "content",
            "CHANGELOG.md",
        ],
    },
    lint: {
        ignorePatterns: ["dist", ".output", ".source", ".tanstack", "src/routeTree.gen.ts"],
        options: { typeAware: true, typeCheck: true },
        rules: { curly: ["error", "all"] },
    },
    test: { include: ["test/**/*.test.ts"] },
    server: { port: 4321 },
    plugins: [
        fumadocsMdx(),
        tailwindcss(),
        tanstackStart({
            prerender: { enabled: true, crawlLinks: true, failOnError: true },
            pages: [
                { path: "/" },
                { path: "/en" },
                { path: "/api/search-index/en" },
                { path: "/api/search-index/fr" },
            ],
        }),
        react(),
    ],
    resolve: { tsconfigPaths: true },
});
