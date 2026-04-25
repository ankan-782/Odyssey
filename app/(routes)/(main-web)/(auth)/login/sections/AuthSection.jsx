"use client";
import Tabs from "@/app/_shared/components/common-in-pages/Tabs";
import BaseMotionConfig from "@/app/_shared/components/common-wrapper/BaseMotionConfig";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import LoginForm from "@/app/_shared/components/forms/LoginForm";
import RegisterForm from "@/app/_shared/components/forms/RegisterFrom";
import Description from "@/app/_shared/components/texts/Description";
import Title from "@/app/_shared/components/texts/Title";
import { AuthContext } from "@/app/_shared/contexts/AuthContextProvider";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const tabsData = [
	{ id: 0, title: "Login", value: "login" },
	{ id: 1, title: "Register", value: "register" },
];

export default function AuthSection() {
	const [activeTab, setActiveTab] = useState(0);

	const { user, isAuthLoading } = useContext(AuthContext);
	const router = useRouter();
	const searchParams = useSearchParams();

	const redirectPath = searchParams?.get("redirect-to") || "/";

	// If already logged in, redirect away from login page
	useEffect(() => {
		if (!isAuthLoading && user) {
			router.replace(redirectPath);
		}
	}, [user, isAuthLoading, router, redirectPath]);

	// Don't flash login form if auth is still resolving
	if (isAuthLoading) return null;

	return (
		<motion.section
			aria-label="login/register section"
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			variants={viewportShowingMotion()}
			className="bg-neutral-bright-100"
		>
			<ContainerWrapper>
				<div className="max-w-md mx-auto flex flex-col gap-8 sm:gap-10 lg:gap-12">
					{/* page header */}
					<div className="text-center flex flex-col gap-2 sm:gap-3">
						<Title
							transitionDelay={0.1}
							headingType="h1"
							title="Login/Register"
						/>
						<Description
							transitionDelay={0.2}
							description="Get in the system to manage your events"
							extraClassNames="max-w-sm mx-auto"
						/>
					</div>

					<div className="flex flex-col gap-8">
						{/* tabs */}
						<Tabs
							data={{
								tabsData,
								activeTab,
								setActiveTab,
							}}
						/>

						<BaseMotionConfig>
							<AnimatePresence mode="wait">
								<motion.div
									key={activeTab} // Key forces re-render/animation
									variants={viewportShowingMotion({
										y: {
											yHidden: 20,
											yShow: 0,
											yExit: -20,
										},
									})}
									initial="hidden"
									animate="show"
									exit="exit"
								>
									{activeTab === 0 && (
										<LoginForm
											redirectPath={redirectPath}
										/>
									)}
									{activeTab === 1 && (
										<RegisterForm
											redirectPath={redirectPath}
										/>
									)}
								</motion.div>
							</AnimatePresence>
						</BaseMotionConfig>
					</div>
				</div>
			</ContainerWrapper>
		</motion.section>
	);
}
