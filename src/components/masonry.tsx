/* eslint-disable @typescript-eslint/naming-convention */
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';

const breakpointColumnsObject = {
	default: 2,
	3000: 5,
	2500: 5,
	2000: 4,
	1500: 3,
	1000: 2,
	500: 1,
};

export type sortedImage = {
	original: any;
	thumbnail: any;
	date: Date;
};

export function MasonryGrid(props: { images: sortedImage[] }) {
	const { images } = props;

	return (
		<Masonry breakpointCols={breakpointColumnsObject} className={'flex'}>
			{Object.entries(images).map((image, index) => {
				return (
					<motion.div
						key={index}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						initial={{ opacity: 0 }}
						transition={{
							type: 'spring',
							stiffness: 260,
							damping: 20,
							delay: (index % 5) * 0.05,
						}}>
						<a href={image[1].original.src as string}>
							<img
								src={image[1].thumbnail.src as string}
								loading={'lazy'}
								className={
									'transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300'
								}
							/>
						</a>
					</motion.div>
				);
			})}
		</Masonry>
	);
}
