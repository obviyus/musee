import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import critters from "astro-critters";
import purgecss from "astro-purgecss";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://gallery.obviy.us/",
	integrations: [critters(), purgecss(), sitemap()],

	vite: {
		plugins: [tailwindcss()],
	},
});
