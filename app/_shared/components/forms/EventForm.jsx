"use client";
import { Form, Input, InputNumber, Select } from "antd";
import { EVENT_CATEGORIES } from "../../lib/events-data";
import ContainedButton from "../buttons-links/ContainedButton";

export default function EventForm({ onSubmit, isLoading }) {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		onSubmit(values);
		form.resetFields();
	};

	return (
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
					<input
						type="date"
						className="w-full border border-primary rounded-xl px-3 py-2 text-xs sm:text-sm lg:text-base text-neutral-dark-800 bg-neutral-bright-100 outline-none focus:border-primary transition-colors duration-300"
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
	);
}
