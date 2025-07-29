import { motion } from "framer-motion";
import { daysAgo } from "./days-ago";

export interface ImageProps {
	date: Date;
	src: string;
	slug: string;
	width: number;
	height: number;
	alt?: string;
}

export function BaseImage({ date, slug, src, width, height, alt }: ImageProps) {
	const imageAlt = alt || `Image ${slug}`;

	return (
		<div className="flex flex-col min-h-screen max-h-screen w-full overflow-hidden">
			<div className="flex-1 flex items-center justify-center p-4 sm:p-8 md:p-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						type: "spring",
						stiffness: 260,
						damping: 20,
					}}
					className="relative w-full h-full flex items-center justify-center"
				>
					<a
						href={src}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`View full size image: ${imageAlt}`}
						className="block max-w-full max-h-full"
					>
						<img
							src={src}
							alt={imageAlt}
							width={width}
							height={height}
							loading="eager"
							decoding="async"
							className="max-w-full max-h-[calc(100vh-12rem)] w-auto h-auto object-contain rounded-xl border-2 border-slate-50 shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-3xl"
						/>
					</a>
				</motion.div>
			</div>
			<div className="flex justify-center pb-8">
				<time
					dateTime={date.toISOString()}
					className="font-bold text-slate-700"
				>
					{daysAgo(date)}
				</time>
			</div>
		</div>
	);
}
