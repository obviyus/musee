import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://gallery.obviy.us/",
	markdown: {
		syntaxHighlight: false,
	},
	security: {
		csp: {
			directives: [
				"default-src 'self'",
				"base-uri 'self'",
				"form-action 'self'",
				"frame-ancestors 'none'",
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
