"use client";
import CustomLink from "@/app/_shared/components/buttons-links/CustomLink";
import TextButton from "@/app/_shared/components/buttons-links/TextButton";
import Title from "@/app/_shared/components/texts/Title";
import {
	staggeredItemsContainerMotion,
	staggeredSingleItemMotion,
} from "@/app/_shared/lib/motion-configuration-data";
import { motion } from "framer-motion";
import FooterSubMenuDropdown from "./FooterSubMenuDropdown";

export default function FooterHelpLinks({ footerHelpMenuData }) {
	// TODO: have to implement for nested path also
	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		const anyActive = footerHelpMenuData.some(({ path }) => {
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
		<div className="space-y-6">
			{/* title */}
			<Title
				transitionDelay={0.3}
				headingType="h5"
				title="Help"
				extraClassNames="!text-neutral-bright-200"
			/>

			{/* nav links */}
			<nav aria-label="footer content help navigation menu list">
				<motion.ul
					variants={staggeredItemsContainerMotion({
						showingDelay: 0.4,
					})}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="space-y-4"
				>
					{footerHelpMenuData.length > 0 &&
						footerHelpMenuData.map((element, index) => {
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
