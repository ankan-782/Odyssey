"use client";
import BaseMotionConfig from "@/app/_shared/components/common-wrapper/BaseMotionConfig";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import sslCommerzBannerPhoto from "@/public/images/sslcommerz-banner.png";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SSLCommerzBanner({ transitionDelay }) {
	return (
		<BaseMotionConfig transitionDelay={transitionDelay}>
			<motion.div
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				variants={viewportShowingMotion()}
				className="block relative overflow-hidden aspect-[8.54/1]"
			>
				<Image
					src={sslCommerzBannerPhoto}
					alt="sslcommerz banner photo"
					fill
					sizes="100vw"
					className="object-contain"
				/>
			</motion.div>
		</BaseMotionConfig>
	);
}
