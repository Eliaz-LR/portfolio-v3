import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true,
  },
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
    vue(),
  ],
  site: "https://portfolio--v3.web.app/",
});
