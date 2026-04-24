"use client";
import BaseMotionConfig from "@/app/_shared/components/common-wrapper/BaseMotionConfig";
import { motion } from "framer-motion";

export default function SecondaryFooterBorder() {
	return (
		<div className="container">
			<BaseMotionConfig transitionDelay={0.2} transitionDuration={1}>
				<motion.div
					initial={{ opacity: 0, scaleX: 0 }}
					whileInView={{ opacity: 1, scaleX: 1 }}
					viewport={{ once: true }}
					className="border-t border-neutral-dark-700"
				></motion.div>
			</BaseMotionConfig>
		</div>
	);
}
