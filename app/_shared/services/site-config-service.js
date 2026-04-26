import { GET_SITE_CONFIG_DATA_URL } from "../lib/api-url-constant-data";

export async function getSiteConfigData() {
	const res = await fetch(GET_SITE_CONFIG_DATA_URL, { cache: "no-store" });
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
