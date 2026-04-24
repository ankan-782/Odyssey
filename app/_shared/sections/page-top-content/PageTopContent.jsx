"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ContainerWrapper from "../../components/common-wrapper/ContainerWrapper";
import Caption from "../../components/texts/Caption";
import Description from "../../components/texts/Description";
import Title from "../../components/texts/Title";
import { IMAGE_URL } from "../../lib/api-url-constant-data";
import { viewportShowingMotion } from "../../lib/motion-configuration-data";

export default function PageTopContent({
	data,
	showCaption = true,
	showTitle = true,
	showDescription = true,
}) {
	const { id, pageCaption, pageTitle, pageDescription, pageName, pageImage } =
		data ?? {};

	return (
		<motion.section
			id={id}
			aria-label={`${pageName} page background image/background video/background moving image section`}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			variants={viewportShowingMotion()}
			className="relative overflow-hidden aspect-auto"
		>
			{/* background image/video/image slider */}
			<Image
				src={
					typeof pageImage === "object"
						? pageImage // static folder image
						: `${IMAGE_URL}/${pageImage}` // server image
				}
				alt={`${pageName} page background image/background video/background moving image`}
				fill
				sizes="100vw"
				className="object-cover"
			/>

			{/* dark overlay */}
			<div className="absolute inset-0 w-full h-full bg-neutral-dark-900/50"></div>

			{/* middle content */}
			<div className="relative h-full">
				<ContainerWrapper>
					<div className="space-y-4 text-center">
						{/* caption */}
						{showCaption && pageCaption && (
							<Caption
								transitionDelay={0.1}
								caption={pageCaption}
								extraClassNames="!uppercase tracking-[0.4em]"
							/>
						)}

						{/* title */}
						{showTitle && pageTitle && (
							<Title
								transitionDelay={0.2}
								headingType="h1"
								title={pageTitle ? pageTitle : pageName}
							/>
						)}

						{/* description */}
						{showDescription && pageDescription && (
							<Description
								transitionDelay={0.3}
								description={pageDescription}
								extraClassNames="max-w-screen-md mx-auto"
							/>
						)}
					</div>
				</ContainerWrapper>
			</div>
		</motion.section>
	);
}

{
	/* image blend overlay */
	/* <div className="absolute left-0 top-0 w-1/4 h-full flex justify-center items-stretch">
        {Array.from({ length: 14 }).map((_, index) => {
            return (
                <div
                    key={index}
                    className={`flex-[1_0_0] bg-primary-dark-800/20 bg-blend-overlay backdrop-blur-[5.625rem] ${
                        index > 6 ? "hidden sm:block" : "block"
                    }`}
                ></div>
            );
        })}
    </div> */
}

{
	/* image blend overlay */
	/* <div className="absolute right-0 top-0 w-1/4 h-full flex justify-center items-stretch">
        {Array.from({ length: 14 }).map((_, index) => {
            return (
                <div
                    key={index}
                    className={`flex-[1_0_0] bg-primary-dark-800/20 bg-blend-overlay backdrop-blur-[5.625rem] ${
                        index > 6 ? "hidden sm:block" : "block"
                    }`}
                ></div>
            );
        })}
    </div> */
}
