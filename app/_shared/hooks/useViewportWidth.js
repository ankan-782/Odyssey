"use client";
import { useEffect, useState } from "react";

export default function useViewportWidth() {
	const [width, setWidth] = useState(0); // Default to 0 for SSR

	useEffect(() => {
		// Check if window is available (client-side)
		if (typeof window !== "undefined") {
			const handleResize = () => {
				setWidth(
					window.innerWidth || document.documentElement.clientWidth,
				);
			};

			// Set initial width
			handleResize();

			// Add event listener
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}
	}, []);

	return width;
}
