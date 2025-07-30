import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import critters from "astro-critters";
import purgecss from "astro-purgecss";

export default defineConfig({
	integrations: [critters(), purgecss()],

	vite: {
		plugins: [tailwindcss()],
	},
});
