import NextTopLoader from "nextjs-toploader";
import ScrollProgressIndicator from "./_shared/components/ui/ScrollProgressIndicator";
import {
	CLASH_DISPLAY_FONT,
	EPILOGUE_FONT,
	GEIST_MONO_FONT,
	GEIST_SANS_FONT,
} from "./_shared/lib/font-data";
import "./globals.css";

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			className={`scroll-smooth ${EPILOGUE_FONT.variable} ${CLASH_DISPLAY_FONT.variable} ${GEIST_SANS_FONT.variable} ${GEIST_MONO_FONT.variable}`}
		>
			<body className="font-epilogue bg-neutral-bright-100 text-neutral-dark-700">
				<NextTopLoader color="#4640DE" showSpinner={true} height={3} />
				{children}
				<ScrollProgressIndicator />
			</body>
		</html>
	);
}
