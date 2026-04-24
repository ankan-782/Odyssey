import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import RichTextDescription from "@/app/_shared/components/texts/RichtextDescription";
import ComingSoonContent from "@/app/_shared/components/ui/ComingSoonContent";
import {
	HEADER_HEIGHT,
	ROOT_FONT_SIZE,
} from "@/app/_shared/lib/project-constant-data";
import PageTopContent from "@/app/_shared/sections/page-top-content/PageTopContent";

export const metadata = {
	title: "Return & Refund Policy — Odyssey Events",
	description: "This is the return & refund policy page for Odyssey Events.",
};

export default async function ReturnRefundPolicyPage() {
	// const returnRefundPolicyStaticPageData = await getStaticPagesData(
	// 	"return-refund-policy",
	// );

	// const { title, pageName, pageImage, description, content } =
	// 	returnRefundPolicyStaticPageData ?? {};

	const title = "Return & Refund Policy";
	const pageName = "Return & Refund Policy";
	const pageImage = "";
	const description = "This is the return & refund policy page.";
	const content = null;

	return (
		<>
			<PageTopContent
				data={{
					pageTitle: title,
					pageDescription: description,
					pageName: pageName,
					pageImage: pageImage,
				}}
			/>
			{content ? (
				<section
					aria-label={`${pageName} page`}
					style={{
						minHeight: `calc(100dvh - ${
							HEADER_HEIGHT / ROOT_FONT_SIZE
						}rem)`,
					}}
					className="bg-neutral-bright-100"
				>
					<ContainerWrapper>
						<RichTextDescription
							transitionDelay={0.3}
							description={content}
							extraClassNames="font-normal whitespace-pre-line text-xs sm:text-sm lg:text-base"
						/>
					</ContainerWrapper>
				</section>
			) : (
				<section
					aria-label={`${pageName} page`}
					style={{
						minHeight: `calc(100dvh - ${
							HEADER_HEIGHT / ROOT_FONT_SIZE
						}rem)`,
					}}
					className="bg-neutral-bright-100 flex items-center justify-center"
				>
					<ComingSoonContent />
				</section>
			)}
		</>
	);
}
