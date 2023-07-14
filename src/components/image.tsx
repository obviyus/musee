import { motion } from "framer-motion";
import { daysAgo } from "./days-ago";

export type Props = {
	date: Date;
	src: string;
	slug: string;
	width: number;
	height: number;
};

export function BaseImage(props: Props) {
	const { date, slug, src, width, height } = props;

	return (
		<div
			className={
				"flex flex-col overflow-hidden max-w-screen-xl min-h-screen max-h-screen mx-auto p-10 items-center pb-16 pt-12"
			}
		>
			<motion.div
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				exit={{ opacity: 0, y: -100 }}
				transition={{
					type: "spring",
					stiffness: 260,
					damping: 20,
				}}
			>
				<a href={src} target={"_blank"} rel={"noopener noreferrer"}>
					<img
						src={src}
						alt={slug}
						className={
							"w-full max-h-[80vh] object-contain shadow-2xl rounded-xl border-slate-50 border-2 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300"
						}
					/>
				</a>
			</motion.div>
			<h1 className={"font-bold text-slate-700 mt-8"}>{daysAgo(date)}</h1>
		</div>
	);
}
