import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://gallery.obviy.us/",

	vite: {
		plugins: [tailwindcss()],
	},
});
