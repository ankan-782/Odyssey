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
	// const siteConfigData = await getSiteConfigData();
	// const { favicon } = siteConfigData.content[0] ?? {};

	return new ImageResponse(
		// ImageResponse JSX element
		// <img
		// 	src={`${IMAGE_URL}/${favicon}`}
		// 	alt="O"
		// 	width="32"
		// 	height="32"
		// />
		<div
			style={{
				fontSize: 26,
				background: "#25324B",
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				borderRadius: "8px",
				color: "white",
			}}
		>
			O
		</div>,
		// ImageResponse options
		{
			// For convenience, we can re-use the exported icons size metadata
			// config to also set the ImageResponse's width and height.
			...size,
		},
	);
}
