import { Suspense } from "react";
import ManageEventsSection from "./sections/ManageEventsSection";

// metadata
export const metadata = {
	title: "Manage Events — Odyssey",
	description: "View and manage your published events on Odyssey.",
};

export default function ManageEventsPage() {
	return (
		<Suspense>
			<ManageEventsSection />
		</Suspense>
	);
}
