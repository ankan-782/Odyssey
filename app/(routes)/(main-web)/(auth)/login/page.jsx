"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input } from "antd";
import { AuthContext } from "@/app/_shared/contexts/AuthContextProvider";
import useShowToastMessage from "@/app/_shared/hooks/useShowToastMessage";
import ContainedButton from "@/app/_shared/components/buttons-links/ContainedButton";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import Title from "@/app/_shared/components/texts/Title";
import Description from "@/app/_shared/components/texts/Description";

export default function LoginPage() {
	const { login } = useContext(AuthContext);
	const { showToastMessage } = useShowToastMessage();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		setIsLoading(true);
		try {
			login(values.email, values.password);
			showToastMessage(
				"success",
				"Welcome back!",
				"You have been logged in successfully.",
			);
			router.push("/");
		} catch (error) {
			showToastMessage("error", "Login Failed", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section aria-label="login page">
			<ContainerWrapper>
				<div className="max-w-md mx-auto flex flex-col gap-6 sm:gap-8">
					{/* page header */}
					<div className="text-center flex flex-col gap-2 sm:gap-3">
						<Title headingType="h1" title="Login" />
						<Description
							description="Sign in to manage your events"
							extraClassNames="max-w-sm mx-auto"
						/>
					</div>

					{/* login form */}
					<div className="bg-neutral-bright-100 rounded-2xl p-6 sm:p-8 border border-neutral-bright-200">
						<Form
							form={form}
							name="login-form"
							layout="vertical"
							onFinish={onFinish}
						>
							<Form.Item
								name="email"
								label="Email"
								rules={[
									{
										required: true,
										message:
											"Please enter your email address",
									},
									{
										type: "email",
										message:
											"Please enter a valid email address",
									},
								]}
							>
								<Input placeholder="admin@events.com" />
							</Form.Item>

							<Form.Item
								name="password"
								label="Password"
								rules={[
									{
										required: true,
										message:
											"Please enter your password",
									},
								]}
							>
								<Input.Password placeholder="Enter your password" />
							</Form.Item>

							<Form.Item className="mb-0 mt-4">
								<ContainedButton
									buttonType="submit"
									htmlType="submit"
									loading={isLoading}
									buttonExtraClassNames="btn-form-contained w-full"
								>
									<span className="block text-nowrap">
										{isLoading
											? "Logging in..."
											: "Login"}
									</span>
								</ContainedButton>
							</Form.Item>
						</Form>

						<p className="text-xs sm:text-sm text-neutral-dark-600 text-center mt-5 pt-4 border-t border-neutral-bright-200">
							Demo credentials:{" "}
							<span className="font-medium text-neutral-dark-800">
								admin@events.com
							</span>{" "}
							/{" "}
							<span className="font-medium text-neutral-dark-800">
								password123
							</span>
						</p>
					</div>
				</div>
			</ContainerWrapper>
		</section>
	);
}
