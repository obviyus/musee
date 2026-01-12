import type { GetImageResult } from "astro";

export interface ProcessedImage {
	key: string;
	slug: string;
	date: Date;
	timestamp: number;
	original: GetImageResult;
	thumbnail: GetImageResult;
}

// Lazy-initialized cache
let cachedImages: ProcessedImage[] | null = null;
let processingPromise: Promise<ProcessedImage[]> | null = null;

export async function getProcessedImages(): Promise<ProcessedImage[]> {
	// Return cached result if available
	if (cachedImages) return cachedImages;

	// Return existing promise if processing is in progress
	if (processingPromise) return processingPromise;

	// Start processing
	processingPromise = (async () => {
		// Dynamic imports to avoid top-level Astro dependencies
		const { getImage } = await import("astro:assets");
		const { default: images } = await import("./allImages");
		const { getImageDate } = await import("./imageDate");
		const { dashify } = await import("./slug");

		const imageEntries = Object.entries(images);

		const processed = await Promise.all(
			imageEntries.map(async ([key, value]) => {
				const { metadata, sourcePath } = value;
				const [date, original, thumbnail] = await Promise.all([
					getImageDate(metadata, sourcePath),
					getImage({
						src: metadata,
						format: "webp",
					}),
					getImage({
						src: metadata,
						width: 640,
						quality: 80,
						format: "webp",
					}),
				]);

				const slug = dashify(key);

				return {
					key,
					slug,
					date,
					timestamp: date.getTime(),
					original,
					thumbnail,
				};
			}),
		);

		// Sort by date descending
		processed.sort((a, b) => b.timestamp - a.timestamp);

		cachedImages = processed;
		return processed;
	})();

	return processingPromise;
}

// Helper to get image by slug (O(1) after first call)
let slugMap: Map<string, ProcessedImage> | null = null;

export async function getImageBySlug(slug: string): Promise<ProcessedImage | undefined> {
	if (!slugMap) {
		const images = await getProcessedImages();
		slugMap = new Map(images.map((img) => [img.slug, img]));
	}
	return slugMap.get(slug);
}
