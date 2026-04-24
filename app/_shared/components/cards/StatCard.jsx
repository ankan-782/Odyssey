export default function StatCard({ info, index, dataTitle, payloadData }) {
	const { icon, number, label } = info ?? {};

	return (
		<div className="bg-neutral-bright-100 rounded-2xl p-6 text-center border border-neutral-bright-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
			<span className="text-3xl sm:text-4xl block mb-3">{icon}</span>
			<p className="font-bold text-2xl sm:text-3xl lg:text-4xl text-neutral-dark-800 font-mono">
				{number}
			</p>
			<p className="text-xs sm:text-sm text-neutral-dark-600 mt-1">
				{label}
			</p>
		</div>
	);
}
