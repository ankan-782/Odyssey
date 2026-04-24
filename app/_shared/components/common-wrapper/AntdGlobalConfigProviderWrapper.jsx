"use client";
import { ConfigProvider } from "antd";
import useViewportWidth from "../../hooks/useViewportWidth";
import { EPILOGUE_FONT } from "../../lib/font-data";
import { hexToRgba } from "../../lib/helper-data";
import { COLORS } from "../../lib/theme-data";

export default function AntdGlobalConfigProviderWrapper({ children }) {
	const viewportWidth = useViewportWidth();

	const getFontSize = (width) => {
		switch (true) {
			case width < 576:
				return 12;
			case width < 1024:
				return 14;
			default:
				return 16;
		}
	};

	const getPadding = (width) => {
		switch (true) {
			case width < 576:
				return 6;
			case width < 1024:
				return 8;
			default:
				return 10;
		}
	};

	return (
		<ConfigProvider
			wave={{ disabled: true }}
			theme={{
				token: {
					fontSize: getFontSize(viewportWidth),
					fontFamily: { EPILOGUE_FONT },
					sizePopupArrow: 24,
					borderRadius: 12,
					colorBorder: COLORS.primary,
					colorBgContainer: COLORS.neutral.bright[100],
					colorBgElevated: COLORS.neutral.bright[100],
					colorPrimary: COLORS.primary,
					colorText: COLORS.neutral.dark[800],
					colorLink: COLORS.primary,
					colorLinkActive: COLORS.primary,
					colorLinkHover: COLORS.neutral.dark[800],
					colorError: COLORS.error,
					colorWarning: COLORS.warning,
					colorTextPlaceholder: COLORS.neutral.dark[600],
				},
				components: {
					Form: {
						labelColor: COLORS.neutral.dark[800],
					},
					Input: {
						paddingBlock: getPadding(viewportWidth),
						paddingInline: getPadding(viewportWidth) + 2,
					},
					Select: {
						optionSelectedColor: COLORS.neutral.bright[100],
						optionSelectedBg: COLORS.neutral.dark[800],
						optionActiveBg: hexToRgba(
							COLORS.neutral.dark[800],
							0.6,
						),
						zIndexPopup: 10,
						optionPadding: `${getPadding(viewportWidth)}px ${
							getPadding(viewportWidth) + 2
						}px`,
					},
					Button: {
						defaultBg: COLORS.primary,
						defaultColor: COLORS.neutral.bright[100],
						defaultBorderColor: COLORS.primary,
						defaultActiveBg: COLORS.primary,
						defaultActiveColor: COLORS.neutral.bright[100],
						defaultActiveBorderColor: "transparent",
						defaultHoverBg: COLORS.neutral.dark[800],
						defaultHoverColor: COLORS.neutral.bright[100],
						defaultHoverBorderColor: "transparent",
					},
					Modal: {
						titleColor: COLORS.neutral.dark[800],
					},
					Dropdown: {
						zIndexPopup: 999,
					},
					Upload: {
						actionsColor: COLORS.neutral.dark[800],
					},
				},
			}}
		>
			{children}
		</ConfigProvider>
	);
}
