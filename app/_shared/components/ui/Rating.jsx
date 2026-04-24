import { starSVGIcon } from "../../lib/svgIcons";

export default function Rating({
	ratingValue,
	size = "24px",
	starHighlightColor,
	starBaseColor,
}) {
	function renderStar(index) {
		const fullStars = Math.floor(ratingValue); // Number of fully filled stars
		const fraction = ratingValue - fullStars; // Fractional part of the star

		// Determine if the star should be full, fractional, or empty
		const fillColor =
			index < fullStars
				? starHighlightColor // Fully filled stars
				: index === fullStars && fraction > 0
					? `url(#half-star-${index})` // Fractional star
					: starBaseColor; // Empty stars

		return starSVGIcon({
			fillColor,
			fraction: index === fullStars ? fraction : 1, // Apply the fraction only to the fractional star
			index, // Use the star's index for the gradient ID
			starHighlightColor,
			starBaseColor,
		});
	}

	return (
		<div className="flex items-center gap-1">
			{Array(5)
				.fill(0)
				.map((_, index) => (
					<div key={index} style={{ width: size, height: size }}>
						{renderStar(index)}
					</div>
				))}
		</div>
	);
}
