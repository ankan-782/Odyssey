"use client";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from "framer-motion";
import { useState } from "react";
import { hexToRgba } from "../../lib/helper-data";
import { SCROLL_OFFSET_THRESHOLD } from "../../lib/project-constant-data";
import { COLORS } from "../../lib/theme-data";
import IconButton from "../buttons-links/IconButton";
import { DownArrowSVGIcon } from "./Icons";

export default function ScrollProgressIndicator() {
	const { scrollYProgress } = useScroll();
	const [scrollPercentage, setScrollPercentage] = useState(0);
	const [showScrollToTop, setShowScrollToTop] = useState(false);

	// Update percentage state when scroll changes
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		const percentage = Math.round(latest * 100);
		setScrollPercentage(percentage);

		// Show scroll to top button when scrolled past threshold
		const currentScrollY = window.scrollY;
		setShowScrollToTop(currentScrollY > SCROLL_OFFSET_THRESHOLD);
	});

	const strokeDashArrayProgress = useTransform(
		scrollYProgress,
		[0, 1],
		[100, 0],
	);

	// Scroll to top function
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<AnimatePresence mode="wait">
			{showScrollToTop && (
				<IconButton
					translateAnimation={true}
					animationStyle={{
						y: { yHidden: 30, yShow: 0, yExit: 30 },
					}}
					aria-label="scroll to top button"
					buttonType="click"
					onClick={scrollToTop}
					buttonContainerExtraClassNames="fixed bottom-4 right-4 z-30 w-16 h-16 bg-primary/20 rounded-full backdrop-blur-md"
					buttonExtraClassNames="w-full h-full active:scale-90 transition-transform will-change-transform duration-300"
				>
					<svg className="w-full h-full" viewBox="0 0 36 36">
						{/* Background circle */}
						<path
							d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
							fill="none"
							stroke={hexToRgba(COLORS.primary, 0.3)}
							strokeWidth="3"
						/>
						{/* Progress circle */}
						<motion.path
							d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
							fill="none"
							stroke={COLORS.primary}
							strokeWidth="3"
							strokeDasharray="100 100"
							style={{
								strokeDashoffset: strokeDashArrayProgress,
							}}
						/>
					</svg>

					<DownArrowSVGIcon className="rotate-180 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary size-7 stroke-[4]" />
				</IconButton>
			)}
		</AnimatePresence>
	);
}
