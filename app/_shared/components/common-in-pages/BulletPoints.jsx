"use client";
import { motion } from "framer-motion";
import {
	staggeredItemsContainerMotion,
	staggeredSingleItemMotion,
} from "../../lib/motion-configuration-data";
import { CheckSVGIcon } from "../ui/Icons";

export default function BulletPoints({
	points,
	extraClassNames,
	showingDelay,
}) {
	return (
		<motion.ul
			role="list"
			initial="hidden"
			whileInView="show"
			variants={staggeredItemsContainerMotion({
				showingDelay: showingDelay,
			})}
			viewport={{ once: true }}
			className={`text-xs sm:text-sm lg:text-base 2xl:text-lg text-neutral-dark-700 space-y-4 ${extraClassNames}`}
		>
			{points.map((point, index) => {
				const { title } = point ?? {};
				return (
					<motion.li
						key={index}
						variants={staggeredSingleItemMotion()}
						className="flex items-start gap-3"
					>
						<CheckSVGIcon className="flex-none size-4 sm:size-5 lg:size-6 2xl:size-7" />
						<span className="inline-block align-middle">
							{title}
						</span>
					</motion.li>
				);
			})}
		</motion.ul>
	);
}
