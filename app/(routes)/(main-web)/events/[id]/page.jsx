"use client";
import { useContext } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import moment from "moment";
import { EventContext } from "@/app/_shared/contexts/EventContextProvider";
import EventCard from "@/app/_shared/components/cards/EventCard";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import OutlinedButton from "@/app/_shared/components/buttons-links/OutlinedButton";
import Title from "@/app/_shared/components/texts/Title";

export default function EventDetailsPage() {
	const { id } = useParams();
	const { events } = useContext(EventContext);

	const event = events.find((e) => e.id === id);

	// related events: same category, exclude current, max 3
	const relatedEvents = event
		? events
				.filter((e) => e.category === event.category && e.id !== id)
				.slice(0, 3)
		: [];

	if (!event) {
		return (
			<section aria-label="event not found">
				<ContainerWrapper>
					<div className="text-center py-16 sm:py-20">
						<p className="text-4xl mb-4">😕</p>
						<p className="font-semibold text-lg sm:text-xl text-neutral-dark-800">
							Event not found
						</p>
						<p className="text-sm sm:text-base text-neutral-dark-600 mt-2 mb-6">
							The event you are looking for does not exist or has
							been removed
						</p>
						<OutlinedButton
							buttonType="link"
							buttonPath="/events"
							buttonExtraClassNames="btn-contained !bg-transparent !text-primary !border-primary hover:!bg-primary hover:!text-neutral-bright-100"
						>
							<span className="block text-nowrap">
								← Back to Events
							</span>
						</OutlinedButton>
					</div>
				</ContainerWrapper>
			</section>
		);
	}

	return (
		<section aria-label="event details page">
			<ContainerWrapper>
				<div className="flex flex-col gap-8 sm:gap-10">
					{/* back button */}
					<OutlinedButton
						buttonType="link"
						buttonPath="/events"
						buttonExtraClassNames="btn-contained !bg-transparent !text-primary !border-primary hover:!bg-primary hover:!text-neutral-bright-100 w-fit"
					>
						<span className="block text-nowrap">
							← Back to Events
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

							<p className="text-sm sm:text-base text-neutral-dark-700 leading-relaxed whitespace-pre-line">
								{event.fullDescription}
							</p>

							{/* key info grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-2">
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

					{/* related events */}
					{relatedEvents.length > 0 && (
						<div className="flex flex-col gap-6 sm:gap-8 mt-4">
							<Title
								headingType="h3"
								title="Related Events"
							/>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
								{relatedEvents.map((relEvent) => (
									<EventCard
										key={relEvent.id}
										{...relEvent}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</ContainerWrapper>
		</section>
	);
}
