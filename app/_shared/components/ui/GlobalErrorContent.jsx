import ContainedButton from "../buttons-links/ContainedButton";
import Description from "../texts/Description";
import Title from "../texts/Title";

export default function GlobalErrorContent({ error, reset }) {
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

				<ContainedButton
					transitionDelay={0.4}
					translateAnimation={true}
					animationStyle={{
						y: { yHidden: -20, yShow: 0 },
					}}
					buttonType="click"
					onClick={() => reset()}
					buttonExtraClassNames="btn-contained"
					buttonContainerExtraClassNames="w-fit mx-auto"
				>
					<span className="block text-nowrap">Try again</span>
				</ContainedButton>
			</div>
		</div>
	);
}
