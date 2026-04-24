"use client";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);

	const login = (email, password) => {
		if (
			email === "admin@events.com" &&
			password === "password123"
		) {
			const loggedInUser = {
				name: "Admin User",
				email: "admin@events.com",
			};
			setUser(loggedInUser);
			return loggedInUser;
		}
		throw new Error("Invalid credentials");
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
