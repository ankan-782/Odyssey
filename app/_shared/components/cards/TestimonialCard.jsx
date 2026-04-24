import { Rate } from "antd";

export default function TestimonialCard({
	info,
	index,
	dataTitle,
	payloadData,
}) {
	const { rating, quote, name, role } = info ?? {};

	return (
		<div className="flex-1 bg-neutral-bright-100 rounded-2xl p-5 border border-neutral-bright-200 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300">
			<Rate
				disabled
				allowHalf
				defaultValue={rating}
				className="!text-sm"
			/>
			<p className="text-xs sm:text-sm text-neutral-dark-700 italic flex-1">
				&ldquo;{quote}&rdquo;
			</p>
			<div className="pt-3 border-t border-neutral-bright-200">
				<p className="font-semibold text-sm sm:text-base text-neutral-dark-800">
					{name}
				</p>
				<p className="text-xs sm:text-sm text-neutral-dark-600">
					{role}
				</p>
			</div>
		</div>
	);
}
