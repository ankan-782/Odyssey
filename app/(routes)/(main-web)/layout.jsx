import AntdGlobalConfigProviderWrapper from "@/app/_shared/components/common-wrapper/AntdGlobalConfigProviderWrapper";
import AuthContextProvider from "@/app/_shared/contexts/AuthContextProvider";
import EventContextProvider from "@/app/_shared/contexts/EventContextProvider";
import NavigationContextProvider from "@/app/_shared/contexts/NavigationContextProvider";
import FooterWrapper from "@/app/_shared/layout/footer/FooterWrapper";
import HeaderWrapper from "@/app/_shared/layout/header/HeaderWrapper";
import {
	HEADER_HEIGHT,
	ROOT_FONT_SIZE,
} from "@/app/_shared/lib/project-constant-data";
import { PROJECT_FILE_DATA } from "@/app/_shared/lib/project-file-data";

export default async function MainWebLayout({ children }) {
	const {
		addressIcon,
		appStoreBadgeIcon,
		dribbleIcon,
		emailIcon,
		facebookIcon,
		instagramIcon,
		linkedinIcon,
		phoneIcon,
		playStoreBadgeIcon,
		websiteFooterLogoBlack,
		websiteFooterLogoWhite,
		websiteHeaderLogoBlack,
		websiteHeaderLogoWhite,
		whatsappIcon,
		xIcon,
		youtubeIcon,
	} = PROJECT_FILE_DATA ?? {};

	// const siteConfigData = await getSiteConfigData();

	// const {
	// 	copyrightText,
	// 	siteTitle,
	// 	siteVersion,
	// 	description,
	// 	headerLogoLight,
	// 	headerLogoBlack,
	// 	footerLogoLight,
	// 	footerLogoBlack,
	// 	emailAddresses,
	// 	phoneNumbers,
	// 	locations,
	// 	facebookLink,
	// 	instagramLink,
	// 	whatsappLink,
	// 	linkedinLink,
	// 	dribbleLink,
	// 	xLink,
	// 	youtubeLink,
	// 	playStoreLink,
	// 	appStoreLink,
	// 	others,
	// } = siteConfigData?.content?.[0] ?? {};

	const copyrightText = "Copyright © 2024 - 2026 Odyssey.";
	const siteTitle = "Odyssey";
	const siteVersion = "0.0.1";
	const description =
		"Your gateway to discovering, creating, and managing unforgettable events. Find what moves you.";
	const headerLogoLight = websiteHeaderLogoWhite;
	const headerLogoBlack = websiteHeaderLogoBlack;
	const footerLogoLight = websiteFooterLogoWhite;
	const footerLogoBlack = websiteFooterLogoBlack;
	const emailAddresses = [
		{ dept: "Support", email: "royavijit782@gmail.com" },
	];
	const phoneNumbers = [{ dept: "Business", phone: "+8801636456927" }];
	const locations = [
		{
			area: "#3 Wasa Road",
			address: "West Shewrapara, Mirpur, Dhaka",
			mapLocation: "#",
		},
	];
	const facebookLink = "https://www.facebook.com/ankan.roy.50999/";
	const instagramLink = "https://www.instagram.com/ankan_782/";
	const whatsappLink = "https://wa.me/+8801636456927";
	const linkedinLink = "https://www.linkedin.com/in/avijit-roy-ankan/";
	// const dribbleLink = "#";
	const xLink = "#";
	const youtubeLink = "#";
	const playStoreLink = "#";
	const appStoreLink = "#";
	const others = {};

	// site information
	const siteInformation = {
		copyrightText,
		siteTitle,
		siteVersion,
		description,
		headerLogoLight,
		headerLogoBlack,
		footerLogoLight,
		footerLogoBlack,
		siteDeveloperDetails: {
			developerCompany: "Avijit Roy",
			developerWebsiteLink: "https://avijit-roy.vercel.app/",
		},
	};

	// contact information
	const contactInformation = [
		{
			icon: addressIcon,
			info: locations,
			type: "address",
		},
		{
			icon: phoneIcon,
			info: phoneNumbers,
			type: "phone",
		},
		{
			icon: emailIcon,
			info: emailAddresses,
			type: "email",
		},
	];

	// social media logos and links
	const socialMediaList = [
		{
			icon: facebookIcon,
			link: facebookLink,
			type: "facebook",
		},
		{
			icon: instagramIcon,
			link: instagramLink,
			type: "instagram",
		},
		{
			icon: whatsappIcon,
			link: whatsappLink,
			type: "whatsapp",
		},
		{
			icon: linkedinIcon,
			link: linkedinLink,
			type: "linkedin",
		},
		// {
		// 	icon: dribbleIcon,
		// 	link: dribbleLink,
		// 	type: "dribble",
		// },
		// {
		// 	icon: xIcon,
		// 	link: xLink,
		// 	type: "x",
		// },
		// {
		// 	icon: youtubeIcon,
		// 	link: youtubeLink,
		// 	type: "youtube",
		// },
	];

	// download app logos and links
	const downloadAppList = [
		{
			icon: playStoreBadgeIcon,
			link: playStoreLink,
			type: "play-store",
		},
		{
			icon: appStoreBadgeIcon,
			link: appStoreLink,
			type: "app-store",
		},
	];

	return (
		<AntdGlobalConfigProviderWrapper>
			<AuthContextProvider>
				<EventContextProvider>
					<NavigationContextProvider>
						<HeaderWrapper
							data={{
								siteInformation,
								socialMediaList,
							}}
						/>
						<main
							style={{
								minHeight: `calc(100dvh - ${
									HEADER_HEIGHT / ROOT_FONT_SIZE
								}rem)`,
							}}
						>
							{children}
						</main>
						<FooterWrapper
							data={{
								siteInformation,
								contactInformation,
								socialMediaList,
								downloadAppList,
								others,
							}}
						/>
					</NavigationContextProvider>
				</EventContextProvider>
			</AuthContextProvider>
		</AntdGlobalConfigProviderWrapper>
	);
}
