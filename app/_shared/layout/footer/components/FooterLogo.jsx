"use client";
import BaseMotionConfig from "@/app/_shared/components/common-wrapper/BaseMotionConfig";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FooterLogo({
	transitionDelay,
	transitionDuration,
	lightLogo,
	darkLogo,
	lightVersion = true,
}) {
	const logoToShow = lightVersion ? lightLogo : darkLogo;

	return (
		<BaseMotionConfig
			transitionDelay={transitionDelay}
			transitionDuration={transitionDuration}
		>
			<motion.div
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				variants={viewportShowingMotion({
					y: { yHidden: -20, yShow: 0 },
				})}
			>
				<Link
					href="/"
					aria-label="footer logo"
					className="block relative overflow-hidden"
				>
					<span className="text-3xl sm:text-4xl text-primary font-clashDisplay">
						Odyssey
					</span>
				</Link>
			</motion.div>
		</BaseMotionConfig>
	);
}
