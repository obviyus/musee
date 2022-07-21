import * as fs from "fs";
import sharp from "sharp";
import ExifReader from "exifreader";
import { parse } from "fecha";

function imageLister() {
    return fs.readdirSync('images/original');
}

function importStatementBuilder(images) {
    let importStatement = "";
    images.forEach(image => {
        importStatement += `import ${ image.name } from ".${ image.thumbnailPath }";\n`;
        importStatement += `import ${ image.name }_OG from ".${ image.originalPath }";\n`;
    });

    return importStatement;
}

function imageExportListBuilder(images) {
    let exportList = "\nconst images = {\n";
    images.forEach(image => {
        exportList += `    "${ image.name }": {\n`;
        exportList += `        thumbnail: ${ image.name },\n`;
        exportList += `        original: ${ image.name }_OG,\n`;
        exportList += `        width: ${ image.width },\n`;
        exportList += `        height: ${ image.height },\n`;
        exportList += `        date: "${ image.date }",\n`;
        exportList += `        readableDate: "${ image.readableDate }"\n`;
        exportList += `    },\n`;
    });
    exportList += "};\n";
    exportList += "export default images;\n";

    return exportList;
}

function getReadableDate(date) {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();

    return [date.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('/');
}

export default async function imageImporter() {
    if (!fs.existsSync('images/thumbnail')) {
        await fs.mkdirSync('images/thumbnail');
    }

    const image_names = await Promise.all(imageLister().map(
        async (image, index) => {
            const filename = `IMG_${ index + 1 }`;

            await sharp(`images/original/${ image }`)
                .withMetadata()
                .rotate()
                .resize({ width: 640, withoutEnlargement: true })
                .jpeg({ quality: 80, mozjpeg: true, force: true })
                .toFile(`./images/thumbnail/${ filename }.jpeg`);

            const original_metadata = await sharp(`images/original/${ image }`).metadata();
            const original_size = fs.statSync(`images/original/${ image }`).size;

            const exifTags = await ExifReader.load(`images/original/${ image }`);

            let date;
            if ("DateTimeOriginal" in exifTags) {
                date = parse(exifTags['DateTimeOriginal'].description, 'YYYY:MM:DD HH:mm:ss');
            } else {
                date = fs.statSync(`images/original/${ image }`).ctime;
            }

            const converted_metadata = await sharp(`images/thumbnail/${ filename }.jpeg`).metadata();
            const converted_size = fs.statSync(`images/thumbnail/${ filename }.jpeg`).size;

            console.log(
                `${ filename }: ${ original_metadata.width } ✕ ${ original_metadata.height } [ ${ original_size / 1000 }KB ] => ${ converted_metadata.width } ✕ ${ converted_metadata.height } [ ${ converted_size / 1000 }KB ]`
            );

            return {
                name: filename,
                thumbnailPath: `./images/thumbnail/${ filename }.jpeg`,
                originalPath: `./images/original/${ image }`,
                readableDate: getReadableDate(date),
                date: date,
                width: converted_metadata.width,
                height: converted_metadata.height,
            };
        }
    ));

    image_names.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    /**
     * Write all imports to the index.js file
     */
    fs.writeFileSync('public/index.js', importStatementBuilder(image_names));
    fs.appendFileSync('public/index.js', imageExportListBuilder(image_names));
}

await imageImporter();
