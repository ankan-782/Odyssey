import PrimaryFooter from "./sections/PrimaryFooter";
import SecondaryFooter from "./sections/SecondaryFooter";

export default function FooterWrapper({ data }) {
	const {
		siteInformation,
		contactInformation,
		socialMediaList,
		downloadAppList,
		others,
	} = data ?? {};

	return (
		<footer>
			<PrimaryFooter
				data={{
					siteInformation,
					contactInformation,
					socialMediaList,
					downloadAppList,
				}}
			/>
			<SecondaryFooter data={{ siteInformation }} />
		</footer>
	);
}
