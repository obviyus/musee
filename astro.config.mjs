import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import critters from "astro-critters";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://gallery.obviy.us/",
	integrations: [critters(), sitemap()],

	vite: {
		plugins: [tailwindcss()],
	},
});
