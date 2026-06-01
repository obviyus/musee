import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { basename, extname, resolve } from "node:path";
import type { ImageMetadata } from "astro";
import Sqids from "sqids";
import { dashify } from "./slug";

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

export interface ImageSource {
	metadata: ImageMetadata;
	sourcePath: string;
	slug: string;
}

function resolveSourcePath(importPath: string): string {
	if (existsSync(importPath)) return importPath;
	const normalized = importPath.replace(/^\/+/, "");
	return resolve(process.cwd(), normalized);
}

function getSlugFromPath(path: string): string {
	const filename = basename(path, extname(path));
	const explicitSlug = filename.match(/^([a-z0-9]+(?:-[a-z0-9]+)+)__/);
	return explicitSlug?.[1] ?? dashify(generateStableIdFromPath(path));
}

const images: Record<string, ImageSource> = {};
const seenIds = new Set<string>();

Object.keys(modules)
	.sort((a, b) => a.localeCompare(b))
	.forEach((path) => {
		const id = getSlugFromPath(path);
		if (seenIds.has(id)) {
			throw new Error(`Duplicate image id generated: ${id} for ${path}`);
		}
		seenIds.add(id);
		const mod = modules[path];
		if (!mod) {
			throw new Error(`Failed to import image module for path: ${path}`);
		}
		const sourcePath = resolveSourcePath(path);
		images[id] = {
			metadata: mod.default,
			sourcePath,
			slug: id,
		};
	});

export default images;
