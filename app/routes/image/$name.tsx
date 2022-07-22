import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import images from '~/images';
import { useLoaderData } from "@remix-run/react";
import { config } from "../../../config";

export const meta: MetaFunction = ({ data }) => {
    return {
        title: data.title,
        viewport: "width=device-width,initial-scale=1, shrink-to-fit=no, viewport-fit=cover",
        "og:title": data.title,
        "og:type": "image",
        "og:url": `${ config.url }/image/${ data.name }`,
        "og:image": `${ config.url }${ data.image }`,
        "twitter:card": "summary_large_image",
        "twitter:title": data.title,
        "twitter:image": `${ config.url }${ data.image }`,
    }
};

export const loader: LoaderFunction = async ({ params, }) => {
    const { name } = params;
    if (!name && (name && !(name in images))) {
        redirect(`/`);
        return;
    }

    const image = images[name];
    return {
        title: name,
        image: image.original,
        width: image.width,
        date: image.readableDate,
        height: image.height,
    };
}

export default function ImageRoute() {
    const data = useLoaderData();

    return (
        <div className={ 'flex flex-col max-w-screen-xl min-h-screen max-h-screen mx-auto p-10 items-center pb-16 pt-12' }>
            <a href={ data.image }>
                <img src={ data.image }
                     alt={ data.title }
                     title={ data.title }
                     width={ data.width }
                     height={ data.height }
                     className={ 'w-full max-h-[80vh] shadow-2xl rounded-xl border-slate-50 border-2 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300' }
                />
            </a>

            <h1 className={ 'font-bold text-slate-700 mt-8' }>
                { data.title }
            </h1>

            <p className={ 'font-semibold text-stone-500 mt-2' }>
                { data.date }
            </p>
        </div>
    )
}
