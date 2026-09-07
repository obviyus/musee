import { readFile, stat } from "node:fs/promises";
import { extname } from "node:path";
import ExifReader from "exifreader";

const EXIF_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".heic", ".heif"]);

export interface ImageDate {
	date: Date;
	kind: "captured" | "file";
}

function parseExifDate(str: string, offset?: string): Date | null {
	const iso = str.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3").replace(" ", "T");
	const hasZone = /(?:Z|[+-]\d{2}:\d{2})$/.test(iso);
	const d = new Date(hasZone || !offset ? iso : iso + offset);
	return Number.isNaN(d.getTime()) ? null : d;
}

const EXIF_DATE_FIELDS = [
	["DateTimeOriginal", "OffsetTimeOriginal"],
	["DateTimeDigitized", "OffsetTimeDigitized"],
	["DateTime", "OffsetTime"],
	["CreateDate", "OffsetTimeDigitized"],
] as const;

async function getExifDate(filepath: string): Promise<Date | null> {
	const buffer = await readFile(filepath);
	const exifTags = ExifReader.load(buffer);
	for (const [field, offsetField] of EXIF_DATE_FIELDS) {
		const tag = exifTags[field];
		if (tag?.description) {
			const parsedDate = parseExifDate(tag.description, exifTags[offsetField]?.description);
			if (parsedDate) return parsedDate;
		}
	}
	return null;
}

export async function getImageDate(filepath: string): Promise<ImageDate> {
	if (EXIF_EXTENSIONS.has(extname(filepath).toLowerCase())) {
		const exifDate = await getExifDate(filepath);
		if (exifDate) return { date: exifDate, kind: "captured" };
	}

	const stats = await stat(filepath);
	return { date: stats.mtime, kind: "file" };
}
