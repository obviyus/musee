import { readFile, stat } from "node:fs/promises";
import { extname } from "node:path";
import ExifReader from "exifreader";

const EXIF_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

function parseExifDate(str: string): Date | null {
	const iso = str.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3").replace(" ", "T");
	const d = new Date(iso);
	return Number.isNaN(d.getTime()) ? null : d;
}

const EXIF_DATE_FIELDS = [
	"DateTimeOriginal",
	"DateTimeDigitized",
	"DateTime",
	"CreateDate",
] as const;

async function getExifDate(filepath: string): Promise<Date | null> {
	const buffer = await readFile(filepath);
	const exifTags = ExifReader.load(buffer);
	for (const field of EXIF_DATE_FIELDS) {
		const tag = exifTags[field];
		if (tag?.description) {
			const parsedDate = parseExifDate(tag.description);
			if (parsedDate) return parsedDate;
		}
	}
	return null;
}

export async function getImageDate(filepath: string): Promise<Date> {
	if (EXIF_EXTENSIONS.has(extname(filepath).toLowerCase())) {
		const exifDate = await getExifDate(filepath);
		if (exifDate) return exifDate;
	}

	const stats = await stat(filepath);
	return new Date(stats.mtime);
}
