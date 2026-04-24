"use client";
import { createContext, useState } from "react";
import { EVENTS_DATA } from "../lib/events-data";

export const EventContext = createContext();

export default function EventContextProvider({ children }) {
	const [events, setEvents] = useState(EVENTS_DATA);

	const addEvent = (eventData) => {
		const newEvent = {
			...eventData,
			id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
		};
		setEvents((prev) => [newEvent, ...prev]);
		return newEvent;
	};

	const deleteEvent = (id) => {
		setEvents((prev) => prev.filter((event) => event.id !== id));
	};

	return (
		<EventContext.Provider
			value={{
				events,
				addEvent,
				deleteEvent,
			}}
		>
			{children}
		</EventContext.Provider>
	);
}
