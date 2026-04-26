"use client";
import OutlinedButton from "@/app/_shared/components/buttons-links/OutlinedButton";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import Description from "@/app/_shared/components/texts/Description";
import Title from "@/app/_shared/components/texts/Title";
import { RightArrowSVGIcon } from "@/app/_shared/components/ui/Icons";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import { motion } from "framer-motion";
import moment from "moment";
import Image from "next/image";

export default function EventDetailsSection({ event }) {
	return (
		<motion.section
			aria-label="event details section"
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			variants={viewportShowingMotion()}
			className="bg-neutral-bright-100"
		>
			<ContainerWrapper>
				<div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
					{/* back button */}
					<OutlinedButton
						buttonType="link"
						buttonPath="/events"
						buttonExtraClassNames="flex items-center gap-2 btn-outlined"
						buttonContainerExtraClassNames="w-fit"
					>
						<RightArrowSVGIcon className="rotate-180 size-4 sm:size-4.5 lg:size-5 flex-none" />
						<span className="block text-nowrap">
							Back to Events
						</span>
					</OutlinedButton>

					{/* event details */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
						{/* event image */}
						<div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden">
							<Image
								src={event.imageUrl}
								alt={event.title}
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover"
								priority
							/>
							<span className="absolute top-4 left-4 bg-primary text-neutral-bright-100 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full">
								{event.category}
							</span>
						</div>

						{/* event info */}
						<div className="flex flex-col gap-4 sm:gap-5">
							<Title
								headingType="h1"
								title={event.title}
								extraClassNames="!text-2xl sm:!text-3xl lg:!text-4xl"
							/>

							<Description
								description={event.fullDescription}
								extraClassNames="!text-sm sm:!text-base"
							/>

							{/* key info grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
								<div className="bg-primary/5 rounded-xl p-4 flex flex-col gap-1">
									<span className="text-xs text-neutral-dark-600 font-medium uppercase">
										Date
									</span>
									<span className="text-sm sm:text-base text-neutral-dark-800 font-semibold">
										📅{" "}
										{moment(event.date).format(
											"MMMM D, YYYY",
										)}
									</span>
								</div>
								<div className="bg-primary/5 rounded-xl p-4 flex flex-col gap-1">
									<span className="text-xs text-neutral-dark-600 font-medium uppercase">
										Location
									</span>
									<span className="text-sm sm:text-base text-neutral-dark-800 font-semibold">
										📍 {event.location}
									</span>
								</div>
								<div className="bg-primary/5 rounded-xl p-4 flex flex-col gap-1">
									<span className="text-xs text-neutral-dark-600 font-medium uppercase">
										Price
									</span>
									<span className="text-sm sm:text-base text-primary font-bold">
										{event.price === 0
											? "Free"
											: `$${event.price}`}
									</span>
								</div>
								<div className="bg-primary/5 rounded-xl p-4 flex flex-col gap-1">
									<span className="text-xs text-neutral-dark-600 font-medium uppercase">
										Category
									</span>
									<span className="text-sm sm:text-base text-neutral-dark-800 font-semibold">
										{event.category}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ContainerWrapper>
		</motion.section>
	);
}
