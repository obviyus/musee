import type { GetImageResult } from "astro";

export interface ProcessedImage {
	slug: string;
	date: Date | null;
	aliases: string[];
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

	const processed = await Promise.all(
		images.map(async ({ metadata, slug, capturedAt, aliases }) => {
			const [original, thumbnail] = await Promise.all([
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
				date: capturedAt === null ? null : new Date(capturedAt),
				aliases,
				original,
				display,
				thumbnail,
			};
		}),
	);

	return processed;
}
