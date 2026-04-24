"use client";
import { useEffect, useState } from "react";

export default function useViewportHeight() {
	const [height, setHeight] = useState(0); // Default to 0 for SSR

	useEffect(() => {
		// Check if window is available (client-side)
		if (typeof window !== "undefined") {
			const handleResize = () => {
				setHeight(
					window.innerHeight || document.documentElement.clientHeight
				);
			};

			// Set initial height
			handleResize();

			// Add event listener
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}
	}, []);

	return height;
}
