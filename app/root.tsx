import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, } from "@remix-run/react";
import styles from "~/styles/app.css";


export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Galerie d'Ayaan",
    viewport: "width=device-width,initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover",
    description: "Ayaan Zaidi's personal image feed. Mild obsession with aircrafts and shiny things. Mostly shot on a mobile camera.",
    keywords: "ayaan zaidi, photography, remix",
    "og:title": "Galerie d'Ayaan",
    "og:description": "Ayaan Zaidi's personal image feed. Mild obsession with aircrafts and shiny things. Mostly shot on a mobile camera.",
});

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: styles },
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
