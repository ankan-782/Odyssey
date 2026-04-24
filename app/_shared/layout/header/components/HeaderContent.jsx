"use client";
import ContainedButton from "@/app/_shared/components/buttons-links/ContainedButton";
import { AuthContext } from "@/app/_shared/contexts/AuthContextProvider";
import { Dropdown } from "antd";
import { useContext } from "react";
import HeaderContentLinks from "./HeaderContentLinks";
import HeaderLogo from "./HeaderLogo";
import HeaderSwitchButton from "./HeaderSwitchButton";

export default function HeaderContent({ data }) {
	const {
		siteInformation,
		headerMenuData,
		isNavigationSidebarOpened,
		setIsNavigationSidebarOpened,
	} = data ?? {};

	const { headerLogoLight, headerLogoBlack } = siteInformation ?? {};
	const { user, logout } = useContext(AuthContext);

	const userMenu = {
		items: [
			{
				key: "1",
				label: (
					<div className="text-neutral-dark-800 font-semibold mb-1 border-b border-neutral-bright-200 pb-1">
						{user?.email}
					</div>
				),
				disabled: true,
			},
			{
				key: "2",
				label: "Add Event",
				onClick: () => {
					window.location.href = "/events/add";
				},
			},
			{
				key: "3",
				label: "Manage Events",
				onClick: () => {
					window.location.href = "/events/manage";
				},
			},
			{
				type: "divider",
			},
			{
				key: "4",
				label: "Logout",
				danger: true,
				onClick: logout,
			},
		],
	};

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
				<div className="hidden md:flex items-center gap-1 lg:gap-1.5">
					<HeaderContentLinks
						transitionDelay={0.3}
						headerMenuData={headerMenuData}
					/>

					{/* auth actions */}
					<div className="flex items-center gap-3">
						{user ? (
							<Dropdown
								menu={userMenu}
								placement="bottomRight"
								arrow
							>
								<div className="cursor-pointer bg-primary text-neutral-bright-100 flex items-center justify-center size-10 rounded-full font-bold shadow-md hover:bg-primary/90 transition-colors">
									{user.name.charAt(0)}
								</div>
							</Dropdown>
						) : (
							<ContainedButton
								buttonType="link"
								buttonPath="/login"
								buttonExtraClassNames="block w-full btn-header-menu-contained"
							>
								<span className="block text-nowrap text-start">
									Login
								</span>
							</ContainedButton>
						)}
					</div>
				</div>

				{/* switch button for opening navigation sidebar */}
				<div className="flex items-center gap-4 md:hidden">
					{user && (
						<Dropdown
							menu={userMenu}
							placement="bottomRight"
							arrow
							trigger={["click"]}
						>
							<div className="cursor-pointer bg-primary text-neutral-bright-100 flex items-center justify-center size-9 rounded-full font-bold shadow-sm">
								{user.name.charAt(0)}
							</div>
						</Dropdown>
					)}

					<HeaderSwitchButton
						transitionDelay={0.7}
						data={{
							setIsNavigationSidebarOpened,
							isNavigationSidebarOpened,
						}}
						// extraClassNames="block md:hidden"
					/>
				</div>
			</div>
		</div>
	);
}
