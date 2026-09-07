import { photoRedirects, readPhotoCatalog } from "../utils/photoCatalog";

await Bun.write("dist/_redirects", photoRedirects(await readPhotoCatalog(process.cwd())));
