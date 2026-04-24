"use client";
import BaseMotionConfig from "@/app/_shared/components/common-wrapper/BaseMotionConfig";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import { motion } from "framer-motion";

export default function SecondaryFooterContent({ siteInformation }) {
	const { copyrightText, siteTitle, siteVersion, siteDeveloperDetails } =
		siteInformation ?? {};

	const { developerCompany, developerWebsiteLink } =
		siteDeveloperDetails ?? {};

	return (
		<div className="container py-6 sm:py-7 lg:py-8 2xl:py-9 space-y-6 sm:space-y-7 lg:space-y-8 2xl:space-y-9">
			{/* <SSLCommerzBanner transitionDelay={0.3} /> */}

			<BaseMotionConfig transitionDelay={0.4}>
				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					variants={viewportShowingMotion({
						y: { yHidden: 10, yShow: 0 },
					})}
					className="flex flex-wrap justify-between gap-y-4 gap-x-10 text-xs sm:text-sm lg:text-base"
				>
					{/* first part */}
					{copyrightText ? (
						<p className="text-neutral-bright-200">
							{copyrightText}
						</p>
					) : (
						<p className="text-neutral-bright-200">
							Copyright ©{new Date().getFullYear()}{" "}
							<span>{siteTitle}.</span> All Rights Reserved.
						</p>
					)}

					{/* second part */}
					<p className="text-neutral-bright-200">
						Version <span>{siteVersion}</span>
					</p>

					{/* third part */}
					<p className="text-neutral-bright-200">
						Developed by{" "}
						<a
							href={developerWebsiteLink}
							target="_blank"
							className="text-neutral-bright-200 hover:text-secondary transition-colors duration-300"
						>
							{developerCompany}
						</a>
					</p>
				</motion.div>
			</BaseMotionConfig>
		</div>
	);
}
