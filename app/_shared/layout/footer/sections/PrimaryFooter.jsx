"use client";
import SocialNavList from "@/app/_shared/components/common-in-pages/SocialNavList";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import RichTextDescription from "@/app/_shared/components/texts/RichtextDescription";
import { NavigationContext } from "@/app/_shared/contexts/NavigationContextProvider";
import { useContext } from "react";
import ContactInfo from "../components/ContactInfo";
import FooterHelpLinks from "../components/FooterHelpLinks";
import FooterLogo from "../components/FooterLogo";
import FooterQuickLinks from "../components/FooterQuickLinks";

export default function PrimaryFooter({ data }) {
	const {
		siteInformation,
		contactInformation,
		socialMediaList,
		downloadAppList,
	} = data ?? {};

	const { footerLogoLight, footerLogoBlack, siteTitle, description } =
		siteInformation ?? {};

	const { footerQuickLinksMenuData, footerHelpMenuData, profileMenuData } =
		useContext(NavigationContext);

	return (
		<section aria-label="primary footer" className="bg-neutral-dark-900">
			<ContainerWrapper>
				<div className="flex flex-col gap-6">
					{/* website logo */}
					<div className="hidden md:block w-fit">
						<FooterLogo
							transitionDelay={0.7}
							lightLogo={footerLogoLight}
							darkLogo={footerLogoBlack}
						/>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[minmax(340px,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(240px,1fr)] xl:grid-cols-[minmax(420px,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(320px,1fr)] 2xl:grid-cols-[minmax(520px,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(384px,1fr)] gap-10">
						{/* logo, description, social link */}
						<div className="max-lg:col-span-full flex flex-col gap-6">
							{/* website logo */}
							<div className="block md:hidden w-fit">
								<FooterLogo
									transitionDelay={0.7}
									lightLogo={footerLogoLight}
									darkLogo={footerLogoBlack}
								/>
							</div>

							{/* site title */}
							{/* <SpanText
								transitionDelay={0.3}
								text={siteTitle}
								extraClassNames="!font-medium !text-neutral-bright-200"
							/> */}

							{/* description */}
							<RichTextDescription
								transitionDelay={0.3}
								description={description}
								extraClassNames="font-normal whitespace-pre-line text-xs sm:text-sm lg:text-base text-neutral-bright-200 max-w-[25rem]"
							/>

							{/* social media links */}
							<nav aria-label="primary footer navigation content social navigation list">
								{socialMediaList.filter((item) => item.link)
									.length > 0 && (
									<SocialNavList
										transitionDelay={0.4}
										socialMediaList={socialMediaList.filter(
											(item) => item.link,
										)}
									/>
								)}
							</nav>

							{/* download app source list */}
							{/* {downloadAppList.filter((item) => item.link)
								.length > 0 && (
								<DownloadAppSourceList
									transitionDelay={0.5}
									downloadAppList={downloadAppList.filter(
										(item) => item.link,
									)}
									footer={true}
								/>
							)} */}

							{/* subscribe for lg to xl screens */}
							{/* <div className="hidden lg:block xl:hidden">
								<Subscribe />
							</div> */}
						</div>

						{/* quick links */}
						<FooterQuickLinks
							footerQuickLinksMenuData={footerQuickLinksMenuData}
							profileMenuData={profileMenuData}
						/>

						{/* help links */}
						<FooterHelpLinks
							footerHelpMenuData={footerHelpMenuData}
						/>

						<div className="flex flex-col gap-10">
							{/* contact info */}
							{contactInformation.filter((item) => item.info)
								.length > 0 && (
								<ContactInfo
									contactInformation={contactInformation.filter(
										(item) => item.info,
									)}
								/>
							)}

							{/* <div className="block lg:hidden xl:block">
								<Subscribe />
							</div> */}
						</div>
					</div>
				</div>
			</ContainerWrapper>
		</section>
	);
}
