"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { HEADER_HEIGHT } from "../../lib/project-constant-data";

export default function CustomLink({
	buttonPath,
	buttonExtraClassNames = "",
	activeButtonExtraClassNames = "",
	updateUrlOnScroll = false,
	children,
	excludePaths = [],
	...rest
}) {
	const pathname = usePathname();

	const threshold = HEADER_HEIGHT;

	// Parse the button path to extract route and hash
	const [routePath, hash] = buttonPath.includes("#")
		? buttonPath.split("#")
		: [buttonPath, null];

	// Normalize route path (handle both '/page#hash' and '/#hash' formats)
	const normalizedRoutePath = routePath || "/";
	const hashId = hash || null;

	// Check if we're on the same page as the link's route
	const isOnSamePage =
		normalizedRoutePath === "/"
			? pathname === "/"
			: pathname === normalizedRoutePath ||
				pathname.startsWith(normalizedRoutePath + "/");

	// ALWAYS call the hook, but pass null when not applicable
	const scrollSpyActive = useScrollSpy(
		isOnSamePage ? hashId : null,
		threshold,
		updateUrlOnScroll && isOnSamePage, // Only update URL if on same page
	);

	// Use scroll spy result only when conditions are met
	const isActiveHash = isOnSamePage && hashId && scrollSpyActive;

	// Check for route match (for non-hash links or different pages)
	let activeRoute = false;
	if (!hashId) {
		// Regular route without hash
		if (normalizedRoutePath === "/") {
			activeRoute = pathname === normalizedRoutePath;
		} else {
			const isChildExcluded = excludePaths.some((p) =>
				pathname.startsWith(p),
			);
			activeRoute =
				pathname === normalizedRoutePath ||
				(!isChildExcluded &&
					pathname.startsWith(normalizedRoutePath + "/"));
		}
	} else if (!isOnSamePage) {
		// Different page - just check route match
		activeRoute =
			pathname === normalizedRoutePath ||
			pathname.startsWith(normalizedRoutePath + "/");
	}

	// Determine if link is active
	const isActive = isActiveHash || activeRoute;

	return (
		<Link
			href={buttonPath}
			className={`${buttonExtraClassNames} ${
				isActive ? activeButtonExtraClassNames : ""
			}`.trim()}
			{...rest}
		>
			{children}
		</Link>
	);
}
