export const LoaderSVGIcon = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			className={className}
		>
			<g transform="rotate(360 12 12)">
				<circle cx={3} cy={12} r={2} fill="currentColor"></circle>
				<circle cx={21} cy={12} r={2} fill="currentColor"></circle>
				<circle cx={12} cy={21} r={2} fill="currentColor"></circle>
				<circle cx={12} cy={3} r={2} fill="currentColor"></circle>
				<circle cx={5.64} cy={5.64} r={2} fill="currentColor"></circle>
				<circle
					cx={18.36}
					cy={18.36}
					r={2}
					fill="currentColor"
				></circle>
				<circle cx={5.64} cy={18.36} r={2} fill="currentColor"></circle>
				<circle cx={18.36} cy={5.64} r={2} fill="currentColor"></circle>
			</g>
		</svg>
	);
};

export const HamburgerSVGIcon = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={2}
			stroke="currentColor"
			width="24"
			height="24"
			className={className}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
			/>
		</svg>
	);
};

export const CrossSVGIcon = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={2}
			stroke="currentColor"
			width="24"
			height="24"
			className={className}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6 18 18 6M6 6l12 12"
			/>
		</svg>
	);
};

export const DownArrowSVGIcon = ({ className, ...rest }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			strokeWidth={2.5}
			stroke="currentColor"
			className={className}
			{...rest}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="m19.5 8.25-7.5 7.5-7.5-7.5"
			/>
		</svg>
	);
};

export const RightArrowSVGIcon = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={2.5}
			stroke="currentColor"
			className={className}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="m8.25 4.5 7.5 7.5-7.5 7.5"
			/>
		</svg>
	);
};

export const UpArrowSVGIcon = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={2}
			stroke="currentColor"
			className={className}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
			/>
		</svg>
	);
};

export const PlusSVGIcon = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			strokeWidth={2}
			stroke="currentColor"
			className={className}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 4.5v15m7.5-7.5h-15"
			/>
		</svg>
	);
};

export const MinusSVGIcon = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			strokeWidth={2}
			stroke="currentColor"
			className={className}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
		</svg>
	);
};

export const StarSVGIcon = ({
	fillColor,
	fraction,
	index,
	starHighlightColor,
	starBaseColor,
	className,
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			fill="none"
			className={className}
		>
			<defs>
				{fraction < 1 && (
					<linearGradient
						id={`half-star-${index}`}
						x1="0%"
						y1="0%"
						x2="100%"
						y2="0%"
					>
						<stop
							offset={`${fraction * 100}%`}
							stopColor={starHighlightColor}
						/>
						<stop
							offset={`${fraction * 100}%`}
							stopColor={starBaseColor}
						/>
					</linearGradient>
				)}
			</defs>
			<path
				d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
				fill={fillColor}
				fillRule="evenodd"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const CheckSVGIcon = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={className}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="m4.5 12.75 6 6 9-13.5"
			/>
		</svg>
	);
};

export const CalendarSVGIcon = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={className}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
			/>
		</svg>
	);
};
