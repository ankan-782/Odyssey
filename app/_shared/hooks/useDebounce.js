"use client";
import { useCallback, useEffect, useRef } from "react";

export default function useDebounce(callback, delay) {
	const timeoutRef = useRef(null);

	const debouncedCallback = useCallback(
		(...args) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay]
	);

	// Cleanup on unmount
	useEffect(() => {
		return () => clearTimeout(timeoutRef.current);
	}, []);

	return debouncedCallback;
}
