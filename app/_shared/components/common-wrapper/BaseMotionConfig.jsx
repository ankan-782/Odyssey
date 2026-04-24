"use client";
import { MotionConfig } from "framer-motion";

export default function BaseMotionConfig({
	children,
	transitionDuration = 0.3,
	transitionDelay = 0,
}) {
	return (
		<MotionConfig
			transition={{
				type: "tween",
				ease: "easeInOut",
				duration: transitionDuration,
				delay: transitionDelay,
			}}
		>
			{children}
		</MotionConfig>
	);
}
