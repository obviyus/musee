import * as fs from 'node:fs';
import * as path from 'node:path';
import sharp from 'sharp';
import ExifReader from 'exifreader';
import {parse} from 'fecha';

function imageLister() {
	return fs.readdirSync('images/original').filter(file => ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file)));
}

function importStatementBuilder(images) {
	let importStatement = '';
	for (const image of images) {
		importStatement += `import ${image.name} from ".${image.thumbnailPath}";\n`;
		importStatement += `import ${image.name}_OG from ".${image.compressedPath}";\n`;
	}

	return importStatement;
}

function imageExportListBuilder(images) {
	let exportList = '\nconst images = {\n';
	for (const image of images) {
		exportList += `    "${image.name}": {\n`;
		exportList += `        thumbnail: ${image.name},\n`;
		exportList += `        original: ${image.name}_OG,\n`;
		exportList += `        width: ${image.width},\n`;
		exportList += `        height: ${image.height},\n`;
		exportList += `        date: "${image.date}",\n`;
		exportList += `        readableDate: "${image.readableDate}"\n`;
		exportList += '    },\n';
	}

	exportList += '};\n';
	exportList += 'export default images;\n';

	return exportList;
}

function getReadableDate(date) {
	const mm = date.getMonth() + 1; // GetMonth() is zero-based
	const dd = date.getDate();

	return [date.getFullYear(),
		(mm > 9 ? '' : '0') + mm,
		(dd > 9 ? '' : '0') + dd].join('/');
}

export default async function imageImporter() {
	if (!fs.existsSync('images/thumbnail')) {
		await fs.mkdirSync('images/thumbnail');
	}

	if (!fs.existsSync('images/compressed')) {
		await fs.mkdirSync('images/compressed');
	}

	let original_size = 0;
	let compressed_size = 0;

	const image_names = await Promise.all(imageLister().map(
		async (image, index) => {
			const filename = `IMG_${index + 1}`;

			await Promise.all([
				sharp(`images/original/${image}`)
					.rotate()
					.resize({width: 640, withoutEnlargement: true})
					.webp({quality: 80, force: true})
					.toFile(`./images/thumbnail/${filename}.webp`),
				sharp(`images/original/${image}`)
					.rotate()
					.jpeg({mozjpeg: true, force: true})
					.toFile(`./images/compressed/${filename}.jpeg`),
			]);

			const exifTags = await ExifReader.load(`images/original/${image}`);

			let date;
			date = 'DateTimeOriginal' in exifTags ? parse(exifTags.DateTimeOriginal.description, 'YYYY:MM:DD HH:mm:ss') : fs.statSync(`images/original/${image}`).birthtime;

			const thumbnailMetadata = await sharp(`images/thumbnail/${filename}.webp`).metadata();

			original_size += fs.statSync(`images/original/${image}`).size;
			compressed_size += fs.statSync(`images/compressed/${filename}.jpeg`).size;

			return {
				name: filename,
				thumbnailPath: `./images/thumbnail/${filename}.webp`,
				compressedPath: `./images/compressed/${filename}.jpeg`,
				readableDate: getReadableDate(date),
				date,
				width: thumbnailMetadata.width,
				height: thumbnailMetadata.height,
			};
		},
	));

	console.log(`Original size: ${(original_size / 1024 / 1024).toFixed(2)} MB`);
	console.log(`Compressed size: ${(compressed_size / 1024 / 1024).toFixed(2)} MB`);
	console.log(`Reduced by: ${(compressed_size / original_size * 100).toFixed(2)}% [ ${(original_size - compressed_size) / 1024 / 1024} MB ]`);

	image_names.sort((a, b) => new Date(b.date) - new Date(a.date));

	/**
     * Write all imports to the index.js file
     */
	fs.writeFileSync('./app/images.ts', importStatementBuilder(image_names));
	fs.appendFileSync('./app/images.ts', imageExportListBuilder(image_names));
}

await imageImporter();
