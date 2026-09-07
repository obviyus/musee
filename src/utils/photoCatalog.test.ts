import { expect, test } from "bun:test";
import { matchPhotoSources, parsePhotoCatalog, photoRedirects } from "./photoCatalog";

const catalog = parsePhotoCatalog({
	version: 1,
	photos: [
		{ id: "photo-one", capturedAt: null, aliases: ["former-photo"] },
		{ id: "photo-two", capturedAt: "2020-01-02T00:00:00Z", aliases: [] },
	],
});

test("photo IDs survive changes to folders, filenames, and image formats", () => {
	const before = matchPhotoSources(catalog, [
		"/private/photo-one__camera.jpg",
		"/private/photo-two__scan.png",
	]);
	const restored = matchPhotoSources(catalog, [
		"/recovered/nested/photo-two__restored.webp",
		"/recovered/photo-one__renamed.webp",
	]);
	expect([...before.keys()].sort()).toEqual([...restored.keys()].sort());
	expect(catalog.photos.map((photo) => photo.id)).toEqual(["photo-one", "photo-two"]);
});

test("missing or unknown photos cannot silently change the public gallery", () => {
	expect(() => matchPhotoSources(catalog, ["photo-one__camera.jpg"])).toThrow(
		"Source file missing",
	);
	expect(() => matchPhotoSources(catalog, ["camera.jpg"])).toThrow("Unregistered photo");
	expect(() =>
		matchPhotoSources(catalog, ["photo-one__camera.jpg", "photo-one__copy.webp"]),
	).toThrow("Multiple source files");
});

test("old URLs redirect directly to the permanent photo URL", () => {
	expect(photoRedirects(catalog)).toBe(
		"/image/former-photo /image/photo-one/ 301\n/image/former-photo/ /image/photo-one/ 301\n",
	);
});

test("an old URL cannot take over another photo's URL", () => {
	expect(() =>
		parsePhotoCatalog({
			version: 1,
			photos: [
				{ id: "photo-one", capturedAt: null, aliases: ["photo-two"] },
				{ id: "photo-two", capturedAt: null, aliases: [] },
			],
		}),
	).toThrow("Photo URL is assigned more than once");
});
