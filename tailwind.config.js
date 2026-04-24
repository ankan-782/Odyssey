const { COLORS } = require("./app/_shared/lib/theme-data");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
			},
			screens: {
				"2xl": "1472px",
			},
		},
		extend: {
			fontFamily: {
				epilogue: ["var(--font-epilogue)"],
				clashDisplay: ["var(--font-clash-display)"],
				geistSans: ["var(--font-geist-sans)"],
				geistMono: ["var(--font-geist-mono)"],
			},
			colors: COLORS,
			screens: {
				"3xs": "352px",
				"2xs": "384px",
				xs: "448px",
				sm: "576px",
				"2xl": "1472px",
			},
			animation: {
				"spin-slow": "spin 2s linear infinite",
			},
		},
	},
	plugins: [],
};
