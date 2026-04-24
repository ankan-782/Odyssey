"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/_shared/contexts/AuthContextProvider";
import { EventContext } from "@/app/_shared/contexts/EventContextProvider";
import useShowToastMessage from "@/app/_shared/hooks/useShowToastMessage";
import EventForm from "@/app/_shared/components/forms/EventForm";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import Title from "@/app/_shared/components/texts/Title";
import Description from "@/app/_shared/components/texts/Description";

export default function AddEventPage() {
	const { user } = useContext(AuthContext);
	const { addEvent } = useContext(EventContext);
	const { showToastMessage } = useShowToastMessage();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	// redirect if not authenticated
	useEffect(() => {
		if (!user) {
			router.push("/login");
		}
	}, [user, router]);

	if (!user) return null;

	const handleSubmit = (values) => {
		setIsLoading(true);
		try {
			addEvent({
				...values,
				imageUrl:
					values.imageUrl ||
					`https://picsum.photos/seed/${Date.now()}/800/500`,
				rating: 4.0,
			});
			showToastMessage(
				"success",
				"Event Created!",
				"Your event has been added successfully.",
			);
			router.push("/events/manage");
		} catch (error) {
			showToastMessage(
				"error",
				"Error",
				"Failed to add event. Please try again.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section aria-label="add event page">
			<ContainerWrapper>
				<div className="max-w-2xl mx-auto flex flex-col gap-6 sm:gap-8">
					{/* page header */}
					<div className="text-center flex flex-col gap-2 sm:gap-3">
						<Title
							headingType="h1"
							title={{
								first: "Add New",
								second: "Event",
							}}
						/>
						<Description
							description="Fill in the details to create a new event"
							extraClassNames="max-w-md mx-auto"
						/>
					</div>

					{/* form card */}
					<div className="bg-neutral-bright-100 rounded-2xl p-6 sm:p-8 border border-neutral-bright-200">
						<EventForm
							onSubmit={handleSubmit}
							isLoading={isLoading}
						/>
					</div>
				</div>
			</ContainerWrapper>
		</section>
	);
}
