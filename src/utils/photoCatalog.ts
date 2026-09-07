import { basename, join } from "node:path";
import { z } from "astro/zod";

const photoId = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const photo = z.object({
	id: photoId,
	capturedAt: z.iso.datetime({ offset: true }).nullable(),
	aliases: z.array(photoId),
});
const catalogSchema = z.object({ version: z.literal(1), photos: z.array(photo) });
const recoverySchema = z.object({
	version: z.literal(1),
	photos: z.array(photo.extend({ url: z.string().startsWith("/") })),
});

export type PhotoCatalog = z.infer<typeof catalogSchema>;
export type PhotoRecord = PhotoCatalog["photos"][number];

export function parsePhotoCatalog(value: unknown): PhotoCatalog {
	const catalog = catalogSchema.parse(value);
	const ids = new Set<string>();
	for (const photo of catalog.photos) {
		for (const id of [photo.id, ...photo.aliases]) {
			if (ids.has(id)) throw new Error(`Photo URL is assigned more than once: ${id}`);
			ids.add(id);
		}
	}
	return catalog;
}

export function parseRecoveryManifest(value: unknown) {
	const manifest = recoverySchema.parse(value);
	parsePhotoCatalog(manifest);
	return manifest;
}

export function catalogPath(root: string): string {
	return join(root, "src/assets/images/catalog.json");
}

export async function readPhotoCatalog(root: string): Promise<PhotoCatalog> {
	return parsePhotoCatalog(await Bun.file(catalogPath(root)).json());
}

export function matchPhotoSources(catalog: PhotoCatalog, paths: string[]): Map<string, string> {
	const registered = new Set(catalog.photos.map((photo) => photo.id));
	const sources = new Map<string, string>();
	for (const path of paths) {
		const filename = basename(path);
		const separator = filename.indexOf("__");
		const id = filename.slice(0, separator);
		if (separator < 1 || !registered.has(id)) {
			throw new Error(`Unregistered photo: ${filename}. Use photos:add or photos:restore.`);
		}
		if (sources.has(id)) throw new Error(`Multiple source files claim photo ID: ${id}`);
		sources.set(id, path);
	}
	for (const photo of catalog.photos) {
		if (!sources.has(photo.id)) throw new Error(`Source file missing for photo: ${photo.id}`);
	}
	return sources;
}

export function photoRedirects(catalog: PhotoCatalog): string {
	return (
		catalog.photos
			.flatMap((photo) =>
				photo.aliases.flatMap((alias) => [
					`/image/${alias} /image/${photo.id}/ 301`,
					`/image/${alias}/ /image/${photo.id}/ 301`,
				]),
			)
			.join("\n") + "\n"
	);
}
