import { afterAll, expect, test } from "bun:test";
import { mkdtemp, rm, utimes } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { getImageDate } from "./imageDate";

const directory = await mkdtemp(join(tmpdir(), "musee-date-test-"));
afterAll(() => rm(directory, { recursive: true }));

test("file dates can sort photos without being presented as capture dates", async () => {
	const file = join(directory, "without-date.webp");
	await sharp({ create: { width: 2, height: 2, channels: 3, background: "white" } })
		.webp()
		.toFile(file);
	const timestamp = new Date("2024-06-01T12:00:00Z");
	await utimes(file, timestamp, timestamp);

	const result = await getImageDate(file);
	expect(result.kind).toBe("file");
	expect(result.date.getTime()).toBe(timestamp.getTime());
});

test("a photo with a capture date retains that date and its provenance", async () => {
	const file = join(directory, "with-date.jpg");
	await sharp({ create: { width: 2, height: 2, channels: 3, background: "white" } })
		.jpeg()
		.withExif({ IFD2: { DateTimeOriginal: "2020:07:08 09:10:11" } })
		.toFile(file);

	const result = await getImageDate(file);
	expect(result.kind).toBe("captured");
	expect(result.date.getFullYear()).toBe(2020);
	expect(result.date.getMonth()).toBe(6);
	expect(result.date.getDate()).toBe(8);
});

test("capture dates use the matching camera time-zone offset", async () => {
	for (const offset of ["+09:00", "-07:00"]) {
		const file = join(directory, `offset-${offset}.jpg`);
		await sharp({ create: { width: 2, height: 2, channels: 3, background: "white" } })
			.jpeg()
			.withExif({ IFD2: { DateTimeOriginal: "2026:07:20 20:01:50", OffsetTimeOriginal: offset } })
			.toFile(file);
		const result = await getImageDate(file);
		expect(result.kind).toBe("captured");
		expect(result.date.toISOString()).toBe(new Date(`2026-07-20T20:01:50${offset}`).toISOString());
	}
});
