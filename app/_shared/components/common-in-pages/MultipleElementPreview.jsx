"use client";
import { Image } from "antd";
import { hexToRgba } from "../../lib/helper-data";
import { COLORS } from "../../lib/theme-data";
import { CrossSVGIcon } from "../ui/Icons";

export default function MultipleElementPreview({ items, children, ...rest }) {
	return (
		<Image.PreviewGroup
			items={items}
			preview={{
				...rest,
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
			{children}
		</Image.PreviewGroup>
	);
}
