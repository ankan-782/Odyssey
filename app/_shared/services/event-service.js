import { EVENTS_API_URL } from "../lib/api-url-constant-data";

/**
 * Fetches all events from the API
 * @returns {Promise<Array>} List of events
 */
export const getAllEvents = async () => {
	const response = await fetch(EVENTS_API_URL, {
		cache: "no-store",
	});
	if (!response.ok) throw new Error("Failed to fetch events");
	return await response.json();
};

/**
 * Adds a new event via the API
 * @param {Object} eventData The event data to add
 * @returns {Promise<Object>} The added event
 */
export const addEventApi = async (eventData) => {
	const response = await fetch(EVENTS_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(eventData),
	});
	if (!response.ok) throw new Error("Failed to add event");
	return await response.json();
};

/**
 * Deletes an event via the API
 * @param {string} id The ID of the event to delete
 * @returns {Promise<Object>} Success status
 */
export const deleteEventApi = async (id) => {
	const response = await fetch(`${EVENTS_API_URL}/${id}`, {
		method: "DELETE",
	});
	if (!response.ok) throw new Error("Failed to delete event");
	return await response.json();
};

/**
 * Fetches a single event by slug
 * @param {string} slug
 * @returns {Promise<Object|null>} The event or null if not found
 */
export const getEventBySlug = async (slug) => {
	const events = await getAllEvents();
	return events.find((e) => e.slug === slug) ?? null;
};

/**
 * Fetches related events by category, excluding current slug
 * @param {string} category
 * @param {string} slug
 * @param {number} limit
 * @returns {Promise<Array>}
 */
export const getRelatedEvents = async (category, slug, limit = 3) => {
	const events = await getAllEvents();
	return events
		.filter((e) => e.category === category && e.slug !== slug)
		.slice(0, limit);
};
