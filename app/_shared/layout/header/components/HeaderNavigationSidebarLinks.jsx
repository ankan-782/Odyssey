"use client";
import ContainedButton from "@/app/_shared/components/buttons-links/ContainedButton";
import CustomLink from "@/app/_shared/components/buttons-links/CustomLink";
import {
	staggeredItemsContainerMotion,
	staggeredSingleItemMotion,
} from "@/app/_shared/lib/motion-configuration-data";
import { motion } from "framer-motion";
import HeaderNavigationSidebarSubMenuDropdown from "./HeaderNavigationSidebarSubMenuDropdown";

export default function HeaderNavigationSidebarLinks({
	transitionDelay,
	ariaLabel,
	headerMenuData,
	isNavigationSidebarOpened,
	setIsNavigationSidebarOpened,
	onNavItemClick = () => {},
	extraClassNames,
	activeExtraClassNames,
}) {
	// TODO: have to implement for nested path also
	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		const anyActive = headerMenuData.some(({ path }) => {
	// 			const id = path.replace("/#", "");
	// 			const section = document.getElementById(id);
	// 			if (!section) return false;
	// 			const scrollPosition = window.scrollY + HEADER_HEIGHT;
	// 			return (
	// 				scrollPosition >= section.offsetTop &&
	// 				scrollPosition < section.offsetTop + section.offsetHeight
	// 			);
	// 		});

	// 		if (!anyActive) {
	// 			window.history.replaceState(null, "", "/");
	// 		}
	// 	};

	// 	window.addEventListener("scroll", handleScroll);
	// 	return () => window.removeEventListener("scroll", handleScroll);
	// }, []);

	return (
		<nav
			aria-label={
				ariaLabel ?? "header navigation list for smaller devices"
			}
		>
			<motion.ul
				variants={staggeredItemsContainerMotion({
					showingDelay: transitionDelay,
				})}
				initial="hidden"
				animate="show"
				exit="hidden"
				className="space-y-2"
			>
				{headerMenuData.length > 0 &&
					headerMenuData.map((element, index) => {
						const { navName, path, subNavItems, action, ...props } =
							element ?? {};

						return (
							<motion.li
								key={index}
								title={navName}
								aria-label={`${navName} link`}
								variants={staggeredSingleItemMotion()}
							>
								{subNavItems.length > 0 ? (
									<HeaderNavigationSidebarSubMenuDropdown
										navName={navName}
										subNavItems={subNavItems}
										onClose={() => {
											setIsNavigationSidebarOpened(false);
											onNavItemClick();
										}}
										extraClassNames={extraClassNames}
										activeExtraClassNames={
											activeExtraClassNames
										}
									/>
								) : action ? (
									<ContainedButton
										buttonType="click"
										onClick={() => {
											action();
											setIsNavigationSidebarOpened(false);
											onNavItemClick();
										}}
										buttonExtraClassNames={`block w-full btn-sidebar-menu-contained ${extraClassNames}`}
									>
										<span className="block text-nowrap text-start">
											{navName}
										</span>
									</ContainedButton>
								) : (
									<CustomLink
										buttonPath={path}
										onClick={() => {
											setIsNavigationSidebarOpened(false);
											onNavItemClick();
										}}
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
		</nav>
	);
}
