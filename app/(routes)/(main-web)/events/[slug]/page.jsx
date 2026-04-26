import {
	getEventBySlug,
	getRelatedEvents,
} from "@/app/_shared/services/event-service";
import EventDetailsSection from "./sections/EventDetailsSection";
import EventNotFoundSection from "./sections/EventNotFoundSection";
import RelatedEventsSection from "./sections/RelatedEventsSection";

async function fetchPageData(slug) {
	try {
		const event = await getEventBySlug(slug);
		if (!event) return { event: null, relatedEvents: [] };
		const relatedEvents = await getRelatedEvents(event.category, slug);
		return { event, relatedEvents };
	} catch {
		return { event: null, relatedEvents: [] };
	}
}

export async function generateMetadata({ params }) {
	const { slug } = params;
	const { event } = await fetchPageData(slug);

	return event
		? {
				title: `${event.title} — Odyssey`,
				description: event.shortDescription,
			}
		: {
				title: "Event Not Found — Odyssey",
				description: "The event you're looking for doesn't exist.",
			};
}

export default async function EventDetailsPage({ params }) {
	const { slug } = params;
	const { event, relatedEvents } = await fetchPageData(slug);

	if (!event) return <EventNotFoundSection />;

	return (
		<>
			<EventDetailsSection event={event} />
			<RelatedEventsSection relatedEvents={relatedEvents} />
		</>
	);
}
