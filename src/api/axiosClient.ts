import axios from "axios";
import { getCookie } from "../utils/auth";

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_APP_URL,
	withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
	const token = getCookie("ACCESS_TOKEN");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

let isRefreshing = false;

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			console.warn("[axiosClient] Token hết hạn hoặc không hợp lệ. Quay về trang đăng nhập.");

			if (!isRefreshing) {
				isRefreshing = true;

				document.cookie = "ACCESS_TOKEN=; Max-Age=0; path=/;";

				setTimeout(() => {
					window.location.href = "/login";
				}, 100);
			}
		}
		return Promise.reject(error);
	},
);

export default axiosClient;
