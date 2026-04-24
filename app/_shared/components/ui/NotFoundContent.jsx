import ContainedButton from "../buttons-links/ContainedButton";
import Description from "../texts/Description";
import Title from "../texts/Title";
import { RightArrowSVGIcon } from "./Icons";

export default function NotFoundContent() {
	return (
		<div className="container">
			<div className="space-y-8">
				<Title
					transitionDelay={0.2}
					headingType="h1"
					title="Not Found! Error 404"
					extraClassNames="text-center"
				/>

				<div className="space-y-4 text-center">
					<Description
						transitionDelay={0.3}
						description="Could not find requested resource"
						extraClassNames="italic"
					/>
					<ContainedButton
						transitionDelay={0.4}
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
		</div>
	);
}
