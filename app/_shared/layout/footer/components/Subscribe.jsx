import SubscribeForm from "@/app/_shared/components/forms/SubscribeForm";
import Title from "@/app/_shared/components/texts/Title";

export default function Subscribe() {
	return (
		<div className="space-y-3 max-w-sm">
			{/* title */}
			<Title
				transitionDelay={0.3}
				headingType="h6"
				title="Subscribe"
				extraClassNames="!text-neutral-bright-200"
			/>

			{/* form */}
			<SubscribeForm transitionDelay={0.4} />
		</div>
	);
}
