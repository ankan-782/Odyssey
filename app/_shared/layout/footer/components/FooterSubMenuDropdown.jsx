"use client";
import CustomLink from "@/app/_shared/components/buttons-links/CustomLink";
import TextButton from "@/app/_shared/components/buttons-links/TextButton";
import { DownArrowSVGIcon } from "@/app/_shared/components/ui/Icons";
import {
	staggeredItemsContainerMotion,
	staggeredSingleItemMotion,
} from "@/app/_shared/lib/motion-configuration-data";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function FooterSubMenuDropdown({
	navName,
	subNavItems,
	extraClassNames,
	activeExtraClassNames,
}) {
	const [isSubMenuOpened, setIsSubMenuOpened] = useState(false);

	// Calculate total delay time to wait for closing dropdown
	const dropdownClosingAnimationDelayTime = subNavItems.length * 0.1; // items * stagger

	// motion config
	const menuMotion = {
		open: {
			height: "auto",
			transition: {
				type: "tween",
				ease: "easeInOut",
				duration: 0.3,
			},
		},
		closed: {
			height: 0,
			transition: {
				type: "tween",
				ease: "easeInOut",
				duration: 0.3,
				delay: dropdownClosingAnimationDelayTime,
			},
		},
	};

	return (
		<>
			<TextButton
				buttonType="click"
				onClick={() => setIsSubMenuOpened(!isSubMenuOpened)}
				buttonExtraClassNames={`w-fit btn-text !text-neutral-bright-200 hover:!text-secondary flex items-center gap-2 ${
					isSubMenuOpened ? "!text-secondary !font-medium" : ""
				} ${extraClassNames}`}
			>
				<span className="flex-none">{navName}</span>
				<DownArrowSVGIcon
					className={`flex-none size-4 transition-transform duration-300 will-change-transform ${
						isSubMenuOpened ? "rotate-180" : "rotate-0"
					}`}
				/>
			</TextButton>

			<motion.div
				variants={menuMotion}
				initial="closed"
				animate={isSubMenuOpened ? "open" : "closed"}
				className="overflow-hidden"
			>
				<AnimatePresence>
					{isSubMenuOpened && (
						<motion.ul
							variants={staggeredItemsContainerMotion({
								showingDelay: 0.2,
							})}
							initial="hidden"
							animate="show"
							exit="hidden"
							className="pl-2 pt-4 space-y-4"
						>
							{subNavItems.length > 0 &&
								subNavItems.map((element, index) => {
									const {
										navName,
										path,
										subNavItems,
										action,
										...props
									} = element ?? {};
									return (
										<motion.li
											key={index}
											title={navName}
											aria-label={`${navName} link`}
											variants={staggeredSingleItemMotion()}
										>
											{subNavItems.length > 0 ? (
												<FooterSubMenuDropdown
													navName={navName}
													subNavItems={subNavItems}
													extraClassNames={
														extraClassNames
													}
													activeExtraClassNames={
														activeExtraClassNames
													}
												/>
											) : action ? (
												<TextButton
													buttonType="click"
													onClick={() => {
														action();
														setIsSubMenuOpened(
															false,
														);
													}}
													buttonExtraClassNames={`w-fit btn-text !text-neutral-bright-200 hover:!text-secondary ${extraClassNames}`}
												>
													{navName}
												</TextButton>
											) : (
												<CustomLink
													onClick={() =>
														setIsSubMenuOpened(
															false,
														)
													}
													buttonPath={path}
													buttonExtraClassNames={`w-fit block btn-text !text-neutral-bright-200 hover:!text-secondary ${extraClassNames}`}
													activeButtonExtraClassNames={`!text-secondary !font-medium ${activeExtraClassNames}`}
													{...props}
												>
													{navName}
												</CustomLink>
											)}
										</motion.li>
									);
								})}
						</motion.ul>
					)}
				</AnimatePresence>
			</motion.div>
		</>
	);
}
