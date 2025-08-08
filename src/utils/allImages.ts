import { createHash } from "node:crypto";
import type { ImageMetadata } from "astro";
import Sqids from "sqids";

// Eagerly import all original images under the gallery
const modules = import.meta.glob<{ default: ImageMetadata }>(
	"/src/assets/images/original/**/*.{png,jpg,jpeg,webp}",
	{ eager: true },
);

const sqids = new Sqids({
	minLength: 10,
	alphabet: "abcdefghijklmnopqrstuvwxyz",
});

function generateStableIdFromPath(absolutePath: string): string {
	// Use widely-supported algo for Node/Bun
	const hash = createHash("sha256").update(absolutePath).digest();
	const firstUint32 = hash.readUInt32LE(0);
	return sqids.encode([firstUint32]);
}

const images: Record<string, ImageMetadata> = {};
const seenIds = new Set<string>();

Object.keys(modules)
	.sort((a, b) => a.localeCompare(b))
	.forEach((path) => {
		const id = generateStableIdFromPath(path);
		if (seenIds.has(id)) {
			throw new Error(`Duplicate image id generated: ${id} for ${path}`);
		}
		seenIds.add(id);
		const mod = modules[path];
		if (!mod) {
			throw new Error(`Failed to import image module for path: ${path}`);
		}
		images[id] = mod.default;
	});

export default images;
