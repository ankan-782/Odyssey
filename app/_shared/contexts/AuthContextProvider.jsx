"use client";
import { auth } from "@/app/_shared/lib/firebase-config";
import {
	loginWithEmail,
	loginWithGoogle,
	logoutUser,
	registerWithEmail,
} from "@/app/_shared/service/auth-service";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isAuthLoading, setIsAuthLoading] = useState(true);

	// Firebase listener — single source of truth for auth state
	// Like a subscription: fires every time login/logout happens
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser ?? null);
			setIsAuthLoading(false);
		});

		return () => unsubscribe(); // cleanup on unmount
	}, []);

	const handleLoginWithEmail = async (email, password) => {
		return await loginWithEmail(email, password);
	};

	const handleRegisterWithEmail = async (email, password, displayName) => {
		return await registerWithEmail(email, password, displayName);
	};

	const handleLoginWithGoogle = async () => {
		return await loginWithGoogle();
	};

	const handleLogout = async () => {
		await logoutUser();
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthLoading,
				loginWithEmail: handleLoginWithEmail,
				registerWithEmail: handleRegisterWithEmail,
				loginWithGoogle: handleLoginWithGoogle,
				logout: handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
