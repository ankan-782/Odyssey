import Link from "next/link";

export default function CategoryCard({ info, index, dataTitle, payloadData }) {
	const { CATEGORY_ICONS } = payloadData ?? {};

	const category = info;

	return (
		<Link
			href={`/events?category=${category}`}
			className="group flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl bg-neutral-dark-800/20 border border-neutral-dark-600/30 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300"
		>
			<span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
				{CATEGORY_ICONS[category]}
			</span>
			<span className="text-sm sm:text-base font-medium text-neutral-bright-100">
				{category}
			</span>
		</Link>
	);
}
