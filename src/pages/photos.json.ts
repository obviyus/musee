import { getProcessedImages } from "../utils/processedImages";

export async function GET(): Promise<Response> {
	const images = await getProcessedImages();
	return Response.json({
		version: 1,
		photos: images.map((image) => ({
			id: image.slug,
			capturedAt: image.date?.toISOString() ?? null,
			aliases: image.aliases,
			url: image.original.src,
		})),
	});
}
