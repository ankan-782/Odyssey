import LoaderContent from "@/app/_shared/components/ui/LoaderContent";

export default function MainWebLoadingPage() {
	return (
		<section
			aria-label="loading page"
			className="fixed inset-0 z-[100] h-dvh w-full bg-neutral-bright-100 flex items-center justify-center"
		>
			<LoaderContent />
		</section>
	);
}
