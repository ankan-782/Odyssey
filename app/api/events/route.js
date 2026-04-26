import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "app/data/events.json");

export async function GET() {
	try {
		const data = fs.readFileSync(filePath, "utf8");
		return NextResponse.json(JSON.parse(data));
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to load events" },
			{ status: 500 },
		);
	}
}

export async function POST(request) {
	try {
		const newEvent = await request.json();
		const data = fs.readFileSync(filePath, "utf8");
		const events = JSON.parse(data);

		// Add new event to the beginning
		events.unshift(newEvent);

		fs.writeFileSync(filePath, JSON.stringify(events, null, 2));
		return NextResponse.json(newEvent);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to add event" },
			{ status: 500 },
		);
	}
}
