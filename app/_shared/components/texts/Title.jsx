"use client";
import { motion } from "framer-motion";
import { viewportShowingMotion } from "../../lib/motion-configuration-data";
import BaseMotionConfig from "../common-wrapper/BaseMotionConfig";

export default function Title({
	transitionDelay,
	transitionDuration,
	translateAnimation = false,
	opacityAnimation = false,
	blurAnimation = false,
	animationStyle,
	customAnimation = false,
	customVariants,
	headingType,
	title,
	titleColorHighlight = "second",
	extraStyles,
	extraClassNames,
}) {
	// Determine which variants to use based on props
	let variants;

	if (customAnimation && customVariants) {
		// Using customVariants if both customAnimation is true and customVariants is provided
		variants = customVariants;
	} else {
		// Determining if we should pass animationStyle to viewportShowingMotion
		const shouldUseCustomAnimation =
			(translateAnimation || opacityAnimation || blurAnimation) &&
			animationStyle;

		variants = shouldUseCustomAnimation
			? viewportShowingMotion(animationStyle)
			: viewportShowingMotion();
	}

	return (
		<BaseMotionConfig
			transitionDelay={transitionDelay}
			transitionDuration={transitionDuration}
		>
			{headingType === "h1" && (
				<motion.h1
					initial="hidden"
					whileInView="show"
					exit="exit"
					viewport={{ once: true }}
					variants={variants}
					style={extraStyles}
					className={`font-semibold text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl text-neutral-dark-800 ${extraClassNames}`}
				>
					{typeof title === "string" && <span>{title}</span>}
					{typeof title === "object" && (
						<span
							className={
								titleColorHighlight === "first"
									? "text-secondary"
									: ""
							}
						>
							{title?.first}
						</span>
					)}{" "}
					{typeof title === "object" && (
						<span
							className={
								titleColorHighlight === "second"
									? "text-secondary"
									: ""
							}
						>
							{title?.second}
						</span>
					)}
				</motion.h1>
			)}
			{headingType === "h2" && (
				<motion.h2
					initial="hidden"
					whileInView="show"
					exit="exit"
					viewport={{ once: true }}
					variants={variants}
					style={extraStyles}
					className={`font-semibold text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-neutral-dark-800 ${extraClassNames}`}
				>
					{typeof title === "string" && <span>{title}</span>}
					{typeof title === "object" && (
						<span
							className={
								titleColorHighlight === "first"
									? "text-secondary"
									: ""
							}
						>
							{title?.first}
						</span>
					)}{" "}
					{typeof title === "object" && (
						<span
							className={
								titleColorHighlight === "second"
									? "text-secondary"
									: ""
							}
						>
							{title?.second}
						</span>
					)}
				</motion.h2>
			)}
			{headingType === "h3" && (
				<motion.h3
					initial="hidden"
					whileInView="show"
					exit="exit"
					viewport={{ once: true }}
					variants={variants}
					style={extraStyles}
					className={`font-semibold text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl text-neutral-dark-800 ${extraClassNames}`}
				>
					{title}
				</motion.h3>
			)}
			{headingType === "h4" && (
				<motion.h4
					initial="hidden"
					whileInView="show"
					exit="exit"
					viewport={{ once: true }}
					variants={variants}
					style={extraStyles}
					className={`font-semibold text-lg sm:text-xl lg:text-2xl 2xl:text-3xl text-neutral-dark-800 ${extraClassNames}`}
				>
					{title}
				</motion.h4>
			)}
			{headingType === "h5" && (
				<motion.h5
					initial="hidden"
					whileInView="show"
					exit="exit"
					viewport={{ once: true }}
					variants={variants}
					style={extraStyles}
					className={`font-semibold text-base sm:text-lg lg:text-xl 2xl:text-2xl text-neutral-dark-800 ${extraClassNames}`}
				>
					{title}
				</motion.h5>
			)}
			{headingType === "h6" && (
				<motion.h6
					initial="hidden"
					whileInView="show"
					exit="exit"
					viewport={{ once: true }}
					variants={variants}
					style={extraStyles}
					className={`font-semibold text-sm sm:text-base lg:text-lg 2xl:text-xl text-neutral-dark-800 ${extraClassNames}`}
				>
					{title}
				</motion.h6>
			)}
		</BaseMotionConfig>
	);
}
