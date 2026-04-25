"use client";
import { AuthContext } from "@/app/_shared/contexts/AuthContextProvider";
import useShowToastMessage from "@/app/_shared/hooks/useShowToastMessage";
import { Form, Input } from "antd";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import ContainedButton from "../buttons-links/ContainedButton";
import OutlinedButton from "../buttons-links/OutlinedButton";
import { GoogleSVGIcon } from "../ui/Icons";

export default function RegisterForm({ redirectPath }) {
	const { registerWithEmail, loginWithGoogle } = useContext(AuthContext);
	const { showToastMessage } = useShowToastMessage();
	const router = useRouter();

	const [isEmailLoading, setIsEmailLoading] = useState(false);
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);

	const [form] = Form.useForm();

	const onEmailFinish = async (values) => {
		setIsEmailLoading(true);
		try {
			await registerWithEmail(values.email, values.password, values.name);
			showToastMessage(
				"success",
				"Account created!",
				"You have been registered and logged in successfully.",
			);
			router.replace(redirectPath);
		} catch (error) {
			const message =
				error.code === "auth/email-already-in-use"
					? "An account with this email already exists."
					: error.code === "auth/weak-password"
						? "Password should be at least 6 characters."
						: error.message;
			showToastMessage("error", "Registration Failed", message);
		} finally {
			setIsEmailLoading(false);
		}
	};

	const onGoogleLogin = async () => {
		setIsGoogleLoading(true);
		try {
			await loginWithGoogle();
			showToastMessage(
				"success",
				"Welcome!",
				"You have been signed up with Google.",
			);
			router.replace(redirectPath);
		} catch (error) {
			if (error.code !== "auth/popup-closed-by-user") {
				showToastMessage(
					"error",
					"Google Sign Up Failed",
					error.message,
				);
			}
		} finally {
			setIsGoogleLoading(false);
		}
	};

	return (
		<div className="bg-neutral-bright-100 rounded-2xl p-6 sm:p-8 border border-neutral-bright-200 flex flex-col gap-5">
			{/* Google signup button */}
			<OutlinedButton
				type="button"
				buttonType="click"
				onClick={onGoogleLogin}
				disabled={isGoogleLoading || isEmailLoading}
				buttonExtraClassNames="w-full flex items-center justify-center gap-2 btn-outlined"
				buttonContainerExtraClassNames="w-full"
			>
				<GoogleSVGIcon className="w-6 h-6" />
				<motion.span
					initial={{ opacity: 1 }}
					animate={{ opacity: isGoogleLoading ? 0.5 : 1 }}
					className="block text-nowrap text-center"
				>
					{isGoogleLoading ? "Signing up..." : "Continue with Google"}
				</motion.span>
			</OutlinedButton>

			{/* divider */}
			<div className="flex items-center gap-3">
				<div className="flex-1 h-px bg-neutral-bright-200" />
				<span className="text-xs text-neutral-dark-600">
					or sign up with email
				</span>
				<div className="flex-1 h-px bg-neutral-bright-200" />
			</div>

			{/* email/password form */}
			<Form
				form={form}
				name="register-form"
				layout="vertical"
				onFinish={onEmailFinish}
			>
				<Form.Item
					name="name"
					label="Full Name"
					rules={[
						{ required: true, message: "Please enter your name" },
					]}
				>
					<Input placeholder="John Doe" />
				</Form.Item>

				<Form.Item
					name="email"
					label="Email"
					rules={[
						{
							required: true,
							message: "Please enter your email address",
						},
						{
							type: "email",
							message: "Please enter a valid email address",
						},
					]}
				>
					<Input placeholder="you@example.com" />
				</Form.Item>

				<Form.Item
					name="password"
					label="Password"
					rules={[
						{ required: true, message: "Please enter a password" },
						{
							min: 6,
							message: "Password must be at least 6 characters",
						},
					]}
				>
					<Input.Password placeholder="Min. 6 characters" />
				</Form.Item>

				<Form.Item
					name="confirmPassword"
					label="Confirm Password"
					dependencies={["password"]}
					rules={[
						{
							required: true,
							message: "Please confirm your password",
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (
									!value ||
									getFieldValue("password") === value
								) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error("Passwords do not match"),
								);
							},
						}),
					]}
				>
					<Input.Password placeholder="Re-enter your password" />
				</Form.Item>

				<Form.Item className="mb-0 mt-4">
					<ContainedButton
						buttonType="submit"
						htmlType="submit"
						loading={isEmailLoading}
						disabled={isGoogleLoading}
						buttonExtraClassNames="block btn-form-contained w-full"
					>
						<span className="block text-nowrap">
							{isEmailLoading
								? "Creating account..."
								: "Create Account"}
						</span>
					</ContainedButton>
				</Form.Item>
			</Form>
		</div>
	);
}
