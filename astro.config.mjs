import { defineConfig } from 'astro/config.mjs';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import image from '@astrojs/image';

// https://astro.build/config
import critters from 'astro-critters';
import purgecss from 'astro-purgecss';
import prefetch from '@astrojs/prefetch';

// https://astro.build/config
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		image(),
		critters(),
		purgecss(),
		prefetch(),
		react(),
	],
});
