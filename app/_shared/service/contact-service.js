import { POST_CONTACT_DATA_URL } from "../lib/api-url-constant-data";

export default async function postContactMessageData(data) {
	const res = await fetch(POST_CONTACT_DATA_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
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
