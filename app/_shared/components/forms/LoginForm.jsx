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

export default function LoginForm({ redirectPath }) {
	const { loginWithEmail, loginWithGoogle } = useContext(AuthContext);
	const { showToastMessage } = useShowToastMessage();
	const router = useRouter();

	const [isEmailLoading, setIsEmailLoading] = useState(false);
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);

	const [form] = Form.useForm();

	const onEmailFinish = async (values) => {
		setIsEmailLoading(true);
		try {
			await loginWithEmail(values.email, values.password);
			showToastMessage(
				"success",
				"Welcome back!",
				"You have been logged in successfully.",
			);
			router.replace(redirectPath);
		} catch (error) {
			const message =
				error.code === "auth/invalid-credential"
					? "Invalid email or password."
					: error.code === "auth/too-many-requests"
						? "Too many attempts. Try again later."
						: error.message;
			showToastMessage("error", "Login Failed", message);
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
				"You have been logged in with Google.",
			);
			router.replace(redirectPath);
		} catch (error) {
			if (error.code !== "auth/popup-closed-by-user") {
				showToastMessage("error", "Google Login Failed", error.message);
			}
		} finally {
			setIsGoogleLoading(false);
		}
	};

	return (
		<div className="bg-neutral-bright-100 rounded-2xl p-6 sm:p-8 border border-neutral-bright-200 flex flex-col gap-5">
			{/* Google login button */}
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
					{isGoogleLoading ? "Signing in..." : "Continue with Google"}
				</motion.span>
			</OutlinedButton>

			{/* divider */}
			<div className="flex items-center gap-3">
				<div className="flex-1 h-px bg-neutral-bright-200" />
				<span className="text-xs text-neutral-dark-600">
					or sign in with email
				</span>
				<div className="flex-1 h-px bg-neutral-bright-200" />
			</div>

			{/* email/password form */}
			<Form
				form={form}
				name="login-form"
				layout="vertical"
				onFinish={onEmailFinish}
			>
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
						{
							required: true,
							message: "Please enter your password",
						},
					]}
				>
					<Input.Password placeholder="Enter your password" />
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
							{isEmailLoading ? "Logging in..." : "Login"}
						</span>
					</ContainedButton>
				</Form.Item>
			</Form>
		</div>
	);
}
