import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://gallery.obviy.us/",
	integrations: [sitemap()],
	markdown: {
		syntaxHighlight: false,
	},
	security: {
		csp: {
			directives: [
				"default-src 'self'",
				"base-uri 'self'",
				"form-action 'self'",
				"img-src 'self' data:",
				"object-src 'none'",
			],
			scriptDirective: {
				resources: ["'self'"],
			},
		},
	},

	vite: {
		plugins: [tailwindcss()],
	},
});
