"use client";
import { Form, Input, Space } from "antd";
import { motion } from "framer-motion";
import useApiCall from "../../hooks/useApiCall";
import useShowModal from "../../hooks/useShowModal";
import useShowToastMessage from "../../hooks/useShowToastMessage";
import { viewportShowingMotion } from "../../lib/motion-configuration-data";
import postSubscribeInfoData from "../../service/subscribe-service";
import ContainedButton from "../buttons-links/ContainedButton";
import BaseMotionConfig from "../common-wrapper/BaseMotionConfig";

export default function SubscribeForm({ transitionDelay }) {
	const { setModalOpen, showModal, ModalContent } = useShowModal();

	const { showToastMessage } = useShowToastMessage();

	const {
		callApi: callSubscribeInfoDataPostApi,
		isLoading: isSubscribeInfoDataPostLoading,
		isError: isSubscribeInfoDataPostError,
		error: subscribeInfoDataPostErrorMessage,
	} = useApiCall(postSubscribeInfoData);

	const [form] = Form.useForm();

	async function onFinish(values) {
		showModal({
			title: (
				<h6 className="font-semibold text-sm sm:text-base lg:text-lg 2xl:text-xl">
					Thanks for subscribing.
				</h6>
			),
			bodyContent: (
				<p className="py-4 text-xs sm:text-sm lg:text-base">
					You will be notified with latest news.
				</p>
			),
			footerContent: (
				<ContainedButton
					buttonType="click"
					onClick={() => setModalOpen(false)}
					buttonExtraClassNames="btn-contained"
					buttonContainerExtraClassNames="w-fit ml-auto"
				>
					<span className="block text-nowrap">Okay</span>
				</ContainedButton>
			),
		});
		return;

		const formData = {
			...values,
		};

		try {
			const result = await callSubscribeInfoDataPostApi(formData);
			if (result) {
				showModal({
					title: (
						<h6 className="font-semibold text-sm sm:text-base lg:text-lg 2xl:text-xl">
							Thanks for subscribing.
						</h6>
					),
					bodyContent: (
						<p className="py-4 text-xs sm:text-sm lg:text-base">
							You will be notified with latest news.
						</p>
					),
					footerContent: (
						<ContainedButton
							buttonType="click"
							onClick={() => setModalOpen(false)}
							buttonExtraClassNames="btn-contained"
							buttonContainerExtraClassNames="w-fit ml-auto"
						>
							<span className="block text-nowrap">Okay</span>
						</ContainedButton>
					),
				});
				form.resetFields();
			}
		} catch (apiError) {
			console.log(apiError);
			console.log(subscribeInfoDataPostErrorMessage);
			showToastMessage(
				"error",
				"Error",
				subscribeInfoDataPostErrorMessage ??
					"An error occurred. Please try again.",
			);
		}
	}

	return (
		<>
			{ModalContent}
			<BaseMotionConfig transitionDelay={transitionDelay}>
				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					variants={viewportShowingMotion()}
				>
					<Form
						form={form}
						name="subscribe-form"
						onFinish={onFinish}
						initialValues={{}}
					>
						<Space.Compact className="w-full flex">
							<Form.Item
								name="email"
								rules={[
									{
										required: true,
										message:
											"Please type your email address!",
									},
									{
										type: "email",
										message:
											"The input is not valid E-mail",
									},
								]}
								className="mb-0 flex-1"
							>
								<Input
									placeholder="enter your email"
									className="h-8 sm:h-9 lg:h-10 2xl:h-11"
								/>
							</Form.Item>

							<Form.Item className="mb-0">
								<ContainedButton
									buttonType="submit"
									htmlType="submit"
									loading={isSubscribeInfoDataPostLoading}
									buttonExtraClassNames="h-8 sm:h-9 lg:h-10 2xl:h-11 btn-form-contained"
								>
									<span className="block text-nowrap">
										Send
									</span>
								</ContainedButton>
							</Form.Item>
						</Space.Compact>
					</Form>
				</motion.div>
			</BaseMotionConfig>
		</>
	);
}
