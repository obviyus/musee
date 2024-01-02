import fs from "fs";
import Sqids from "sqids";

/**
 * List all images in the src/assets/images/original directory
 */
function listImages() {
	return fs.readdirSync("./src/assets/images/original");
}

/**
 * Returns a hash code from a string
 */
function simpleHash(input: string) {
	let hash = 0;
	for (let i = 0; i < input.length; i++) {
		const char = input.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash >>>= 0; // Convert to an unsigned 32bit integer
	}
	return hash;
}

const sqids = new Sqids({
	minLength: 10,
	alphabet: "abcdefghijklmnopqrstuvwxyz",
});

const targetFile = "./src/assets/images/imageList.ts";
const esmImports: string[] = [];
const imageMap: Record<string, string> = {};

for (const image of listImages()) {
	if (!/\.(png|jpg|jpeg|webp)$/.test(image)) continue;

	const imageHash = simpleHash(image);
	const readableId = sqids.encode([imageHash]);

	esmImports.push(`import ${readableId} from "./original/${image}";`);
	imageMap[readableId] = readableId;
}

const imageListContent = `// This file is auto-generated by imageImporter.ts
// Do not edit this file directly
${esmImports.join("\n")}

const imageList: Record<string, ImageMetadata> = {\n${Object.entries(imageMap)
	.map(([key, value]) => `\t${key}: ${value},`)
	.join("\n")}\n};

export default imageList;
`;

fs.writeFileSync(targetFile, imageListContent);
