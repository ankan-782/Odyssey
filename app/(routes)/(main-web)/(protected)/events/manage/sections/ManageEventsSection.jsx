"use client";
import ContainedButton from "@/app/_shared/components/buttons-links/ContainedButton";
import OutlinedButton from "@/app/_shared/components/buttons-links/OutlinedButton";
import CustomTable from "@/app/_shared/components/common-in-pages/CustomTable";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import Description from "@/app/_shared/components/texts/Description";
import Title from "@/app/_shared/components/texts/Title";
import { PlusSVGIcon } from "@/app/_shared/components/ui/Icons";
import { EventContext } from "@/app/_shared/contexts/EventContextProvider";
import useAuthGuard from "@/app/_shared/hooks/useAuthGuard";
import useShowModal from "@/app/_shared/hooks/useShowModal";
import useShowToastMessage from "@/app/_shared/hooks/useShowToastMessage";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";
import useEventsTableColumns from "../hooks/useEventsTableColumns";

export default function ManageEventsSection() {
	const { user, isAuthLoading } = useAuthGuard("/events/manage");
	const { events, deleteEvent } = useContext(EventContext);
	const { showToastMessage } = useShowToastMessage();
	const { setModalOpen, showModal, ModalContent } = useShowModal();
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentPage = parseInt(searchParams.get("page") || "1");
	const pageSize = parseInt(searchParams.get("size") || "10");

	const handleDelete = (id, title) => {
		showModal({
			title: <h6 className="font-semibold text-xl">Delete Event</h6>,
			bodyContent: (
				<p className="py-2 text-base">
					Are you sure you want to delete{" "}
					<span className="font-bold">{`"${title}"`}</span>? This
					action cannot be undone.
				</p>
			),
			footerContent: (
				<div className="flex justify-end gap-3">
					<OutlinedButton
						buttonType="click"
						onClick={() => setModalOpen(false)}
						buttonExtraClassNames="block btn-outlined !px-4 !py-2 !text-sm !rounded-lg"
					>
						<span className="block text-nowrap">Cancel</span>
					</OutlinedButton>

					<ContainedButton
						buttonType="click"
						onClick={() => {
							deleteEvent(id);
							showToastMessage(
								"success",
								"Event Deleted",
								`"${title}" has been removed successfully.`,
							);
							setModalOpen(false);
						}}
						buttonExtraClassNames="block btn-contained !px-4 !py-2 !text-sm !rounded-lg !bg-error !border-error hover:!bg-error/80"
					>
						<span className="block text-nowrap">Delete</span>
					</ContainedButton>
				</div>
			),
		});
	};

	const handleTableChange = (pagination) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", pagination.current);
		params.set("size", pagination.pageSize);
		router.push(`?${params.toString()}`, { scroll: false });
	};

	const columns = useEventsTableColumns({ handleDelete });

	// Wait for Firebase auth resolution before rendering
	if (isAuthLoading || !user) return null;

	return (
		<>
			{ModalContent}

			<motion.section
				aria-label="manage events section"
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				variants={viewportShowingMotion()}
				className="bg-neutral-bright-100"
			>
				<ContainerWrapper>
					<div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
						{/* page header */}
						<div className="flex flex-col sm:flex-row sm:justify-between gap-4">
							<div className="flex flex-col gap-1 sm:gap-2">
								<Title
									transitionDelay={0.1}
									headingType="h1"
									title={{
										first: "Manage",
										second: "Events",
									}}
									extraClassNames="!text-2xl sm:!text-3xl lg:!text-4xl"
								/>
								<Description
									transitionDelay={0.2}
									description={`${events.length} total events`}
								/>
							</div>

							<ContainedButton
								transitionDelay={0.3}
								buttonType="link"
								buttonPath="/events/add"
								buttonExtraClassNames="flex items-center justify-center gap-2 btn-contained"
							>
								<PlusSVGIcon className="size-4 sm:size-4.5 lg:size-5 flex-none" />
								<span className="block text-nowrap text-center">
									Add New Event
								</span>
							</ContainedButton>
						</div>

						{/* events table/grid */}
						{events.length > 0 ? (
							<CustomTable
								columns={columns}
								dataSource={events}
								pagination={{
									current: currentPage,
									pageSize: pageSize,
									total: events.length,
									showSizeChanger: true,
									pageSizeOptions: ["5", "10", "20", "50"],
								}}
								onChange={handleTableChange}
							/>
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
			</motion.section>
		</>
	);
}
