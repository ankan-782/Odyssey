"use client";
import { motion } from "framer-motion";
import CardsLayout from "@/app/_shared/components/common-wrapper/CardsLayout";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import Description from "@/app/_shared/components/texts/Description";
import Title from "@/app/_shared/components/texts/Title";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";

const TESTIMONIALS_DATA = [
	{
		name: "Sarah Johnson",
		role: "Event Organizer",
		quote: "Odyssey made managing our annual tech conference a breeze. The platform is intuitive and the event discovery features are top-notch.",
		rating: 5,
	},
	{
		name: "Michael Chen",
		role: "Tech Enthusiast",
		quote: "I've discovered so many amazing workshops and meetups through this platform. It's become my go-to for finding events in my city.",
		rating: 4.5,
	},
	{
		name: "Emily Rodriguez",
		role: "Festival Goer",
		quote: "The filtering system is incredible. I can find exactly the type of event I'm looking for in seconds. Highly recommended!",
		rating: 5,
	},
	{
		name: "David Kim",
		role: "Startup Founder",
		quote: "As a startup founder, networking events are crucial. Odyssey helps me find the right events and connect with the right people.",
		rating: 4,
	},
];

export default function TestimonialsSection() {
	return (
		<motion.section
			aria-label="testimonials section"
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
								first: "What People",
								second: "Say",
							}}
						/>
						<Description
							transitionDelay={0.2}
							description="Hear from our community of event enthusiasts"
							extraClassNames="max-w-lg mx-auto"
						/>
					</div>

					{/* testimonials grid */}
					<CardsLayout
						cardsContainerExtraClassNames="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
						cardExtraClassNames="flex flex-col flex-1"
						data={{
							dataTitle: "testimonial-cards",
							information: TESTIMONIALS_DATA,
						}}
					/>
				</div>
			</ContainerWrapper>
		</motion.section>
	);
}
