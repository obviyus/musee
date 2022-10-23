/* eslint-disable @typescript-eslint/naming-convention */
import type {LoaderFunction, MetaFunction} from '@remix-run/cloudflare';
import {redirect} from '@remix-run/cloudflare';
import {useLoaderData} from '@remix-run/react';
import {motion} from 'framer-motion';
import {config} from '../../../config';
import images from '~/images';

export const meta: MetaFunction = ({data}: {data: Image}) => ({
	title: data.title,
	description: data.title,
	viewport:
		'width=device-width,initial-scale=1, shrink-to-fit=no, viewport-fit=cover',
	'og:title': data.title,
	'og:description': data.title,
	'og:type': 'image',
	'og:url': `${config.url}/image/${data.title}`,
	'og:image': `${config.url}${data.image}`,
	'twitter:card': 'summary_large_image',
	'twitter:title': data.title,
	'twitter:image': `${config.url}${data.image}`,
});

type Image = {
	title: string;
	image: string;
	width: number;
	height: number;
	date: string;
};

export const loader: LoaderFunction = async ({params}) => {
	const {name} = params;
	if (!name && name && !(name in images)) {
		redirect('/');
		return;
	}

	const image = images[name!] as Record<string, string | number>;
	const processedImage: Image = {
		title: name!,
		image: image.original as string,
		width: image.width as number,
		date: image.readableDate as string,
		height: image.height as number,
	};

	return processedImage;
};

export default function ImageRoute() {
	const data: Image = useLoaderData();

	return (
		<div
			className={
				'flex flex-col overflow-hidden max-w-screen-xl min-h-screen max-h-screen mx-auto p-10 items-center pb-16 pt-12'
			}
		>
			<motion.div
				initial={{opacity: 0, y: -100}}
				animate={{opacity: 1, y: 0}}
				exit={{opacity: 0, y: -100}}
				transition={{
					type: 'spring',
					stiffness: 260,
					damping: 20,
				}}
			>
				<a href={data.image}>
					<img
						src={`${data.image}`}
						alt={data.title}
						title={data.title}
						width={data.width}
						height={data.height}
						className={
							'w-full max-h-[80vh] object-contain shadow-2xl rounded-xl border-slate-50 border-2 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300'
						}
					/>
				</a>
			</motion.div>

			<h1 className={'font-bold text-slate-700 mt-8'}>{data.title}</h1>

			<p className={'font-semibold text-stone-500 mt-2'}>{data.date}</p>
		</div>
	);
}
