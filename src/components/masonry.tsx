import type { GetImageResult } from "astro";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import { memo, useMemo } from "react";

const BREAKPOINT_COLUMNS = {
	default: 2,
	3000: 5,
	2500: 5,
	2000: 4,
	1500: 3,
	1000: 2,
	500: 1,
} as const;

export interface SortedImage {
	original: GetImageResult;
	thumbnail: GetImageResult;
	date: Date;
	slug: string;
}

interface MasonryGridProps {
	images: SortedImage[];
}

const ImageCard = memo(
	({ image, index }: { image: SortedImage; index: number }) => {
		const { slug, thumbnail } = image;
		const thumbnailSrc = thumbnail.src as string;
		const width = thumbnail.attributes.width as number;
		const height = thumbnail.attributes.height as number;

		return (
			<motion.div
				whileInView={{ opacity: 1 }}
				viewport={{ once: true, margin: "50px" }}
				initial={{ opacity: 0 }}
				transition={{
					type: "spring",
					stiffness: 260,
					damping: 20,
					delay: (index % 5) * 0.05,
				}}
			>
				<a href={`/${slug}`} aria-label={`View image ${slug}`}>
					<img
						src={thumbnailSrc}
						width={width}
						height={height}
						alt={`Thumbnail for ${slug}`}
						loading="lazy"
						decoding="async"
						className="transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 will-change-transform"
					/>
				</a>
			</motion.div>
		);
	},
);

ImageCard.displayName = "ImageCard";

export function MasonryGrid({ images }: MasonryGridProps) {
	const memoizedImages = useMemo(() => images, [images]);

	return (
		<Masonry
			breakpointCols={BREAKPOINT_COLUMNS}
			className="flex"
			columnClassName="bg-clip-padding"
		>
			{memoizedImages.map((image, index) => (
				<ImageCard key={image.slug} image={image} index={index} />
			))}
		</Masonry>
	);
}
