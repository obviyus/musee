import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import critters from "astro-critters";
import purgecss from "astro-purgecss";

export default defineConfig({
	integrations: [critters(), purgecss(), react()],

	vite: {
		plugins: [tailwindcss()],
	},
});
