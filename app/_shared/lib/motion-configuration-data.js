export const staggeredItemsContainerMotion = (data) => {
	const {
		staggerDuration = 0.1,
		hidingDelay = 0,
		showingDelay = 0,
	} = data ?? {};

	return {
		hidden: {
			transition: {
				delayChildren: hidingDelay,
				staggerChildren: staggerDuration,
				staggerDirection: -1,
			},
		},
		show: {
			transition: {
				delayChildren: showingDelay,
				staggerChildren: staggerDuration,
				staggerDirection: 1,
			},
		},
	};
};

export const staggeredSingleItemMotion = (data) => {
	const { x, y, opacity = {}, filter = {} } = data ?? {};

	return {
		hidden: {
			...(x && { x: x.xHidden ?? null }),
			...(y && { y: y.yHidden ?? null }),
			opacity: opacity.opacityHidden ?? 0,
			filter: filter.filterHidden ?? "blur(5px)",
			transition: {
				type: "tween",
				ease: "easeInOut",
				duration: 0.3,
			},
		},
		show: {
			...(x && { x: x.xShow ?? null }),
			...(y && { y: y.yShow ?? null }),
			opacity: opacity.opacityShow ?? 1,
			filter: filter.filterShow ?? "blur(0px)",
			transition: {
				type: "tween",
				ease: "easeInOut",
				duration: 0.3,
			},
		},
		exit: {
			...(x && { x: x.xExit ?? null }),
			...(y && { y: y.yExit ?? null }),
			opacity: opacity.opacityExit ?? 0,
			filter: filter.filterExit ?? "blur(5px)",
			transition: {
				type: "tween",
				ease: "easeInOut",
				duration: 0.3,
			},
		},
	};
};

// export const viewportShowingMotion = (data) => {
// 	const { x, y, opacity = {}, filter = {} } = data ?? {};

// 	return {
// 		hidden: {
// 			...(x && { x: x.xHidden ?? null }),
// 			...(y && { y: y.yHidden ?? null }),
// 			opacity: opacity.opacityHidden ?? 0,
// 			filter: filter.filterHidden ?? "blur(5px)",
// 		},
// 		show: {
// 			...(x && { x: x.xShow ?? null }),
// 			...(y && { y: y.yShow ?? null }),
// 			opacity: opacity.opacityShow ?? 1,
// 			filter: filter.filterShow ?? "blur(0px)",
// 		},
// 		exit: {
// 			...(x && { x: x.xExit ?? null }),
// 			...(y && { y: y.yExit ?? null }),
// 			opacity: opacity.opacityExit ?? 0,
// 			filter: filter.filterExit ?? "blur(5px)",
// 		},
// 	};
// };

export const viewportShowingMotion = (data) => {
	const {
		opacity = {},
		filter = {},
		transition = {},
		...transforms
	} = data ?? {};

	const buildVariant = (state) => {
		const variant = {};

		// Handle transform properties (x, y, scale, rotate, skew, etc.)
		Object.keys(transforms).forEach((key) => {
			const transformValue = transforms[key]?.[`${key}${state}`];
			if (transformValue !== undefined) {
				variant[key] = transformValue;
			}
		});

		// Handle opacity - only add if not explicitly null
		const opacityKey = `opacity${state}`;
		const opacityValue = opacity[opacityKey];
		if (opacityValue !== null) {
			variant.opacity = opacityValue ?? (state === "Show" ? 1 : 0);
		}

		// Handle filter - only add if not explicitly null
		const filterKey = `filter${state}`;
		const filterValue = filter[filterKey];
		if (filterValue !== null) {
			variant.filter =
				filterValue ?? (state === "Show" ? "blur(0px)" : "blur(5px)");
		}

		// Handle transition - only add if defined for this state
		const transitionKey = `transition${state}`;
		const transitionValue = transition[transitionKey];
		if (transitionValue !== undefined && transitionValue !== null) {
			variant.transition = transitionValue;
		}

		return variant;
	};

	// Check if any exit values are defined
	const hasExitValues =
		Object.keys(transforms).some(
			(key) => transforms[key]?.[`${key}Exit`] !== undefined,
		) ||
		opacity.opacityExit !== undefined ||
		filter.filterExit !== undefined ||
		transition.transitionExit !== undefined;

	const result = {
		hidden: buildVariant("Hidden"),
		show: buildVariant("Show"),
	};

	// Only include exit if there are exit values
	if (hasExitValues) {
		result.exit = buildVariant("Exit");
	}

	return result;
};
