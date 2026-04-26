"use client";
import OutlinedButton from "@/app/_shared/components/buttons-links/OutlinedButton";
import { RightArrowSVGIcon } from "@/app/_shared/components/ui/Icons";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import {
	HEADER_HEIGHT,
	ROOT_FONT_SIZE,
} from "@/app/_shared/lib/project-constant-data";
import { motion } from "framer-motion";

export default function EventNotFoundSection() {
	return (
		<motion.section
			aria-label="event not found section"
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			variants={viewportShowingMotion()}
			style={{
				minHeight: `calc(100dvh - ${
					HEADER_HEIGHT / ROOT_FONT_SIZE
				}rem)`,
			}}
			className="bg-neutral-bright-100 flex flex-col"
		>
			<div className="container flex-1 flex flex-col gap-6 justify-center items-center">
				<div className="text-center">
					<p className="text-4xl mb-4">😕</p>
					<p className="font-semibold text-lg sm:text-xl text-neutral-dark-800 mb-2">
						Event not found
					</p>
					<p className="text-sm sm:text-base text-neutral-dark-600">
						The event you are looking for does not exist or has been
						removed
					</p>
				</div>

				<OutlinedButton
					buttonType="link"
					buttonPath="/events"
					buttonExtraClassNames="flex items-center gap-2 btn-outlined"
					buttonContainerExtraClassNames="w-fit mx-auto"
				>
					<RightArrowSVGIcon className="rotate-180 size-4 sm:size-4.5 lg:size-5 flex-none" />
					<span className="block text-nowrap">Back to Events</span>
				</OutlinedButton>
			</div>
		</motion.section>
	);
}
