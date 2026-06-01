import { createHash } from "node:crypto";
import { basename, extname, resolve } from "node:path";
import type { ImageMetadata } from "astro";
import Sqids from "sqids";
import { dashify } from "./slug";

const modules = import.meta.glob<{ default: ImageMetadata }>(
	"/src/assets/images/original/**/*.{png,jpg,jpeg,webp}",
	{ eager: true },
);

const sqids = new Sqids({
	minLength: 10,
	alphabet: "abcdefghijklmnopqrstuvwxyz",
});

function generateStableIdFromPath(absolutePath: string): string {
	const hash = createHash("sha256").update(absolutePath).digest();
	const firstUint32 = hash.readUInt32LE(0);
	return sqids.encode([firstUint32]);
}

export interface ImageSource {
	metadata: ImageMetadata;
	sourcePath: string;
	slug: string;
}

function resolveSourcePath(importPath: string): string {
	return resolve(process.cwd(), importPath.replace(/^\/+/, ""));
}

function getSlugFromPath(path: string): string {
	const filename = basename(path, extname(path));
	const explicitSlug = filename.match(/^([a-z0-9]+(?:-[a-z0-9]+)+)__/);
	return explicitSlug?.[1] ?? dashify(generateStableIdFromPath(path));
}

const seenIds = new Set<string>();

const images: ImageSource[] = Object.entries(modules)
	.sort(([a], [b]) => a.localeCompare(b))
	.map(([path, mod]) => {
		const slug = getSlugFromPath(path);
		if (seenIds.has(slug)) {
			throw new Error(`Duplicate image id generated: ${slug} for ${path}`);
		}
		seenIds.add(slug);
		return {
			metadata: mod.default,
			sourcePath: resolveSourcePath(path),
			slug,
		};
	});

export default images;
