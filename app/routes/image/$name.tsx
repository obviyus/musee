import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import images from "public/index";
import { useLoaderData } from "@remix-run/react";

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
        date: image.date,
        height: image.height,
    };
}

export default function ImageRoute() {
    const data = useLoaderData();

    return (
        <div className={ 'flex mx-auto max-w-screen-sm p-2 items-center flex-col pb-16 pt-12 min-h-screen' }>
            <a href={ data.image }>
                <img src={ data.image }
                     alt={ data.title }
                     title={ data.title }
                     width={ data.width }
                     height={ data.height }
                     className={ 'm-auto shadow-2xl rounded-xl border-slate-50 border-2 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300' }
                />
            </a>

            <h1 className={ 'font-bold text-slate-700 mt-5' }>
                { data.title }
            </h1>

            <p className={ 'font-semibold text-stone-500 mt-2' }>
                { data.date }
            </p>
        </div>
    )
}
