"use client";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import EventForm from "@/app/_shared/components/forms/EventForm";
import Description from "@/app/_shared/components/texts/Description";
import Title from "@/app/_shared/components/texts/Title";
import useAuthGuard from "@/app/_shared/hooks/useAuthGuard";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import { motion } from "framer-motion";

export default function AddEventSection() {
	const { user, isAuthLoading } = useAuthGuard("/events/add");

	// Wait for Firebase auth resolution before rendering
	if (isAuthLoading || !user) return null;

	return (
		<motion.section
			aria-label="add event section"
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			variants={viewportShowingMotion()}
			className="bg-neutral-bright-100"
		>
			<ContainerWrapper>
				<div className="max-w-2xl mx-auto flex flex-col gap-8 sm:gap-10 lg:gap-12">
					{/* page header */}
					<div className="text-center flex flex-col gap-2 sm:gap-3">
						<Title
							transitionDelay={0.1}
							headingType="h1"
							title={{
								first: "Add New",
								second: "Event",
							}}
						/>
						<Description
							transitionDelay={0.2}
							description="Fill in the details to create a new event"
							extraClassNames="max-w-md mx-auto"
						/>
					</div>

					{/* form */}
					<EventForm />
				</div>
			</ContainerWrapper>
		</motion.section>
	);
}
