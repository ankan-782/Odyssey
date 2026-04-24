"use client";
import { motion } from "framer-motion";
import { useContext } from "react";
import OutlinedButton from "@/app/_shared/components/buttons-links/OutlinedButton";
import CardsLayout from "@/app/_shared/components/common-wrapper/CardsLayout";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import Description from "@/app/_shared/components/texts/Description";
import Title from "@/app/_shared/components/texts/Title";
import { EventContext } from "@/app/_shared/contexts/EventContextProvider";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";

export default function FeaturedEventsSection() {
	const { events } = useContext(EventContext);
	const featuredEvents = events.slice(0, 4);

	return (
		<motion.section
			aria-label="featured events section"
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			variants={viewportShowingMotion()}
			className="bg-neutral-bright-100"
		>
			<ContainerWrapper>
				<div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
					{/* section header */}
					<div className="text-center flex flex-col gap-2 sm:gap-3">
						<Title
							transitionDelay={0.1}
							headingType="h2"
							title={{
								first: "Featured",
								second: "Events",
							}}
						/>
						<Description
							transitionDelay={0.2}
							description="Handpicked events you don't want to miss"
							extraClassNames="max-w-lg mx-auto"
						/>
					</div>

					{/* events grid */}
					<CardsLayout
						cardsContainerExtraClassNames="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
						data={{
							dataTitle: "event-cards",
							information: featuredEvents,
						}}
					/>

					<OutlinedButton
						transitionDelay={0.3}
						buttonType="link"
						buttonPath="/events"
						buttonExtraClassNames="block w-fit mx-auto btn-outlined hover:scale-[1.05] transition-all duration-300 will-change-transform"
					>
						<span className="block text-nowrap">See More</span>
					</OutlinedButton>
				</div>
			</ContainerWrapper>
		</motion.section>
	);
}
