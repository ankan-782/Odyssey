"use client";
import ErrorContent from "./_shared/components/ui/ErrorContent";

export default function ErrorPage({ error, reset }) {
	return (
		<section
			aria-label="error page"
			className="h-dvh w-full bg-neutral-bright-100 flex items-center justify-center"
		>
			<ErrorContent error={error} reset={reset} />
		</section>
	);
}
