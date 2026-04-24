"use client";
import ContainedButton from "@/app/_shared/components/buttons-links/ContainedButton";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import Description from "@/app/_shared/components/texts/Description";
import Title from "@/app/_shared/components/texts/Title";
import { AuthContext } from "@/app/_shared/contexts/AuthContextProvider";
import { EventContext } from "@/app/_shared/contexts/EventContextProvider";
import useShowToastMessage from "@/app/_shared/hooks/useShowToastMessage";
import { Modal } from "antd";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function ManageEventsPage() {
	const { user } = useContext(AuthContext);
	const { events, deleteEvent } = useContext(EventContext);
	const { showToastMessage } = useShowToastMessage();
	const router = useRouter();

	// redirect if not authenticated
	useEffect(() => {
		if (!user) {
			router.push("/login");
		}
	}, [user, router]);

	if (!user) return null;

	const handleDelete = (id, title) => {
		Modal.confirm({
			title: "Delete Event",
			content: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
			okText: "Delete",
			okType: "danger",
			cancelText: "Cancel",
			centered: true,
			onOk() {
				deleteEvent(id);
				showToastMessage(
					"success",
					"Event Deleted",
					`"${title}" has been removed successfully.`,
				);
			},
		});
	};

	return (
		<section aria-label="manage events page">
			<ContainerWrapper>
				<div className="flex flex-col gap-6 sm:gap-8">
					{/* page header */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div className="flex flex-col gap-1 sm:gap-2">
							<Title
								headingType="h1"
								title={{
									first: "Manage",
									second: "Events",
								}}
								extraClassNames="!text-2xl sm:!text-3xl lg:!text-4xl"
							/>
							<Description
								description={`${events.length} total events`}
							/>
						</div>
						<ContainedButton
							buttonType="link"
							buttonPath="/events/add"
							buttonExtraClassNames="btn-contained block"
						>
							<span className="block text-nowrap">
								+ Add New Event
							</span>
						</ContainedButton>
					</div>

					{/* events table/grid */}
					{events.length > 0 ? (
						<div className="overflow-x-auto rounded-2xl border border-neutral-bright-200">
							<table className="w-full text-left">
								<thead>
									<tr className="bg-neutral-dark-800 text-neutral-bright-100">
										<th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold">
											Title
										</th>
										<th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold hidden sm:table-cell">
											Category
										</th>
										<th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold hidden md:table-cell">
											Date
										</th>
										<th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold hidden lg:table-cell">
											Price
										</th>
										<th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-right">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{events.map((event, index) => (
										<tr
											key={event.id}
											className={`border-b border-neutral-bright-200 hover:bg-primary/5 transition-colors duration-300 ${
												index % 2 === 0
													? "bg-neutral-bright-100"
													: "bg-neutral-bright-100/50"
											}`}
										>
											<td className="px-4 sm:px-6 py-3 sm:py-4">
												<p className="text-xs sm:text-sm font-semibold text-neutral-dark-800 line-clamp-1">
													{event.title}
												</p>
												<p className="text-xs text-neutral-dark-600 sm:hidden mt-0.5">
													{event.category} •{" "}
													{event.price === 0
														? "Free"
														: `$${event.price}`}
												</p>
											</td>
											<td className="px-4 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
												<span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
													{event.category}
												</span>
											</td>
											<td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-neutral-dark-700 hidden md:table-cell">
												{moment(event.date).format(
													"MMM D, YYYY",
												)}
											</td>
											<td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-neutral-dark-800 hidden lg:table-cell">
												{event.price === 0
													? "Free"
													: `$${event.price}`}
											</td>
											<td className="px-4 sm:px-6 py-3 sm:py-4">
												<div className="flex items-center justify-end gap-2">
													<ContainedButton
														buttonType="link"
														buttonPath={`/events/${event.id}`}
														buttonExtraClassNames="btn-contained block !text-xs !px-2.5 !py-1 !rounded-lg !bg-secondary !border-secondary hover:!bg-secondary/80"
													>
														<span className="block text-nowrap">
															View
														</span>
													</ContainedButton>
													<button
														onClick={() =>
															handleDelete(
																event.id,
																event.title,
															)
														}
														className="text-xs px-2.5 py-1 rounded-lg border border-error text-error hover:bg-error hover:text-neutral-bright-100 transition-all duration-300 active:scale-95"
													>
														Delete
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<div className="text-center py-16 sm:py-20 bg-neutral-bright-100 rounded-2xl border border-neutral-bright-200">
							<p className="text-4xl mb-4">📭</p>
							<p className="font-semibold text-lg sm:text-xl text-neutral-dark-800">
								No events yet
							</p>
							<p className="text-sm sm:text-base text-neutral-dark-600 mt-2">
								Start by adding your first event
							</p>
						</div>
					)}
				</div>
			</ContainerWrapper>
		</section>
	);
}
