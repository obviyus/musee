import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import ExifReader from "exifreader";
import type { ImageMetadata } from "astro";

// AIDEV-NOTE: Parse EXIF datetime format "YYYY:MM:DD HH:MM:SS" without Luxon
function parseExifDate(str: string): Date | null {
	const iso = str.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3").replace(" ", "T");
	const d = new Date(iso);
	return Number.isNaN(d.getTime()) ? null : d;
}

export async function getImageDate(image: ImageMetadata): Promise<Date> {
	let filepath = image.src;

	// Handle Vite's @fs prefix and query strings
	filepath = filepath.replace(/^.*@fs/, "");
	const queryIndex = filepath.indexOf("?");
	if (queryIndex !== -1) {
		filepath = filepath.substring(0, queryIndex);
	}

	// Try dist/ prefix if file doesn't exist
	if (!existsSync(filepath)) {
		filepath = `dist${filepath}`;
	}

	try {
		const buffer = await readFile(filepath);
		const exifTags = ExifReader.load(buffer);

		if (exifTags.DateTimeOriginal?.description) {
			const parsedDate = parseExifDate(exifTags.DateTimeOriginal.description);
			if (parsedDate) return parsedDate;
		}
	} catch {
		// AIDEV-NOTE: EXIF parsing failed, fall back to file stats
	}

	const stats = await stat(filepath);
	return new Date(stats.birthtime);
}
