import { EventContext } from "@/app/_shared/contexts/EventContextProvider";
import useShowToastMessage from "@/app/_shared/hooks/useShowToastMessage";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { EVENT_CATEGORIES } from "../../lib/events-data";
import ContainedButton from "../buttons-links/ContainedButton";

export default function EventForm() {
	const { addEvent } = useContext(EventContext);
	const { showToastMessage } = useShowToastMessage();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const [form] = Form.useForm();

	const onFinish = (values) => {
		setIsLoading(true);
		try {
			addEvent({
				...values,
				date: values.date.format("YYYY-MM-DD"),
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
			form.resetFields();
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
		<div className="bg-neutral-bright-100 rounded-2xl p-6 sm:p-8 border border-neutral-bright-200">
			<Form
				form={form}
				name="event-form"
				layout="vertical"
				onFinish={onFinish}
				initialValues={{ price: 0 }}
			>
				<Form.Item
					name="title"
					label="Event Title"
					rules={[
						{
							required: true,
							message: "Please enter the event title",
						},
					]}
				>
					<Input placeholder="Enter event title" />
				</Form.Item>

				<Form.Item
					name="shortDescription"
					label="Short Description"
					rules={[
						{
							required: true,
							message: "Please enter a short description",
						},
					]}
				>
					<Input.TextArea
						placeholder="Brief summary of the event (1-2 lines)"
						rows={2}
						maxLength={200}
						showCount
					/>
				</Form.Item>

				<Form.Item
					name="fullDescription"
					label="Full Description"
					rules={[
						{
							required: true,
							message: "Please enter the full description",
						},
					]}
				>
					<Input.TextArea
						placeholder="Detailed description of the event"
						rows={5}
					/>
				</Form.Item>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
					<Form.Item
						name="category"
						label="Category"
						rules={[
							{
								required: true,
								message: "Please select a category",
							},
						]}
					>
						<Select placeholder="Select category">
							{EVENT_CATEGORIES.map((cat) => (
								<Select.Option key={cat} value={cat}>
									{cat}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item
						name="date"
						label="Event Date"
						rules={[
							{
								required: true,
								message: "Please select the event date",
							},
						]}
					>
						<DatePicker
							className="!w-full"
							placeholder="Select event date"
						/>
					</Form.Item>

					<Form.Item
						name="location"
						label="Location"
						rules={[
							{
								required: true,
								message: "Please enter the event location",
							},
						]}
					>
						<Input placeholder="e.g. San Francisco, CA" />
					</Form.Item>

					<Form.Item
						name="price"
						label="Price ($)"
						rules={[
							{
								required: true,
								message: "Please enter the price",
							},
						]}
					>
						<InputNumber
							min={0}
							placeholder="0 for free"
							className="!w-full"
						/>
					</Form.Item>
				</div>

				<Form.Item name="imageUrl" label="Image URL (optional)">
					<Input placeholder="https://example.com/image.jpg" />
				</Form.Item>

				<Form.Item className="mb-0 mt-2">
					<ContainedButton
						buttonType="submit"
						htmlType="submit"
						loading={isLoading}
						buttonExtraClassNames="btn-form-contained w-full"
					>
						<span className="block text-nowrap">Add Event</span>
					</ContainedButton>
				</Form.Item>
			</Form>
		</div>
	);
}
