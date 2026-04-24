"use client";
import { motion } from "framer-motion";
import CardsLayout from "@/app/_shared/components/common-wrapper/CardsLayout";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import Description from "@/app/_shared/components/texts/Description";
import Title from "@/app/_shared/components/texts/Title";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";

const STATS_DATA = [
	{ number: "500+", label: "Total Events", icon: "🎪" },
	{ number: "50+", label: "Cities", icon: "🌍" },
	{ number: "100K+", label: "Attendees", icon: "👥" },
	{ number: "6", label: "Categories", icon: "📂" },
];

export default function StatsSection() {
	return (
		<motion.section
			aria-label="stats section"
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			variants={viewportShowingMotion()}
			className="bg-primary/5"
		>
			<ContainerWrapper>
				<div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
					{/* section header */}
					<div className="text-center flex flex-col gap-2 sm:gap-3">
						<Title
							transitionDelay={0.1}
							headingType="h2"
							title={{
								first: "Our",
								second: "Impact",
							}}
						/>
						<Description
							transitionDelay={0.2}
							description="Numbers that reflect our growing community"
							extraClassNames="max-w-lg mx-auto"
						/>
					</div>

					{/* stats grid */}
					<CardsLayout
						cardsContainerExtraClassNames="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
						data={{
							dataTitle: "stat-cards",
							information: STATS_DATA,
						}}
					/>
				</div>
			</ContainerWrapper>
		</motion.section>
	);
}
