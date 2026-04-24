"use client";
import { motion } from "framer-motion";
import {
	staggeredItemsContainerMotion,
	staggeredSingleItemMotion,
} from "../../lib/motion-configuration-data";
import CategoryCard from "../cards/CategoryCard";
import EventCard from "../cards/EventCard";
import StatCard from "../cards/StatCard";
import TestimonialCard from "../cards/TestimonialCard";

export default function CardsLayout({
	data,
	cardsContainerExtraClassNames,
	cardExtraClassNames,
	translateAnimation = true,
	animationStyle,
}) {
	const {
		key,
		animationStaggerDuration,
		pageName,
		dataTitle,
		information,
		payloadData,
	} = data ?? {};

	const staggeredSingleItemMotionVariants = translateAnimation
		? animationStyle
			? staggeredSingleItemMotion(animationStyle)
			: staggeredSingleItemMotion({
					y: { yHidden: -20, yShow: 0 },
				})
		: staggeredSingleItemMotion();

	return (
		<motion.div
			key={key ? key : dataTitle}
			variants={staggeredItemsContainerMotion({
				staggerDuration: animationStaggerDuration,
			})}
			initial="hidden"
			animate="show"
			whileInView="show"
			viewport={{ once: true }}
			className={cardsContainerExtraClassNames}
		>
			{information?.map((info, index) => (
				<motion.div
					key={index}
					variants={staggeredSingleItemMotionVariants}
					className={cardExtraClassNames}
				>
					{dataTitle === "event-cards" && (
						<EventCard
							info={info}
							index={index}
							dataTitle={dataTitle}
							payloadData={payloadData}
						/>
					)}
					{dataTitle === "category-cards" && (
						<CategoryCard
							info={info}
							index={index}
							dataTitle={dataTitle}
							payloadData={payloadData}
						/>
					)}
					{dataTitle === "stat-cards" && (
						<StatCard
							info={info}
							index={index}
							dataTitle={dataTitle}
							payloadData={payloadData}
						/>
					)}
					{dataTitle === "testimonial-cards" && (
						<TestimonialCard
							info={info}
							index={index}
							dataTitle={dataTitle}
							payloadData={payloadData}
						/>
					)}
				</motion.div>
			))}
		</motion.div>
	);
}
