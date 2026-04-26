import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
} from "firebase/firestore";
import { db } from "../lib/firebase-config";

const eventsCollection = collection(db, "events");

export const getAllEvents = async () => {
	const q = query(eventsCollection, orderBy("createdAt", "desc"));
	const snapshot = await getDocs(q);
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addEventApi = async (eventData) => {
	const docRef = await addDoc(eventsCollection, {
		...eventData,
		createdAt: Date.now(),
	});
	return { id: docRef.id, ...eventData };
};

export const deleteEventApi = async (id) => {
	await deleteDoc(doc(db, "events", id));
	return { success: true };
};

export const getEventBySlug = async (slug) => {
	const events = await getAllEvents();
	return events.find((e) => e.slug === slug) ?? null;
};

export const getRelatedEvents = async (category, slug, limit = 3) => {
	const events = await getAllEvents();
	return events
		.filter((e) => e.category === category && e.slug !== slug)
		.slice(0, limit);
};
