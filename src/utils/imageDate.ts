import ExifReader from "exifreader";
import { DateTime } from "luxon";

export async function getImageDate(image: any): Promise<Date> {
	let filepath = image.src;

	// Handle different build environments
	let file = Bun.file(filepath);
	if (!(await file.exists())) {
		filepath = filepath.replace("@fs/", "");
		const queryIndex = filepath.indexOf("?");
		if (queryIndex !== -1) {
			filepath = filepath.substring(0, queryIndex);
		}
		file = Bun.file(filepath);
	}

	if (!(await file.exists())) {
		filepath = `dist/${filepath}`;
		file = Bun.file(filepath);
	}

	try {
		const buffer = await file.arrayBuffer();
		const exifTags = ExifReader.load(buffer);

		if (exifTags.DateTimeOriginal?.description) {
			const parsedDate = DateTime.fromFormat(
				exifTags.DateTimeOriginal.description,
				"yyyy:MM:dd HH:mm:ss",
			);
			if (parsedDate.isValid) return parsedDate.toJSDate();
		}
	} catch (error) {
		// AIDEV-NOTE: EXIF parsing failed, fall back to file stats
	}

	const stats = await file.stat();
	return new Date(stats.birthtime);
}
