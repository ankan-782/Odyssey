import { Suspense } from "react";
import EventsSection from "./sections/EventsSection";

// metadata
export const metadata = {
	title: "Browse Events — Odyssey",
	description:
		"Search, filter, and discover events across conferences, workshops, concerts, sports, and more.",
};

export default function EventsPage() {
	return (
		<Suspense>
			<EventsSection />
		</Suspense>
	);
}
