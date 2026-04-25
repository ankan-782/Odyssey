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
			className={`grid grid-cols-2 bg-primary/10 rounded-2xl p-1 sm:p-1.5 ${extraClassNames}`}
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
							className="w-full relative p-2 sm:p-2.5 text-base sm:text-lg"
						>
							<span
								className={`block relative z-10 w-full h-full text-center text-nowrap capitalize font-clashDisplay tracking-widest transition-colors duration-300 ${
									activeTab === index
										? "text-neutral-bright-100"
										: "text-primary/60"
								}`}
							>
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
									className="absolute inset-0 w-full h-full bg-primary rounded-lg sm:rounded-xl"
								/>
							)}
						</button>
					</motion.li>
				);
			})}
		</motion.ul>
	);
}
