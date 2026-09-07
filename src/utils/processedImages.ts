import type { GetImageResult } from "astro";
import type { ImageDate } from "./imageDate";

export interface ProcessedImage {
	slug: string;
	date: ImageDate;
	timestamp: number;
	original: GetImageResult;
	display: GetImageResult;
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
			// Reading the imported metadata directly marks private originals for publication.
			const sourceWidth = original.attributes.width as number;
			const displayWidth = Math.min(sourceWidth, 1920);
			const maxWidth = Math.min(sourceWidth, 2560);
			const display = await getImage({
				src: metadata,
				width: displayWidth,
				widths: [...[640, 1280, 1920].filter((width) => width < maxWidth), maxWidth],
				quality: 80,
				format: "webp",
			});

			return {
				slug,
				date,
				timestamp: date.date.getTime(),
				original,
				display,
				thumbnail,
			};
		}),
	);

	processed.sort((a, b) => b.timestamp - a.timestamp);

	return processed;
}
