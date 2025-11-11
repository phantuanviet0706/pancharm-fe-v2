import axios from "axios";

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_APP_URL,
});

axiosClient.interceptors.request.use((config) => {
	const token = localStorage.getItem("token") || sessionStorage.getItem("token");

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

				localStorage.removeItem("token");
				sessionStorage.removeItem("token");

				setTimeout(() => {
					window.location.href = "/login";
				}, 100);
			}
		}
		return Promise.reject(error);
	},
);

export default axiosClient;
