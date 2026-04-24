"use client";
import useAutoScrollLabel from "../../hooks/useAutoScrollLabel";

export default function ScrollableLabel({ children, maxWidth = "100%" }) {
	const ref = useAutoScrollLabel();

	return (
		<div
			ref={ref}
			style={{
				maxWidth,
				overflow: "hidden",
				whiteSpace: "nowrap",
			}}
		>
			{children}
		</div>
	);
}
