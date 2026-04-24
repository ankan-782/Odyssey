import BaseMotionConfig from "@/app/_shared/components/common-wrapper/BaseMotionConfig";
import {
	CrossSVGIcon,
	HamburgerSVGIcon,
} from "@/app/_shared/components/ui/Icons";
import { viewportShowingMotion } from "@/app/_shared/lib/motion-configuration-data";
import { motion } from "framer-motion";

export default function HeaderSwitchButton({
	transitionDelay,
	transitionDuration,
	data,
	extraClassNames,
}) {
	const { setIsNavigationSidebarOpened, isNavigationSidebarOpened } =
		data ?? {};

	return (
		<BaseMotionConfig
			transitionDelay={transitionDelay}
			transitionDuration={transitionDuration}
		>
			<motion.button
				aria-label="mobile menu sidebar toggle button"
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				variants={viewportShowingMotion({
					y: { yHidden: -20, yShow: 0 },
				})}
				onClick={() => setIsNavigationSidebarOpened(true)}
				className={`relative block overflow-hidden size-10 bg-neutral-dark-600 hover:bg-primary rounded-xl group active:!scale-[0.9] transition-all duration-300 will-change-transform ${isNavigationSidebarOpened ? "bg-primary" : ""} ${extraClassNames}`}
			>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-7">
					<motion.div
						initial={false}
						animate={
							isNavigationSidebarOpened ? "opened" : "closed"
						}
						variants={{
							opened: {
								y: 50,
								opacity: 0,
								// rotate: 180,
								filter: "blur(5px)",
							},
							closed: {
								y: 0,
								opacity: 1,
								// rotate: -180,
								filter: "blur(0px)",
							},
						}}
						transition={{ duration: 0.7 }}
						className="size-full"
					>
						<HamburgerSVGIcon className="text-neutral-bright-100 size-full" />
					</motion.div>
				</div>

				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-7">
					<motion.div
						initial={false}
						animate={
							isNavigationSidebarOpened ? "opened" : "closed"
						}
						variants={{
							opened: {
								y: 0,
								opacity: 1,
								// rotate: 360,
								filter: "blur(0px)",
							},
							closed: {
								y: -50,
								opacity: 0,
								// rotate: 180,
								filter: "blur(5px)",
							},
						}}
						transition={{ duration: 0.7 }}
						className="size-full"
					>
						<CrossSVGIcon className="text-neutral-bright-100 size-full" />
					</motion.div>
				</div>
			</motion.button>
		</BaseMotionConfig>
	);
}
