"use client";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { HEADER_HEIGHT } from "../lib/project-constant-data";

export function useScrollSpy(
	sectionId,
	offset = HEADER_HEIGHT,
	updateUrl = false,
) {
	const [isActive, setIsActive] = useState(false);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (latest) => {
		// Early return if no sectionId
		if (!sectionId) {
			setIsActive(false);
			return;
		}

		const section = document.getElementById(sectionId);
		if (!section) {
			setIsActive(false);
			return;
		}

		const scrollPosition = latest + offset;
		const sectionTop = section.offsetTop;
		const sectionBottom = sectionTop + section.offsetHeight;

		const inView =
			scrollPosition >= sectionTop && scrollPosition < sectionBottom;
		setIsActive(inView);
	});

	// Update URL when section becomes active
	useEffect(() => {
		if (isActive && updateUrl && sectionId) {
			// Update URL without triggering navigation
			window.history.replaceState(null, "", `#${sectionId}`);
		}
	}, [isActive, updateUrl, sectionId]);

	return isActive;
}
