"use client";
import ContainedButton from "@/app/_shared/components/buttons-links/ContainedButton";
import Description from "@/app/_shared/components/texts/Description";
import SpanText from "@/app/_shared/components/texts/SpanText";
import Title from "@/app/_shared/components/texts/Title";
import { RightArrowSVGIcon } from "@/app/_shared/components/ui/Icons";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import { motion } from "framer-motion";

export default function HeroSection() {
	return (
		<motion.section
			aria-label="hero section"
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			variants={viewportShowingMotion()}
			className="relative bg-neutral-dark-900 overflow-hidden h-dvh"
		>
			{/* background decorative elements */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-[100px]" />
				<div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
			</div>

			<div className="container h-full flex justify-center items-center">
				<div className="max-w-screen-lg mx-auto space-y-8">
					{/* caption */}
					<SpanText
						transitionDelay={0.3}
						text="🎉 Your Gateway to Amazing Events"
						extraClassNames="text-center w-fit mx-auto block font-medium text-secondary bg-secondary/10 px-4 py-1.5 rounded-full"
					/>

					{/* headline */}
					<Title
						transitionDelay={0.4}
						headingType="h1"
						title={{
							first: "Discover, Create & Manage",
							second: "Events Effortlessly",
						}}
						extraClassNames="!text-neutral-bright-100 text-center"
					/>

					<div className="space-y-4 text-center">
						{/* subtitle */}
						<Description
							transitionDelay={0.5}
							description="Browse conferences, workshops, concerts, and more.
							Join thousands of attendees and create unforgettable
							experiences."
							extraClassNames="!text-neutral-bright-200 max-w-2xl mx-auto"
						/>

						{/* CTA button */}
						<ContainedButton
							transitionDelay={0.6}
							translateAnimation={true}
							animationStyle={{
								y: { yHidden: -20, yShow: 0 },
							}}
							buttonType="link"
							buttonPath="/events"
							buttonExtraClassNames="flex items-center gap-2 btn-contained"
							buttonContainerExtraClassNames="w-fit mx-auto"
						>
							<span className="block text-nowrap">
								Explore Events
							</span>
							<RightArrowSVGIcon className="size-4 sm:size-4.5 lg:size-5 2xl:size-[1.375rem] flex-none" />
						</ContainedButton>
					</div>
				</div>
			</div>
		</motion.section>
	);
}
