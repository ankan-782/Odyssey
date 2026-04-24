import { LoaderSVGIcon } from "./Icons";

export default function LoaderContent() {
	return (
		<div className="container">
			<div className="w-fit mx-auto">
				<LoaderSVGIcon className="size-14 text-primary animate-spin-slow" />
			</div>
		</div>
	);
}
