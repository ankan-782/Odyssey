import CategoriesSection from "./sections/CategoriesSection";
import FeaturedEventsSection from "./sections/FeaturedEventsSection";
import HeroSection from "./sections/HeroSection";
import StatsSection from "./sections/StatsSection";
import TestimonialsSection from "./sections/TestimonialsSection";

// metadata
export const metadata = {
	title: "Odyssey Events — Discover Amazing Events",
	description:
		"Browse conferences, workshops, concerts, and more. Join thousands of attendees and create unforgettable experiences with Odyssey Events.",
};

export default function RootPage() {
	return (
		<>
			<HeroSection />
			<FeaturedEventsSection />
			<CategoriesSection />
			<StatsSection />
			<TestimonialsSection />
		</>
	);
}
