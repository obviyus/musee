import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import critters from 'astro-critters';
import purgecss from 'astro-purgecss';
import react from '@astrojs/react';

export default defineConfig({
	integrations: [tailwind(), critters(), purgecss(), react()],
});
