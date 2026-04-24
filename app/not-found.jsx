import NotFoundContent from "./_shared/components/ui/NotFoundContent";

// metadata
export const metadata = {
	title: "Page not found! - Base Project",
	description: "The route you requested was not found.",
};

export default function NotFoundPage() {
	return (
		<section
			aria-label="not found page"
			className="h-dvh w-full bg-neutral-bright-100 flex items-center justify-center"
		>
			<NotFoundContent />
		</section>
	);
}
