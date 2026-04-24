import ContainedButton from "../buttons-links/ContainedButton";
import Title from "../texts/Title";
import { RightArrowSVGIcon } from "./Icons";

export default function ComingSoonContent() {
	return (
		<div className="container">
			<div className="space-y-8">
				<Title
					transitionDelay={0.2}
					headingType="h1"
					title="Page content coming soon :)"
					extraClassNames="text-center"
				/>

				<ContainedButton
					transitionDelay={0.3}
					translateAnimation={true}
					animationStyle={{
						y: { yHidden: -20, yShow: 0 },
					}}
					buttonType="link"
					buttonPath="/"
					buttonExtraClassNames="flex items-center gap-2 btn-contained"
					buttonContainerExtraClassNames="w-fit mx-auto"
				>
					<span className="block text-nowrap">Return Home</span>
					<RightArrowSVGIcon className="size-4 sm:size-4.5 lg:size-5 2xl:size-[1.375rem] flex-none" />
				</ContainedButton>
			</div>
		</div>
	);
}
