export default function ContainerWrapper({ children, extraClassNames }) {
	return (
		<div
			className={`container py-14 sm:py-16 lg:py-[4.5rem] 2xl:py-20 ${extraClassNames}`}
		>
			{children}
		</div>
	);
}
