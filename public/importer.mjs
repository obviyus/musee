import * as fs from "fs";
import sharp from "sharp";

function imageLister() {
    const files = fs.readdirSync('./public/images/original');
    files.sort(function (x, y) {
        return fs.statSync('./public/images/original/' + y).ctime.getTime() - fs.statSync('./public/images/original/' + x).ctime.getTime()
    })

    return files;
}

function importStatementBuilder(images) {
    let importStatement = "";
    images.forEach(image => {
        importStatement += `import ${ image.name } from "${ image.thumbnailPath }";\n`;
        importStatement += `import ${ image.name }_OG from "${ image.originalPath }";\n`;
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
};

export default async function imageImporter() {
    const image_names = await Promise.all(imageLister().map(
        async (image, index) => {
            const filename = `IMG_${ index + 1 }`;
            await sharp(`./public/images/original/${ image }`)
                .rotate()
                .resize({ width: 640, withoutEnlargement: true })
                .jpeg({ quality: 80, mozjpeg: true, force: true })
                .toFile(`./public/images/thumbnail/${ filename }.jpeg`);

            /**
             * Get width and height of image
             */
            const dimensions = await sharp(`./public/images/thumbnail/${ filename }.jpeg`).metadata();
            console.log(dimensions.width, dimensions.height);
            const date = new Date(fs.statSync(`./public/images/original/${ image }`).ctime);

            return {
                name: filename,
                thumbnailPath: `./images/thumbnail/${ filename }.jpeg`,
                originalPath: `./images/original/${ image }`,
                date: getReadableDate(date),
                width: dimensions.width,
                height: dimensions.height,
            };
        }
    ));

    /**
     * Write all imports to the index.js file
     */
    fs.writeFileSync('./public/index.js', importStatementBuilder(image_names));
    fs.appendFileSync('./public/index.js', imageExportListBuilder(image_names));
}

await imageImporter();
