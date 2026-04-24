"use client";
import TextButton from "@/app/_shared/components/buttons-links/TextButton";
import SpanText from "@/app/_shared/components/texts/SpanText";
import Title from "@/app/_shared/components/texts/Title";
import {
	staggeredItemsContainerMotion,
	staggeredSingleItemMotion,
} from "@/app/_shared/lib/motion-configuration-data";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactInfo({ contactInformation }) {
	return (
		<div className="space-y-6">
			{/* title */}
			<Title
				transitionDelay={0.3}
				headingType="h5"
				title="Contact us"
				extraClassNames="!text-neutral-bright-200"
			/>

			{/* contact us info list */}
			<div aria-label="footer content contact information list">
				<motion.ul
					variants={staggeredItemsContainerMotion({
						showingDelay: 0.4,
					})}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="space-y-4"
				>
					{contactInformation.map((element, index) => {
						const { icon, info, type } = element ?? {};

						return (
							<motion.li
								key={index}
								aria-label={`${type} info`}
								variants={staggeredSingleItemMotion()}
								className="flex items-start gap-2"
							>
								<div className="size-4 sm:size-5 flex-none">
									<Image
										src={icon}
										alt={`${type} icon`}
										className="object-contain invert opacity-70"
									/>
								</div>

								<LinkGenerator type={type} info={info} />
							</motion.li>
						);
					})}
				</motion.ul>
			</div>
		</div>
	);
}

// utility function to generate link
export function LinkGenerator({ type, info }) {
	switch (type) {
		case "phone":
			return (
				<div className="flex flex-col gap-1 overflow-hidden">
					{info.map((item, index) => {
						const { dept, phone } = item ?? {};
						return (
							<div
								key={index}
								className="flex flex-wrap items-start gap-x-1 gap-y-0.5"
							>
								<SpanText
									text={`${dept}:`}
									extraClassNames="!font-medium !capitalize !text-neutral-dark-600"
								/>

								<div className="flex items-center flex-wrap overflow-hidden">
									{phone
										.split(",")
										.map((number) => number.trim())
										.map((number, index, arr) => (
											<TextButton
												key={number}
												buttonType="external-link"
												buttonPath={`tel:${number}`}
												buttonContainerExtraClassNames="overflow-hidden"
												buttonExtraClassNames="w-fit block btn-text !text-neutral-bright-200 hover:!text-secondary !normal-case"
											>
												{number}
												{index !== arr.length - 1 &&
													", "}
											</TextButton>
										))}
								</div>
							</div>
						);
					})}
				</div>
			);
		case "email":
			return (
				<div className="flex flex-col gap-1 overflow-hidden">
					{info.map((item, index) => {
						const { dept, email } = item ?? {};
						return (
							<div
								key={index}
								className="flex flex-wrap items-start gap-x-1 gap-y-0.5"
							>
								<SpanText
									text={`${dept}:`}
									extraClassNames="!font-medium !capitalize !text-neutral-dark-600"
								/>

								<div className="flex items-center flex-wrap overflow-hidden">
									{email
										.split(", ")
										.map((em) => em.trim())
										.map((em, index, arr) => (
											<TextButton
												key={em}
												buttonType="external-link"
												buttonPath={`mailto:${em}`}
												buttonContainerExtraClassNames="overflow-hidden"
												buttonExtraClassNames="w-fit block btn-text !text-neutral-bright-200 hover:!text-secondary !normal-case"
											>
												{em}
												{index !== arr.length - 1 &&
													", "}
											</TextButton>
										))}
								</div>
							</div>
						);
					})}
				</div>
			);
		case "address":
			return (
				<div className="space-y-2">
					{info.map((addressItem, index) => {
						const { area, address, mapLocation } =
							addressItem ?? {};

						return (
							<TextButton
								key={address}
								buttonType="external-link"
								buttonPath={mapLocation}
								buttonExtraClassNames="w-fit block btn-text !text-neutral-bright-200 hover:!text-secondary !normal-case !text-wrap !font-medium"
							>
								{address}
							</TextButton>
						);
					})}
				</div>
			);
	}
}
