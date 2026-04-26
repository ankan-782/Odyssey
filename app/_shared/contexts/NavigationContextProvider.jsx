"use client";
import { createContext } from "react";

export const NavigationContext = createContext();

export default function NavigationContextProvider({ children }) {
	// header navigation list
	const HEADER_MENU_ITEMS = [
		{
			navName: "Home",
			path: "/",
			subNavItems: [],
			action: null,
		},
		{
			navName: "About",
			path: "/about",
			subNavItems: [],
			action: null,
		},
		{
			navName: "Events",
			path: "/events",
			subNavItems: [],
			excludePaths: ["/events/add", "/events/manage"],
			action: null,
		},
		{
			navName: "Login",
			path: "/login",
			subNavItems: [],
			action: null,
		},
	];

	// profile navigation list
	const PROFILE_MENU_ITEMS = [
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
	];

	// footer navigation list (Quick Links)
	const FOOTER_QUICK_LINKS_MENU_ITEMS = [
		{
			navName: "Home",
			path: "/",
			subNavItems: [],
			action: null,
		},
		{
			navName: "About",
			path: "/about",
			subNavItems: [],
			action: null,
		},
		{
			navName: "Events",
			path: "/events",
			subNavItems: [],
			excludePaths: ["/events/add", "/events/manage"],
			action: null,
		},
		{
			navName: "Login",
			path: "/login",
			subNavItems: [],
			action: null,
		},
	];

	// footer navigation list (help)
	const FOOTER_HELP_MENU_ITEMS = [
		{
			navName: "Contact",
			path: "/#contact",
			subNavItems: [],
			action: null,
		},
		{
			navName: "Privacy Policy",
			path: "/privacy-policy",
			subNavItems: [],
			action: null,
		},
		{
			navName: "Cookie Policy",
			path: "/cookie-policy",
			subNavItems: [],
			action: null,
		},
		{
			navName: "Return/Refund Policy",
			path: "/return-refund-policy",
			subNavItems: [],
			action: null,
		},
		{
			navName: "Terms and Conditions",
			path: "/terms-and-conditions",
			subNavItems: [],
			action: null,
		},
	];

	return (
		<NavigationContext.Provider
			value={{
				headerMenuData: HEADER_MENU_ITEMS,
				profileMenuData: PROFILE_MENU_ITEMS,
				footerQuickLinksMenuData: FOOTER_QUICK_LINKS_MENU_ITEMS,
				footerHelpMenuData: FOOTER_HELP_MENU_ITEMS,
			}}
		>
			{children}
		</NavigationContext.Provider>
	);
}
