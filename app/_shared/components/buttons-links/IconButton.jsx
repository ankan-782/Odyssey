"use client";
import { Button } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import { viewportShowingMotion } from "../../lib/motion-configuration-data";
import BaseMotionConfig from "../common-wrapper/BaseMotionConfig";

export default function IconButton({
	transitionDelay,
	transitionDuration,
	translateAnimation = false,
	opacityAnimation = false,
	blurAnimation = false,
	animationStyle,
	customAnimation = false,
	customVariants,
	buttonType = "click",
	buttonPath,
	buttonExtraStyles,
	buttonContainerExtraStyles,
	buttonExtraClassNames,
	buttonContainerExtraClassNames,
	motionAnimate,
	children,
	...rest
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
				animate={motionAnimate}
				style={buttonContainerExtraStyles}
				className={buttonContainerExtraClassNames}
			>
				{(buttonType === "click" || buttonType === "hover") && (
					<button
						style={buttonExtraStyles}
						className={buttonExtraClassNames}
						{...rest}
					>
						{children}
					</button>
				)}

				{buttonType === "link" && (
					<Link
						href={buttonPath}
						style={buttonExtraStyles}
						className={buttonExtraClassNames}
						{...rest}
					>
						{children}
					</Link>
				)}

				{buttonType === "external-link" && (
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={buttonPath}
						style={buttonExtraStyles}
						className={buttonExtraClassNames}
						{...rest}
					>
						{children}
					</a>
				)}

				{buttonType === "submit" && (
					<Button
						type="default"
						style={buttonExtraStyles}
						className={buttonExtraClassNames}
						{...rest}
					>
						{children}
					</Button>
				)}
			</motion.div>
		</BaseMotionConfig>
	);
}
