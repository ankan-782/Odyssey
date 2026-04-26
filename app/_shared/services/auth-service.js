import { auth, googleProvider } from "@/app/_shared/lib/firebase-config";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";

export const registerWithEmail = async (email, password, displayName) => {
	const userCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password,
	);
	if (displayName) {
		await updateProfile(userCredential.user, { displayName });
	}
	return userCredential.user;
};

export const loginWithEmail = async (email, password) => {
	const userCredential = await signInWithEmailAndPassword(
		auth,
		email,
		password,
	);
	return userCredential.user;
};

export const loginWithGoogle = async () => {
	const userCredential = await signInWithPopup(auth, googleProvider);
	return userCredential.user;
};

export const logoutUser = async () => {
	await signOut(auth);
    return true;
};
