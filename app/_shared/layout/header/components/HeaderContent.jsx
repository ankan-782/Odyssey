"use client";
import { AuthContext } from "@/app/_shared/contexts/AuthContextProvider";
import { useContext } from "react";
import HeaderContentLinks from "./HeaderContentLinks";
import HeaderLogo from "./HeaderLogo";
import HeaderProfileDropdown from "./HeaderProfileDropdown";
import HeaderSwitchButton from "./HeaderSwitchButton";

export default function HeaderContent({ data }) {
	const {
		siteInformation,
		headerMenuData,
		profileMenuData,
		isNavigationSidebarOpened,
		setIsNavigationSidebarOpened,
	} = data ?? {};

	const { headerLogoLight, headerLogoBlack } = siteInformation ?? {};
	const { user, logout } = useContext(AuthContext);

	const computedHeaderMenuData = headerMenuData.filter(
		(item) => !(user && item.navName === "Login"),
	);

	const computedProfileMenuData = [
		...profileMenuData,
		{ navName: "Logout", path: null, subNavItems: [], action: logout },
	];

	return (
		<div className="container py-4">
			<div className="flex items-center justify-between gap-8">
				{/* website logo */}
				<HeaderLogo
					transitionDelay={0.7}
					lightLogo={headerLogoLight}
					darkLogo={headerLogoBlack}
					lightVersion={false}
				/>

				{/* nav page items and auth actions */}
				<div className="hidden md:flex md:items-center md:gap-1 lg:gap-1.5">
					<HeaderContentLinks
						transitionDelay={0.3}
						headerMenuData={computedHeaderMenuData}
					/>

					{/* auth actions */}
					{user && (
						<HeaderProfileDropdown
							transitionDelay={0.1}
							profileMenuData={computedProfileMenuData}
						/>
					)}
				</div>

				<div className="flex md:hidden items-center gap-3">
					{/* auth actions */}
					{user && (
						<HeaderProfileDropdown
							transitionDelay={0.1}
							profileMenuData={computedProfileMenuData}
						/>
					)}

					{/* switch button for opening navigation sidebar */}
					<HeaderSwitchButton
						transitionDelay={0.7}
						data={{
							setIsNavigationSidebarOpened,
							isNavigationSidebarOpened,
						}}
					/>
				</div>
			</div>
		</div>
	);
}
