"use client";
import ProfileImage from "@/app/_shared/components/common-in-pages/ProfileImage";
import BaseMotionConfig from "@/app/_shared/components/common-wrapper/BaseMotionConfig";
import { AuthContext } from "@/app/_shared/contexts/AuthContextProvider";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import HeaderNavigationSidebarLinks from "./HeaderNavigationSidebarLinks";

export default function HeaderProfileDropdown({
	transitionDelay,
	profileMenuData,
}) {
	const { user } = useContext(AuthContext);
	const [isOpen, setIsOpen] = useState(false);
	const [isSubMenuOpened, setIsSubMenuOpened] = useState(false);
	const dropdownRef = useRef(null);

	const displayName = user?.displayName || user?.email || "User";
	const photoURL = user?.photoURL || null;

	// close on outside click
	useEffect(() => {
		if (!isOpen) return;
		function handleOutsideClick(e) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target)
			) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleOutsideClick);
		return () =>
			document.removeEventListener("mousedown", handleOutsideClick);
	}, [isOpen]);

	return (
		<div ref={dropdownRef} className="relative">
			{/* trigger — ProfileImage */}
			<div
				onClick={() => setIsOpen((prev) => !prev)}
				className="cursor-pointer bg-primary flex items-center justify-center size-10 rounded-full overflow-hidden font-bold shadow-md hover:bg-primary/90 transition-colors relative"
			>
				<ProfileImage
					name={displayName}
					profileImage={photoURL}
					extraClassNames="text-neutral-bright-100 text-sm font-bold"
				/>
			</div>

			{/* dropdown */}
			<BaseMotionConfig>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial="hidden"
							animate="show"
							exit="exit"
							variants={viewportShowingMotion({
								y: { yHidden: -10, yShow: 0, yExit: -5 },
							})}
							className="absolute right-0 pt-4 z-40"
						>
							<div className="bg-neutral-bright-100 shadow-lg rounded-xl p-1.5 lg:p-2 min-w-52">
								{/* profile info block */}
								<div className="flex items-center gap-3 p-2 pb-3 mb-1 border-b border-neutral-bright-200">
									{/* avatar */}
									<div className="flex-none relative overflow-hidden size-10 rounded-full bg-primary flex justify-center items-center">
										<ProfileImage
											name={displayName}
											profileImage={photoURL}
											extraClassNames="text-neutral-bright-100 text-sm font-bold"
										/>
									</div>

									{/* name + email */}
									<div className="flex flex-col min-w-0">
										<span className="text-sm font-semibold text-neutral-dark-800 truncate">
											{displayName}
										</span>
										<span className="text-xs text-neutral-dark-600 truncate">
											{user?.email}
										</span>
									</div>
								</div>

								{/* actions */}
								<HeaderNavigationSidebarLinks
									transitionDelay={transitionDelay}
									ariaLabel="header profile dropdown menu"
									headerMenuData={profileMenuData}
									isNavigationSidebarOpened={isSubMenuOpened}
									setIsNavigationSidebarOpened={
										setIsSubMenuOpened
									}
									onNavItemClick={() => setIsOpen(false)}
									extraClassNames="text-primary hover:text-neutral-bright-100 bg-transparent hover:bg-primary border-transparent hover:border-primary"
								/>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</BaseMotionConfig>
		</div>
	);
}
