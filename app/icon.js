import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
	width: 32,
	height: 32,
};

export const contentType = "image/png";

// Image generation
export default async function Icon() {
	// Fetch the logo image from your public folder
	const logoData = await fetch(
		new URL("../public/logos-icons/odyssey-o.png", import.meta.url),
	).then((res) => res.arrayBuffer());

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<img src={logoData} width="32" height="32" alt="O" />
		</div>,
		{
			...size,
		},
	);
}
