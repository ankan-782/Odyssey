import { GET_STATIC_PAGES_DATA_URL } from "../lib/api-url-constant-data";

export async function getStaticPagesData(pageSlug) {
	const fullURL = `${GET_STATIC_PAGES_DATA_URL}?slug=${pageSlug}`;
	const res = await fetch(fullURL, { cache: "no-store" });
	if (!res.ok) {
		let errorMessage = "Operation failed!";
		try {
			const errorResponse = await res.json();
			errorMessage =
				errorResponse.message || errorResponse.error || errorResponse;
		} catch (e) {
			errorMessage = res.statusText || "Operation failed!";
		}
		throw new Error(errorMessage);
	}
	return res.json();
}
