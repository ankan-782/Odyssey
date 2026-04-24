"use client";
import ContainerWrapper from "@/app/_shared/components/common-wrapper/ContainerWrapper";
import Description from "@/app/_shared/components/texts/Description";
import Title from "@/app/_shared/components/texts/Title";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import { motion } from "framer-motion";

export default function AboutSection() {
	return (
		<motion.section
			aria-label="about page"
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			variants={viewportShowingMotion()}
			className="bg-neutral-bright-100"
		>
			<ContainerWrapper>
				<div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
					{/* page header */}
					<div className="text-center flex flex-col gap-2 sm:gap-3">
						<Title
							transitionDelay={0.1}
							headingType="h1"
							title={{
								first: "About",
								second: "Odyssey Events",
							}}
						/>
						<Description
							transitionDelay={0.2}
							description="Your one-stop platform for discovering, creating, and managing events worldwide."
							extraClassNames="max-w-lg mx-auto"
						/>
					</div>

					{/* content sections */}
					<div className="max-w-screen-lg mx-auto flex flex-col gap-6 sm:gap-8">
						{/* mission */}
						<div className="bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/10">
							<h2 className="font-semibold text-lg sm:text-xl text-neutral-dark-800 mb-3">
								🎯 Our Mission
							</h2>
							<p className="text-sm sm:text-base text-neutral-dark-700 leading-relaxed">
								Odyssey Events was built with a simple mission —
								to connect people through unforgettable
								experiences. Whether you&apos;re looking for a
								tech conference, a music festival, a sports
								event, or a networking meetup, we make it easy
								to find and attend events that matter to you.
							</p>
						</div>

						{/* what we offer */}
						<div className="bg-neutral-bright-100 rounded-2xl p-6 sm:p-8 border border-neutral-bright-200">
							<h2 className="font-semibold text-lg sm:text-xl text-neutral-dark-800 mb-3">
								✨ What We Offer
							</h2>
							<ul className="flex flex-col gap-3 text-sm sm:text-base text-neutral-dark-700">
								<li className="flex items-start gap-2">
									<span className="text-primary font-bold mt-0.5">
										•
									</span>
									<span>
										<strong>Event Discovery</strong> —
										Browse and filter events by category,
										price, and location.
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-primary font-bold mt-0.5">
										•
									</span>
									<span>
										<strong>Event Management</strong> —
										Create, edit, and manage your events
										with ease.
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-primary font-bold mt-0.5">
										•
									</span>
									<span>
										<strong>Diverse Categories</strong> —
										From conferences to festivals, we cover
										events of all kinds.
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-primary font-bold mt-0.5">
										•
									</span>
									<span>
										<strong>Seamless Experience</strong> —
										Enjoy a fast, secure, and user-friendly platform tailored to your needs.
									</span>
								</li>
							</ul>
						</div>

						{/* our community */}
						<div className="bg-neutral-dark-800 rounded-2xl p-6 sm:p-8 text-neutral-bright-100">
							<h2 className="font-semibold text-lg sm:text-xl mb-3">
								🌍 Our Community
							</h2>
							<p className="text-sm sm:text-base text-neutral-bright-200 leading-relaxed mb-4">
								We believe that events are more than just gatherings — they are opportunities to build lasting relationships, share ideas, and create memories. Join thousands of organizers and attendees who trust Odyssey to bring their visions to life.
							</p>
							<div className="flex flex-wrap gap-2 sm:gap-3">
								{[
									"100K+ Attendees",
									"500+ Events",
									"50+ Cities",
									"24/7 Support",
								].map((stat) => (
									<span
										key={stat}
										className="bg-neutral-dark-900/60 text-neutral-bright-200 text-xs sm:text-sm px-3 py-1.5 rounded-full border border-neutral-dark-600/30"
									>
										{stat}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</ContainerWrapper>
		</motion.section>
	);
}
