"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
	staggeredItemsContainerMotion,
	staggeredSingleItemMotion,
} from "../../lib/motion-configuration-data";
import IconButton from "../buttons-links/IconButton";

export default function SocialNavList({
	transitionDelay,
	socialMediaList,
	extraClassNames,
	sidebar = false,
	heroSection = false,
}) {
	return (
		<motion.ul
			variants={staggeredItemsContainerMotion({
				showingDelay: transitionDelay,
			})}
			initial="hidden"
			whileInView="show"
			exit="hidden"
			viewport={{ once: true }}
			className={`flex items-center flex-wrap ${
				sidebar && !heroSection
					? "gap-2"
					: !heroSection
						? "gap-2 sm:gap-3 lg:gap-3.5 2xl:gap-4"
						: "gap-4" // hero section
			} ${extraClassNames}`}
		>
			{socialMediaList.map((element, index) => {
				const { icon, link, type } = element ?? {};

				return (
					<motion.li
						key={index}
						aria-label={`${type} link`}
						variants={staggeredSingleItemMotion()}
					>
						<IconButton
							aria-label="social link button"
							buttonType="external-link"
							buttonPath={link}
							buttonExtraClassNames={`block ${
								!heroSection
									? "rounded-full bg-neutral-dark-700 hover:bg-primary transition-all duration-300"
									: ""
							} ${
								sidebar && !heroSection
									? "p-2"
									: !heroSection
										? "p-1.5 sm:p-2 lg:p-2.5 2xl:p-3"
										: "" // hero section
							}`}
						>
							<div
								className={`${
									sidebar && !heroSection
										? "size-3.5"
										: !heroSection
											? "size-3 sm:size-4 lg:size-[18px] 2xl:size-5"
											: "size-4 lg:size-5" // size when heroSection is true
								}`}
							>
								<Image
									src={icon}
									alt={`${type} logo`}
									className="object-contain invert"
								/>
							</div>
						</IconButton>
					</motion.li>
				);
			})}
		</motion.ul>
	);
}
