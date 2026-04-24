"use client";
import CardsLayout from "@/app/_shared/components/common-wrapper/CardsLayout";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import Description from "@/app/_shared/components/texts/Description";
import Title from "@/app/_shared/components/texts/Title";
import { EventContext } from "@/app/_shared/contexts/EventContextProvider";
import { EVENT_CATEGORIES } from "@/app/_shared/lib/events-data";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import { Input, Select } from "antd";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useContext, useMemo, useState } from "react";

export default function EventsSection() {
	const { events } = useContext(EventContext);
	const searchParams = useSearchParams();

	const initialCategory = searchParams.get("category") || "all";

	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState(initialCategory);
	const [priceFilter, setPriceFilter] = useState("all");

	const filteredEvents = useMemo(() => {
		return events.filter((event) => {
			// search filter
			const matchesSearch = event.title
				.toLowerCase()
				.includes(searchQuery.toLowerCase());

			// category filter
			const matchesCategory =
				selectedCategory === "all" ||
				event.category === selectedCategory;

			// price filter
			const matchesPrice =
				priceFilter === "all" ||
				(priceFilter === "free" && event.price === 0) ||
				(priceFilter === "paid" && event.price > 0);

			return matchesSearch && matchesCategory && matchesPrice;
		});
	}, [events, searchQuery, selectedCategory, priceFilter]);

	return (
		<motion.section
			aria-label="events listing page"
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			variants={viewportShowingMotion()}
			className="bg-neutral-bright-100"
		>
			<ContainerWrapper>
				<div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
					{/* page header */}
					<div className="text-center flex flex-col gap-2 sm:gap-3">
						<Title
							transitionDelay={0.1}
							headingType="h1"
							title={{
								first: "Browse",
								second: "Events",
							}}
						/>
						<Description
							transitionDelay={0.2}
							description="Find the perfect event for you"
							extraClassNames="max-w-lg mx-auto"
						/>
					</div>

					{/* filters */}
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-neutral-bright-100 p-4 sm:p-5 rounded-2xl border border-neutral-bright-200">
						<Input
							placeholder="Search events by title..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							allowClear
							className="flex-1 h-10"
						/>
						<Select
							value={selectedCategory}
							onChange={setSelectedCategory}
							className="w-full sm:w-44"
							size="large"
						>
							<Select.Option value="all">
								All Categories
							</Select.Option>
							{EVENT_CATEGORIES.map((cat) => (
								<Select.Option key={cat} value={cat}>
									{cat}
								</Select.Option>
							))}
						</Select>
						<Select
							value={priceFilter}
							onChange={setPriceFilter}
							className="w-full sm:w-36"
							size="large"
						>
							<Select.Option value="all">
								All Prices
							</Select.Option>
							<Select.Option value="free">Free</Select.Option>
							<Select.Option value="paid">Paid</Select.Option>
						</Select>
					</div>

					{/* events grid or empty state */}
					{filteredEvents.length > 0 ? (
						<CardsLayout
							cardsContainerExtraClassNames="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
							data={{
								dataTitle: "event-cards",
								information: filteredEvents,
							}}
						/>
					) : (
						<div className="text-center py-16 sm:py-20">
							<p className="text-4xl mb-4">🔍</p>
							<p className="font-semibold text-lg sm:text-xl text-neutral-dark-800">
								No events found
							</p>
							<p className="text-sm sm:text-base text-neutral-dark-600 mt-2">
								Try adjusting your search or filter criteria
							</p>
						</div>
					)}
				</div>
			</ContainerWrapper>
		</motion.section>
	);
}
