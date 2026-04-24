"use client";
import { useEffect, useState } from "react";

export function useIntersectionObserver(options = {}) {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const [ref, setRef] = useState(null);

	useEffect(() => {
		if (!ref) return;

		const observer = new IntersectionObserver(([entry]) => {
			setIsIntersecting(entry.isIntersecting);
		}, options);

		observer.observe(ref);

		return () => {
			observer.unobserve(ref);
		};
	}, [ref, options]);

	return [setRef, isIntersecting];
}
