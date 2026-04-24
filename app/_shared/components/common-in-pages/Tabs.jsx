"use client";
import { motion } from "framer-motion";
import {
	staggeredItemsContainerMotion,
	staggeredSingleItemMotion,
} from "../../lib/motion-configuration-data";

export default function Tabs({ data }) {
	const { tabsData, activeTab, setActiveTab, extraClassNames } = data ?? {};

	return (
		<motion.ul
			variants={staggeredItemsContainerMotion({
				showingDelay: 0.2,
			})}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			className={`grid grid-cols-2 bg-neutral-dark-600 rounded-[1.25rem] p-1.5 sm:p-2 lg:p-2.5 2xl:p-3 ${extraClassNames}`}
		>
			{tabsData.map((tabInfo, index) => {
				const { id, title, value } = tabInfo ?? {};
				return (
					<motion.li
						key={id}
						aria-label={`${title} tab`}
						variants={staggeredSingleItemMotion()}
					>
						<button
							onClick={() => setActiveTab(id)}
							className="w-full relative p-3.5 sm:p-4 lg:p-4.5 2xl:p-5 text-lg sm:text-xl lg:text-2xl 2xl:text-3xl"
						>
							<span className="block relative z-10 w-full h-full text-center text-nowrap capitalize font-medium text-neutral-bright-200">
								{title}
							</span>

							{activeTab === index && (
								<motion.div
									initial={false}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 30,
									}}
									layoutId="background"
									className="absolute inset-0 w-full h-full bg-neutral-dark-800 rounded-[1.25rem]"
								/>
							)}
						</button>
					</motion.li>
				);
			})}
		</motion.ul>
	);
}
