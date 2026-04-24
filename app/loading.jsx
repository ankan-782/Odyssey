import LoaderContent from "./_shared/components/ui/LoaderContent";

export default function RootLoadingPage() {
	return (
		<section
			aria-label="loading page"
			className="fixed inset-0 h-dvh w-full bg-neutral-bright-100 flex items-center justify-center"
		>
			<LoaderContent />
		</section>
	);
}
