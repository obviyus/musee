import { restorePhotos } from "../utils/photoStore";

const origin = process.argv[2];
if (!origin) throw new Error("Usage: bun run photos:restore https://your-gallery.example");
const count = await restorePhotos(new URL(origin), process.cwd());
console.log(
	`Restored ${count} published photos with their original IDs, order, dates, and redirects.`,
);
