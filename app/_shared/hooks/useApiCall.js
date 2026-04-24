"use client";
import { useState } from "react";

export default function useApiCall(apiFunction) {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState(null);

	const callApi = async (...args) => {
		setIsLoading(true);
		setIsError(false);
		setError(null);

		try {
			const result = await apiFunction(...args);
			return result; // Return the result of the API call
		} catch (error) {
			setIsError(true);
			setError(error?.message); // Set the error state
			throw error; // Re-throw the error if needed
		} finally {
			setIsLoading(false); // Reset loading state
		}
	};

	return { callApi, isLoading, isError, error };
}
