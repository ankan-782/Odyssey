import ContainedButton from "@/app/_shared/components/buttons-links/ContainedButton";
import OutlinedButton from "@/app/_shared/components/buttons-links/OutlinedButton";
import moment from "moment";

export default function useEventsTableColumns({ handleDelete }) {
	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			render: (text, record) => (
				<div>
					<p className="text-xs sm:text-sm font-semibold text-neutral-dark-800 line-clamp-1">
						{text}
					</p>
					<p className="text-xs text-neutral-dark-600 sm:hidden mt-0.5">
						{record.category} •{" "}
						{record.price === 0 ? "Free" : `$${record.price}`}
					</p>
				</div>
			),
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
			className: "!hidden sm:!table-cell",
			render: (text) => (
				<span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
					{text}
				</span>
			),
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			className: "!hidden md:!table-cell",
			render: (text) => (
				<span className="text-xs sm:text-sm text-neutral-dark-700">
					{moment(text).format("MMM D, YYYY")}
				</span>
			),
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
			className: "!hidden lg:!table-cell",
			render: (text) => (
				<span className="text-xs sm:text-sm font-semibold text-neutral-dark-800">
					{text === 0 ? "Free" : `$${text}`}
				</span>
			),
		},
		{
			title: "Actions",
			key: "actions",
			align: "right",
			render: (_, record) => (
				<div className="flex items-center justify-end gap-2">
					<ContainedButton
						buttonType="link"
						buttonPath={`/events/${record.slug}`}
						buttonExtraClassNames="block btn-contained bg-secondary border-secondary !text-neutral-bright-100 !text-xs !px-2.5 !py-1 !rounded-md"
					>
						<span className="block text-nowrap">View</span>
					</ContainedButton>

					<OutlinedButton
						buttonType="click"
						onClick={() => handleDelete(record.id, record.title)}
						buttonExtraClassNames="block btn-outlined !text-xs !px-2.5 !py-1 !rounded-md !text-error !border-error hover:!border-transparent hover:!bg-error hover:!text-neutral-bright-100"
					>
						<span className="block text-nowrap">Delete</span>
					</OutlinedButton>
				</div>
			),
		},
	];

	return columns;
}
