import moment from "moment";
import Image from "next/image";
import ContainedButton from "../buttons-links/ContainedButton";

export default function EventCard({ info, index, dataTitle, payloadData }) {
	const {
		slug,
		title,
		shortDescription,
		category,
		date,
		location,
		price,
		imageUrl,
	} = info ?? {};

	return (
		<div className="group bg-neutral-bright-100 rounded-2xl overflow-hidden border border-neutral-bright-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 will-change-transform flex flex-col">
			{/* event image */}
			<div className="relative w-full aspect-[16/10] overflow-hidden">
				<Image
					src={imageUrl}
					alt={title}
					fill
					sizes="(max-width: 576px) 100vw, (max-width: 1024px) 50vw, 33vw"
					className="object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform"
				/>
				<span className="absolute top-3 left-3 bg-primary text-neutral-bright-100 text-xs font-medium px-3 py-1 rounded-full">
					{category}
				</span>
			</div>

			{/* event content */}
			<div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
				<h3 className="font-semibold text-base sm:text-lg text-neutral-dark-800 line-clamp-1">
					{title}
				</h3>
				<p className="text-xs sm:text-sm text-neutral-dark-700 line-clamp-2">
					{shortDescription}
				</p>

				{/* meta info */}
				<div className="flex flex-col gap-1.5 text-xs sm:text-sm text-neutral-dark-600">
					<span className="flex items-center gap-1.5">
						📅 {moment(date).format("MMMM D, YYYY")}
					</span>
					<span className="flex items-center gap-1.5">
						📍 {location}
					</span>
				</div>

				{/* price and CTA */}
				<div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-bright-200">
					<span className="font-semibold text-lg text-primary">
						{price === 0 ? "Free" : `$${price}`}
					</span>

					<ContainedButton
						buttonType="link"
						buttonPath={`/events/${slug}`}
						buttonExtraClassNames="block btn-contained !text-xs sm:!text-sm !px-3 !py-1.5 sm:!px-4 sm:!py-2"
					>
						<span className="block text-nowrap">View Details</span>
					</ContainedButton>
				</div>
			</div>
		</div>
	);
}
