"use client";
import ContainedButton from "@/app/_shared/components/buttons-links/ContainedButton";
import CustomLink from "@/app/_shared/components/buttons-links/CustomLink";
import BaseMotionConfig from "@/app/_shared/components/common-wrapper/BaseMotionConfig";
import {
	DownArrowSVGIcon,
	RightArrowSVGIcon,
} from "@/app/_shared/components/ui/Icons";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function HeaderSubMenuDropdownAfterHover({
	navName,
	subNavItems,
	afterFirstChild = false,
	extraClassNames,
	activeExtraClassNames,
}) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="relative"
		>
			<ContainedButton
				buttonType="hover"
				buttonExtraClassNames={`w-full btn-header-menu-contained flex items-center gap-2 justify-between ${
					isHovered
						? "!bg-primary !border-primary !text-neutral-bright-100"
						: ""
				} ${extraClassNames}`}
			>
				<span className="block text-nowrap">{navName}</span>
				{afterFirstChild === true ? (
					<RightArrowSVGIcon className="flex-none size-4" />
				) : (
					<DownArrowSVGIcon
						className={`flex-none size-4 transition-transform duration-300 will-change-transform ${
							isHovered ? "rotate-180" : "rotate-0"
						}`}
					/>
				)}
			</ContainedButton>

			{/* sub menu after hover */}
			<BaseMotionConfig>
				<AnimatePresence>
					{isHovered && (
						<motion.div
							initial="hidden"
							animate="show"
							exit="exit"
							variants={viewportShowingMotion(
								afterFirstChild
									? {
											x: {
												xHidden: -20,
												xShow: 0,
												xExit: -5,
											},
										}
									: {
											y: {
												yHidden: -20,
												yShow: 0,
												yExit: -5,
											},
										},
							)}
							className={`bg-transparent absolute z-40 ${
								afterFirstChild === true
									? "left-full top-0"
									: "pt-4 left-0"
							}`}
						>
							<ul className="p-1.5 lg:p-2 space-y-1 rounded-xl min-w-28 lg:min-w-36 bg-neutral-bright-100 shadow-lg">
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
											<li
												key={index}
												aria-label={`${navName} link`}
											>
												{subNavItems.length > 0 ? (
													<HeaderSubMenuDropdownAfterHover
														navName={navName}
														subNavItems={
															subNavItems
														}
														afterFirstChild={true}
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
														onClick={() => action()}
														buttonExtraClassNames={`block w-full btn-header-menu-contained ${extraClassNames}`}
													>
														<span className="block text-nowrap text-start">
															{navName}
														</span>
													</ContainedButton>
												) : (
													<CustomLink
														buttonPath={path}
														buttonExtraClassNames={`block btn-header-menu-contained ${extraClassNames}`}
														activeButtonExtraClassNames={`bg-primary text-neutral-bright-100 border-primary ${activeExtraClassNames}`}
														{...props}
													>
														<span className="block text-nowrap">
															{navName}
														</span>
													</CustomLink>
												)}
											</li>
										);
									})}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</BaseMotionConfig>
		</div>
	);
}
