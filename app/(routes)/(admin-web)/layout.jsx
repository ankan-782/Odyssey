import {
	HEADER_HEIGHT,
	ROOT_FONT_SIZE,
} from "@/app/_shared/lib/project-constant-data";

export default async function AdminWebLayout({ children }) {
	return (
		<>
			<header>Header</header>
			<main
				style={{
					minHeight: `calc(100dvh - ${
						HEADER_HEIGHT / ROOT_FONT_SIZE
					}rem)`,
				}}
			>
				{children}
			</main>
			<footer>Footer</footer>
		</>
	);
}
