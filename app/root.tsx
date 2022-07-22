import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, } from "@remix-run/react";
import styles from "~/styles/app.css";
import favicon from "../public/favicon.svg";
import { config } from "../config";


export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: config.title,
    viewport: "width=device-width,initial-scale=1, shrink-to-fit=no, viewport-fit=cover",
    description: config.description,
    keywords: config.keywords,
    "og:title": config.title,
    "og:description": config.description,
    "og:type": "website",
    "og:url": config.url,
    "og:image": `${ config.url }${ config.socialPreviewImage }`,
    "og:locale": "en_US",
    "og:locale_alternative": "fr_FR",
    "twitter:card": "summary_large_image",
    "twitter:title": config.title,
    "twitter:image": `${ config.url }${ config.socialPreviewImage }`,

});

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: styles },
        { rel: "icon", href: favicon },
    ]
}

export default function App() {
    return (
        <html lang="en">
        <head>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Outlet/>
        <Scripts/>
        <ScrollRestoration/>
        <LiveReload/>
        </body>
        </html>
    );
}
