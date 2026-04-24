"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
	staggeredItemsContainerMotion,
	staggeredSingleItemMotion,
} from "../../lib/motion-configuration-data";
import IconButton from "../buttons-links/IconButton";
import Description from "../texts/Description";

export default function DownloadAppSourceList({
	transitionDelay,
	downloadAppList,
	extraClassNames,
	footer = false,
}) {
	const aspectRatioCalc = (logoType) => {
		if (logoType === "play-store") {
			return "aspect-[3.38/1]";
		}
		if (logoType === "app-store") {
			return "aspect-[3/1]";
		}
	};

	return (
		<div aria-label="download app source list" className="space-y-2">
			<Description
				transitionDelay={transitionDelay}
				description={`Bring our app\nto your fingertips`}
				extraClassNames="!text-neutral-bright-200 !text-xs sm:!text-sm"
			/>

			<motion.ul
				variants={staggeredItemsContainerMotion({
					showingDelay: transitionDelay,
				})}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				className={`flex items-center flex-wrap gap-2 ${extraClassNames}`}
			>
				{downloadAppList.map((element, index) => {
					const { icon, link, type } = element ?? {};

					return (
						<motion.li
							key={index}
							aria-label={`${type} link`}
							variants={staggeredSingleItemMotion()}
						>
							<IconButton
								aria-label={`${type} download badge`}
								buttonType="external-link"
								buttonPath={link}
								buttonExtraClassNames={`block h-6 sm:h-7 lg:h-8 2xl:h-9 ${aspectRatioCalc(
									type,
								)}`}
							>
								<Image
									src={icon}
									alt={`${type} download badge`}
									className="object-contain"
								/>
							</IconButton>
						</motion.li>
					);
				})}
			</motion.ul>
		</div>
	);
}
