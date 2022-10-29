import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import critters from 'astro-critters';
import purgecss from 'astro-purgecss';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';

export default defineConfig({
	integrations: [
		tailwind(),
		image({
			serviceEntryPoint: '@astrojs/image/sharp',
		}),
		critters(),
		purgecss(),
		prefetch(),
		react(),
	],
});
