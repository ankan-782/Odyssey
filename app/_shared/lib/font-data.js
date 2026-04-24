import { Epilogue } from "next/font/google";
import localFont from "next/font/local";

export const EPILOGUE_FONT = Epilogue({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-epilogue",
});

export const CLASH_DISPLAY_FONT = localFont({
	src: "../../../public/fonts/ClashDisplay-Variable.woff",
	variable: "--font-clash-display",
	weight: "100 900",
});

export const GEIST_SANS_FONT = localFont({
	src: "../../../public/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

export const GEIST_MONO_FONT = localFont({
	src: "../../../public/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});
