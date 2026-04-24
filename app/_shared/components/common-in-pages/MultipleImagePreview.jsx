"use client";
import { Image } from "antd";
import { IMAGE_URL } from "../../lib/api-url-constant-data";
import { COLORS } from "../../lib/theme-data";
import { CrossSVGIcon } from "../ui/Icons";

export default function MultipleImagePreview({ image, imageList }) {
	return (
		<Image.PreviewGroup
			items={[
				// `${IMAGE_URL}/${image}`,
				...imageList.map((elem) =>
					typeof elem === "object" ? elem : `${IMAGE_URL}/${elem}`,
				),
			]}
			preview={{
				closeIcon: (
					<CrossSVGIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
				),
				maskStyle: {
					// background:
					// 	"linear-gradient(180deg, #090808 -74.34%, rgba(0, 0, 0, 0.00) 60.53%)",
					background: hexToRgba(COLORS.neutral.dark[800], 0.6),
					backdropFilter: "blur(6px)",
				},
			}}
		>
			<Image
				src={
					typeof image === "object"
						? image // static folder image
						: `${IMAGE_URL}/${image}` // server image
				}
				alt="image"
				width="100%"
			/>
		</Image.PreviewGroup>
	);
}
