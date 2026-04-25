"use client";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { NavigationContext } from "../../contexts/NavigationContextProvider";
import { HEADER_HEIGHT } from "../../lib/project-constant-data";
import HeaderContent from "./components/HeaderContent";
import HeaderNavigationSidebarContent from "./components/HeaderNavigationSidebarContent";

export default function HeaderWrapper({ data }) {
	const { siteInformation, socialMediaList } = data ?? {};

	const [isNavigationSidebarOpened, setIsNavigationSidebarOpened] =
		useState(false);
	const [isPageScrolledDown, setIsPageScrolledDown] = useState(false);

	const { headerMenuData, profileMenuData } = useContext(NavigationContext);

	const pathname = usePathname();
	const isHomepage = pathname === "/";

	useEffect(() => {
		const handleScroll = () => {
			// On homepage: only apply effect after 5.05rem
			// On other pages: always show full header style
			setIsPageScrolledDown(
				isHomepage ? window.scrollY > HEADER_HEIGHT : true,
			);
		};

		// Initialize state on mount
		handleScroll();

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isHomepage]);

	return (
		<>
			<header
				className={`${
					isHomepage ? "fixed" : "sticky"
				} top-0 left-0 w-full z-30 transition-all duration-300 ${
					isPageScrolledDown
						? "bg-neutral-bright-100/60 backdrop-blur-[0.375rem] shadow-lg"
						: "bg-transparent backdrop-blur-0"
				}`}
			>
				<HeaderContent
					data={{
						siteInformation,
						headerMenuData,
						profileMenuData,
						isNavigationSidebarOpened,
						setIsNavigationSidebarOpened,
					}}
				/>
			</header>

			{/* navigation sidebar */}
			<HeaderNavigationSidebarContent
				data={{
					siteInformation,
					socialMediaList,
					headerMenuData,
					isNavigationSidebarOpened,
					setIsNavigationSidebarOpened,
				}}
			/>
		</>
	);
}
