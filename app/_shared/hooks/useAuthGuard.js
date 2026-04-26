import { AuthContext } from "@/app/_shared/contexts/AuthContextProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

/**
 * Reusable auth guard hook for protected pages.
 * Redirects to /login?redirect-to=<currentPath> if user is not authenticated.
 *
 * Usage inside any protected page:
 *   const { user, isAuthLoading } = useAuthGuard("/events/add");
 *   if (isAuthLoading || !user) return null;
 */
export default function useAuthGuard(currentPath = "") {
	const { user, isAuthLoading } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		// Wait for Firebase to resolve auth state before redirecting
		if (isAuthLoading) return;

		if (!user) {
			const redirectPath = currentPath
				? `/login?redirect-to=${currentPath}`
				: "/login";
			router.push(redirectPath);
		}
	}, [user, isAuthLoading, router, currentPath]);

	return { user, isAuthLoading };
}
