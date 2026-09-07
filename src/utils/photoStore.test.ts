import { afterAll, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { catalogPath, matchPhotoSources, readPhotoCatalog } from "./photoCatalog";
import { importPhotos, restorePhotos } from "./photoStore";

const directory = await mkdtemp(join(tmpdir(), "musee-store-test-"));
afterAll(() => rm(directory, { recursive: true }));
const image = await sharp({ create: { width: 2, height: 2, channels: 3, background: "white" } })
	.webp()
	.toBuffer();
const records = [
	{ id: "photo-one", capturedAt: null, aliases: ["former-photo"] },
	{ id: "photo-two", capturedAt: "2020-01-02T00:00:00Z", aliases: [] },
];
const server = Bun.serve({
	hostname: "127.0.0.1",
	port: 0,
	fetch(request) {
		const url = new URL(request.url);
		if (url.pathname === "/photos.json") {
			return Response.json({
				version: 1,
				photos: records.map((photo) => ({ ...photo, url: `/${photo.id}.webp` })),
			});
		}
		return new Response(image, { headers: { "Content-Type": "image/webp" } });
	},
});
afterAll(() => server.stop(true));

test("restoring published images preserves IDs, order, capture dates, and redirects", async () => {
	const root = join(directory, "restored");
	expect(await restorePhotos(server.url, root)).toBe(2);
	const catalog = await readPhotoCatalog(root);
	expect(catalog.photos).toEqual(records);
	const files = Array.from(
		new Bun.Glob("*.webp").scanSync(join(root, "src/assets/images/original")),
	);
	expect(matchPhotoSources(catalog, files).size).toBe(2);
	expect(restorePhotos(server.url, root)).rejects.toThrow("fresh checkout");
	expect((await readPhotoCatalog(root)).photos).toEqual(records);
});

test("importing a photo assigns its ID once and normalizes the file extension", async () => {
	const source = join(directory, "camera.JPG");
	await sharp(image).jpeg().toFile(source);
	const root = join(directory, "imported");
	const ids = await importPhotos([source], root);
	const catalog = await readPhotoCatalog(root);
	expect(catalog.photos.map((photo) => photo.id)).toEqual(ids);
	expect(
		await Bun.file(join(root, "src/assets/images/original", `${ids[0]}__camera.jpg`)).exists(),
	).toBe(true);
	expect(await Bun.file(source).exists()).toBe(true);
});

test("a failed download cannot install a partial gallery", async () => {
	const failing = Bun.serve({
		hostname: "127.0.0.1",
		port: 0,
		fetch(request) {
			if (new URL(request.url).pathname === "/photos.json") {
				return Response.json({
					version: 1,
					photos: [{ ...records[0], url: "/missing.webp" }],
				});
			}
			return new Response("Not found", { status: 404 });
		},
	});
	afterAll(() => failing.stop(true));
	const root = join(directory, "failed");
	expect(restorePhotos(failing.url, root)).rejects.toThrow("HTTP 404");
	expect(existsSync(catalogPath(root))).toBe(false);
	expect(existsSync(join(root, "src/assets/images/original"))).toBe(false);
});
