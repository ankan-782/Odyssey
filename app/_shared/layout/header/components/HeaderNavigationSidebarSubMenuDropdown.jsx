"use client";
import ContainedButton from "@/app/_shared/components/buttons-links/ContainedButton";
import CustomLink from "@/app/_shared/components/buttons-links/CustomLink";
import { DownArrowSVGIcon } from "@/app/_shared/components/ui/Icons";
import {
	staggeredItemsContainerMotion,
	staggeredSingleItemMotion,
} from "@/app/_shared/lib/motion-configuration-data";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function HeaderNavigationSidebarSubMenuDropdown({
	navName,
	subNavItems,
	onClose = () => {},
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
				delay: dropdownClosingAnimationDelayTime,
				duration: 0.3,
			},
		},
	};

	return (
		<>
			<ContainedButton
				buttonType="click"
				onClick={() => setIsSubMenuOpened(!isSubMenuOpened)}
				buttonExtraClassNames={`w-full btn-sidebar-menu-contained flex items-center gap-2 justify-between ${
					isSubMenuOpened ? "bg-primary border-primary" : ""
				} ${extraClassNames}`}
			>
				<span className="block text-nowrap">{navName}</span>
				<DownArrowSVGIcon
					className={`flex-none size-5 transition-transform duration-300 will-change-transform ${
						isSubMenuOpened ? "rotate-180" : "rotate-0"
					}`}
				/>
			</ContainedButton>

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
							className="pt-2 space-y-2"
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
											variants={staggeredSingleItemMotion()}
											aria-label={`${navName} link`}
										>
											{subNavItems.length > 0 ? (
												<HeaderNavigationSidebarSubMenuDropdown
													navName={navName}
													subNavItems={subNavItems}
													onClose={onClose}
													extraClassNames={
														extraClassNames
													}
													activeExtraClassNames={
														activeExtraClassNames
													}
												/>
											) : action ? (
												<ContainedButton
													buttonType="click"
													onClick={() => {
														action();
														onClose();
													}}
													buttonExtraClassNames={`block w-full btn-sidebar-menu-contained ${extraClassNames}`}
												>
													<span className="block text-nowrap text-start">
														{navName}
													</span>
												</ContainedButton>
											) : (
												<CustomLink
													onClick={onClose}
													buttonPath={path}
													buttonExtraClassNames={`block btn-sidebar-menu-contained ${extraClassNames}`}
													activeButtonExtraClassNames={`!bg-primary !text-neutral-bright-100 !border-primary ${activeExtraClassNames}`}
													{...props}
												>
													<span className="block text-nowrap">
														{navName}
													</span>
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
