import { importPhotos } from "../utils/photoStore";

const ids = await importPhotos(process.argv.slice(2), process.cwd());
console.log(
	`Imported ${ids.length} photos with permanent IDs. The private catalog and images remain ignored by Git.`,
);
