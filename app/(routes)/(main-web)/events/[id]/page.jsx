import { EVENTS_DATA } from "@/app/_shared/lib/events-data";
import EventDetailsSection from "./sections/EventDetailsSection";
import EventNotFoundSection from "./sections/EventNotFoundSection";
import RelatedEventsSection from "./sections/RelatedEventsSection";

export async function generateMetadata({ params }) {
	const { id } = params;
	const event = EVENTS_DATA.find((e) => e.id === id);

	if (!event) {
		return {
			title: "Event Not Found — Odyssey",
			description: "The requested event could not be found.",
		};
	}

	return {
		title: `${event.title} — Odyssey`,
		description: event.shortDescription,
	};
}

export default function EventDetailsPage({ params }) {
	const { id } = params;
	const event = EVENTS_DATA.find((e) => e.id === id);

	if (!event) {
		return <EventNotFoundSection />;
	}

	// related events: same category, exclude current, max 3
	const relatedEvents = EVENTS_DATA.filter(
		(e) => e.category === event.category && e.id !== id,
	).slice(0, 3);

	return (
		<>
			<EventDetailsSection event={event} />
			<RelatedEventsSection relatedEvents={relatedEvents} />
		</>
	);
}
