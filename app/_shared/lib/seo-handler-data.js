import { getStaticPagesData } from "../services/static-page-service";
import { IMAGE_URL } from "./api-url-constant-data";

export const getMetaData = async (pageSlug) => {
	const staticPageData = await getStaticPagesData(pageSlug);
	const { metaTitle, metaDescription, ogImage } = staticPageData ?? {};

	return {
		title: metaTitle,
		description: metaDescription,
		openGraph: {
			images: `${IMAGE_URL}/${ogImage}`,
		},
	};
};

export const getSchema = (schema) => {
	return (
		schema && (
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: schema }}
			/>
		)
	);
};
