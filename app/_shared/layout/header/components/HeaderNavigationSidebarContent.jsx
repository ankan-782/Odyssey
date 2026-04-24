"use client";
import IconButton from "@/app/_shared/components/buttons-links/IconButton";
import SocialNavList from "@/app/_shared/components/common-in-pages/SocialNavList";
import { CrossSVGIcon } from "@/app/_shared/components/ui/Icons";
import { AnimatePresence, motion } from "framer-motion";
import HeaderLogo from "./HeaderLogo";
import HeaderNavigationSidebarLinks from "./HeaderNavigationSidebarLinks";

export default function HeaderNavigationSidebarContent({ data }) {
	const {
		siteInformation,
		socialMediaList,
		headerMenuData,
		isNavigationSidebarOpened,
		setIsNavigationSidebarOpened,
	} = data ?? {};

	const { headerLogoLight, headerLogoBlack } = siteInformation ?? {};

	// Calculate total delay time to wait for closing sidebar
	const sidebarClosingAnimationDelayTime = headerMenuData.length * 0.1; // items * stagger

	// Calculate total delay time to wait for closing backdrop
	const backdropClosingAnimationDelayTime = headerMenuData.length * 0.1 + 0.2; // items * stagger + delay time for opening sidebar

	// motion configs (sidebar)
	const navigationSidebarMotion = {
		open: {
			x: 0,
			opacity: 1,
			visibility: "visible",
			transition: {
				type: "tween",
				ease: "easeInOut",
				duration: 0.3,
				delay: 0.2, // delay time to wait for opening backdrop,
			},
		},
		closed: {
			x: "-100%",
			opacity: 0,
			visibility: "hidden",
			transition: {
				type: "tween",
				ease: "easeInOut",
				duration: 0.3,
				delay: sidebarClosingAnimationDelayTime,
			},
		},
	};

	// motion configs (backdrop)
	const navigationSidebarBackdropMotion = {
		open: {
			scaleX: 1,
			transition: {
				type: "tween",
				ease: "easeInOut",
				duration: 0.3,
			},
		},
		closed: {
			scaleX: 0,
			transition: {
				type: "tween",
				ease: "easeInOut",
				duration: 0.3,
				delay: backdropClosingAnimationDelayTime,
			},
		},
	};

	// motion configs (border)
	const borderMotion = {
		hidden: {
			opacity: 0.7,
			scaleX: 0,
		},
		show: {
			opacity: 0.1,
			scaleX: 1,
			transition: {
				type: "tween",
				ease: [0, 0.9, 0.95, 1],
				duration: 0.7,
			},
		},
		exit: {
			opacity: 0,
			scaleX: 0,
			transition: {
				type: "tween",
				ease: [0, 0.9, 0.95, 1],
				duration: 0.7,
			},
		},
	};

	return (
		<>
			{/* sidebar content */}
			<motion.div
				variants={navigationSidebarMotion}
				initial="closed"
				animate={isNavigationSidebarOpened ? "open" : "closed"}
				className="block md:hidden fixed top-0 left-0 z-50 w-full xs:w-64 h-dvh bg-neutral-dark-900 border-r border-neutral-dark-700"
			>
				<AnimatePresence>
					{isNavigationSidebarOpened && (
						<div className="h-full flex flex-col gap-8">
							{/* logo and close button */}
							<div className="flex-none bg-transparent flex items-center justify-between gap-4 pt-4 px-4">
								{/* website logo */}
								<HeaderLogo
									transitionDelay={0.3}
									lightLogo={headerLogoLight}
									darkLogo={headerLogoBlack}
								/>

								{/* close button */}
								<IconButton
									transitionDelay={0.3}
									translateAnimation={true}
									animationStyle={{
										y: { yHidden: -20, yShow: 0 },
									}}
									aria-label="mobile menu sidebar closing button"
									buttonType="click"
									onClick={() =>
										setIsNavigationSidebarOpened(
											!isNavigationSidebarOpened,
										)
									}
									buttonContainerExtraClassNames="flex-none"
								>
									<CrossSVGIcon className="text-neutral-bright-200 hover:text-secondary size-[1.875rem] hover:rotate-180 active:scale-[0.97] transition-all duration-300 will-change-transform" />
								</IconButton>
							</div>

							{/* nav menu links */}
							<div className="flex-auto overflow-y-auto hidden-scrollbar px-2">
								<HeaderNavigationSidebarLinks
									transitionDelay={0.6} // delay time to wait for opening sidebar + 0.1
									data={data}
								/>
							</div>

							{/* social links */}
							{socialMediaList.filter((item) => item.link)
								.length > 0 && (
								<div className="px-4">
									{/* border */}
									<motion.div
										initial="hidden"
										whileInView="show"
										exit="exit"
										variants={borderMotion}
										className="border-t border-neutral-black-600 origin-left"
									></motion.div>

									{/* social links */}
									<nav
										aria-label="header navigation content social navigation list"
										className="py-6"
									>
										{socialMediaList.filter(
											(item) => item.link,
										).length > 0 && (
											<SocialNavList
												transitionDelay={0.6} // delay time to wait for opening sidebar + 0.1
												socialMediaList={socialMediaList.filter(
													(item) => item.link,
												)}
												sidebar={true}
											/>
										)}
									</nav>
								</div>
							)}
						</div>
					)}
				</AnimatePresence>
			</motion.div>

			{/* backdrop */}
			<motion.div
				variants={navigationSidebarBackdropMotion}
				initial="closed"
				animate={isNavigationSidebarOpened ? "open" : "closed"}
				className="block md:hidden fixed left-0 top-0 w-full h-dvh bg-neutral-dark-900/50 backdrop-blur-[0.375rem] z-40 origin-left"
				onClick={() => setIsNavigationSidebarOpened(false)}
			></motion.div>
		</>
	);
}
