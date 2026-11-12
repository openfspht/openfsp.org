// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://openfsp.org",
  trailingSlash: "always",
  build: { format: "directory" },
  devToolbar: { enabled: false },
});
