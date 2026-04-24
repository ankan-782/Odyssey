"use client";
import { motion } from "framer-motion";
import { viewportShowingMotion } from "../../lib/motion-configuration-data";
import BaseMotionConfig from "../common-wrapper/BaseMotionConfig";

export default function RichTextDescription({
	transitionDelay,
	transitionDuration,
	translateAnimation = false,
	opacityAnimation = false,
	blurAnimation = false,
	animationStyle,
	customAnimation = false,
	customVariants,
	description,
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
			<motion.div
				initial="hidden"
				whileInView="show"
				exit="exit"
				viewport={{ once: true }}
				variants={variants}
				style={extraStyles}
				className={extraClassNames}
				dangerouslySetInnerHTML={{
					__html: description,
				}}
			/>
		</BaseMotionConfig>
	);
}
