"use client";
import GlobalErrorContent from "./_shared/components/ui/GlobalErrorContent";
import {
	CLASH_DISPLAY_FONT,
	EPILOGUE_FONT,
	GEIST_MONO_FONT,
	GEIST_SANS_FONT,
} from "./_shared/lib/font-data";
import "./globals.css";

export default function GlobalErrorPage({ error, reset }) {
	return (
		<html
			lang="en"
			className={`scroll-smooth ${EPILOGUE_FONT.variable} ${CLASH_DISPLAY_FONT.variable} ${GEIST_SANS_FONT.variable} ${GEIST_MONO_FONT.variable}`}
		>
			<body className="font-epilogue bg-neutral-bright-100 text-neutral-dark-700">
				<section
					aria-label="global error page"
					className="h-dvh w-full bg-neutral-bright-100 flex items-center justify-center"
				>
					<GlobalErrorContent error={error} reset={reset} />
				</section>
			</body>
		</html>
	);
}
