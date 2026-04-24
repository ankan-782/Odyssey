"use client";
import { useEffect, useRef } from "react";

export default function useAutoScrollLabel() {
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || el.scrollWidth <= el.clientWidth) return;

		const dist = el.scrollWidth - el.clientWidth;
		let pos = 0,
			dir = 1,
			id,
			isPaused = false;

		const scroll = () => {
			if (isPaused) return;

			pos += dir * 0.5;

			if (pos >= dist) {
				pos = dist;
				isPaused = true;
				setTimeout(() => {
					dir = -1;
					isPaused = false;
					id = requestAnimationFrame(scroll);
				}, 3000);
			} else if (pos <= 0) {
				pos = 0;
				isPaused = true;
				setTimeout(() => {
					dir = 1;
					isPaused = false;
					id = requestAnimationFrame(scroll);
				}, 3000);
			} else {
				id = requestAnimationFrame(scroll);
			}

			el.scrollLeft = pos;
		};

		const timer = setTimeout(() => {
			id = requestAnimationFrame(scroll);
		}, 1000);

		return () => {
			clearTimeout(timer);
			cancelAnimationFrame(id);
		};
	}, []);

	return ref;
}
