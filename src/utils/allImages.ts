import type { ImageMetadata } from "astro";
import { matchPhotoSources, parsePhotoCatalog } from "./photoCatalog";

const modules = import.meta.glob<{ default: ImageMetadata }>(
	"/src/assets/images/original/**/*.{png,jpg,jpeg,webp}",
	{ eager: true },
);

const catalogs = import.meta.glob<unknown>("../assets/images/catalog.json", {
	eager: true,
	import: "default",
});
const catalogData = catalogs["../assets/images/catalog.json"];
if (!catalogData) throw new Error("Photo catalog missing. Use photos:add or photos:restore first.");
const catalog = parsePhotoCatalog(catalogData);
const sources = matchPhotoSources(catalog, Object.keys(modules));

export interface ImageSource {
	metadata: ImageMetadata;
	slug: string;
	capturedAt: string | null;
	aliases: string[];
}

const images: ImageSource[] = catalog.photos.map((photo) => ({
	metadata: modules[sources.get(photo.id)!].default,
	slug: photo.id,
	capturedAt: photo.capturedAt,
	aliases: photo.aliases,
}));

export default images;
