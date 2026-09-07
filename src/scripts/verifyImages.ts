import { createHash } from "node:crypto";
import sharp from "sharp";

const originals = new Set<string>();
for await (const image of new Bun.Glob("**/*.{png,jpg,jpeg,webp}").scan(
	"src/assets/images/original",
)) {
	const bytes = await Bun.file(`src/assets/images/original/${image}`).bytes();
	originals.add(createHash("sha256").update(bytes).digest("hex"));
}
if (originals.size === 0)
	throw new Error("The private image store is empty. Refusing to deploy an empty gallery.");

let count = 0;
for await (const image of new Bun.Glob("_astro/*.{png,jpg,jpeg,webp}").scan("dist")) {
	const bytes = await Bun.file(`dist/${image}`).bytes();
	const metadata = await sharp(bytes).metadata();
	if (metadata.exif || metadata.xmp || metadata.iptc) {
		throw new Error(`Generated image still contains private metadata: ${image}`);
	}
	if (originals.has(createHash("sha256").update(bytes).digest("hex"))) {
		throw new Error(`Build includes an unprocessed original: ${image}`);
	}
	count++;
}
if (count === 0) throw new Error("No generated images found. Build the gallery before deployment.");
console.log(`Verified ${count} generated images: no private metadata or unprocessed originals.`);
