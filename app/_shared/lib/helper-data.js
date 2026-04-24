// Utility function to convert hex color to RGBA
export function hexToRgba(hex, opacity) {
	hex = hex.replace(/^#/, "");

	if (hex.length === 6) {
		hex += "FF";
	} else if (hex.length !== 8) {
		throw new Error("Invalid hex color format. Use #RRGGBB or #RRGGBBAA.");
	}

	const bigint = parseInt(hex, 16);
	const r = (bigint >> 24) & 255;
	const g = (bigint >> 16) & 255;
	const b = (bigint >> 8) & 255;

	opacity = Math.min(1, Math.max(0, opacity));

	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// utility function to make 3 digits number
export function formatToThreeDigits(number) {
	return number.toString().padStart(3, "0");
}

// utility function to make hyphenated string
export function toHyphenatedString(str) {
	return str
		.trim() // Remove extra spaces from the start and end
		.toLowerCase() // Convert the string to lowercase
		.replace(/\s+/g, "-"); // Replace all spaces with hyphens
}

// utility function to split the string and make to sentences
export function splitString(input) {
	// If input is undefined or null, return empty string
	if (input === undefined || input === null) {
		return "";
	}

	const parts = input.split("::");

	// If there's no "::" in the string, return the original input
	if (parts.length === 1) {
		return input;
	}

	return {
		first: parts[0],
		second: parts.slice(1).join("::") || "", // Handle multiple "::" and join remaining parts
	};
}

export const getJSONData = (data, type = "object") => {
	try {
		return JSON.parse(data);
	} catch (error) {
		return type === "object" ? {} : [];
	}
};

// utility function to build navigation menu
export function buildNavigationMenu(items, parentId = null, basePath = "") {
	const filtered = items
		.filter((item) => item.parent === parentId)
		.sort((a, b) => a.serial - b.serial); // ensure order

	return filtered.map((item) => {
		const fullPath = `${basePath}/${item.path}`;

		return {
			navName: item.title,
			path: fullPath,
			subNavItems: buildNavigationMenu(items, item._id, fullPath), // recursion
			action: null,
		};
	});
}

// utility function to build nested categories
export function buildCategoryTree(categories, parentId = null) {
	return categories
		.filter((category) => category.parent === parentId)
		.sort((a, b) => a.serial - b.serial)
		.map((category) => ({
			...category,
			subcategories: buildCategoryTree(categories, category._id),
		}));
}

// utility function to find categories by IDs in the nested structure
export function findCategoriesByIds(categories, ids) {
	let foundCategories = [];

	const searchInCategories = (categoryList) => {
		for (const category of categoryList) {
			if (ids.includes(category._id)) {
				foundCategories.push(category);
			}
			if (category.subcategories && category.subcategories.length > 0) {
				searchInCategories(category.subcategories);
			}
		}
	};

	searchInCategories(categories);
	return foundCategories;
}
