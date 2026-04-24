import ContainedButton from "../buttons-links/ContainedButton";
import Description from "../texts/Description";
import Title from "../texts/Title";
import { RightArrowSVGIcon } from "./Icons";

export default function ErrorContent({ error, reset }) {
	return (
		<div className="container">
			<div className="space-y-8">
				<div className="space-y-4 text-center">
					<Title
						transitionDelay={0.2}
						headingType="h1"
						title="Something went wrong!"
					/>
					<Description
						transitionDelay={0.3}
						description={error.message}
						extraClassNames="max-w-3xl mx-auto italic !text-error"
					/>
				</div>

				<div className="flex flex-col items-center gap-2">
					<ContainedButton
						transitionDelay={0.4}
						translateAnimation={true}
						animationStyle={{
							y: { yHidden: -20, yShow: 0 },
						}}
						buttonType="click"
						onClick={() => reset()}
						buttonExtraClassNames="btn-contained"
					>
						<span className="block text-nowrap">Try again</span>
					</ContainedButton>
					<span className="block text-neutral-dark-700 text-xs">
						OR
					</span>
					<ContainedButton
						transitionDelay={0.4}
						translateAnimation={true}
						animationStyle={{
							y: { yHidden: -20, yShow: 0 },
						}}
						buttonType="link"
						buttonPath="/"
						buttonExtraClassNames="flex items-center gap-2 btn-contained"
					>
						<span className="block text-nowrap">Return Home</span>
						<RightArrowSVGIcon className="size-4 sm:size-4.5 lg:size-5 2xl:size-[1.375rem] flex-none" />
					</ContainedButton>
				</div>
			</div>
		</div>
	);
}
