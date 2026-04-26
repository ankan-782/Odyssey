"use client";
import { createContext, useEffect, useState } from "react";
import useApiCall from "../hooks/useApiCall";
import {
	addEventApi,
	deleteEventApi,
	getAllEvents,
} from "../services/event-service";

export const EventContext = createContext();

export default function EventContextProvider({ children }) {
	const [events, setEvents] = useState([]);

	const { callApi: fetchEvents, isLoading: isFetching } =
		useApiCall(getAllEvents);
	const { callApi: createEvent, isLoading: isAdding } =
		useApiCall(addEventApi);
	const { callApi: removeEvent, isLoading: isDeleting } =
		useApiCall(deleteEventApi);

	// Initial load
	useEffect(() => {
		const loadEvents = async () => {
			try {
				const data = await fetchEvents();
				if (data) setEvents(data);
			} catch (err) {
				console.error("Failed to load events:", err);
			}
		};
		loadEvents();
	}, []);

	const slugify = (text) => {
		return text
			.toLowerCase()
			.replace(/[^\w ]+/g, "")
			.replace(/ +/g, "-");
	};

	const addEvent = async (eventData) => {
		const slug = slugify(eventData.title);
		const newEvent = {
			...eventData,
			slug,
		};

		try {
			const result = await createEvent(newEvent);
			setEvents((prev) => [result, ...prev]);
			return result;
		} catch (err) {
			console.error("Failed to add event:", err);
			throw err;
		}
	};

	const deleteEvent = async (id) => {
		try {
			await removeEvent(id);
			setEvents((prev) => prev.filter((event) => event.id !== id));
		} catch (err) {
			console.error("Failed to delete event:", err);
			throw err;
		}
	};

	return (
		<EventContext.Provider
			value={{
				events,
				addEvent,
				deleteEvent,
				isLoading: isFetching || isAdding || isDeleting,
			}}
		>
			{children}
		</EventContext.Provider>
	);
}
