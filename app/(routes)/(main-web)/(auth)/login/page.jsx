import { Suspense } from "react";
import AuthSection from "./sections/AuthSection";

// metadata
export const metadata = {
	title: "Login / Register — Odyssey",
	description: "Get into your Odyssey account to manage your events.",
};

export default function LoginRegisterPage() {
	return (
		<Suspense>
			<AuthSection />
		</Suspense>
	);
}
