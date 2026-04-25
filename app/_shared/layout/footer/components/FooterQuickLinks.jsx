"use client";
import CustomLink from "@/app/_shared/components/buttons-links/CustomLink";
import TextButton from "@/app/_shared/components/buttons-links/TextButton";
import Title from "@/app/_shared/components/texts/Title";
import { AuthContext } from "@/app/_shared/contexts/AuthContextProvider";
import {
	staggeredItemsContainerMotion,
	staggeredSingleItemMotion,
} from "@/app/_shared/lib/motion-configuration-data";
import { motion } from "framer-motion";
import { useContext } from "react";
import FooterSubMenuDropdown from "./FooterSubMenuDropdown";

export default function FooterQuickLinks({ footerQuickLinksMenuData }) {
	const { user, logout } = useContext(AuthContext);

	// TODO: have to implement for nested path also
	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		const anyActive = footerQuickLinksMenuData.some(({ path }) => {
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

	const computedQuickLinksMenuData = user
		? [
				...footerQuickLinksMenuData.filter(
					(item) => item.navName !== "Login",
				),
				{
					navName: "Add Events",
					path: "/events/add",
					subNavItems: [],
					action: null,
				},
				{
					navName: "Manage Events",
					path: "/events/manage",
					subNavItems: [],
					action: null,
				},
				{
					navName: "Logout",
					path: null,
					subNavItems: [],
					action: logout,
				},
			]
		: footerQuickLinksMenuData;

	return (
		<div className="space-y-6">
			{/* title */}
			<Title
				transitionDelay={0.3}
				headingType="h5"
				title="Quick Links"
				extraClassNames="!text-neutral-bright-200"
			/>

			{/* nav links */}
			<nav aria-label="footer content quick links navigation menu list">
				<motion.ul
					key={user ? "logged-in" : "logged-out"}
					variants={staggeredItemsContainerMotion({
						showingDelay: 0.4,
					})}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="space-y-4"
				>
					{computedQuickLinksMenuData.length > 0 &&
						computedQuickLinksMenuData.map((element, index) => {
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
									aria-label={`${navName} link`}
									variants={staggeredSingleItemMotion()}
								>
									{subNavItems.length > 0 ? (
										<FooterSubMenuDropdown
											navName={navName}
											subNavItems={subNavItems}
										/>
									) : action ? (
										<TextButton
											buttonType="click"
											onClick={() => action()}
											buttonExtraClassNames="block w-fit btn-text !text-neutral-bright-200 hover:!text-secondary text-start"
										>
											{navName}
										</TextButton>
									) : (
										<CustomLink
											buttonPath={path}
											buttonExtraClassNames="block w-fit btn-text !text-neutral-bright-200 hover:!text-secondary text-start"
											activeButtonExtraClassNames="text-secondary font-medium"
											{...props}
										>
											{navName}
										</CustomLink>
									)}
								</motion.li>
							);
						})}
				</motion.ul>
			</nav>
		</div>
	);
}
