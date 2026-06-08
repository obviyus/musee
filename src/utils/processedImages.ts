import type { GetImageResult } from "astro";

export interface ProcessedImage {
	slug: string;
	date: Date;
	timestamp: number;
	original: GetImageResult;
	thumbnail: GetImageResult;
}

let processedImages: Promise<ProcessedImage[]> | undefined;

export async function getProcessedImages(): Promise<ProcessedImage[]> {
	if (import.meta.env.DEV) return loadProcessedImages();
	processedImages ??= loadProcessedImages();
	return processedImages;
}

async function loadProcessedImages(): Promise<ProcessedImage[]> {
	const { getImage } = await import("astro:assets");
	const { default: images } = await import("./allImages");
	const { getImageDate } = await import("./imageDate");

	const processed = await Promise.all(
		images.map(async ({ metadata, sourcePath, slug }) => {
			const [date, original, thumbnail] = await Promise.all([
				getImageDate(sourcePath),
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

			return {
				slug,
				date,
				timestamp: date.getTime(),
				original,
				thumbnail,
			};
		}),
	);

	processed.sort((a, b) => b.timestamp - a.timestamp);

	return processed;
}
