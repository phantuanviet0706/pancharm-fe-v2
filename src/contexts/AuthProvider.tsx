import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService";
import { getMe, User } from "../api/userService";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../utils/auth";

type AuthContextType = {
	user: User | null;
	loading: boolean;
	loginUser: (username: string, password: string) => Promise<void>;
	logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	loginUser: async () => {},
	logoutUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const initAuth = async () => {
			const storedToken = getCookie("ACCESS_TOKEN");

			if (!storedToken) {
				setLoading(false);
				return;
			}

			try {
				const decoded: any = jwtDecode(storedToken);
				const now = Date.now() / 1000;
				if (decoded.exp && decoded.exp < now) {
					document.cookie = "ACCESS_TOKEN=; Max-Age=0; path=/;";
					setLoading(false);
					return;
				}
			} catch (e) {
				document.cookie = "ACCESS_TOKEN=; Max-Age=0; path=/;";
				setLoading(false);
				return;
			}

			try {
				const res = await getMe();
				const me = res?.result || null;
				setUser(me);
			} catch (err) {
				document.cookie = "ACCESS_TOKEN=; Max-Age=0; path=/;";
			} finally {
				setLoading(false);
			}
		};

		initAuth();
	}, []);

	const loginUser = async (username: string, password: string) => {
		const { accessToken } = await login({ username, password });

		document.cookie = `ACCESS_TOKEN=${accessToken}; Path=/; Max-Age=${60 * 60 * 24 * 7};`;

		const res = await getMe();
		const me = res?.result || null;
		setUser(me);

		navigate("/");
	};

	const logoutUser = () => {
		// await logout();
		document.cookie = "ACCESS_TOKEN=; Max-Age=0; Path=/;";
		setUser(null);
		navigate("/login");
	};

	const value: AuthContextType = {
		user,
		loading,
		loginUser,
		logoutUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
