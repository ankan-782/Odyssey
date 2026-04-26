"use client";
import CardsLayout from "@/app/_shared/components/common-wrapper/CardsLayout";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import Title from "@/app/_shared/components/texts/Title";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import { motion } from "framer-motion";

export default function RelatedEventsSection({ relatedEvents }) {
	if (relatedEvents.length === 0) return null;

	return (
		<motion.section
			aria-label="related events section"
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			variants={viewportShowingMotion()}
			className="bg-neutral-bright-100"
		>
			<ContainerWrapper>
				<div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
					<Title
						transitionDelay={0.1}
						headingType="h3"
						title="Related Events"
					/>

					<CardsLayout
						cardsContainerExtraClassNames="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
						data={{
							dataTitle: "event-cards",
							information: relatedEvents,
						}}
					/>
				</div>
			</ContainerWrapper>
		</motion.section>
	);
}
