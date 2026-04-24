"use client";
import { motion } from "framer-motion";
import CardsLayout from "@/app/_shared/components/common-wrapper/CardsLayout";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import Description from "@/app/_shared/components/texts/Description";
import Title from "@/app/_shared/components/texts/Title";
import { EVENT_CATEGORIES } from "@/app/_shared/lib/events-data";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";

const CATEGORY_ICONS = {
	Conference: "🎤",
	Workshop: "🛠️",
	Concert: "🎵",
	Sports: "⚽",
	Networking: "🤝",
	Festival: "🎪",
};

export default function CategoriesSection() {
	return (
		<motion.section
			aria-label="browse by category section"
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			variants={viewportShowingMotion()}
			className="bg-neutral-dark-900"
		>
			<ContainerWrapper>
				<div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
					{/* section header */}
					<div className="text-center flex flex-col gap-2 sm:gap-3">
						<Title
							transitionDelay={0.1}
							headingType="h2"
							title={{
								first: "Browse by",
								second: "Category",
							}}
							extraClassNames="!text-neutral-bright-100"
						/>
						<Description
							transitionDelay={0.2}
							description="Find events that match your interests"
							extraClassNames="max-w-lg mx-auto !text-neutral-bright-200"
						/>
					</div>

					{/* categories grid */}
					<CardsLayout
						cardsContainerExtraClassNames="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5"
						data={{
							dataTitle: "category-cards",
							information: EVENT_CATEGORIES,
							payloadData: {
								CATEGORY_ICONS,
							},
						}}
					/>
				</div>
			</ContainerWrapper>
		</motion.section>
	);
}
