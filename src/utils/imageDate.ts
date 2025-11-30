import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import ExifReader from "exifreader";
import type { ImageMetadata } from "astro";

// Set to true to log which images fall back to file stats
const DEBUG_DATE_EXTRACTION = true;

// AIDEV-NOTE: Parse EXIF datetime format "YYYY:MM:DD HH:MM:SS" without Luxon
function parseExifDate(str: string): Date | null {
	const iso = str.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3").replace(" ", "T");
	const d = new Date(iso);
	return Number.isNaN(d.getTime()) ? null : d;
}

// AIDEV-NOTE: EXIF date fields in priority order. DateTimeOriginal is when photo was taken,
// DateTimeDigitized is when scanned/digitized, DateTime is last modification in editing software,
// CreateDate is another common tag used by some cameras.
const EXIF_DATE_FIELDS = [
	"DateTimeOriginal",
	"DateTimeDigitized",
	"DateTime",
	"CreateDate",
] as const;

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

		// Try each EXIF date field in priority order
		for (const field of EXIF_DATE_FIELDS) {
			const tag = exifTags[field];
			if (tag?.description) {
				const parsedDate = parseExifDate(tag.description);
				if (parsedDate) {
					if (DEBUG_DATE_EXTRACTION && field !== "DateTimeOriginal") {
						console.log(`[EXIF] ${filepath}: using ${field} (no DateTimeOriginal)`);
					}
					return parsedDate;
				}
			}
		}

		// No EXIF date found
		if (DEBUG_DATE_EXTRACTION) {
			console.warn(`[EXIF] ${filepath}: no EXIF date fields found, using mtime`);
		}
	} catch (error) {
		// AIDEV-NOTE: EXIF parsing failed, fall back to file stats
		if (DEBUG_DATE_EXTRACTION) {
			console.warn(`[EXIF] ${filepath}: parsing failed (${error instanceof Error ? error.message : "unknown error"}), using mtime`);
		}
	}

	// AIDEV-NOTE: Use mtime instead of birthtime - birthtime gets reset when files are
	// copied, downloaded from cloud, or moved across filesystems. mtime is more reliable.
	const stats = await stat(filepath);
	return new Date(stats.mtime);
}
