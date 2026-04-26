import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "app/data/events.json");

export async function DELETE(request, { params }) {
	try {
		const { id } = params;
		const data = fs.readFileSync(filePath, "utf8");
		let events = JSON.parse(data);

		events = events.filter((e) => e.id !== id);

		fs.writeFileSync(filePath, JSON.stringify(events, null, 2));
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to delete event" },
			{ status: 500 },
		);
	}
}
