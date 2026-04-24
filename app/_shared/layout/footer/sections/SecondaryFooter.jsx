import SecondaryFooterBorder from "../components/SecondaryFooterBorder";
import SecondaryFooterContent from "../components/SecondaryFooterContent";

export default function SecondaryFooter({ data }) {
	const { siteInformation } = data ?? {};

	return (
		<section aria-label="secondary-footer" className="bg-neutral-dark-900">
			<SecondaryFooterBorder />
			<SecondaryFooterContent siteInformation={siteInformation} />
		</section>
	);
}
