import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { constants, copyFile, mkdir, mkdtemp, rename, rmdir } from "node:fs/promises";
import { basename, extname, join, resolve, sep } from "node:path";
import sharp from "sharp";
import { getImageDate } from "./imageDate";
import {
	catalogPath,
	parsePhotoCatalog,
	parseRecoveryManifest,
	readPhotoCatalog,
	type PhotoCatalog,
	type PhotoRecord,
} from "./photoCatalog";

function imageDirectory(root: string): string {
	return join(root, "src/assets/images/original");
}

async function writeCatalog(root: string, catalog: PhotoCatalog): Promise<void> {
	const filename = catalogPath(root);
	await Bun.write(`${filename}.tmp`, JSON.stringify(catalog, null, "\t") + "\n");
	await rename(`${filename}.tmp`, filename);
}

export async function importPhotos(paths: string[], root: string): Promise<string[]> {
	if (paths.length === 0) throw new Error("Provide at least one photo path.");
	const catalog = existsSync(catalogPath(root))
		? await readPhotoCatalog(root)
		: parsePhotoCatalog({ version: 1, photos: [] });
	const additions: { photo: PhotoRecord; source: string; filename: string }[] = [];
	for (const path of paths) {
		const source = resolve(path);
		const existingId = basename(source).split("__")[0];
		if (catalog.photos.some((photo) => photo.id === existingId)) {
			throw new Error(`Photo is already registered: ${existingId}`);
		}
		if (![".jpg", ".jpeg", ".png", ".webp"].includes(extname(source).toLowerCase())) {
			throw new Error(`Unsupported photo format: ${basename(source)}`);
		}
		const date = await getImageDate(source);
		const id = randomUUID();
		additions.push({
			photo: {
				id,
				capturedAt: date.kind === "captured" ? date.date.toISOString() : null,
				aliases: [],
			},
			source,
			filename: `${id}__${basename(source, extname(source))}${extname(source).toLowerCase()}`,
		});
	}
	const updated = parsePhotoCatalog({
		version: 1,
		photos: [...additions.map(({ photo }) => photo), ...catalog.photos],
	});
	await mkdir(imageDirectory(root), { recursive: true });
	for (const { source, filename } of additions) {
		const destination = join(imageDirectory(root), filename);
		if (source.startsWith(resolve(imageDirectory(root)) + sep)) await rename(source, destination);
		else await copyFile(source, destination, constants.COPYFILE_EXCL);
	}
	await writeCatalog(root, updated);
	return additions.map(({ photo }) => photo.id);
}

export async function restorePhotos(origin: URL, root: string): Promise<number> {
	if (existsSync(catalogPath(root)) || existsSync(imageDirectory(root))) {
		throw new Error(
			"Restore requires a fresh checkout without a photo catalog or original image directory.",
		);
	}
	const response = await fetch(new URL("/photos.json", origin));
	if (!response.ok) throw new Error(`Recovery manifest returned HTTP ${response.status}.`);
	const manifest = parseRecoveryManifest(await response.json());
	if (manifest.photos.length === 0) throw new Error("The recovery manifest contains no photos.");
	for (const photo of manifest.photos) {
		if (new URL(photo.url, origin).origin !== origin.origin) {
			throw new Error(`Recovery photo is outside the selected gallery: ${photo.id}`);
		}
	}

	await mkdir(join(root, ".cache"), { recursive: true });
	const staging = await mkdtemp(join(root, ".cache", "photo-restore-"));
	await mkdir(join(staging, "original"));
	await Bun.write(join(staging, "manifest.json"), JSON.stringify(manifest, null, "\t") + "\n");
	for (const photo of manifest.photos) {
		const image = await fetch(new URL(photo.url, origin));
		if (!image.ok)
			throw new Error(
				`Photo ${photo.id} returned HTTP ${image.status}. Partial files remain in ${staging}.`,
			);
		const bytes = new Uint8Array(await image.arrayBuffer());
		const metadata = await sharp(bytes).metadata();
		if (metadata.format !== "webp" || metadata.exif || metadata.xmp || metadata.iptc) {
			throw new Error(`Photo ${photo.id} is not a metadata-free published WebP.`);
		}
		await Bun.write(join(staging, "original", `${photo.id}__restored.webp`), bytes);
	}
	const catalog = parsePhotoCatalog(manifest);
	await mkdir(join(root, "src/assets/images"), { recursive: true });
	await rename(join(staging, "original"), imageDirectory(root));
	await writeCatalog(root, catalog);
	await Bun.file(join(staging, "manifest.json")).delete();
	await rmdir(staging);
	return catalog.photos.length;
}
