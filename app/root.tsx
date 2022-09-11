import type {LinksFunction, MetaFunction} from '@remix-run/cloudflare';
import {Links, LiveReload, Meta, Scripts, ScrollRestoration, useOutlet} from '@remix-run/react';
import {AnimatePresence} from 'framer-motion';
import favicon from '../public/favicon.svg';
import {config} from '../config';
import styles from '~/styles/app.css';

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: config.title,
	viewport: 'width=device-width,initial-scale=1, shrink-to-fit=no, viewport-fit=cover',
	description: config.description,
	keywords: config.keywords,
	'og:title': config.title,
	'og:description': config.description,
	'og:type': 'website',
	'og:url': config.url,
	'og:image': `${config.url}${config.socialPreviewImage}`,
	'og:locale': 'en_US',
	'og:locale_alternative': 'fr_FR',
	'twitter:card': 'summary_large_image',
	'twitter:title': config.title,
	'twitter:image': `${config.url}${config.socialPreviewImage}`,

});

export const links: LinksFunction = () => [
	{rel: 'stylesheet', href: styles},
	{rel: 'icon', href: favicon},
];

export default function App() {
	const outlet = useOutlet();

	return (
		<html lang='en'>
			<head>
				<title>{ config.title }</title>
				<Meta/>
				<Links/>
			</head>
			<body>
				<AnimatePresence exitBeforeEnter>
					{ outlet }
				</AnimatePresence>
				<Scripts/>
				<ScrollRestoration/>
				<LiveReload/>
			</body>
		</html>
	);
}
