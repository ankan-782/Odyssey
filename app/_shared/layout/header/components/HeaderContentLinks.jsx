"use client";
import ContainedButton from "@/app/_shared/components/buttons-links/ContainedButton";
import CustomLink from "@/app/_shared/components/buttons-links/CustomLink";
import { AuthContext } from "@/app/_shared/contexts/AuthContextProvider";
import {
	staggeredItemsContainerMotion,
	staggeredSingleItemMotion,
} from "@/app/_shared/lib/motion-configuration-data";
import { motion } from "framer-motion";
import { useContext } from "react";
import HeaderSubMenuDropdownAfterHover from "./HeaderSubMenuDropdownAfterHover";

export default function HeaderContentLinks({
	transitionDelay,
	ariaLabel,
	headerMenuData,
	extraClassNames,
	activeExtraClassNames,
}) {
	const { user } = useContext(AuthContext);

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
				ariaLabel ?? "header content navigation list for larger devices"
			}
		>
			<motion.ul
				key={user ? "logged-in" : "logged-out"}
				initial="hidden"
				whileInView="show"
				variants={staggeredItemsContainerMotion({
					showingDelay: transitionDelay,
				})}
				viewport={{ once: true }}
				className="flex items-center gap-1 lg:gap-1.5"
			>
				{headerMenuData.length > 0 &&
					headerMenuData.map((element, index) => {
						const { navName, path, subNavItems, action, ...props } =
							element ?? {};

						return (
							<motion.li
								key={index}
								aria-label={`${navName} link`}
								variants={staggeredSingleItemMotion()}
							>
								{subNavItems.length > 0 ? (
									<HeaderSubMenuDropdownAfterHover
										key={`dropdown-${index}-${navName}`}
										navName={navName}
										subNavItems={subNavItems}
										extraClassNames={extraClassNames}
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
										activeButtonExtraClassNames={`!bg-primary !text-neutral-bright-100 !border-primary ${activeExtraClassNames}`}
										{...props}
									>
										<span className="block text-nowrap text-start">
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
